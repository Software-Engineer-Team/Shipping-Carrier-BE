/**
 * carrier-account service
 */

import { factories } from "@strapi/strapi";
import {
  CARRIER_ACCOUNT_ROUTE,
  CARRIER_ROUTE,
} from "../../../helper/constants";
import { setQueryCarrierAccount } from "./utils";
import { ID } from "@strapi/strapi/lib/services/entity-service/types/params/attributes";
import { findAll } from "../../../helper/apiHelper";
const { NotFoundError } = require("@strapi/utils").errors;

export default factories.createCoreService(CARRIER_ACCOUNT_ROUTE, {
  async createOneCarrierAccount(carrierId: number | string, payload: any) {
    const carrier = await strapi.db.query(CARRIER_ROUTE).findOne({
      where: {
        id: carrierId,
      },
    });
    if (!carrier) {
      throw new NotFoundError(
        `Không tìm thấy đơn vị vận chuyển với id ${carrierId}.`,
      );
    }
    const account = await strapi.db.query(CARRIER_ACCOUNT_ROUTE).findOne({
      where: {
        account_name: payload.account_name,
      },
    });
    if (!account) {
      return {
        data: await strapi.db.query(CARRIER_ACCOUNT_ROUTE).create({
          data: { ...payload },
          populate: ["carrier"],
        }),
      };
    }
    return {
      message: `Tài khoản đơn vị vận chuyển ${account.account_name} đã tồn tại.`,
      data: account,
    };
  },
  async findCarrierAccountByName(account_name: string) {
    // findCarrierAccountByName uses encrypt_data field
    const account = await strapi.db.query(CARRIER_ACCOUNT_ROUTE).findOne({
      where: {
        account_name: account_name,
      },
    });
    if (!account) {
      throw new NotFoundError(
        `Không tìm thấy tài khoản đơn vị vận chuyển ${account_name}.`,
      );
    }
    return account;
  },
  async findCarrierAccountById(accountId: ID) {
    const account = await strapi.entityService.findOne(
      CARRIER_ACCOUNT_ROUTE,
      accountId,
      {
        fields: ["account_name", "api_url", "reminder_link"],
      },
    );
    if (!account) {
      throw new NotFoundError(
        `Tài khoản đơn vị vận chuyển có id ${accountId} không được tìm thấy.`,
      );
    }
    return account;
  },
  async findCarrierAccounts(ctx) {
    return await findAll(CARRIER_ACCOUNT_ROUTE, ctx, setQueryCarrierAccount);
  },
  async deleteCarrierAccountById(accountId: number | string) {
    const account = await strapi
      .service(CARRIER_ACCOUNT_ROUTE)
      .findCarrierAccountById(accountId);
    return await strapi.entityService.delete(CARRIER_ACCOUNT_ROUTE, account.id);
  },
  async updateOneCarrierAccount(carrierId: ID, body?: any) {
    return await strapi.entityService.update(CARRIER_ACCOUNT_ROUTE, carrierId, {
      data: {
        ...body,
      },
    });
  },
});
