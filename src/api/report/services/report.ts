/**
 * report service
 */

import { ORDER_ROUTE } from "../../../helper/constants";
import { genOrderReports } from "./utils";

export async function getOrdersReportByRole(ctx: any) {
  const { results: orders, pagination } = await strapi
    .service(ORDER_ROUTE)
    .findManyOrders(ctx);
  return { ordersReport: genOrderReports(orders), pagination };
}
