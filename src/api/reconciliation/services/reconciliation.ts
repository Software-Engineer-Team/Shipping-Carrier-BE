/**
 * reconciliation service
 */

import { factories } from "@strapi/strapi";
import {
  parseStatus,
  setQueryReconciliation,
  transferSystemOrderFields,
} from "./utils";
import {
  ORDER_ROUTE,
  RECONCILIATION_ORDER_ROUTE,
  RECONCILIATION_ROUTE,
} from "../../../helper/constants";
import moment from "moment";
import { Logger } from "../../../helper/logger/logger";
import { groupSystemOrdersByCustomer } from "../../reconciliation-order/services/utils";
import { findAll } from "../../../helper/apiHelper";
const { NotFoundError, ApplicationError } = require("@strapi/utils").errors;

export default factories.createCoreService(RECONCILIATION_ROUTE, {
  async findReconciliationById(reconciliationId: number) {
    const reconciliation = await strapi.entityService.findOne(
      RECONCILIATION_ROUTE,
      reconciliationId,
      {
        populate: {
          reconciliation_orders: {
            populate: {
              carrier: true,
            },
          },
          customer: {
            fields: ["id", "username", "email"],
            populate: {
              sale: {
                fields: ["id", "username", "email"],
              },
            },
          },
        },
      },
    );
    if (!reconciliation) {
      throw new NotFoundError("Không tìm thấy phiên đối soát.");
    }
    return reconciliation;
  },

  async findOneReconciliation(
    customer: number,
    status: string,
    createdDate: any,
  ) {
    return await strapi.query(RECONCILIATION_ROUTE).findOne({
      where: {
        customer,
        status,
        createdAt: createdDate,
      },
      populate: {
        reconciliation_orders: {
          populate: {
            carrier: true,
          },
        },
        customer: {
          fields: ["id", "username", "email"],
          populate: {
            sale: {
              fields: ["id", "username", "email"],
            },
          },
        },
      },
    });
  },

  async createReconciliation(rOrders: any[], data: any) {
    const logger = new Logger("createReconciliation").getLogger();
    const recon = await strapi.entityService.create(RECONCILIATION_ROUTE, {
      data: { ...data, reconciliation_orders: rOrders.map((rO) => rO.id) },
      populate: {
        reconciliation_orders: {
          populate: {
            carrier: true,
          },
        },
        customer: {
          fields: ["id", "username", "email"],
          populate: {
            sale: {
              fields: ["id", "username", "email"],
            },
          },
        },
      },
    });
    logger.info("reconciliation: ", recon);

    return { data: { ...recon } };
  },
  async createReconciliations(recon_orders: any[]) {
    const logger = new Logger("createReconciliations").getLogger();
    const systemReconOrders = await strapi
      .service(RECONCILIATION_ORDER_ROUTE)
      .findReconciliationOrdersByIds(
        recon_orders.map((order: any) => order.id),
      );
    const trackingIds = systemReconOrders.map((sRO) => sRO.tracking_id);
    const systemOrders = await strapi
      .service(ORDER_ROUTE)
      .findOrdersByTrackingIds(trackingIds);

    const reconciliations = await groupSystemOrdersByCustomer(
      systemReconOrders,
      systemOrders,
    );

    return await Promise.all(
      reconciliations.map(async ({ reconciliation_orders, customer }) => {
        return await strapi
          .service(RECONCILIATION_ROUTE)
          .createReconciliation(reconciliation_orders, {
            customer,
            status: "pending",
          });
      }),
    );
  },

  async updateReconOrders(reconciliationOrders: any[]) {
    const logger = new Logger("updateReconOrders").getLogger();
    const trackingIds = reconciliationOrders.map((sRO) => sRO.tracking_id);
    const systemOrders = await strapi
      .service(ORDER_ROUTE)
      .findOrdersByTrackingIds(trackingIds);

    return await Promise.all(
      reconciliationOrders.map(async (reconciliationOrder: any) => {
        const order = systemOrders.find(
          (so: any) => so.tracking_id === reconciliationOrder.tracking_id,
        );

        let newWeight = order.weight;

        // Update weight from reconciliations to BSS orders system
        if (reconciliationOrder.weight >= order.weight) {
          newWeight = reconciliationOrder.weight;
        }
        // Update weight from BSS orders system to reconciliations
        else if (reconciliationOrder.weight < order.weight) {
          newWeight = order.weight;
        }

        const transferSystemOrderData = await transferSystemOrderFields(
          newWeight,
          reconciliationOrder.status,
          order,
        );

        const updatedOrder = await strapi.service(ORDER_ROUTE).updateOrder(
          { id: order.id },
          {
            weight: transferSystemOrderData.weight,
            shipment_fee: transferSystemOrderData.shipment_fee,
            return_fee: transferSystemOrderData.return_fee,
            status: parseStatus(reconciliationOrder.status),
            cash_on_delivery: transferSystemOrderData.cash_on_delivery,
            is_reconciled: true,
            end_date: reconciliationOrder.end_date,
          },
        );
        logger.info("updatedOrder", updatedOrder);
        return await strapi.entityService.update(
          RECONCILIATION_ORDER_ROUTE,
          reconciliationOrder.id,
          {
            data: {
              ...reconciliationOrder,
              weight: newWeight,
              system_shipment_fee: transferSystemOrderData.shipment_fee ?? 0,
              system_return_fee: transferSystemOrderData.return_fee ?? 0,
              system_insurance_fee: transferSystemOrderData.insurance_fee ?? 0,
              system_cash_on_delivery:
                transferSystemOrderData.cash_on_delivery ?? 0,
              system_other_fee: transferSystemOrderData.other_fee ?? 0,
              system_change_fee: transferSystemOrderData.change_fee ?? 0,
              payment_type_id: transferSystemOrderData.payment_type_id,
              is_partial_returned: transferSystemOrderData.is_partial_returned,
            },
          },
        );
      }),
    );
  },

  async updateReconciliationById(reconciliationId: number, data: any) {
    return await strapi.entityService.update(
      RECONCILIATION_ROUTE,
      reconciliationId,
      {
        data,
        populate: {
          reconciliation_orders: true,
          carrier: true,
        },
      },
    );
  },

  async confirmReconciliation(reconciliationId: number) {
    const reconciliation = await strapi
      .service(RECONCILIATION_ROUTE)
      .findReconciliationById(reconciliationId);

    if (reconciliation.status === "completed") {
      throw new ApplicationError(
        "Không thể xác thực cho phiên đã được đối soát.",
      );
    }

    if (reconciliation.status === "cancelled") {
      throw new ApplicationError(
        "Không thể xác thực cho phiên đối soát đã bị huỷ.",
      );
    }

    const newReconciliationOrders = await strapi
      .service(RECONCILIATION_ROUTE)
      .updateReconOrders(reconciliation.reconciliation_orders);
    return await strapi
      .service(RECONCILIATION_ROUTE)
      .updateReconciliationById(reconciliationId, {
        status: "completed",
        updatedAt: new Date(),
      });
  },

  async cancelReconciliation(reconciliationId: number) {
    const reconciliation = await strapi
      .service(RECONCILIATION_ROUTE)
      .findReconciliationById(reconciliationId);

    if (reconciliation.status === "cancelled") {
      throw new ApplicationError("Không thể huỷ phiên đối soát đã bị huỷ.");
    }
    if (reconciliation.status === "completed") {
      throw new ApplicationError(
        "Không thể huỷ phiên đối soát đã được đối soát.",
      );
    }

    return await strapi
      .service(RECONCILIATION_ROUTE)
      .updateReconciliationById(reconciliationId, {
        status: "cancelled",
        updatedAt: new Date(),
      });
  },

  async getReconciliations(ctx: any) {
    return await findAll(RECONCILIATION_ROUTE, ctx, setQueryReconciliation);
  },
});
