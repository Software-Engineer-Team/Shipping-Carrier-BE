import { baseOrderStatus } from "../../order/services/utils";
import { RECONCILIATION_ORDER_ROUTE } from "../../../helper/constants";
import { ROLE } from "../../../helper/apiHelper";
import { reconciliationStatus } from "../../reconciliation-order/services/utils";
import {
  getPriceItem,
  getPriceStrategies,
} from "../../order/services/order-services";
import {
  convertPagedToStartLimit,
  getPaginationInfo,
} from "../../../helper/pagination";
import reconciliationOrder from "../../reconciliation-order/controllers/reconciliation-order";

export async function validateReconOrders(rOrders: any[]) {
  const sReconOrders = await strapi.entityService.findMany(
    RECONCILIATION_ORDER_ROUTE,
    {
      filters: {
        id: {
          $in: rOrders.map((rO) => rO.id),
        },
      },
      populate: {
        reconciliation: true,
      },
    },
  );
  console.log(sReconOrders);
  if (sReconOrders.length !== rOrders.length) {
    return {
      errors: `Lỗi xác thực đơn hàng. Không tồn tại các đơn đối soát trong hệ thống`,
      details: {
        ids: rOrders
          .filter((rO) => !sReconOrders.find((sRO) => rO.id === sRO.id))
          .map((rO) => rO.id),
      },
      isValid: false,
    };
  }

  const invalidStatusReconOrders = sReconOrders.filter(
    (sRO) => sRO.reconciliation && sRO.reconciliation.status !== "cancelled",
  );
  if (invalidStatusReconOrders.length) {
    return {
      errors: `Lỗi xác thực đơn hàng. Tồn tại các đơn đối soát đã nằm trong phiên đối soát`,
      details: {
        ids: invalidStatusReconOrders.map((rO) => rO.id),
      },
      isValid: false,
    };
  }
  return {
    errors: "",
    isValid: true,
  };
}

export function parseStatus(status: string) {
  switch (status) {
    case reconciliationStatus.COMPLETED:
      return baseOrderStatus.DELIVERY_SUCCESSFUL;
    case reconciliationStatus.RETURNED:
      return baseOrderStatus.RETURN_TO_SENDER;
    default:
      return status;
  }
}

export function setQueryReconciliation(ctx) {
  let filters = {};
  const { user } = ctx.state;
  const role = user.role;
  if (role.type.toUpperCase() === ROLE.SALE.toUpperCase()) {
    filters = {
      ...filters,
      ...{ customer: { sale: user.id } },
    };
  } else if (role.type.toUpperCase() === ROLE.CUSTOMER.toUpperCase()) {
    filters = { ...filters, ...{ customer: user.id } };
  }

  let sort = { createdAt: "desc" };

  if (ctx.query.filters) {
    filters = { ...filters, ...ctx.query.filters };
  }
  if (ctx.query.sort) {
    sort = {
      ...sort,
      ...ctx.query.sort,
    };
  }

  const fields = ["id", "username", "email"];
  const populate = {
    reconciliation_orders: {
      populate: {
        carrier: true,
      },
    },
    customer: {
      fields,
      populate: {
        sale: {
          fields,
        },
      },
    },
  };
  return {
    ...ctx.query,
    sort,
    filters,
    populate,
  };
}

