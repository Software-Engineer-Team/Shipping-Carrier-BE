/**
 * order service
 */

import { factories } from "@strapi/strapi";
import { Ghtk, Ghn, Ninja } from "./carrier-services";
const { ApplicationError, NotFoundError } = require("@strapi/utils").errors;
import { baseOrderStatus, carrierType, setQueryOrder } from "./utils";
import { handleWorkerOrders, initWorkerOptions } from "./order-queue-service";
import { ORDER_ROUTE } from "../../../helper/constants";
import { ConsumerService } from "../../../helper/queues/consumer";
import { ProducerService } from "../../../helper/queues/producer";
import { Logger } from "../../../helper/logger/logger";
import {
  calculateShipmentFee,
  getPriceItem,
  getPriceStrategies,
  transformOrderPayment,
} from "./order-services";
import { findAll } from "../../../helper/apiHelper";
export default factories.createCoreService(ORDER_ROUTE, {
  async createManyOrders(
    orders: any[],
    creator: number,
    customer: number,
    carrier_type: string,
  ) {
    const consumerService = new ConsumerService(carrier_type);

    consumerService.init(
      handleWorkerOrders,
      initWorkerOptions(carrier_type, { maxStalledCount: 0 }),
    );

    const producerService = new ProducerService(carrier_type);
    await producerService.addJobs(
      orders.map((order) => {
        return {
          ...order,
          carrier: carrier_type,
          customer,
          creator,
        };
      }),
      {
        removeOnComplete: true,
        removeOnFail: true,
      },
    );
    await producerService.closeJobQueue();

    return {
      message: "Các đơn hàng đang được xử lý.",
    };
  },

  async createOrder(order: any, carrier_type: string) {
    const logger = new Logger("createOrder").getLogger();
    let createdOrder = null;
    order = await transformOrderPayment(order, carrier_type);
    if (carrier_type === carrierType.NINJAVAN) {
      createdOrder = await Ninja.createOrder(order);
    } else if (carrier_type === carrierType.GHN) {
      createdOrder = await Ghn.createOrder(order);
    } else if (carrier_type === carrierType.GHTK) {
      createdOrder = await Ghtk.createOrder(order);
    } else {
      throw new NotFoundError("Đơn vị vận chuyển không tồn tại.");
    }
    logger.info("createdOrder: ", createdOrder);

    return await this.createBaseOrder(createdOrder);
  },

  async createPartialOrder(orderId: number, trackingId?: string | null) {
    const logger = new Logger("createPartialOrder").getLogger();
    const oldOrder = await strapi.service(ORDER_ROUTE).findOrderById(orderId);
    if (oldOrder.is_partial_returned) {
      throw new ApplicationError("Đơn hàng đã được tạo một phần.");
    }
    let newTrackingId = oldOrder.tracking_id;
    if (oldOrder.carrier.name === carrierType.GHN) {
      if (trackingId) newTrackingId = trackingId;
      else newTrackingId += "_PR";
    } else if (oldOrder.carrier.name === carrierType.NINJAVAN) {
      newTrackingId += "R";
    } else if (oldOrder.carrier.name === carrierType.GHTK) {
      throw new ApplicationError(
        "Không thể tạo đơn hoàn về một phần cho GHTK.",
      );
    }
    const updatedOldOrder = await strapi
      .service(ORDER_ROUTE)
      .updateOrder({ id: oldOrder.id }, { is_partial_returned: true });
    logger.info("updatedOldOrder", updatedOldOrder);

    const newOrder = {
      to_name: oldOrder.from_name,
      to_phone_number: oldOrder.from_phone_number,
      to_province: oldOrder.from_province,
      to_province_code: oldOrder.from_province_code,
      to_district: oldOrder.from_district,
      to_district_code: oldOrder.from_district_code,
      to_ward: oldOrder.from_ward,
      to_ward_code: oldOrder.from_ward_code,
      to_address: oldOrder.from_address,
      from_province: oldOrder.to_province,
      from_province_code: oldOrder.to_province_code,
      from_district: oldOrder.to_district,
      from_district_code: oldOrder.to_district_code,
      from_ward: oldOrder.to_ward,
      from_ward_code: oldOrder.to_ward_code,
      from_address: oldOrder.to_address,
      from_name: oldOrder.to_name,
      from_phone_number: oldOrder.to_phone_number,
      product_name: oldOrder.product_name,
      carrier: oldOrder.carrier.id,
      customer: oldOrder.customer.id,
      payment_type_id: 1,
      parcel_value: 0,
      cash_on_delivery: 0,
      weight: 0,
      has_insurance: false,
      insurance_fee: 0,
      shipment_fee: 0,
      other_fee: 0,
      return_fee: 0,
      change_fee: 0,
      price_sheet: oldOrder.price_sheet.id,
      carrier_account: oldOrder.carrier_account,
      tracking_id: newTrackingId,
      delivery_instructions: "",
      merchant_order_number: oldOrder.merchant_order_number,
      status: baseOrderStatus.PENDING_PICKUP,
      is_partial_returned: true,
    };
    return await this.createBaseOrder(newOrder);
  },

  async findOrderById(orderId: number) {
    const order = await strapi.entityService.findOne(ORDER_ROUTE, orderId, {
      populate: {
        customer: {
          fields: ["id", "username", "email"],
          populate: {
            sale: {
              fields: ["id", "username", "email"],
            },
          },
        },
        carrier: true,
        price_sheet: {
          fields: ["id"],
        },
      },
    });
    if (!order) {
      throw new NotFoundError("Không tìm thấy đơn hàng.");
    }
    if (order.deleted) {
      throw new ApplicationError("Đơn hàng đã bị xoá.");
    }
    return order;
  },

  async findOrder(condition: any) {
    const order = await strapi.query(ORDER_ROUTE).findOne({
      where: {
        ...condition,
      },
      populate: {
        customer: {
          select: ["username", "id", "email"],
          populate: {
            sale: {
              select: ["username", "id", "email"],
            },
          },
        },
        carrier: true,
      },
    });
    if (!order) {
      throw new NotFoundError(`Đơn hàng không tồn tại.`, { ...condition });
    }
    if (order.deleted) {
      throw new ApplicationError(`Đơn hàng đã bị xoá.`, { ...condition });
    }
    return order;
  },

  async findOrderByTrackingId(trackingId: string) {
    const order = await strapi.query(ORDER_ROUTE).findOne({
      where: {
        tracking_id: trackingId,
      },
      populate: {
        customer: {
          populate: {
            sale: true,
          },
        },
        carrier: true,
        price_sheet: {
          populate: {
            carrier: {
              select: ["name"],
            },
            price_items: {
              populate: {
                carrier_account: true,
                zone_pick: true,
              },
            },
          },
        },
      },
    });
    if (!order) {
      throw new NotFoundError(`Đơn hàng ${trackingId} không tồn tại.`);
    }
    if (order.deleted) {
      throw new ApplicationError(`Đơn hàng ${trackingId} đã bị xoá.`);
    }
    return order;
  },

  // special case due to tracking_id change
  // S22289654.BO.MT18-01-N51.1126584685
  async findOrderGhtkByLabel(label: string) {
    const order = await strapi.query(ORDER_ROUTE).findOne({
      where: {
        tracking_id: {
          $containsi: label.match(/\d{10}$/)?.[0],
        },
      },
      populate: {
        customer: {
          populate: {
            sale: true,
          },
        },
        carrier: true,
        price_sheet: {
          populate: {
            carrier: {
              select: ["name"],
            },
            price_items: {
              populate: {
                carrier_account: true,
                zone_pick: true,
              },
            },
          },
        },
      },
    });
    if (!order) {
      throw new NotFoundError(`Đơn hàng ${label} không tồn tại.`);
    }
    if (order.deleted) {
      throw new ApplicationError(`Đơn hàng ${label} đã bị xoá.`);
    }
    return order;
  },

  async checkReconciledOrderByTrackingId(trackingId: string) {
    const order = await strapi.query(ORDER_ROUTE).findOne({
      where: {
        tracking_id: trackingId,
      },
    });
    if (!order) {
      throw new NotFoundError(`Đơn hàng ${trackingId} không tồn tại.`);
    }
    if (order.is_reconciled) {
      throw new ApplicationError(
        `Đơn hàng ${order.tracking_id} đã được đối soát.`,
      );
    }
    return order;
  },

  async deleteOrder(orderId: number) {
    const order = await strapi.service(ORDER_ROUTE).findOrderById(orderId);

    await strapi
      .service(ORDER_ROUTE)
      .deleteCarrierOrder(order.tracking_id, order.carrier.name);

    return await strapi.entityService.update(ORDER_ROUTE, orderId, {
      data: { status: "Đơn hàng hủy" },
    });
  },

  async deleteCarrierOrder(tracking_id: string, carrier_type: string) {
    let deletedOrder = null;
    if (carrier_type === carrierType.NINJAVAN) {
      deletedOrder = await Ninja.cancelOrder(tracking_id);
    } else if (carrier_type === carrierType.GHN) {
      deletedOrder = await Ghn.cancelOrder(tracking_id);
    } else if (carrier_type === carrierType.GHTK) {
      deletedOrder = await Ghtk.cancelOrder(tracking_id);
    } else {
      throw new NotFoundError("Đơn vị vận chuyển không tồn tại.");
    }
    return deletedOrder;
  },

  async updateReturnFeeOrder(order: any, data: any) {
    const logger = new Logger("updateReturnFeeOrder").getLogger();
    try {
      const {
        id,
        price_sheet: { price_items },
        from_province_code,
        to_province_code,
        weight,
        carrier,
      } = order;

      const price_item = await getPriceItem(
        price_items,
        from_province_code,
        to_province_code,
        weight,
        carrier.id,
      );

      let new_return_fee = getPriceStrategies["calculateReturnFee"](
        price_item,
        weight,
      );

      return await strapi.service(ORDER_ROUTE).updateOrder(
        { id },
        {
          return_fee: new_return_fee,
          ...data,
        },
      );
    } catch (error) {
      logger.error("Error: ", error);
      return null;
    }
  },

  async updateShipmentFeeOrder(order: any, data: any) {
    try {
      const logger = new Logger(
        "updateShipmentFeeOrderByTrackingId",
      ).getLogger();
      const {
        id,
        parcel_value,
        price_sheet: { price_items },
        from_province_code,
        to_province_code,
        weight,
        has_insurance,
        carrier,
        shipment_fee,
      } = order;
      if (data.weight > weight) {
        let new_shipment_fee = await calculateShipmentFee(
          parcel_value,
          price_items,
          from_province_code,
          to_province_code,
          data.weight,
          has_insurance,
          carrier.id,
        );
        if (!new_shipment_fee) new_shipment_fee = shipment_fee;
        return await strapi.service(ORDER_ROUTE).updateOrder(
          { id },
          {
            shipment_fee: new_shipment_fee,
            ...data,
          },
        );
      }
      return null;
    } catch (error) {
      console.log(error);
      return null;
    }
  },

  async updateOrder(condition: any, data: any) {
    return await strapi.db.query(ORDER_ROUTE).update({
      where: {
        ...condition,
      },
      data,
    });
  },

  async createBaseOrder(transformedData: any) {
    const logger = new Logger("createBaseOrder").getLogger();
    logger.debug("transformedData: ", transformedData);
    const newOrder = await strapi.db.query(ORDER_ROUTE).create({
      data: {
        ...transformedData,
        end_date: null,
        initial_weight: transformedData.weight,
      },
    });
    return newOrder;
  },

  async findOrdersByTrackingIds(trackingIds: string[] | number[]) {
    const orders = await strapi.entityService.findMany(ORDER_ROUTE, {
      filters: {
        tracking_id: {
          $in: trackingIds,
        },
      },
      populate: {
        customer: {
          fields: ["username", "email"],
          populate: {
            sale: {
              fields: ["username", "email"],
            },
          },
        },
        carrier: true,
        price_sheet: {
          populate: {
            carrier: {
              fields: ["name"],
            },
            price_items: {
              populate: {
                carrier_account: true,
                zone_pick: true,
              },
            },
          },
        },
      },
    });
    return orders;
  },

  async findManyOrders(ctx: any) {
    return await findAll(ORDER_ROUTE, ctx, setQueryOrder);
  },
});
