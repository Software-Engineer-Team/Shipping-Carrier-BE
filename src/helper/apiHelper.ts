import axios, { AxiosRequestConfig } from "axios";
import {
  getPaginationInfo,
  shouldCount,
  convertPagedToStartLimit,
  transformPaginationResponse,
} from "./pagination";
import { Logger } from "./logger/logger";

export enum ROLE {
  ADMIN = "ADMIN",
  CUSTOMER = "CUSTOMER",
  SALE = "SALE",
  PUBLIC = "PUBLIC",
  ACCOUNT = "ACCOUNT",
  CUSTOMER_CARE = "CUSTOMER_CARE",
}

export function logCurlCommand(config: AxiosRequestConfig): void {
  const logger = new Logger("logCurlCommand").getLogger();

  const { method, url, headers, data } = config;

  let curlCommand = `curl -X ${method} '${url}'`;

  // Add headers
  if (headers) {
    Object.entries(headers).forEach(([key, value]) => {
      curlCommand += `\n -H '${key}: ${value}'`;
    });
  }

  // Add request body
  if (data) {
    const requestBody = JSON.stringify(data);
    curlCommand += `\n -d '${requestBody}'`;
  }

  logger.debug(`cURL Command:\n ${curlCommand}`);
}

export async function apiAxios({
  method,
  url,
  data,
  headers,
}: {
  method: string;
  url: string;
  data?: any;
  headers?: any;
}) {
  const config = {
    method,
    url,
    headers: {
      ...headers,
      "Content-Type": "application/json",
    },
    data: data,
  };
  logCurlCommand(config);
  return await axios.request(config);
}

export async function findAll(contentType: any, ctx: any, setQuery: any) {
  const paginationInfo = getPaginationInfo(ctx.query);
  const fetchParams = setQuery(ctx);
  const results = await strapi.entityService.findMany(contentType, {
    ...fetchParams,
    ...convertPagedToStartLimit(paginationInfo),
  });

  if (shouldCount(fetchParams)) {
    const count = await strapi.entityService.count(contentType, {
      ...fetchParams,
      ...paginationInfo,
    });

    return {
      results,
      pagination: transformPaginationResponse(paginationInfo, count),
    };
  }
  return {
    results,
    pagination: paginationInfo,
  };
}
