import moment from "moment";
import { validateUploadFields } from "../../../helper/excelHelper";
import {
  ORDER_ROUTE,
  RECONCILIATION_ORDER_ROUTE,
} from "../../../helper/constants";
import { ROLE } from "../../../helper/apiHelper";
import { AnyEntity } from "@strapi/strapi/lib/services/entity-service";
import { transferSystemOrderFields } from "../../reconciliation/services/utils";
const { ApplicationError } = require("@strapi/utils").errors;

export enum reconciliationAttributes {
  TRACKING_ID = "tracking_id",
  SHIPMENT_FEE = "shipment_fee",
  INSURANCE_FEE = "insurance_fee",
  RETURN_FEE = "return_fee",
  CASH_ON_DELIVERY = "cash_on_delivery",
  STATUS_ORDER = "status",
  SUCCESSFUL_DELIVERY_DATE = "successful_delivery_date",
  CREATED_ORDER_DATE = "created_order_date",
  CARRIER_WEIGHT = "carrier_weight",
  OTHER_FEE = "other_fee",
  CHANGE_FEE = "change_fee",
}

export enum reconciliationStatus {
  COMPLETED = "Completed",
  RETURNED = "Returned",
}

export async function checkUploadReconciliationFields(
  orders: any,
): Promise<any> {
  const requiredFields = [
    reconciliationAttributes.TRACKING_ID,
    reconciliationAttributes.SHIPMENT_FEE,
    reconciliationAttributes.CASH_ON_DELIVERY,
    reconciliationAttributes.STATUS_ORDER,
    reconciliationAttributes.SUCCESSFUL_DELIVERY_DATE,
    reconciliationAttributes.CREATED_ORDER_DATE,
    reconciliationAttributes.CARRIER_WEIGHT,
    reconciliationAttributes.RETURN_FEE,
    reconciliationAttributes.INSURANCE_FEE,
    reconciliationAttributes.OTHER_FEE,
    reconciliationAttributes.CHANGE_FEE,
  ];

  const { isValid, errors } = validateUploadFields(orders, requiredFields);
  if (!isValid) {
    throw new ApplicationError(errors);
  }

  const validOrders = await validateOrders(orders);
  if (!validOrders.isValid) {
    throw new ApplicationError(`${validOrders.errors}`, {
      ...(validOrders.details ?? {}),
    });
  }

  return { matchingOrders: validOrders.data };
}

const validateOrders = async (orders: any[]): Promise<any> => {
  if (!orders.length) {
    return {
      errors: "Lỗi xác thực đơn hàng. Không có đơn hàng nào được tải lên.",
      isValid: false,
    };
  }

  // Check for status of reconciliation orders must be Completed or Returned
  const invalidStatusOrders = checkStatusReconOrders(orders);
  if (!invalidStatusOrders.isValid) {
    return {
      errors: invalidStatusOrders.errors,
      details: {
        ...invalidStatusOrders.details,
      },
      isValid: false,
    };
  }

  // Check for number types of reconciliation orders fields must be positive
  const invalidTypeOrders = checkReconOrdersTypeFields(orders);
  if (!invalidTypeOrders.isValid) {
    return {
      errors: invalidTypeOrders.errors,
      details: {
        ...invalidTypeOrders.details,
      },
      isValid: false,
    };
  }

  // Check for duplicates reconciliation orders and return tracking numbers that are duplicated
  const trackingIds = orders.map(
    (order: any) => order[reconciliationAttributes.TRACKING_ID],
  );

  const dupOrders = duplicateOrders(trackingIds);
  if (!dupOrders.isValid) {
    return {
      errors: dupOrders.errors,
      details: {
        ...dupOrders.details,
      },
      isValid: false,
    };
  }

  const dupSystemReconOrders =
    await duplicateReconciliationOrdersInSystem(trackingIds);
  if (!dupSystemReconOrders.isValid) {
    return {
      errors: dupSystemReconOrders.errors,
      details: {
        ...dupSystemReconOrders.details,
      },
      isValid: false,
    };
  }

  // Check if reconciliation orders exist in the system,
  const existingOrders = await ordersExistInSystem(orders, trackingIds);
  if (!existingOrders.isValid) {
    return {
      errors: existingOrders.errors,
      details: {
        ...existingOrders.details,
      },
      isValid: false,
    };
  }

  return {
    errors: "",
    data: existingOrders.data,
    isValid: true,
  };
};

