import { factories } from "@strapi/strapi";
import { BANK_ROUTE } from "../../../helper/constants";
import { Logger } from "../../../helper/logger/logger";
import { apiAxios } from "../../../helper/apiHelper";
import { checkLookupBankAccountFields } from "../services/utils";
import { sanitizeOutput } from "../../../helper/transform";
const BANKS_API_URL = "https://api.vietqr.io";

export default factories.createCoreController(BANK_ROUTE, ({ strapi }) => ({
  async lookupBank(ctx) {
    const logger = new Logger("lookupBank").getLogger();
    try {
      const { isValid, errors } = checkLookupBankAccountFields(
        ctx.request.body.data,
      );
      if (!isValid) return ctx.badRequest(errors);

      const response = await apiAxios({
        method: "post",
        url: `${BANKS_API_URL}/v2/lookup`,
        headers: {
          "x-client-id": "5371e94e-2543-4d7f-a03b-b62af3ea2ec8",
          "x-api-key": "b3d5ea44-af78-4f5d-aebf-eb650d7ac3ea",
        },
        data: ctx.request.body.data,
      });
      return {
        data: response.data.data,
      };
    } catch (error) {
      console.log("Error", error);
      ctx.throw(500, error);
    }
  },
  async findBanks(ctx) {
    const logger = new Logger("findBanks").getLogger();
    try {
      const response = await apiAxios({
        method: "get",
        url: `${BANKS_API_URL}/v2/banks`,
      });
      return {
        ...sanitizeOutput(response.data, [
          "short_name",
          "isTransfer",
          "swift_code",
          "transferSupported",
          "lookupSupported",
          "support",
        ]),
      };
    } catch (error) {
      console.log("Error", error);
      ctx.throw(500, error);
    }
  },
}));
