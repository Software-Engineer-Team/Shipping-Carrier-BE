/**
 * bank service
 */

import { factories } from "@strapi/strapi";
import { BANK_ROUTE } from "../../../helper/constants";
import { findAll } from "../../../helper/apiHelper";
import { setQueryBank } from "./utils";
const { ApplicationError, NotFoundError } = require("@strapi/utils").errors;

export default factories.createCoreService(BANK_ROUTE, {
  async createBank(body: any) {
    const existedBank = await strapi.service(BANK_ROUTE).findOneBank(body.name);
    if (existedBank) {
      throw new ApplicationError(`Ngân hàng ${body.name} đã tồn tại.`);
    }
    return await strapi.entityService.create(BANK_ROUTE, {
      data: {
        ...body,
      },
    });
  },
  async createBanks(data: any) {
    return await Promise.all(
      data.map(async (d) => {
        const existingBank = await strapi
          .service(BANK_ROUTE)
          .findOneBank(d.name.trim());
        if (!existingBank) {
          const newBank = await strapi.query(BANK_ROUTE).create({
            data: {
              name: d.name.trim(),
            },
          });
          return newBank;
        }
        return existingBank;
      }),
    );
  },
  async findOneBank(bank_name: string) {
    return await strapi.db.query(BANK_ROUTE).findOne({
      where: {
        name: bank_name.trim(),
      },
    });
  },
  async updateOneBank(bankId: number, data?: any) {
    return await strapi.entityService.update(BANK_ROUTE, bankId, {
      data: {
        ...data,
      },
    });
  },
  async deleteOneBank(bankId: number) {
    const bank = await strapi.entityService.findOne(BANK_ROUTE, bankId);
    if (!bank) {
      throw new NotFoundError("Không tìm thấy tài khoản ngân hàng.");
    }
    return await strapi.entityService.delete(BANK_ROUTE, bankId);
  },
  async getBanks(ctx: any) {
    return await findAll(BANK_ROUTE, ctx, setQueryBank);
  },
});