const duplicateOrders = (trackingIds: any[]): any => {
  const uniqueTrackingIds = [...new Set(trackingIds)];
  if (trackingIds.length !== uniqueTrackingIds.length) {
    const duplicateTrackingIds = trackingIds.filter(
      (trackingId: string, index: number) => {
        return trackingIds.indexOf(trackingId) !== index;
      },
    );
    return {
      errors: "Lỗi xác thực đơn hàng. Tồn tại các mã đơn hàng bị trùng lặp",
      details: {
        trackingIds: duplicateTrackingIds,
      },
      isValid: false,
    };
  }

  return {
    errors: "",
    isValid: true,
  };
};

const duplicateReconciliationOrdersInSystem = async (trackingIds: any[]) => {
  const systemReconOrders = await strapi
    .service(RECONCILIATION_ORDER_ROUTE)
    .findReconOrdersByTrackingIds(trackingIds);

  const existedReconInSession = [];
  const dupplicatedReconOrders = [];
  for (const rOrder of systemReconOrders) {
    if (rOrder.reconciliation && rOrder.reconciliation.status !== "cancelled") {
      existedReconInSession.push(rOrder.tracking_id);
    } else if (!rOrder.reconciliation) {
      dupplicatedReconOrders.push(rOrder.tracking_id);
    }
  }
  if (existedReconInSession.length) {
    return {
      errors:
        "Lỗi xác thực đơn hàng. Tồn tại các mã đơn hàng đã có trong phiên đang chờ đối soát",
      details: {
        trackingIds: existedReconInSession,
      },
      isValid: false,
    };
  } else if (dupplicatedReconOrders.length) {
    return {
      errors:
        "Lỗi xác thực đơn hàng. Tồn tại các mã đơn hàng đã được tải lên nhưng chưa vào trạng thái đang đối soát",
      details: {
        trackingIds: dupplicatedReconOrders,
      },
      isValid: false,
    };
  }

  return {
    errors: "",
    isValid: true,
  };
};

const ordersExistInSystem = async (
  orders: any[],
  trackingIds: any[],
): Promise<any> => {
  const matchingOrders = await strapi
    .service(ORDER_ROUTE)
    .findOrdersByTrackingIds(trackingIds);

  if (matchingOrders.length !== orders.length) {
    const matchingTrackingIds = matchingOrders.map(
      (order: any) => order.tracking_id,
    );
    const notFoundTrackingIds = trackingIds.filter((trackingId: string) => {
      return matchingTrackingIds.indexOf(trackingId) === -1;
    });
    return {
      errors:
        "Lỗi xác thực đơn hàng. Không tìm thấy mã đơn hàng trong hệ thống",
      details: {
        trackingIds: notFoundTrackingIds,
      },
      isValid: false,
    };
  }

  // Check order is reconciled
  const reconciledOrders = matchingOrders.filter(
    (order: any) => order.is_reconciled,
  );
  if (reconciledOrders.length) {
    const invalidTrackingIds = reconciledOrders.map(
      (order: any) => order.tracking_id,
    );
    return {
      errors: "Lỗi xác thực đơn hàng. Tồn tại các đơn hàng đã được đối soát",
      details: {
        trackingIds: invalidTrackingIds,
      },
      isValid: false,
    };
  }

  // Check order is deleted
  const deletedOrders = matchingOrders.filter((order: any) => order.deleted);

  if (deletedOrders.length) {
    const invalidTrackingIds = deletedOrders.map(
      (order: any) => order.tracking_id,
    );
    return {
      errors: "Lỗi xác thực đơn hàng. Các đơn hàng đã bị xoá",
      details: {
        trackingIds: invalidTrackingIds,
      },
      isValid: false,
    };
  }

  return {
    errors: "",
    data: matchingOrders,
    isValid: true,
  };
};

