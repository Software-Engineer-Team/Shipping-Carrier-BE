import { CARRIER_ACCOUNT_ROUTE } from "../../../helper/constants";
import { validateFields } from "../../../helper/excelHelper";

export const validatePriceItems = async (
  priceItems: any[],
  isUpdated: boolean = false,
): Promise<any> => {
  const requiredFields = [
    "from_weight",
    "to_weight",
    "purchase_price",
    "sale_price",
    "step_price",
    "return_fee",
    "carrier_account",
    "zone_type",
    "zone_pick",
  ];

  const zone_types = [
    "Nội Tỉnh",
    "Nội Vùng",
    "Liên Vùng",
    "Hồ Chí Minh",
    "Hà Nội",
  ];

  const zone_picks = ["MB", "MT", "MN", "HCM", "HN"];

  // Check dupplicate priceItem
  const new_price_items = [];
  for (const priceItem of priceItems) {
    const { isValid, errors } = validateFields(priceItem, requiredFields);
    if (!isValid)
      return {
        errors,
        isValid,
      };
    if (priceItem.from_weight < 0 || priceItem.to_weight < 0) {
      return {
        errors:
          "Trọng lượng đơn hàng không hợp lệ. Giá trị weight phải là số dương.",
        isValid: false,
      };
    }
    const existedCarrierAccount = await strapi
      .service(CARRIER_ACCOUNT_ROUTE)
      .findCarrierAccountByName(
        !isUpdated
          ? priceItem.carrier_account
          : priceItem.carrier_account.account_name,
      );

    console.log(existedCarrierAccount);

    const existed_zone_type = zone_types.includes(priceItem.zone_type);

    if (!existed_zone_type) {
      return {
        errors: `Loại vùng không hợp lệ. Giá trị loại vùng phải là một trong các loại sau: ${zone_types.join(
          ",",
        )}`,
        isValid: false,
      };
    }

    const existed_zone_pick =
      zone_picks.filter((zonePick) =>
        priceItem.zone_pick.map((zP) => zP.name).includes(zonePick),
      ).length !== 0;
    if (!existed_zone_pick) {
      return {
        errors: `Vùng lấy hàng không hợp lệ. Giá trị vùng lấy hàng phải là một trong các loại sau: ${zone_picks.join(
          ",",
        )}`,
        isValid: false,
      };
    }

    for (let priceI of new_price_items) {
      if (
        priceI.from_weight === priceItem.from_weight &&
        priceI.to_weight === priceItem.to_weight &&
        priceI.zone_type === priceItem.zone_type &&
        priceI.zone_pick.filter((zonePick) =>
          priceItem.zone_pick.map((zP) => zP.name).includes(zonePick.name),
        ).length !== 0
      ) {
        return {
          errors: `Vùng lấy hàng không hợp lệ do trùng lặp từ cân nặng: ${priceI.from_weight}, đến cân nặng: ${priceI.to_weight}, thuộc loại vùng: ${priceI.zone_type} thuộc tài khoản vận chuyển: ${existedCarrierAccount.account_name}. Giá trị vùng lấy hàng phải là duy nhất.`,
          isValid: false,
        };
      }
    }

    new_price_items.push({
      ...priceItem,
      carrier_account: existedCarrierAccount.id,
    });
  }

  return {
    errors: "",
    isValid: true,
    new_price_items,
  };
};
