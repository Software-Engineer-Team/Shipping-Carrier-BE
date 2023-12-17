import { AxiosResponse } from "axios";
const { ApplicationError } = require("@strapi/utils").errors;
import moment from "moment";
import {
  baseOrderStatus,
  transformGHNFormat,
  transformNinjaFormat,
  transformGHTKFormat,
  mappingNinjaOrderStatus,
  mappingGHNOrderStatus,
  mappingGHTKOrderStatus,
  checkTrackingOrder,
} from "./utils";
import { Logger } from "../../../helper/logger/logger";
import { apiAxios } from "../../../helper/apiHelper";
import {
  CARRIER_ACCOUNT_ROUTE,
  ERROR_GHN_ORDER_CANCEL,
  ERROR_GHN_ORDER_CREATION,
  ERROR_GHN_ORDER_TRACKING,
  ERROR_GHTK_ORDER_CANCEL,
  ERROR_GHTK_ORDER_CREATION,
  ERROR_GHTK_ORDER_TRACKING,
  ERROR_NINJAVAN_ORDER_CANCEL,
  ERROR_NINJAVAN_ORDER_CREATION,
  ERROR_NINJAVAN_ORDER_TRACKING,
  ORDER_ROUTE,
  TRACKING_ROUTE,
} from "../../../helper/constants";
import { transformHttpError } from "../../../helper/errorHelper";
import { removeAccents } from "../../../helper/unorm";

interface CarrierService {
  transform(order: any): any;
  sendOrder(order: any): Promise<AxiosResponse<any>>;
  cancelOrder(tracking_number: string): Promise<AxiosResponse<any>>;
  trackingOrder(payload: any): Promise<any>;
  parseOrder(fromData: any, srcData: any): any;
  transformUrl(weight: number): any;
}

class GHNService implements CarrierService {
  private GHN_WEIGHT: number = 5;
  constructor() {
    /* TODO document why this constructor is empty */
  }

  transform(order: any) {
    // order.payment_type_id = order.payment_type_id === 2 ? 2 : 1;
    const newOrder = { ...order, ...(order.custom || {}) };
    newOrder.service_type_id = newOrder.weight < this.GHN_WEIGHT ? 2 : 5;
    const delivery_instructions = removeAccents(newOrder.delivery_instructions)
      .replace(/\s/g, "")
      .toLowerCase();
    let required_note: string;
    switch (true) {
      case delivery_instructions.includes("choxemhang,chothu"):
        required_note = "CHOTHUHANG";
        break;
      case delivery_instructions.includes("choxemhang,khongchothu"):
        required_note = "CHOXEMHANGKHONGTHU";
        break;
      case delivery_instructions.includes("khongchoxemhang"):
        required_note = "KHONGCHOXEMHANG";
        break;
      default:
        required_note = "KHONGCHOXEMHANG";
        break;
    }
    newOrder.required_note = required_note;
    return transformGHNFormat(newOrder);
  }

  transformUrl(carrier_account: any) {
    const {
      api_url,
      encrypt_data: { TOKEN_ID },
    } = carrier_account;
    return { ghnUrl: api_url, ghnTokenId: TOKEN_ID };
  }

  async cancelOrder(tracking_number: string): Promise<AxiosResponse<any, any>> {
    const logger = new Logger("cancelOrder").getLogger();
    try {
      const order = await strapi
        .service(ORDER_ROUTE)
        .findOrderByTrackingId(tracking_number);

      const carrier_account = await strapi
        .service(CARRIER_ACCOUNT_ROUTE)
        .findCarrierAccountByName(order.carrier_account.account_name);

      const { ghnUrl, ghnTokenId } = this.transformUrl(carrier_account);
      const response = await apiAxios({
        method: "delete" || "post",
        url: `${ghnUrl}/shiip/public-api/v2/switch-status/cancel`,
        headers: { token: ghnTokenId },
        data: {
          order_codes: [tracking_number],
        },
      });
      logger.debug("Cancel Ghn order: ", response.data);
      return response.data;
    } catch (error) {
      logger.error("Error", { ...error.response?.data });
      const { statusCode, message } = transformHttpError(error);
      console.log(message);
      throw new ApplicationError(
        `${ERROR_GHN_ORDER_CANCEL}: ${message.toLowerCase()}`,
        {
          ...error.response?.data,
        },
      );
    }
  }

