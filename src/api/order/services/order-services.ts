import {
  CARRIER_ZONE_ROUTE,
  USER_PRICE_SHEET_ROUTE,
} from "../../../helper/constants";
import { carrierType } from "./utils";
const { NotFoundError, ValidationError } = require("@strapi/utils").errors;

// need to hard code when add another zone
export enum ZONE_TYPE {
  SAME_PROVINCE = "Nội Tỉnh",
  SAME_ZONE = "Nội Vùng",
  DIFFERENT_ZONE = "Liên Vùng",
  // HCM_ZONE = "Hồ Chí Minh",
  // HN_ZONE = "Hà Nội",
}

export const checkRegion = async (
  fromProvinceCode: number,
  toProvinceCode: number,
  carrier: number,
) => {
  const fromRegion = await strapi
    .service(CARRIER_ZONE_ROUTE)
    .findOneCarrierZone(fromProvinceCode, carrier);

  const toRegion = await strapi
    .service(CARRIER_ZONE_ROUTE)
    .findOneCarrierZone(toProvinceCode, carrier);

  if (fromProvinceCode === toProvinceCode) {
    // if (fromRegion.region_name === "HCM")
    //   return {
    //     zone_type: ZONE_TYPE.HCM_ZONE,
    //     zone_pick: fromRegion.region_name,
    //   };
    // else if (fromRegion.region_name === "HN")
    //   return {
    //     zone_type: ZONE_TYPE.HN_ZONE,
    //     zone_pick: fromRegion.region_name,
    //   };
    return {
      zone_type: ZONE_TYPE.SAME_PROVINCE,
      zone_pick: fromRegion.region_name,
    };
  }

  if (fromRegion.region_name === toRegion.region_name) {
    // if (fromRegion.region_name === "HCM")
    //   return {
    //     zone_type: ZONE_TYPE.HCM_ZONE,
    //     zone_pick: fromRegion.region_name,
    //   };
    // else if (fromRegion.region_name === "HN")
    //   return {
    //     zone_type: ZONE_TYPE.HN_ZONE,
    //     zone_pick: fromRegion.region_name,
    //   };
    return {
      zone_type: ZONE_TYPE.SAME_ZONE,
      zone_pick: fromRegion.region_name,
    };
  } else {
    return {
      zone_type: ZONE_TYPE.DIFFERENT_ZONE,
      zone_pick: fromRegion.region_name,
    };
  }
};

const calculateFee = (sheet: any, weight: number): number => {
  const {
    sale_price,
    step_price,
    from_weight,
    // return_fee,
  } = sheet;

  return (
    new Array(Math.floor(weight - from_weight))
      .fill(undefined)
      .reduce((acc, _) => {
        return acc + step_price;
      }, 0) + sale_price
  );
};

export async function getPriceItem(
  priceItems: any[],
  fromProvinceCode: number,
  toProvinceCode: number,
  weight: number,
  carrier: number,
) {
  const { zone_type, zone_pick } = await checkRegion(
    fromProvinceCode,
    toProvinceCode,
    carrier,
  );

  const price_item = priceItems.find((price) => {
    return (
      weight >= price.from_weight &&
      weight <= price.to_weight &&
      price.zone_type === zone_type &&
      price.zone_pick.filter((zP) => zP.name === zone_pick).length !== 0
    );
  });

  return price_item;
}

const shipmentFee = async (
  priceItems: any[],
  fromProvinceCode: number,
  toProvinceCode: number,
  weight: number,
  carrier: number,
): Promise<number> => {
  const price_item = await getPriceItem(
    priceItems,
    fromProvinceCode,
    toProvinceCode,
    weight,
    carrier,
  );
  if (!price_item) {
    return null;
  }

  return getPriceStrategies["calculateFee"](price_item, weight);
};

const insuranceFee = (parcelValue: number): number => {
  return (0.5 / 100) * parcelValue;
};

const calculateReturnFee = (price_item: any, weight: number) => {
  return (
    price_item.return_fee *
    getPriceStrategies["calculateFee"](price_item, weight)
  );
};

export const getPriceStrategies = {
  insurance: insuranceFee,
  shipment: shipmentFee,
  calculateReturnFee: calculateReturnFee,
  calculateFee: calculateFee,
};

export const calculateShipmentFee = async (
  parcelValue: number,
  priceItems: any[],
  fromProvinceCode: number,
  toProvinceCode: number,
  weight: number,
  has_insurance: boolean,
  carrier: number,
): Promise<number | null> => {
  if (parcelValue < 0 || weight < 0) {
    return 0;
  }
  const shipmentFee = await getPriceStrategies["shipment"](
    priceItems,
    fromProvinceCode,
    toProvinceCode,
    weight,
    carrier,
  );
  if (shipmentFee === null) return null;
  return Number(
    (
      (has_insurance ? getPriceStrategies["insurance"](parcelValue) : 0) +
      shipmentFee
    ).toFixed(2),
  );
};

export async function transformOrderPayment(order: any, carrier: string) {
  if (order.payment_type_id !== 1 && order.payment_type_id !== 2) {
    throw new ValidationError(
      "Loại thanh toán phải shop trả ship hoặc khách trả ship",
    );
  }
  const insurance_fee = order.has_insurance
    ? getPriceStrategies["insurance"](order.parcel_value).toFixed(2)
    : 0;

  const userPriceSheet = await strapi
    .service(USER_PRICE_SHEET_ROUTE)
    .getPriceSheetByUserIdAndCarrier(order.customer, carrier);
  if (!userPriceSheet) {
    throw new NotFoundError(
      `Bảng giá cho nhà vận chuyển ${carrier} không được tìm thấy trên user với id: ${order.customer}.`,
    );
  }

  const pCarrier = userPriceSheet.price_sheet.carrier;

  const price_items = userPriceSheet.price_sheet.price_items;

  const convertedWeight = convertWeight(
    order.weight,
    order.height,
    order.width,
    order.length,
    pCarrier.name,
  );

  const price_item = await getPriceItem(
    price_items,
    order.from_province_code,
    order.to_province_code,
    convertedWeight,
    pCarrier.id,
  );

  if (!price_item) {
    throw new NotFoundError(
      `Không tìm thấy mục giá(price_item) cho nhà vận chuyển ${carrier} trên user với id: ${order.customer}`,
    );
  }

  let shipment_fee = getPriceStrategies["calculateFee"](
    price_item,
    convertedWeight,
  );

  return {
    ...order,
    insurance_fee,
    carrier: pCarrier.id,
    weight: convertedWeight,
    price_sheet: userPriceSheet.price_sheet.id,
    shipment_fee,
    custom: price_item.custom,
    carrier_account: price_item.carrier_account,
  };
}

export function convertWeight(
  weight: number,
  height: number | undefined | null,
  width: number | undefined | null,
  length: number | undefined | null,
  carrierName: string,
) {
  weight = Math.round(Number(weight) * 100) / 100;
  let conversionRateWeight = weight;

  if (height && width && length) {
    if (carrierName === carrierType.NINJAVAN) {
      conversionRateWeight = (width * height * length) / 6000;
    } else {
      conversionRateWeight = (width * height * length) / 5000;
    }
    if (conversionRateWeight <= weight) {
      conversionRateWeight = weight;
    }
  }
  return Math.round(Number(conversionRateWeight) * 100) / 100;
}
