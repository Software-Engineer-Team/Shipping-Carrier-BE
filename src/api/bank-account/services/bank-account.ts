/**
 * bank-account service
 */

import { factories } from "@strapi/strapi";
import { BANK_ACCOUNT_ROUTE, BANK_ROUTE } from "../../../helper/constants";
import { setQueryBankAccount } from "./utils";
import { findAll } from "../../../helper/apiHelper";
import { removeAccents } from "../../../helper/unorm";
const { ApplicationError, NotFoundError } = require("@strapi/utils").errors;

export default factories.createCoreService(BANK_ACCOUNT_ROUTE, {
  async createBankAccount(body: any) {
    const existedBankAccount = await strapi
      .service(BANK_ACCOUNT_ROUTE)
      .findOneBankAccount(body.bank_account_number);
    if (existedBankAccount) {
      throw new ApplicationError(
        `Tài khoản ngân hàng ${body.bank_account_number} đã tồn tại.`,
      );
    }

    const existedBankAccounts = await strapi
      .service(BANK_ACCOUNT_ROUTE)
      .findBankAccountsByUserId(body.user);
    let isDefault = !existedBankAccounts.length ? true : !!body.default;

    if (isDefault) {
      await strapi
        .service(BANK_ACCOUNT_ROUTE)
        .updateDefaultBankAccount(body.user);
    }

    const bank = await strapi.service(BANK_ROUTE).findOneBank(body.bank);
    if (!bank) {
      throw new ApplicationError(`Ngân hàng ${body.bank} không tồn tại.`);
    }

    return await strapi.entityService.create(BANK_ACCOUNT_ROUTE, {
      data: {
        ...body,
        bank: bank.id,
        account_holder_name: removeAccents(body.account_holder_name)
          .toUpperCase()
          .trim(),
        default: isDefault,
      },
      populate: {
        bank: { fields: ["name"] },
        user: {
          fields: ["username", "email"],
        },
      },
    });
  },
  async findOneBankAccount(bank_account_number: string) {
    return await strapi.db.query(BANK_ACCOUNT_ROUTE).findOne({
      where: {
        bank_account_number,
      },
    });
  },
  async findBankAccountsByUserId(user_id: number) {
    return await strapi.entityService.findMany(BANK_ACCOUNT_ROUTE, {
      filters: {
        user: user_id,
      },
      populate: {
        user: {
          fields: ["username", "email"],
          populate: {
            sale: {
              fields: ["username", "email"],
            },
          },
        },
      },
    });
  },
  async updateDefaultBankAccount(user_id: number, isDefault: boolean = false) {
    return await strapi.db.query(BANK_ACCOUNT_ROUTE).update({
      where: {
        user: user_id,
        default: true,
      },
      data: {
        default: isDefault,
      },
    });
  },
  async updateOneBankAccount(
    bankAccountId: number,
    user_id: number,
    data?: any,
    isDefault: boolean = false,
  ) {
    if (isDefault) {
      await strapi
        .service(BANK_ACCOUNT_ROUTE)
        .updateDefaultBankAccount(user_id);
    }

    const bank = await strapi.service(BANK_ROUTE).findOneBank(data.bank);
    if (!bank) {
      throw new ApplicationError(`Ngân hàng ${data.bank} không tồn tại.`);
    }
    return await strapi.entityService.update(BANK_ACCOUNT_ROUTE, bankAccountId, {
      data: {
        ...data,
        default: isDefault,
        bank: bank.id,
      },
      populate: {
        user: {
          fields: ["username", "email"],
        },
      },
    });
  },
  async deleteOneBankAccount(bankAccountId: number) {
    const bankAccount = await strapi.entityService.findOne(BANK_ACCOUNT_ROUTE, bankAccountId);
    if (!bankAccount) {
      throw new NotFoundError("Không tìm thấy tài khoản ngân hàng.");
    }
    if (bankAccount.default) {
      throw new ApplicationError("Không thể xóa tài khoản ngân hàng mặc định.");
    }
    return await strapi.entityService.delete(BANK_ACCOUNT_ROUTE, bankAccountId);
  },
  async findBankAccountById(bankAccountId: number) {
    const bankAccount = await strapi.entityService.findOne(
      BANK_ACCOUNT_ROUTE,
      bankAccountId,
      {
        populate: {
          user: {
            fields: ["username", "email"],
            populate: {
              sale: {
                fields: ["username", "email"],
              },
            },
          },
          bank: { fields: ["name"] },
        },
      },
    );
    if (!bankAccount) {
      throw new NotFoundError("Không tìm thấy tài khoản ngân hàng.");
    }
    return bankAccount;
  },
  async getBankAccounts(ctx: any) {
    return await findAll(BANK_ACCOUNT_ROUTE, ctx, setQueryBankAccount);
  },
});