  async sendOrder(order: any) {
    const logger = new Logger("sendOrder").getLogger();
    try {
      const { ghnUrl, ghnTokenId } = this.transformUrl(order.carrier_account);
      const transformedOrder = this.transform(order);
      logger.debug("Data before sending order to Ghn: ", transformedOrder);

      const { data: ghnOrder } = await apiAxios({
        method: "post",
        url: `${ghnUrl}/shiip/public-api/v2/shipping-order/create`,
        headers: { token: ghnTokenId },
        data: transformedOrder,
      });

      logger.debug("Response after sending order to Ghn: ", ghnOrder.data);
      return ghnOrder;
    } catch (error) {
      console.log(error.response.data);
      logger.error("Error", { ...error.response?.data });
      const { statusCode, message } = transformHttpError(error);
      throw new ApplicationError(
        `${ERROR_GHN_ORDER_CREATION}: ${message.toLowerCase()}`,
        {
          ...error.response?.data,
        },
      );
    }
  }

  async trackingOrder(payload: any) {
    const logger = new Logger("trackingOrder").getLogger();
    try {
      const { orderStatus, trackingStatus } = mappingGHNOrderStatus(
        payload.Status,
      );
      if (!orderStatus && !trackingStatus) {
        logger.error("Không tìm thấy trạng thái theo dõi cho GHN.", payload);
        return;
      }

      const newDate = moment(new Date()).format("YYYY-MM-DDTHH:mm:ss.SSSZ");

      const order = await strapi
        .service(ORDER_ROUTE)
        .findOrderByTrackingId(payload.OrderCode);

      let updatedOrder = null;
      let updateData = null;
      // NOTE: 22 status for GHN
      switch (payload.Status.toLowerCase()) {
        // NOTE: PENDING_PICKUP
        case "ready_to_pick":
        case "picking":
        case "money_collect_picking": {
          // NOTE: don't need to update order status because default when creating new order is pending
          break;
        }
        // NOTE: GOODS_IN_TRANSIT
        case "picked":
        case "storing":
        case "sorting":
        case "transporting":
        case "delivering":
        case "money_collect_delivering":
        case "waiting_to_return":
        case "return":
        case "return_transporting":
        case "returning":
        case "return_sorting":
        // NOTE: DELIVERY_FAILED
        case "delivery_fail":
        case "return_fail":
        // NOTE: CANCEL_ORDER
        case "cancel":
        case "exception":
        case "damage":
        case "lost": {
          updateData = { status: orderStatus };
          break;
        }
        // NOTE: RETURN_TO_SENDER
        case "returned": {
          updatedOrder = await strapi
            .service(ORDER_ROUTE)
            .updateReturnFeeOrder(order, {
              status: orderStatus,
              end_date: newDate,
              cash_on_delivery: 0,
            });
          break;
        }
        // NOTE: DELIVERY_SUCCESSFUL
        case "delivered": {
          if (payload.Type.toLowerCase() === "switch_status") {
            updateData = {
              status: orderStatus,
              end_date: newDate,
            };
          }
          break;
        }
        default:
          return;
      }
      // PartialReturnCode return tracking_id match /_PR$/ when GHN creates new order for partial order
      // IsPartialReturn === true when GHN created partial order and PartialReturnCode in payload will empty
      if (
        payload.PartialReturnCode !== "" &&
        payload.PartialReturnCode.match(/_PR$/) &&
        payload.Type.toLowerCase() === "switch_status"
      ) {
        const partialOrder = await strapi
          .service(ORDER_ROUTE)
          .createPartialOrder(order.id, payload.PartialReturnCode);
        logger.info("partialOrder", partialOrder);
      }
      if (payload.Type.toLowerCase() === "update_weight") {
        updatedOrder = await strapi
          .service(ORDER_ROUTE)
          .updateShipmentFeeOrder(order, {
            weight: (payload.ConvertedWeight ?? payload.Weight) / 1000,
          });
        if (updatedOrder) {
          const { message } = await strapi
            .service(TRACKING_ROUTE)
            .notifyToChannelSlack(order, updatedOrder);
          logger.info(message);
        }
      }
      const createdTracking = await strapi
        .service(TRACKING_ROUTE)
        .createTracking({
          tracking_id: payload.OrderCode,
          status: trackingStatus,
          weight:
            (payload.ConvertedWeight ?? payload.Weight) / 1000 || undefined,
          description: payload.Description + ". " + payload.Warehouse || "",
        });

      if (updateData) {
        updatedOrder = await strapi.service(ORDER_ROUTE).updateOrder(
          { id: order.id },
          {
            ...updateData,
          },
        );
      }
      logger.info("createdTracking for Ghn: ", createdTracking);
      logger.info("updatedOrder for Ghn: ", updatedOrder);
    } catch (error) {
      logger.error("Error: ", error);
      const { message } = await strapi
        .service(TRACKING_ROUTE)
        .notifyErrorTrackingToChannelSlack(
          "Error tracking from GHN: " + error.message,
          payload,
        );
      throw new ApplicationError(`${ERROR_GHN_ORDER_TRACKING}: ${error}`);
    }
  }

