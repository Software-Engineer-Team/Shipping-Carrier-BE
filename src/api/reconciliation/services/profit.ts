import { RECONCILIATION_ROUTE } from "../../../helper/constants";
import { calculateReconProfit } from "./utils";

export async function getProfitReportByReconId(reconId: number | string) {
  const reconciliation = await strapi
    .service(RECONCILIATION_ROUTE)
    .findReconciliationById(reconId);
  let profit = {
    status: reconciliation.status,
    customer: reconciliation.customer,
    ...calculateReconProfit(reconciliation),
  };
  return profit;
}

export async function getProfitReportReconciliations(ctx) {
  const { results: reconciliations, pagination } = await strapi
    .service(RECONCILIATION_ROUTE)
    .getReconciliations({
      ...ctx,
      query: {
        ...ctx.query,
        filters: { ...ctx.query.filters, status: "completed" },
      },
    });
  const totalprofits = reconciliations.reduce(
    (acc, recon) => {
      const calculatedReconProfit = calculateReconProfit(recon);

      const customer = recon.customer;
      const customerIndex = acc["profits"].findIndex(
        (el) => el?.customer?.id === customer?.id,
      );
      const {
        totalSystemCOD,
        totalSystemShipmentFee,
        totalSystemInsuranceFee,
        totalSystemOtherFee,
        totalSystemChangeFee,
        totalSystemReturnFee,
        totalPartnerCOD,
        totalPartnerShipmentFee,
        totalPartnerInsuranceFee,
        totalPartnerOtherFee,
        totalPartnerChangeFee,
        totalPartnerReturnFee,
      } = calculatedReconProfit["reconciliation_orders"].reduce(
        (acc, reconOrder) => {
          acc["totalSystemCOD"] += reconOrder.system_cash_on_delivery ?? 0;
          acc["totalSystemShipmentFee"] += reconOrder.system_shipment_fee ?? 0;
          acc["totalSystemInsuranceFee"] +=
            reconOrder.system_insurance_fee ?? 0;
          acc["totalSystemOtherFee"] += reconOrder.system_other_fee ?? 0;
          acc["totalSystemChangeFee"] += reconOrder.system_change_fee ?? 0;
          acc["totalSystemReturnFee"] += reconOrder.system_return_fee ?? 0;
          acc["totalPartnerCOD"] += reconOrder.partner_cash_on_delivery ?? 0;
          acc["totalPartnerShipmentFee"] +=
            reconOrder.partner_shipment_fee ?? 0;
          acc["totalPartnerInsuranceFee"] +=
            reconOrder.partner_insurance_fee ?? 0;
          acc["totalPartnerOtherFee"] += reconOrder.partner_other_fee ?? 0;
          acc["totalPartnerChangeFee"] += reconOrder.partner_change_fee ?? 0;
          acc["totalPartnerReturnFee"] += reconOrder.partner_return_fee ?? 0;
          return acc;
        },
        {
          totalSystemCOD: 0,
          totalSystemShipmentFee: 0,
          totalSystemInsuranceFee: 0,
          totalSystemOtherFee: 0,
          totalSystemChangeFee: 0,
          totalSystemReturnFee: 0,
          totalPartnerCOD: 0,
          totalPartnerShipmentFee: 0,
          totalPartnerInsuranceFee: 0,
          totalPartnerOtherFee: 0,
          totalPartnerChangeFee: 0,
          totalPartnerReturnFee: 0,
        },
      );

      if (customerIndex === -1) {
        acc["profits"] = acc["profits"].concat({
          customer,
          totalSystemCOD,
          totalSystemShipmentFee,
          totalSystemInsuranceFee,
          totalSystemOtherFee,
          totalSystemChangeFee,
          totalSystemReturnFee,
          totalPartnerCOD,
          totalPartnerShipmentFee,
          totalPartnerInsuranceFee,
          totalPartnerOtherFee,
          totalPartnerChangeFee,
          totalPartnerReturnFee,
          totalSystemRevenue: calculatedReconProfit.total_system_revenue,
          totalCustomerRefund: calculatedReconProfit.total_customer_refund,
          totalOrders: calculatedReconProfit["reconciliation_orders"].length,
        });
      } else {
        acc["profits"][customerIndex]["totalSystemCOD"] += totalSystemCOD;
        acc["profits"][customerIndex]["totalSystemShipmentFee"] +=
          totalSystemShipmentFee;
        acc["profits"][customerIndex]["totalSystemInsuranceFee"] +=
          totalSystemInsuranceFee;
        acc["profits"][customerIndex]["totalSystemOtherFee"] +=
          totalSystemOtherFee;
        acc["profits"][customerIndex]["totalSystemChangeFee"] +=
          totalSystemChangeFee;
        acc["profits"][customerIndex]["totalSystemReturnFee"] +=
          totalSystemReturnFee;
        acc["profits"][customerIndex]["totalPartnerCOD"] += totalPartnerCOD;
        acc["profits"][customerIndex]["totalPartnerShipmentFee"] +=
          totalPartnerShipmentFee;
        acc["profits"][customerIndex]["totalPartnerInsuranceFee"] +=
          totalPartnerInsuranceFee;
        acc["profits"][customerIndex]["totalPartnerOtherFee"] +=
          totalPartnerOtherFee;
        acc["profits"][customerIndex]["totalPartnerChangeFee"] +=
          totalPartnerChangeFee;
        acc["profits"][customerIndex]["totalPartnerReturnFee"] +=
          totalPartnerReturnFee;
        acc["profits"][customerIndex]["totalSystemRevenue"] +=
          calculatedReconProfit.total_system_revenue;
        acc["profits"][customerIndex]["totalCustomerRefund"] +=
          calculatedReconProfit.total_customer_refund;
        acc["profits"][customerIndex]["totalOrders"] +=
          calculatedReconProfit["reconciliation_orders"].length;
      }

      acc["totalProfitReport"]["totalSystemCOD"] += totalSystemCOD;
      acc["totalProfitReport"]["totalSystemShipmentFee"] +=
        totalSystemShipmentFee;
      acc["totalProfitReport"]["totalSystemInsuranceFee"] +=
        totalSystemInsuranceFee;
      acc["totalProfitReport"]["totalSystemOtherFee"] += totalSystemOtherFee;
      acc["totalProfitReport"]["totalSystemChangeFee"] += totalSystemChangeFee;
      acc["totalProfitReport"]["totalSystemReturnFee"] += totalSystemReturnFee;
      acc["totalProfitReport"]["totalPartnerCOD"] += totalPartnerCOD;
      acc["totalProfitReport"]["totalPartnerShipmentFee"] +=
        totalPartnerShipmentFee;
      acc["totalProfitReport"]["totalPartnerInsuranceFee"] +=
        totalPartnerInsuranceFee;
      acc["totalProfitReport"]["totalPartnerOtherFee"] += totalPartnerOtherFee;
      acc["totalProfitReport"]["totalPartnerChangeFee"] +=
        totalPartnerChangeFee;
      acc["totalProfitReport"]["totalPartnerReturnFee"] +=
        totalPartnerReturnFee;
      acc["totalProfitReport"]["totalSystemRevenue"] +=
        calculatedReconProfit.total_system_revenue;
      acc["totalProfitReport"]["totalCustomerRefund"] +=
        calculatedReconProfit.total_customer_refund;
      acc["totalProfitReport"]["totalOrders"] +=
        calculatedReconProfit["reconciliation_orders"].length;
      return acc;
    },
    {
      profits: [],
      totalProfitReport: {
        totalSystemCOD: 0,
        totalSystemShipmentFee: 0,
        totalSystemInsuranceFee: 0,
        totalSystemOtherFee: 0,
        totalSystemChangeFee: 0,
        totalSystemReturnFee: 0,
        totalPartnerCOD: 0,
        totalPartnerShipmentFee: 0,
        totalPartnerInsuranceFee: 0,
        totalPartnerOtherFee: 0,
        totalPartnerChangeFee: 0,
        totalPartnerReturnFee: 0,
        totalSystemRevenue: 0,
        totalCustomerRefund: 0,
        totalOrders: 0,
      },
    },
  );

  return {
    totalprofits,
    pagination,
  };
}
