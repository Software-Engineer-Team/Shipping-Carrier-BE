import { baseOrderStatus } from "../../order/services/utils";

export function mappingOrderStatus(status: string) {
  switch (status) {
    case baseOrderStatus.PENDING_PICKUP:
      return "pending_pickup";

    case baseOrderStatus.GOODS_IN_TRANSIT:
      return "delivery_in_progress";

    case baseOrderStatus.DELIVERY_FAILED:
      return "delivery_failed";

    case baseOrderStatus.RETURN_TO_SENDER:
      return "return_to_sender";

    case baseOrderStatus.DELIVERY_SUCCESSFUL:
      return "delivery_successful";

    case baseOrderStatus.CANCEL_ORDER:
      return "cancel_order";

    default:
      return "pending_pickup";
  }
}

export function genOrderReports(orders: any) {
  let totalReceivedOrders = 0,
    totalReceivedOrdersShipmentFee = 0,
    totalReceivedOrdersCOD = 0,
    totalCreatedOrdersShipmentFee = 0,
    totalCreatedOrdersCOD = 0,
    totalCreatedOrders = 0,
    totalPendingPickupOrdersShipmentFee = 0,
    totalPendingPickupOrdersCOD = 0,
    totalPendingPickupOrders = 0,
    totalDeliverySuccessfulOrdersShipmentFee = 0,
    totalDeliverySuccessfulOrdersCOD = 0,
    totalDeliverySuccessfulOrders = 0;

  const totalReceivedOrdersReportStatus = [
    baseOrderStatus.GOODS_IN_TRANSIT,
    baseOrderStatus.DELIVERY_FAILED,
    baseOrderStatus.RETURN_TO_SENDER,
    baseOrderStatus.DELIVERY_SUCCESSFUL,
  ];

  const totalCreatedOrdersReportStatus = [
    baseOrderStatus.GOODS_IN_TRANSIT,
    baseOrderStatus.DELIVERY_FAILED,
    baseOrderStatus.RETURN_TO_SENDER,
    baseOrderStatus.DELIVERY_SUCCESSFUL,
    baseOrderStatus.PENDING_PICKUP,
  ];

  const totalPendingPickupOrdersReportStatus = [baseOrderStatus.PENDING_PICKUP];

  const totalDeliverySuccessfulOrdersReportStatus = [
    baseOrderStatus.DELIVERY_SUCCESSFUL,
  ];

  const ordersByCustomer = [];

  const totalReportOrdersByStatus = {};
  [
    baseOrderStatus.GOODS_IN_TRANSIT,
    baseOrderStatus.DELIVERY_FAILED,
    baseOrderStatus.RETURN_TO_SENDER,
    baseOrderStatus.DELIVERY_SUCCESSFUL,
    baseOrderStatus.PENDING_PICKUP,
    baseOrderStatus.CANCEL_ORDER,
  ].forEach((orderStatus: string) => {
    totalReportOrdersByStatus[mappingOrderStatus(orderStatus)] = {
      totalCOD: 0,
      totalShipmentFee: 0,
      orderIds: [],
    };
  });

  orders.forEach((order: any) => {
    if (totalReceivedOrdersReportStatus.indexOf(order.status) !== -1) {
      totalReceivedOrdersCOD += order.cash_on_delivery;
      totalReceivedOrdersShipmentFee += order.shipment_fee;
      totalReceivedOrders += 1;
    }

    if (totalCreatedOrdersReportStatus.indexOf(order.status) !== -1) {
      totalCreatedOrdersCOD += order.cash_on_delivery;
      totalCreatedOrdersShipmentFee += order.shipment_fee;
      totalCreatedOrders += 1;
    }

    if (totalPendingPickupOrdersReportStatus.indexOf(order.status) !== -1) {
      totalPendingPickupOrdersCOD += order.cash_on_delivery;
      totalPendingPickupOrdersShipmentFee += order.shipment_fee;
      totalPendingPickupOrders += 1;
    }

    if (
      totalDeliverySuccessfulOrdersReportStatus.indexOf(order.status) !== -1
    ) {
      totalDeliverySuccessfulOrdersCOD += order.cash_on_delivery;
      totalDeliverySuccessfulOrdersShipmentFee += order.shipment_fee;
      totalDeliverySuccessfulOrders += 1;
    }

    const customer = order.customer;
    const customerIndex = ordersByCustomer.findIndex(
      (customerOrder) => customerOrder?.customer?.id === customer?.id,
    );

    const mappedStatus = mappingOrderStatus(order.status);
    totalReportOrdersByStatus[mappedStatus]["totalCOD"] +=
      order.cash_on_delivery;
    totalReportOrdersByStatus[mappedStatus]["totalShipmentFee"] +=
      order.shipment_fee;
    totalReportOrdersByStatus[mappedStatus]["orderIds"].push(order.id);

    if (customerIndex === -1) {
      const reportOrdersByStatus = {};
      reportOrdersByStatus[mappedStatus] = {
        totalCOD: order.cash_on_delivery,
        totalShipmentFee: order.shipment_fee,
        orderIds: [order.id],
      };

      ordersByCustomer.push({
        customer,
        reportOrdersByStatus: reportOrdersByStatus,
        totalCOD: order.cash_on_delivery,
        totalShipmentFee: order.shipment_fee,
        totalOrders: 1,
      });
    } else {
      const reportOrdersByStatus =
        ordersByCustomer[customerIndex]["reportOrdersByStatus"];
      if (reportOrdersByStatus.hasOwnProperty(mappedStatus)) {
        reportOrdersByStatus[mappedStatus]["totalCOD"] +=
          order.cash_on_delivery;
        reportOrdersByStatus[mappedStatus]["totalShipmentFee"] +=
          order.shipment_fee;
        reportOrdersByStatus[mappedStatus]["orderIds"].push(order.id);
      } else {
        reportOrdersByStatus[mappedStatus] = {
          totalCOD: order.cash_on_delivery,
          totalShipmentFee: order.shipment_fee,
          orderIds: [order.id],
        };
      }
      ordersByCustomer[customerIndex]["totalCOD"] += order.cash_on_delivery;
      ordersByCustomer[customerIndex]["totalShipmentFee"] += order.shipment_fee;
      ordersByCustomer[customerIndex]["totalOrders"] +=
        mappedStatus === "cancel_order" ? 0 : 1;
    }
  });
  for (const orderByCustomer of ordersByCustomer) {
    const { reportOrdersByStatus } = orderByCustomer;
    const orderStatuses = [
      baseOrderStatus.PENDING_PICKUP,
      baseOrderStatus.GOODS_IN_TRANSIT,
      baseOrderStatus.DELIVERY_FAILED,
      baseOrderStatus.RETURN_TO_SENDER,
      baseOrderStatus.DELIVERY_SUCCESSFUL,
      baseOrderStatus.CANCEL_ORDER,
    ];
    for (const orderStatus of orderStatuses) {
      const mappedStatus = mappingOrderStatus(orderStatus);
      if (!reportOrdersByStatus.hasOwnProperty(mappedStatus)) {
        reportOrdersByStatus[mappedStatus] = {
          totalCOD: 0,
          totalShipmentFee: 0,
          orderIds: [],
        };
      }
    }
  }

  return {
    ordersByCustomer,
    totalReceivedOrders,
    totalReceivedOrdersCOD,
    totalReceivedOrdersShipmentFee,
    totalCreatedOrdersShipmentFee,
    totalCreatedOrdersCOD,
    totalCreatedOrders,
    totalPendingPickupOrdersShipmentFee,
    totalPendingPickupOrdersCOD,
    totalPendingPickupOrders,
    totalDeliverySuccessfulOrdersShipmentFee,
    totalDeliverySuccessfulOrdersCOD,
    totalDeliverySuccessfulOrders,
    totalReportOrdersByStatus,
  };
}