const checkReconOrdersTypeFields = (orders: any) => {
  const invalidTypeOrders = orders.filter(
    (order: any) =>
      order[reconciliationAttributes.CASH_ON_DELIVERY] < 0 ||
      order[reconciliationAttributes.SHIPMENT_FEE] < 0 ||
      order[reconciliationAttributes.CARRIER_WEIGHT] < 0 ||
      order[reconciliationAttributes.RETURN_FEE] < 0 ||
      order[reconciliationAttributes.INSURANCE_FEE] < 0 ||
      order[reconciliationAttributes.OTHER_FEE] < 0 ||
      order[reconciliationAttributes.CHANGE_FEE] < 0,
  );
  if (invalidTypeOrders.length) {
    return {
      errors:
        "Lỗi xác thực đơn hàng. Các trường weight, phí vận chuyển, COD, phí hoàn, phí đổi địa chỉ, phí khác phải không âm",
      isValid: false,
      details: {
        trackingIds: invalidTypeOrders.map(
          (os) => os[reconciliationAttributes.TRACKING_ID],
        ),
      },
    };
  }
  return {
    errors: "",
    isValid: true,
  };
};

const checkStatusReconOrders = (orders: any) => {
  const ordersStatus = orders.filter(
    (order: any) =>
      order[reconciliationAttributes.STATUS_ORDER] !==
        reconciliationStatus.COMPLETED &&
      order[reconciliationAttributes.STATUS_ORDER] !==
        reconciliationStatus.RETURNED,
  );
  if (ordersStatus.length) {
    const invalidTrackingIds = ordersStatus.map(
      (os) => os[reconciliationAttributes.TRACKING_ID],
    );
    return {
      errors:
        "Lỗi xác thực đơn hàng. Trạng thái đơn hàng phải là Completed hoặc Returned",
      details: {
        trackingIds: invalidTrackingIds,
      },
      isValid: false,
    };
  }

  const invalidCODReturnedStatusOrders = orders.filter(
    (order: any) =>
      order[reconciliationAttributes.STATUS_ORDER] ===
        reconciliationStatus.RETURNED &&
      order[reconciliationAttributes.CASH_ON_DELIVERY] !== 0,
  );
  if (invalidCODReturnedStatusOrders.length) {
    const invalidTrackingIds = invalidCODReturnedStatusOrders.map(
      (os) => os[reconciliationAttributes.TRACKING_ID],
    );
    return {
      errors:
        "Lỗi xác thực đơn hàng. Phí thu hộ cho đơn hàng bị hoàn trả phải là 0",
      details: {
        trackingIds: invalidTrackingIds,
      },
      isValid: false,
    };
  }
  return {
    errors: "",
    isValid: true,
  };
};

