import {
  ADDRESS_ROUTE,
  BANK_ACCOUNT_ROUTE,
  USER_PRICE_SHEET_ROUTE,
  USER_ROUTE,
} from "./helper/constants";
import { StrapIOInit } from "./helper/socket.io/init";
import { initializeBanks } from "./utils/initBanks";
import { initializeCarrierAccounts } from "./utils/initCarrierAccounts";
import { initializeCarrierZones } from "./utils/initCarrierZones";
import { initializeCarriers } from "./utils/initCarriers";
import { initializePriceSheets } from "./utils/initPriceSheets";
import { initializeProvinces } from "./utils/initProvince";
import { initializeRoles } from "./utils/setupRoles";

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register({ strapi }) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }) {
    // init roles
    await initializeRoles(strapi);

    // init carriers
    await initializeCarriers(strapi);

    // init carrier-accounts
    await initializeCarrierAccounts(strapi);

    // init provinces
    await initializeProvinces(strapi);

    if (
      process.env.NODE_ENV === "development" ||
      process.env.NODE_ENV === "staging"
    ) {
      // init carrier-zone
      initializeCarrierZones(strapi);

      // init banks
      await initializeBanks(strapi);
    }

    // init priceSheets
    const initedPriceSheets = await initializePriceSheets(strapi);

    // change default role when registering user with /api/auth/local/register
    strapi.db.lifecycles.subscribe({
      models: [USER_ROUTE],
      async beforeCreate(event: any) {
        const { data } = event.params;
        console.log(
          "beforeCreate user: ",
          strapi.requestContext.get().request.body,
        );
        data.role = strapi.requestContext.get().request.body.role;
        data.address = strapi.requestContext.get().request.body.address;
        data.bank = strapi.requestContext.get().request.body.bank;
      },
      async afterCreate({ result, params }) {
        console.log("params", params);
        const { data } = params;
        const userPriceSheets = await Promise.all(
          initedPriceSheets.map(async (priceSheet) => {
            return await strapi
              .service(USER_PRICE_SHEET_ROUTE)
              .createUserPriceSheet(result.id, priceSheet.id);
          }),
        );

        console.log("userPriceSheets: ", userPriceSheets);

        if (data.address) {
          const userAddress = await strapi
            .service(ADDRESS_ROUTE)
            .createAddress({ ...data.address, user: result.id });

          console.log("userAddress: ", userAddress);
        }

        if (data.bank) {
          const userBankAccount = await strapi
            .service(BANK_ACCOUNT_ROUTE)
            .createBankAccount({ ...data.bank, user: result.id });

          console.log("userBankAccount: ", userBankAccount);
        }

        console.log("user created!", result);
      },
    });

    StrapIOInit();
  },
};