  parseOrder(fromData: any, srcData: any) {
    return {
      ...srcData,
      tracking_id: fromData.order_code,
      status: baseOrderStatus.PENDING_PICKUP,
      label: fromData.order_code,
    };
  }
}

class NinjaVanService implements CarrierService {
  private ORDERS_API_PATH = "orders";
  constructor() {
    /* TODO document why this constructor is empty */
  }
  transform(order: any) {
    // 1: Người bán/Người gửi.
    // 2: Người mua/Người nhận.
    const newOrder = {
      ...order,
      ...(order.custom || {}),
      ...(order.carrier_account.settings || {}),
    };
    return transformNinjaFormat(newOrder);
  }

  async getAccessToken({
    ninjavanUrl,
    ninjavanClientId,
    ninjavanClientSecret,
    ninjavanAccessToken,
  }: {
    ninjavanUrl: string;
    ninjavanClientId: string;
    ninjavanClientSecret: string;
    ninjavanAccessToken: boolean;
  }) {
    const logger = new Logger("getAccessToken").getLogger();
    try {
      const serverStore = strapi.store({
        environment: strapi.config.environment,
        type: "plugin",
        name: "order",
      });

      let authentication: any;
      const today = new Date();
      const sandboxAuth = await serverStore.get({ key: ninjavanAccessToken });

      if (
        sandboxAuth &&
        sandboxAuth.access_token &&
        moment(sandboxAuth.expires_in).isAfter(today)
      ) {
        logger.debug(
          "Access token is already existed",
          sandboxAuth.access_token,
        );
        authentication = sandboxAuth.access_token;
      } else {
        const response = await apiAxios({
          method: "post",
          url: `${ninjavanUrl}/2.0/oauth/access_token`,
          data: {
            client_id: ninjavanClientId,
            client_secret: ninjavanClientSecret,
            grant_type: "client_credentials",
          },
        });
        logger.debug("Requested new access token", response.data.access_token);
        await serverStore.set({
          key: ninjavanAccessToken,
          value: {
            access_token: response.data.access_token,
            expires_in: new Date(Date.now() + response.data.expires_in * 1000),
          },
        });

        authentication = response.data.access_token;
      }
      return authentication;
    } catch (error) {
      throw new ApplicationError(
        "Không thể lấy được Mã Truy cập (Access Token) đến NinjaVan",
        {
          ...error.response?.data,
        },
      );
    }
  }