export async function parseReconciliationOrders(
  orders: any[],
  systemOrders: any[],
): Promise<any> {
  const outputDateTimeFormat = "YYYY-MM-DD HH:mm:ss.SSS";

  const reconciliationOrders = await Promise.all(
    orders.map(async (reconOrder) => {
      const sOrder = systemOrders.find(
        (sOrder: any) => sOrder.tracking_id === reconOrder.tracking_id,
      );

      let newWeight = sOrder.weight;
      const reconOrderWeight = Number(
        reconOrder[reconciliationAttributes.CARRIER_WEIGHT],
      );

      // Update weight from reconciliations to BSS orders system
      if (reconOrderWeight >= sOrder.weight) {
        newWeight = reconOrderWeight;
      }
      // Update weight from BSS orders system to reconciliations
      else if (reconOrderWeight < sOrder.weight) {
        newWeight = sOrder.weight;
      }

      const transferSystemOrderData = await transferSystemOrderFields(
        newWeight,
        String(reconOrder[reconciliationAttributes.STATUS_ORDER]),
        sOrder,
      );

      return {
        tracking_id: reconOrder[reconciliationAttributes.TRACKING_ID],
        partner_cash_on_delivery: Number(
          reconOrder[reconciliationAttributes.CASH_ON_DELIVERY],
        ),
        partner_shipment_fee: Number(
          reconOrder[reconciliationAttributes.SHIPMENT_FEE],
        ),
        partner_insurance_fee: Number(
          reconOrder[reconciliationAttributes.INSURANCE_FEE],
        ),
        partner_return_fee: Number(
          reconOrder[reconciliationAttributes.RETURN_FEE],
        ),
        partner_other_fee: Number(
          reconOrder[reconciliationAttributes.OTHER_FEE],
        ),
        partner_change_fee: Number(
          reconOrder[reconciliationAttributes.CHANGE_FEE],
        ),
        weight: newWeight,
        status: String(reconOrder[reconciliationAttributes.STATUS_ORDER]),
        start_date: moment(
          reconOrder[reconciliationAttributes.CREATED_ORDER_DATE],
        ).format(outputDateTimeFormat),
        end_date: moment(
          reconOrder[reconciliationAttributes.SUCCESSFUL_DELIVERY_DATE],
        ).format(outputDateTimeFormat),
        carrier: sOrder.carrier.id,
        system_shipment_fee: transferSystemOrderData.shipment_fee ?? 0,
        system_return_fee: transferSystemOrderData.return_fee ?? 0,
        system_insurance_fee: transferSystemOrderData.insurance_fee ?? 0,
        system_cash_on_delivery: transferSystemOrderData.cash_on_delivery ?? 0,
        system_other_fee: transferSystemOrderData.other_fee ?? 0,
        system_change_fee: transferSystemOrderData.change_fee ?? 0,
        payment_type_id: transferSystemOrderData.payment_type_id,
        is_partial_returned: transferSystemOrderData.is_partial_returned,
      };
    }),
  );

  return {
    reconciliation_orders: [...reconciliationOrders],
  };
}

export function groupSystemOrdersByCustomer(
  reconciliationOrders: AnyEntity | AnyEntity[],
  systemOrders: any[],
) {
  const result = systemOrders.reduce((acc: any, obj: any) => {
    const { customer, tracking_id } = obj;
    const existing = acc.find((item: any) => item.customer.id === customer.id);
    const reconciliationOrder = reconciliationOrders.find(
      (ro: any) => ro.tracking_id === tracking_id,
    );
    const total_shipment_fee =
      (reconciliationOrder.partner_shipment_fee ?? 0) +
      (reconciliationOrder.partner_return_fee ?? 0) +
      (reconciliationOrder.partner_insurance_fee ?? 0) +
      (reconciliationOrder.partner_other_fee ?? 0) +
      (reconciliationOrder.partner_change_fee ?? 0);

    if (existing) {
      existing.reconciliation_orders.push({
        ...reconciliationOrder,
        total_shipment_fee,
      });
    } else {
      acc.push({
        customer: { ...customer },
        reconciliation_orders: [
          {
            ...reconciliationOrder,
            total_shipment_fee,
          },
        ],
      });
    }

    return acc;
  }, []);
  return result;
}

export function setQueryReconciliationOrders(ctx: any) {
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
    customer: {
      fields,
      populate: {
        sale: {
          fields,
        },
      },
    },
    carrier: true,
  };
  return {
    ...ctx.query,
    sort,
    filters,
    populate,
  };
}

export function setQueryGroupReconciliationOrders(ctx: any) {
  let filters = { reconciliation: null };
  let sort = {};

  if (ctx.query.filters) {
    filters = { ...filters, ...ctx.query.filters };
  }
  if (ctx.query.sort) {
    sort = {
      ...sort,
      ...ctx.query.sort,
    };
  }

  return {
    ...ctx.query,
    sort,
    filters,
  };
}
