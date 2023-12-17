import { validateFields } from "../../../helper/excelHelper";
import { ordersAttributes } from "../../order/services/utils";

export const checkCreateAddressFields = (body: any) => {
  const requiredFields = [
    ordersAttributes.FROM_NAME,
    ordersAttributes.FROM_PHONE_NUMBER,
    ordersAttributes.FROM_ADDRESS,
    ordersAttributes.FROM_WARD,
    ordersAttributes.FROM_WARD_CODE,
    ordersAttributes.FROM_DISTRICT,
    ordersAttributes.FROM_DISTRICT_CODE,
    ordersAttributes.FROM_PROVINCE,
    ordersAttributes.FROM_PROVINCE_CODE,
    "user",
  ];
  return validateFields(body, requiredFields);
};