  transformUrl(carrier_account: any) {
    const {
      api_url,
      account_name,
      encrypt_data: { CLIENT_ID, CLIENT_SECRET },
    } = carrier_account;
    const zone = process.env.NODE_ENV === "production" ? "vn" : "sg";
    const ninjavanUrl = `${api_url}/${zone}`;
    const ninjavanClientSecret = CLIENT_SECRET;
    const ninjavanClientId = CLIENT_ID;
    const ninjavanAccessToken = account_name;
    return {
      ninjavanUrl,
      ninjavanClientSecret,
      ninjavanClientId,
      ninjavanAccessToken,
    };
  }

  async sendOrder(order: any) {
    const logger = new Logger("sendOrder").getLogger();
    try {
      const transformedNinjavanUrl = this.transformUrl(order.carrier_account);
      const access_token = await this.getAccessToken(transformedNinjavanUrl);
      const transformedOrder = this.transform(order);

      logger.debug("Data before sending order to NinjaVan: ", transformedOrder);
      const ninjaOrder = await apiAxios({
        method: "post",
        url: `${transformedNinjavanUrl.ninjavanUrl}/4.1/${this.ORDERS_API_PATH}`,
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
        data: transformedOrder,
      });
      logger.debug(
        "Response after sending order to NinjaVan: ",
        ninjaOrder.data,
      );
      return ninjaOrder;
    } catch (error) {
      logger.error("Error", { ...error.response?.data });
      const { statusCode, message } = transformHttpError(error);
      throw new ApplicationError(
        `${ERROR_NINJAVAN_ORDER_CREATION}: ${message.toLowerCase()}`,
        {
          ...error.response?.data,
        },
      );
    }
  }

