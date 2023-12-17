import { ROLE } from "../../../helper/apiHelper";
import {
  validateFields,
  validateUploadFields,
} from "../../../helper/excelHelper";
const { ApplicationError } = require("@strapi/utils").errors;

enum bankAttributes {
  BANK_ACCOUNT_NUMBER = "bank_account_number",
  BANK = "bank",
  ACCOUNT_HOLDER_NAME = "account_holder_name",
}

export const checkCreateBankAccountFields = (body: any) => {
  // strapi.contentTypes[BANK_ROUTE].attributes
  const requiredFields = [
    bankAttributes.BANK,
    bankAttributes.BANK_ACCOUNT_NUMBER,
    bankAttributes.ACCOUNT_HOLDER_NAME,
    "user",
  ];
  return validateFields(body, requiredFields);
};

export function checkUploadBankAccountFields(bankAccounts: any[]): any {
  const requiredFields = [
    bankAttributes.BANK,
    bankAttributes.BANK_ACCOUNT_NUMBER,
    bankAttributes.ACCOUNT_HOLDER_NAME,
    "user",
  ];

  const { isValid, errors } = validateUploadFields(
    bankAccounts,
    requiredFields,
  );
  if (!isValid) {
    throw new ApplicationError(errors);
  }

  return { isValid: true, errors: "" };
}

export const checkLookupBankAccountFields = (body: any) => {
  const requiredFields = ["bin", "accountNumber"];
  return validateFields(body, requiredFields);
};

export function setQueryBankAccount(ctx) {
  let filters = {};
  const { user } = ctx.state;
  const role = user.role;
  if (role.type.toUpperCase() === ROLE.SALE.toUpperCase()) {
    filters = { ...filters, ...{ user: { sale: user.id } } };
  } else if (role.type.toUpperCase() === ROLE.CUSTOMER.toUpperCase()) {
    filters = { ...filters, ...{ user: user.id } };
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
    bank: { fields: ["name"] },
    user: {
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