export function calculateReconProfit(recon: any) {
  return recon.reconciliation_orders.reduce(
    (acc: any, rOrder: any) => {
      let new_profit = 0;
      let new_refund = 0;
      if (rOrder.payment_type_id === 1) {
        new_profit =
          (rOrder.system_shipment_fee ?? 0) +
          (rOrder.system_return_fee ?? 0) +
          (rOrder.system_insurance_fee ?? 0) +
          (rOrder.system_change_fee ?? 0) +
          (rOrder.system_other_fee ?? 0) -
          ((rOrder.partner_shipment_fee ?? 0) +
            (rOrder.partner_return_fee ?? 0) +
            (rOrder.partner_insurance_fee ?? 0) +
            (rOrder.partner_other_fee ?? 0) +
            (rOrder.partner_change_fee ?? 0));

        if (
          rOrder.status === reconciliationStatus.RETURNED ||
          rOrder.is_partial_returned === true
        ) {
          new_refund =
            (rOrder.partner_cash_on_delivery ?? 0) -
            ((rOrder.system_shipment_fee ?? 0) +
              (rOrder.system_return_fee ?? 0) +
              (rOrder.system_insurance_fee ?? 0) +
              (rOrder.system_change_fee ?? 0) +
              (rOrder.system_other_fee ?? 0));
        } else if (rOrder.status === reconciliationStatus.COMPLETED) {
          new_refund =
            (rOrder.system_cash_on_delivery ?? 0) -
            ((rOrder.system_shipment_fee ?? 0) +
              (rOrder.system_return_fee ?? 0) +
              (rOrder.system_insurance_fee ?? 0) +
              (rOrder.system_change_fee ?? 0) +
              (rOrder.system_other_fee ?? 0));
        }
      } else {
        if (
          rOrder.status === reconciliationStatus.RETURNED ||
          rOrder.is_partial_returned === true
        ) {
          new_profit =
            (rOrder.system_shipment_fee ?? 0) +
            (rOrder.system_return_fee ?? 0) +
            (rOrder.system_insurance_fee ?? 0) +
            (rOrder.system_change_fee ?? 0) +
            (rOrder.system_other_fee ?? 0) -
            ((rOrder.partner_shipment_fee ?? 0) +
              (rOrder.partner_return_fee ?? 0) +
              (rOrder.partner_insurance_fee ?? 0) +
              (rOrder.partner_other_fee ?? 0) +
              (rOrder.partner_change_fee ?? 0));

          new_refund =
            (rOrder.partner_cash_on_delivery ?? 0) -
            ((rOrder.system_shipment_fee ?? 0) +
              (rOrder.system_return_fee ?? 0) +
              (rOrder.system_insurance_fee ?? 0) +
              (rOrder.system_change_fee ?? 0) +
              (rOrder.system_other_fee ?? 0));
        } else if (rOrder.status === reconciliationStatus.COMPLETED) {
          new_profit =
            (rOrder.partner_cash_on_delivery ?? 0) -
            (rOrder.system_cash_on_delivery ?? 0) +
            (rOrder.system_change_fee ?? 0) +
            (rOrder.system_other_fee ?? 0) -
            ((rOrder.partner_shipment_fee ?? 0) +
              (rOrder.partner_return_fee ?? 0) +
              (rOrder.partner_insurance_fee ?? 0) +
              (rOrder.partner_other_fee ?? 0) +
              (rOrder.partner_change_fee ?? 0));

          new_refund = rOrder.system_cash_on_delivery ?? 0;
        }
      }

      const new_reconciliation_orders = acc.reconciliation_orders.concat({
        ...rOrder,
        customer_refund: new_refund,
        system_revenue: new_profit,
      });

      return {
        total_system_revenue: acc.total_system_revenue + new_profit,
        total_customer_refund: acc.total_customer_refund + new_refund,
        reconciliation_orders: new_reconciliation_orders,
      };
    },
    {
      total_system_revenue: 0,
      total_customer_refund: 0,
      reconciliation_orders: [],
    },
  );
}

export async function transferSystemOrderFields(
  newWeight: number,
  reconOrderStatus: string,
  order: any,
) {
  let new_shipment_fee = order.shipment_fee;
  let new_return_fee = order.return_fee;
  let new_cash_on_delivery = order.cash_on_delivery;

  const price_item = await getPriceItem(
    order.price_sheet.price_items,
    order.from_province_code,
    order.to_province_code,
    newWeight,
    order.carrier.id,
  );

  if (price_item) {
    new_shipment_fee = getPriceStrategies["calculateFee"](
      price_item,
      newWeight,
    );
    if (reconOrderStatus === reconciliationStatus.RETURNED) {
      new_return_fee = getPriceStrategies["calculateReturnFee"](
        price_item,
        newWeight,
      );
    }
  }
  if (reconOrderStatus === reconciliationStatus.RETURNED) {
    new_cash_on_delivery = 0;
  }

  return {
    weight: newWeight,
    shipment_fee: new_shipment_fee ?? 0,
    return_fee: new_return_fee ?? 0,
    insurance_fee: order.insurance_fee ?? 0,
    change_fee: order.change_fee ?? 0,
    other_fee: order.other_fee ?? 0,
    payment_type_id: order.payment_type_id,
    is_partial_returned: order.is_partial_returned,
    cash_on_delivery: new_cash_on_delivery ?? 0,
  };
}