  async cancelOrder(tracking_number: string) {
    const logger = new Logger("cancelOrder").getLogger();
    try {
      const order = await strapi
        .service(ORDER_ROUTE)
        .findOrderByTrackingId(tracking_number);

      const carrier_account = await strapi
        .service(CARRIER_ACCOUNT_ROUTE)
        .findCarrierAccountByName(order.carrier_account.account_name);

      const transformedNinjavanUrl = this.transformUrl(carrier_account);
      const access_token = await this.getAccessToken(transformedNinjavanUrl);

      const response = await apiAxios({
        method: "delete",
        url: `${transformedNinjavanUrl.ninjavanUrl}/2.2/${this.ORDERS_API_PATH}/${tracking_number}`,
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
      logger.debug("Cancel Ninjavan order: ", response.data);
      return response;
    } catch (error) {
      logger.error("Error", { ...error?.response?.data });
      const { statusCode, message } = transformHttpError(error);
      throw new ApplicationError(
        `${ERROR_NINJAVAN_ORDER_CANCEL}: ${message.toLowerCase()}`,
        {
          ...error.response?.data,
        },
      );
    }
  }

  async trackingOrder(payload: any) {
    const logger = new Logger("trackingOrder").getLogger();
    try {
      const { orderStatus, trackingStatus } = mappingNinjaOrderStatus(
        payload.status,
      );
      if (!orderStatus && !trackingStatus) {
        logger.error(
          "Không tìm thấy trạng thái theo dõi cho Ninjavan.",
          payload,
        );
        return;
      }
      let newWeight = undefined;
      const newDate = moment(new Date()).format("YYYY-MM-DDTHH:mm:ss.SSSZ");
      const order = await strapi
        .service(ORDER_ROUTE)
        .findOrderByTrackingId(payload.tracking_id);
      const { errors, isValid } = checkTrackingOrder(order);
      if (!isValid) {
        logger.error(errors, payload);
        return;
      }

      let updateData = null;
      let createTracking = true;
      let updatedOrder = null;
      // NOTE: 20 status (removed 2 status not use) for NINJAVAN
      switch (payload.status) {
        // NOTE: PENDING_PICKUP
        case "Pending Pickup":
        case "Pickup Fail":
        case "Van en-route to pickup": {
          // NOTE: don't need to update order status because default when creating new order is pending
          break;
        }
        // NOTE: GOODS_IN_TRANSIT
        case "En-route to Sorting Hub":
        case "Arrived at Sorting Hub":
        case "Arrived at Origin Hub":
        case "Successful Pickup":
        case "Transferred to 3PL":
        case "On Vehicle for Delivery":
        case "Staging":
        case "Arrived at Distribution Point":
        // NOTE: DELIVERY_FAILED
        case "Pending Reschedule":
        case "First Attempt Delivery Fail":
        // NOTE: RETURN_TO_SENDER
        case "Returned to Sender Triggered":
        // NOTE: CANCEL_ORDER
        case "Cancelled": {
          updateData = { status: orderStatus };
          break;
        }
        // NOTE: GOODS_IN_TRANSIT
        case "Parcel Weight":
        case "Parcel Measurements Update": {
          newWeight = payload.new_weight
            ? payload.new_weight
            : payload.new_measurements.measured_weight;

          updatedOrder = await strapi
            .service(ORDER_ROUTE)
            .updateShipmentFeeOrder(order, {
              weight: newWeight,
            });
          if (updatedOrder) {
            const { message } = await strapi
              .service(TRACKING_ROUTE)
              .notifyToChannelSlack(order, updatedOrder);
            logger.info(message);
          } else {
            createTracking = false;
          }
          break;
        }
        // NOTE: RETURN_TO_SENDER
        case "Returned to Sender": {
          updatedOrder = await strapi
            .service(ORDER_ROUTE)
            .updateReturnFeeOrder(order, {
              status: orderStatus,
              end_date: newDate,
              cash_on_delivery: 0,
            });
          break;
        }
        // NOTE: DELIVERY_SUCCESSFUL
        case "Successful Delivery":
        case "Completed": {
          updateData = {
            status: orderStatus,
            end_date: newDate,
          };
          break;
        }
        default:
          return;
      }
      if (createTracking) {
        const createdTracking = await strapi
          .service(TRACKING_ROUTE)
          .createTracking({
            tracking_id: payload.tracking_id,
            status: trackingStatus,
            weight: newWeight,
            description: payload.comments || "",
          });

        logger.info("createdTracking for NinjaVan: ", createdTracking);

        if (updateData) {
          updatedOrder = await strapi.service(ORDER_ROUTE).updateOrder(
            { id: order.id },
            {
              ...updateData,
            },
          );
        }
      }
      logger.info("updatedOrder for NinjaVan", updatedOrder);
    } catch (error) {
      logger.error("Error: ", error);
      const { message } = await strapi
        .service(TRACKING_ROUTE)
        .notifyErrorTrackingToChannelSlack(
          "Error tracking from Ninjavan: " + error.message,
          payload,
        );
      throw new ApplicationError(`${ERROR_NINJAVAN_ORDER_TRACKING}: ${error}`);
    }
  }

  parseOrder(fromData: any, srcData: any) {
    return {
      ...srcData,
      tracking_id: fromData.tracking_number,
      status: baseOrderStatus.PENDING_PICKUP,
      label: fromData.tracking_number,
    };
  }
}

class GHTKService implements CarrierService {
  private ORDERS_API_PATH = "order";
  private SERVICES_API_PATH = "services/shipment";
  private GHTK_WEIGHT: number = 20;
  constructor() {
    /* TODO document why this constructor is empty */
  }

  transform(order: any) {
    order["3pl"] = order.weight < this.GHTK_WEIGHT ? 0 : 1;
    // 1: Người bán/Người gửi.
    // 2: Người mua/Người nhận.
    // order.is_freeship = order.payment_type_id === 2 ? 0 : 1;
    const new_parcel_value =
      order.parcel_value < 1000000 ? 900000 : order.parcel_value;
    const newOrder = {
      ...order,
      ...(order.custom || {}),
      parcel_value: new_parcel_value,
    };
    return transformGHTKFormat(newOrder);
  }

  transformUrl(carrier_account: any) {
    const {
      api_url,
      encrypt_data: { TOKEN_ID },
    } = carrier_account;

    return { ghtkUrl: api_url, ghtkTokenId: TOKEN_ID };
  }

  parseOrder(fromData: any, srcData: any) {
    return {
      ...srcData,
      tracking_id:
        fromData.order.label.match(/\d{10}$/)?.[0] ||
        fromData.order.tracking_id,
      status: baseOrderStatus.PENDING_PICKUP,
      label: fromData.order.label || fromData.order.tracking_id,
    };
  }

  async sendOrder(order: any) {
    const logger = new Logger("sendOrder").getLogger();
    try {
      const { ghtkUrl, ghtkTokenId } = this.transformUrl(order.carrier_account);
      const transformedOrder = this.transform(order);
      logger.debug("Data before sending order to Ghtk: ", transformedOrder);
      const ghtkOrder = await apiAxios({
        method: "post",
        url: `${ghtkUrl}/${this.SERVICES_API_PATH}/${this.ORDERS_API_PATH}?ver=1.6.3`,
        headers: { Token: `${ghtkTokenId}` },
        data: transformedOrder,
      });

      if (ghtkOrder.data.success === false || ghtkOrder.data.error) {
        throw new ApplicationError(`${ERROR_GHTK_ORDER_CREATION}`, {
          ...ghtkOrder.data,
        });
      }
      logger.debug("Response after sending order to Ghtk: ", ghtkOrder.data);
      return ghtkOrder;
    } catch (error) {
      logger.error("Error", { ...error.response?.data, ...error.details });
      const { statusCode, message } = transformHttpError(error);
      throw new ApplicationError(
        `${ERROR_GHTK_ORDER_CREATION}: ${message.toLowerCase()}`,
        {
          ...error.response?.data,
          ...error.details,
        },
      );
    }
  }

  async trackingOrder(payload: any) {
    const logger = new Logger("trackingOrder").getLogger();
    try {
      const { orderStatus, trackingStatus } = mappingGHTKOrderStatus(
        payload.status_id,
      );
      if (!orderStatus && !trackingStatus) {
        logger.error("Không tìm thấy trạng thái theo dõi cho GHTK.", payload);
        return;
      }
      const newDate = moment(new Date()).format("YYYY-MM-DDTHH:mm:ss.SSSZ");
      const order = await strapi
        .service(ORDER_ROUTE)
        .findOrderGhtkByLabel(payload.label_id);

      let updatedOrder = null;
      let updateData = null;
      // status_id: 123, 127, 128, 45, 49, 410 just for inform from shipper
      switch (payload.status_id) {
        // NOTE: PENDING_PICKUP
        case 1:
        case 2:
        case 7:
        case 8:
        // case 127:
        // case 128:
        case 12: {
          break;
        }
        // NOTE: GOODS_IN_TRANSIT
        case 3:
        case 4:
        // case 123:
        case 20:
        // NOTE: CANCEL_ORDER
        case -1:
        case 13:
        // NOTE: DELIVERY_SUCCESSFUL
        // case 45:
        case 11:
        // NOTE: DELIVERY_FAILED
        // case 49:
        // case 410:
        case 9:
        case 10: {
          updateData = { status: orderStatus };
          break;
        }
        // NOTE: DELIVERY_SUCCESSFUL
        case 5: {
          // Đã giao hàng/Chưa đối soát thì không update end_date
          let returnPartPackageData = {};
          if (payload.return_part_package === 1) {
            returnPartPackageData = {
              return_fee: 0.5 * order.shipment_fee,
              is_partial_returned: true,
            };
          }
          updateData = {
            status: orderStatus,
            end_date: newDate,
            ...returnPartPackageData,
          };
          break;
        }
        case 6: {
          // Đã giao hàng/Đã đối soát thì update end_date
          let returnPartPackageData = {};
          if (payload.return_part_package === 1) {
            returnPartPackageData = {
              return_fee: 0.5 * order.shipment_fee,
              is_partial_returned: true,
            };
          }
          updateData = {
            status: orderStatus,
            ...returnPartPackageData,
          };
          break;
        }
        // NOTE: RETURN_TO_SENDER
        case 21: {
          updatedOrder = await strapi
            .service(ORDER_ROUTE)
            .updateReturnFeeOrder(order, {
              status: orderStatus,
              end_date: newDate,
              cash_on_delivery: 0,
            });
          break;
        }
        default:
          return;
      }

      if (payload.weight > 0) {
        updatedOrder = await strapi
          .service(ORDER_ROUTE)
          .updateShipmentFeeOrder(order, {
            weight: payload.weight,
          });

        if (updatedOrder) {
          const { message } = await strapi
            .service(TRACKING_ROUTE)
            .notifyToChannelSlack(order, updatedOrder);
          logger.info(message);
        }
      }

      let description = payload.reason || "";
      let label = order.label;
      if (payload.label_id !== order.label) {
        label = payload.label_id;
        description += `\nLabel thay đổi: ${order.label} -> ${payload.label_id}`;
      }

      const createdTracking = await strapi
        .service(TRACKING_ROUTE)
        .createTracking({
          tracking_id:
            payload.label_id.match(/\d{10}$/)?.[0] || order.tracking_id,
          status: trackingStatus,
          weight: payload.weight || undefined,
          description: description,
        });

      if (updateData) {
        updatedOrder = await strapi.service(ORDER_ROUTE).updateOrder(
          { id: order.id },
          {
            ...updateData,
            label: label,
          },
        );
      }
      logger.info("createdTracking for Ghtk: ", createdTracking);
      logger.info("updatedOrder for Ghtk: ", updatedOrder);
    } catch (error) {
      logger.error("Error", { ...error.response?.data });
      const { message } = await strapi
        .service(TRACKING_ROUTE)
        .notifyErrorTrackingToChannelSlack(
          "Error tracking from Ghtk: " + error.message,
          payload,
        );
      throw new ApplicationError(`${ERROR_GHTK_ORDER_TRACKING}: ${error}`);
    }
  }

  async cancelOrder(tracking_number: string) {
    const logger = new Logger("cancelOrder").getLogger();
    try {
      const order = await strapi
        .service(ORDER_ROUTE)
        .findOrderByTrackingId(tracking_number);
      const carrier_account = await strapi
        .service(CARRIER_ACCOUNT_ROUTE)
        .findCarrierAccountByName(order.carrier_account.account_name);
      const { ghtkUrl, ghtkTokenId } = this.transformUrl(carrier_account);
      const response = await apiAxios({
        method: "post",
        url: `${ghtkUrl}/${this.SERVICES_API_PATH}/cancel/${tracking_number}`,
        headers: { Token: `${ghtkTokenId}` },
      });
      logger.debug("Cancel Ghtk order: ", response.data);
      return response;
    } catch (error) {
      logger.error("Error", { ...error.response?.data });
      const { statusCode, message } = transformHttpError(error);
      throw new ApplicationError(
        `${ERROR_GHTK_ORDER_CANCEL}: ${message.toLowerCase()}`,
        {
          ...error.response?.data,
        },
      );
    }
  }
}

class CarrierServiceAdapter {
  private service: CarrierService;
  constructor(service: CarrierService) {
    this.service = service;
  }

  async createOrder(order: any) {
    const receivedOrder = await this.service.sendOrder(order);
    return this.service.parseOrder(receivedOrder.data, order);
  }

  async cancelOrder(tracking_number: string) {
    return await this.service.cancelOrder(tracking_number);
  }

  async trackingOrder(payload: any) {
    return await this.service.trackingOrder(payload);
  }
}

// export multiple services
export const Ninja = new CarrierServiceAdapter(new NinjaVanService());
export const Ghn = new CarrierServiceAdapter(new GHNService());
export const Ghtk = new CarrierServiceAdapter(new GHTKService());
