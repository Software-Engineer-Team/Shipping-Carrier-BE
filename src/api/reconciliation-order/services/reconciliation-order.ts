/**
 * reconciliation-order service
 */

import { factories } from "@strapi/strapi";
import {
  ORDER_ROUTE,
  RECONCILIATION_ORDER_ROUTE,
} from "../../../helper/constants";
import {
  groupSystemOrdersByCustomer,
  setQueryGroupReconciliationOrders,
  setQueryReconciliationOrders,
} from "./utils";
import { findAll } from "../../../helper/apiHelper";
const { NotFoundError, ApplicationError } = require("@strapi/utils").errors;

export default factories.createCoreService(RECONCILIATION_ORDER_ROUTE, {
  async findReconOrdersByTrackingIds(trackingIds: any[]) {
    return await strapi.entityService.findMany(RECONCILIATION_ORDER_ROUTE, {
      filters: {
        tracking_id: {
          $in: trackingIds,
        },
      },
      populate: {
        reconciliation: true,
      },
    });
  },
  async findReconciliationOrderById(rOrderId: number) {
    const rOrder = await strapi.entityService.findOne(
      RECONCILIATION_ORDER_ROUTE,
      rOrderId,
      {
        populate: {
          carrier: true,
        },
      },
    );
    if (!rOrder) {
      throw new NotFoundError(`Đơn đối soát ${rOrderId} không được tìm thấy.`);
    }
    return rOrder;
  },

  async createOneReconciliationOrder(data: any) {
    return await strapi.entityService.create(RECONCILIATION_ORDER_ROUTE, {
      data,
      populate: {
        carrier: true,
      },
    });
  },

  async createReconciliationOrders(rOrders: any[]) {
    const createdReconOrders = await Promise.all(
      rOrders.map(async (rOrder: any) => {
        return await strapi
          .service(RECONCILIATION_ORDER_ROUTE)
          .createOneReconciliationOrder(rOrder);
      }),
    );
    return createdReconOrders;
  },

  async groupReconOrdersByCustomer(ctx: any) {
    const { results: systemReconOrders, pagination } = await findAll(
      RECONCILIATION_ORDER_ROUTE,
      ctx,
      setQueryGroupReconciliationOrders,
    );

    const trackingIds = systemReconOrders.map((sRO) => sRO.tracking_id);
    const systemOrders = await strapi
      .service(ORDER_ROUTE)
      .findOrdersByTrackingIds(trackingIds);
    return {
      results: groupSystemOrdersByCustomer(systemReconOrders, systemOrders),
      pagination,
    };
  },

  async getReconciliationOrders(ctx: any) {
    return await findAll(
      RECONCILIATION_ORDER_ROUTE,
      ctx,
      setQueryReconciliationOrders,
    );
  },

  async findReconciliationOrdersByIds(ids: any[]) {
    return await strapi.entityService.findMany(RECONCILIATION_ORDER_ROUTE, {
      filters: {
        id: {
          $in: ids,
        },
      },
    });
  },

  async updateReconOrder(condition: any, data: any) {
    const {
      tracking_id,
      system_cash_on_delivery,
      system_shipment_fee,
      system_insurance_fee,
      system_return_fee,
      system_change_fee,
      system_other_fee,
      partner_cash_on_delivery,
      partner_shipment_fee,
      partner_insurance_fee,
      partner_return_fee,
      partner_other_fee,
      partner_change_fee,
      payment_type_id,
      weight,
      status,
      enable_modify_order,
    } = data;

    if (enable_modify_order) {
      const updatedOrder = await strapi.service(ORDER_ROUTE).updateOrder(
        { tracking_id: tracking_id },
        {
          cash_on_delivery: system_cash_on_delivery,
          shipment_fee: system_shipment_fee,
          insurance_fee: system_insurance_fee,
          return_fee: system_return_fee,
          change_fee: system_change_fee,
          other_fee: system_other_fee,
          payment_type_id,
          weight,
        },
      );
    }

    return await strapi.db.query(RECONCILIATION_ORDER_ROUTE).update({
      where: {
        ...condition,
      },
      data: {
        system_shipment_fee,
        system_cash_on_delivery,
        system_insurance_fee,
        system_return_fee,
        system_other_fee,
        system_change_fee,
        partner_cash_on_delivery,
        partner_shipment_fee,
        partner_insurance_fee,
        partner_return_fee,
        partner_other_fee,
        partner_change_fee,
        payment_type_id,
        weight,
        status,
      },
    });
  },
});
