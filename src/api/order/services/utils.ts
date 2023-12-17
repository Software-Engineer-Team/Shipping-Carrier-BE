import moment from "moment/moment";
import {
  validateFields,
  validateUploadFields,
} from "../../../helper/excelHelper";
import { ROLE } from "../../../helper/apiHelper";
import { ORDER_ROUTE } from "../../../helper/constants";
import { ZONE_TYPE, checkRegion } from "./order-services";
import { sanitizeOutput } from "../../../helper/transform";

export enum carrierType {
  NINJAVAN = "NINJAVAN",
  GHN = "GHN",
  GHTK = "GHTK",
}

export enum ordersAttributes {
  FROM_NAME = "from_name",
  FROM_PHONE_NUMBER = "from_phone_number",
  FROM_ADDRESS = "from_address",
  FROM_PROVINCE = "from_province",
  FROM_PROVINCE_CODE = "from_province_code",
  FROM_DISTRICT = "from_district",
  FROM_DISTRICT_CODE = "from_district_code",
  FROM_WARD = "from_ward",
  FROM_WARD_CODE = "from_ward_code",
  TO_NAME = "to_name",
  TO_PHONE_NUMBER = "to_phone_number",
  TO_ADDRESS = "to_address",
  TO_PROVINCE = "to_province",
  TO_PROVINCE_CODE = "to_province_code",
  TO_DISTRICT = "to_district",
  TO_DISTRICT_CODE = "to_district_code",
  TO_WARD = "to_ward",
  TO_WARD_CODE = "to_ward_code",
  DELIVERY_INSTRUCTIONS = "delivery_instructions",
  MERCHANT_ORDER_NUMBER = "merchant_order_number",
  TRACKING_ID = "tracking_id",
  COD = "cash_on_delivery",
  CUSTOMER = "customer",
  SHIPMENT_FEE = "shipment_fee",
  WEIGHT = "weight",
  CARRIER = "carrier",
  PARCEL_VALUE = "parcel_value",
  REFERENCE_CODE = "reference_code",
  HAS_INSURANCE = "has_insurance",
  PAYMENT_TYPE_ID = "payment_type_id",
  PRODUCT_NAME = "product_name",
  OTHER_FEE = "other_fee",
  CHANGE_FEE = "change_fee",
}

export enum excelOrdersAttributes {
  // CUSTOMER_CODE = "Mã khách hàng",
  SENDER = "Người gửi",
  SENDER_PHONE_NUMBER = "Số điện thoại người gửi",
  SENDING_PROVINCE = "Tỉnh gửi",
  SENDING_PROVINCE_CODE = "Mã tỉnh gửi",
  SENDING_DISTRICT = "Quận gửi",
  SENDING_DISTRICT_CODE = "Mã quận gửi",
  SENDING_WARD = "Phường gửi",
  SENDING_WARD_CODE = "Mã phường gửi",
  SENDING_ADDRESS = "Địa chỉ gửi",
  RECIEVER = "Người nhận",
  RECIEVER_PHONE_NUMBER = "Số điện thoại người nhận",
  RECIEVING_PROVINCE = "Tỉnh nhận",
  RECIEVING_PROVINCE_CODE = "Mã tỉnh nhận",
  RECIEVING_DISTRICT = "Quận nhận",
  RECIEVING_DISTRICT_CODE = "Mã quận nhận",
  RECIEVING_WARD = "Phường nhận",
  RECIEVING_WARD_CODE = "Mã phường nhận",
  RECIEVING_ADDRESS = "Địa chỉ nhận",
  PARCEL_VALUE = "Giá trị hàng",
  REFERENCE_CODE = "Mã tham chiếu",
  COD = "Tiền thu hộ",
  WEIGHT = "Trọng lượng",
  NOTE = "Ghi chú",
}

export enum baseOrderStatus {
  PENDING_PICKUP = "Đang chờ lấy hàng",
  GOODS_IN_TRANSIT = "Đang vận chuyển",
  DELIVERY_FAILED = "Vận chuyển thất bại",
  RETURN_TO_SENDER = "Trả lại cho người gửi",
  DELIVERY_SUCCESSFUL = "Giao hàng thành công",
  CANCEL_ORDER = "Đơn hàng hủy",
}

export const checkTrackingOrder = (order: any) => {
  if (order.status === baseOrderStatus.DELIVERY_SUCCESSFUL) {
    return {
      errors: `Đơn hàng ${order.tracking_id} đã được giao thành công.`,
      isValid: false,
    };
  } else if (order.status === baseOrderStatus.RETURN_TO_SENDER) {
    return {
      errors: `Đơn hàng ${order.tracking_id} đã được trả lại cho người gửi.`,
      isValid: false,
    };
  }
  return {
    errors: ``,
    isValid: true,
  };
};

export const mappingExcelOrders = (excelOrders: any[]) => {
  const result = excelOrders.map((order) => {
    for (const [key, _] of Object.entries(order)) {
      const mappedObject = renameExcelOrderKeys(order, key);
    }
    return order;
  });
  return result;
};

const renameKeyField = (myObject: any, oldKey: string, newKey: string): any => {
  myObject[`${newKey}`] = myObject[`${oldKey}`];
  delete myObject[`${oldKey}`];
  return myObject;
};

const renameExcelOrderKeys = (myObject: any, key: string) => {
  switch (key) {
    // case excelOrdersAttributes.CUSTOMER_CODE:
    //   return renameKeyField(myObject, key, ordersAttributes.CUSTOMER);
    case excelOrdersAttributes.SENDER:
      return renameKeyField(myObject, key, ordersAttributes.FROM_NAME);
    case excelOrdersAttributes.SENDING_ADDRESS:
      return renameKeyField(myObject, key, ordersAttributes.FROM_ADDRESS);
    case excelOrdersAttributes.SENDER_PHONE_NUMBER:
      return renameKeyField(myObject, key, ordersAttributes.FROM_PHONE_NUMBER);
    case excelOrdersAttributes.SENDING_PROVINCE:
      return renameKeyField(myObject, key, ordersAttributes.FROM_PROVINCE);
    case excelOrdersAttributes.SENDING_WARD:
      return renameKeyField(myObject, key, ordersAttributes.FROM_WARD);
    case excelOrdersAttributes.SENDING_DISTRICT:
      return renameKeyField(myObject, key, ordersAttributes.FROM_DISTRICT);
    case excelOrdersAttributes.SENDING_PROVINCE_CODE:
      return renameKeyField(myObject, key, ordersAttributes.FROM_PROVINCE_CODE);
    case excelOrdersAttributes.SENDING_DISTRICT_CODE:
      return renameKeyField(myObject, key, ordersAttributes.FROM_DISTRICT_CODE);
    case excelOrdersAttributes.SENDING_WARD_CODE:
      return renameKeyField(myObject, key, ordersAttributes.FROM_WARD_CODE);
    case excelOrdersAttributes.RECIEVER:
      return renameKeyField(myObject, key, ordersAttributes.TO_NAME);
    case excelOrdersAttributes.RECIEVING_ADDRESS:
      return renameKeyField(myObject, key, ordersAttributes.TO_ADDRESS);
    case excelOrdersAttributes.RECIEVER_PHONE_NUMBER:
      return renameKeyField(myObject, key, ordersAttributes.TO_PHONE_NUMBER);
    case excelOrdersAttributes.RECIEVING_PROVINCE:
      return renameKeyField(myObject, key, ordersAttributes.TO_PROVINCE);
    case excelOrdersAttributes.RECIEVING_WARD:
      return renameKeyField(myObject, key, ordersAttributes.TO_WARD);
    case excelOrdersAttributes.RECIEVING_DISTRICT:
      return renameKeyField(myObject, key, ordersAttributes.TO_DISTRICT);
    case excelOrdersAttributes.RECIEVING_PROVINCE_CODE:
      return renameKeyField(myObject, key, ordersAttributes.TO_PROVINCE_CODE);
    case excelOrdersAttributes.RECIEVING_DISTRICT_CODE:
      return renameKeyField(myObject, key, ordersAttributes.TO_DISTRICT_CODE);
    case excelOrdersAttributes.RECIEVING_WARD_CODE:
      return renameKeyField(myObject, key, ordersAttributes.TO_WARD_CODE);
    case excelOrdersAttributes.REFERENCE_CODE:
      return renameKeyField(myObject, key, ordersAttributes.REFERENCE_CODE);
    case excelOrdersAttributes.COD:
      return renameKeyField(myObject, key, ordersAttributes.COD);
    case excelOrdersAttributes.WEIGHT:
      return renameKeyField(myObject, key, ordersAttributes.WEIGHT);
    case excelOrdersAttributes.NOTE:
      return renameKeyField(
        myObject,
        key,
        ordersAttributes.DELIVERY_INSTRUCTIONS,
      );
    case excelOrdersAttributes.PARCEL_VALUE:
      return renameKeyField(myObject, key, ordersAttributes.PARCEL_VALUE);
    default:
      break;
  }
};

export const mappingNinjaOrderStatus = (status: string): any => {
  console.log("status", status);
  switch (status) {
    case "Pending Pickup":
      return {
        orderStatus: baseOrderStatus.PENDING_PICKUP,
        trackingStatus: baseOrderStatus.PENDING_PICKUP,
      };
    case "En-route to Sorting Hub":
      return {
        orderStatus: baseOrderStatus.GOODS_IN_TRANSIT,
        trackingStatus: "Vào trạm phân loại",
      };
    case "Arrived at Sorting Hub":
      return {
        orderStatus: baseOrderStatus.GOODS_IN_TRANSIT,
        trackingStatus: "Đã vào trạm phân loại",
      };
    case "Arrived at Origin Hub":
      return {
        orderStatus: baseOrderStatus.GOODS_IN_TRANSIT,
        trackingStatus: "Đã vào trung tâm gốc",
      };
    case "Successful Pickup":
      return {
        orderStatus: baseOrderStatus.GOODS_IN_TRANSIT,
        trackingStatus: "Lấy hàng thành công",
      };
    case "Transferred to 3PL":
      return {
        orderStatus: baseOrderStatus.GOODS_IN_TRANSIT,
        trackingStatus: "Đã chuyển sang 3PL",
      };
    case "On Vehicle for Delivery":
    case "Staging":
      return {
        orderStatus: baseOrderStatus.GOODS_IN_TRANSIT,
        trackingStatus: "Đang giao hàng",
      };
    case "Pending Reschedule":
      return {
        orderStatus: baseOrderStatus.DELIVERY_FAILED,
        trackingStatus: "Chờ đặt lại lịch giao hàng",
      };
    case "Pickup Fail":
      return {
        orderStatus: baseOrderStatus.PENDING_PICKUP,
        trackingStatus: "Lấy hàng thất bại",
      };
    case "First Attempt Delivery Fail":
      return {
        orderStatus: baseOrderStatus.DELIVERY_FAILED,
        trackingStatus: "Giao hàng lần đầu không thành công",
      };
    case "Returned to Sender":
      return {
        orderStatus: baseOrderStatus.RETURN_TO_SENDER,
        trackingStatus: baseOrderStatus.RETURN_TO_SENDER,
      };
    case "Arrived at Distribution Point":
      return {
        orderStatus: baseOrderStatus.GOODS_IN_TRANSIT,
        trackingStatus: "Đã vào trạm phân phối",
      };
    case "Van en-route to pickup":
      return {
        orderStatus: baseOrderStatus.PENDING_PICKUP,
        trackingStatus: baseOrderStatus.PENDING_PICKUP,
      };

    case "Parcel Weight":
    case "Parcel Measurements Update":
      return {
        orderStatus: baseOrderStatus.GOODS_IN_TRANSIT,
        trackingStatus: "Trọng lượng bưu kiện của đơn hàng đã thay đổi",
      };

    case "Successful Delivery":
    case "Completed":
      return {
        orderStatus: baseOrderStatus.DELIVERY_SUCCESSFUL,
        trackingStatus: baseOrderStatus.DELIVERY_SUCCESSFUL,
      };
    case "Cancelled":
      return {
        orderStatus: baseOrderStatus.CANCEL_ORDER,
        trackingStatus: baseOrderStatus.CANCEL_ORDER,
      };
    default:
      return {
        orderStatus: null,
        trackingStatus: null,
      };
  }
};

export const mappingGHNOrderStatus = (status: string) => {
  switch (status) {
    case "ready_to_pick":
      return {
        orderStatus: baseOrderStatus.PENDING_PICKUP,
        trackingStatus: "Mới tạo đơn hàng",
      };
    case "picking":
      return {
        orderStatus: baseOrderStatus.PENDING_PICKUP,
        trackingStatus: "Nhân viên đang lấy hàng",
      };
    case "cancel":
      return {
        orderStatus: baseOrderStatus.CANCEL_ORDER,
        trackingStatus: baseOrderStatus.CANCEL_ORDER,
      };
    case "money_collect_picking":
      return {
        orderStatus: baseOrderStatus.PENDING_PICKUP,
        trackingStatus: "Người lấy hàng đang tương tác với người bán",
      };
    case "picked":
      return {
        orderStatus: baseOrderStatus.GOODS_IN_TRANSIT,
        trackingStatus: "Nhân viên đã lấy hàng",
      };
    case "storing":
      return {
        orderStatus: baseOrderStatus.GOODS_IN_TRANSIT,
        trackingStatus: "Hàng đang nằm ở kho",
      };
    case "sorting":
      return {
        orderStatus: baseOrderStatus.GOODS_IN_TRANSIT,
        trackingStatus: "Hàng đang được phân loại",
      };
    case "transporting":
      return {
        orderStatus: baseOrderStatus.GOODS_IN_TRANSIT,
        trackingStatus: baseOrderStatus.GOODS_IN_TRANSIT,
      };
    case "delivering":
      return {
        orderStatus: baseOrderStatus.GOODS_IN_TRANSIT,
        trackingStatus: "Đang giao hàng",
      };
    case "money_collect_delivering":
      return {
        orderStatus: baseOrderStatus.GOODS_IN_TRANSIT,
        trackingStatus: "Người lấy hàng đang tương tác với người mua",
      };
    case "delivered":
      return {
        orderStatus: baseOrderStatus.DELIVERY_SUCCESSFUL,
        trackingStatus: baseOrderStatus.DELIVERY_SUCCESSFUL,
      };
    case "delivery_fail":
      return {
        orderStatus: baseOrderStatus.DELIVERY_FAILED,
        trackingStatus: "Nhân viên giao hàng thất bại",
      };
    case "waiting_to_return":
      return {
        orderStatus: baseOrderStatus.GOODS_IN_TRANSIT,
        trackingStatus: "Đang đợi trả hàng về cho người gửi",
      };
    case "return":
      return {
        orderStatus: baseOrderStatus.GOODS_IN_TRANSIT,
        trackingStatus: "Trả hàng",
      };
    case "return_transporting":
      return {
        orderStatus: baseOrderStatus.GOODS_IN_TRANSIT,
        trackingStatus: "Đang luân chuyển hàng trả",
      };
    case "returning":
      return {
        orderStatus: baseOrderStatus.GOODS_IN_TRANSIT,
        trackingStatus: "Nhân viên đang đi trả hàng",
      };
    case "return_sorting":
      return {
        orderStatus: baseOrderStatus.GOODS_IN_TRANSIT,
        trackingStatus: "Đang phân loại hàng trả",
      };
    case "return_fail":
      return {
        orderStatus: baseOrderStatus.DELIVERY_FAILED,
        trackingStatus: "Gửi lại không thành công",
      };
    case "returned":
      return {
        orderStatus: baseOrderStatus.RETURN_TO_SENDER,
        trackingStatus: "Nhân viên trả hàng thành công",
      };
    case "exception":
      return {
        orderStatus: baseOrderStatus.CANCEL_ORDER,
        trackingStatus: "Đơn hàng ngoại lệ không nằm trong quy trình",
      };
    case "damage":
      return {
        orderStatus: baseOrderStatus.CANCEL_ORDER,
        trackingStatus: "Hàng hóa bị hư hỏng",
      };
    case "lost":
      return {
        orderStatus: baseOrderStatus.CANCEL_ORDER,
        trackingStatus: "hàng hóa bị mất",
      };
    default:
      return {
        orderStatus: null,
        trackingStatus: null,
      };
  }
};

export const mappingGHTKOrderStatus = (status: number) => {
  switch (status) {
    case -1:
      return {
        orderStatus: baseOrderStatus.CANCEL_ORDER,
        trackingStatus: "Hủy đơn hàng",
      };
    case 1:
      return {
        orderStatus: baseOrderStatus.PENDING_PICKUP,
        trackingStatus: "Chưa tiếp nhận",
      };
    case 2:
      return {
        orderStatus: baseOrderStatus.PENDING_PICKUP,
        trackingStatus: "Đã tiếp nhận",
      };
    case 3:
      return {
        orderStatus: baseOrderStatus.GOODS_IN_TRANSIT,
        trackingStatus: "Đã lấy hàng/Đã nhập kho",
      };
    case 4:
      return {
        orderStatus: baseOrderStatus.GOODS_IN_TRANSIT,
        trackingStatus: "Đã điều phối giao hàng/Đang giao hàng",
      };
    case 5:
      return {
        orderStatus: baseOrderStatus.DELIVERY_SUCCESSFUL,
        trackingStatus: "Đã giao hàng/Chưa đối soát",
      };
    case 6:
      return {
        orderStatus: baseOrderStatus.DELIVERY_SUCCESSFUL,
        trackingStatus: "Đã giao hàng/Đã đối soát",
      };
    case 7:
      return {
        orderStatus: baseOrderStatus.PENDING_PICKUP,
        trackingStatus: "Không lấy được hàng",
      };
    case 8:
      return {
        orderStatus: baseOrderStatus.PENDING_PICKUP,
        trackingStatus: "Hoãn lấy hàng",
      };
    case 9:
      return {
        orderStatus: baseOrderStatus.DELIVERY_FAILED,
        trackingStatus: "Không giao được hàng",
      };
    case 10:
      return {
        orderStatus: baseOrderStatus.DELIVERY_FAILED,
        trackingStatus: "Delay giao hàng",
      };
    case 11:
      return {
        orderStatus: baseOrderStatus.RETURN_TO_SENDER,
        trackingStatus: "Đã đối soát công nợ trả hàng",
      };
    case 12:
      return {
        orderStatus: baseOrderStatus.PENDING_PICKUP,
        trackingStatus: "Đã điều phối lấy hàng/Đang lấy hàng",
      };
    case 13:
      return {
        orderStatus: baseOrderStatus.CANCEL_ORDER,
        trackingStatus: "Đơn hàng bồi hoàn",
      };
    case 20:
      return {
        orderStatus: baseOrderStatus.GOODS_IN_TRANSIT,
        trackingStatus: "Đang trả hàng (COD cầm hàng đi trả)",
      };
    case 21:
      return {
        orderStatus: baseOrderStatus.RETURN_TO_SENDER,
        trackingStatus: "Đã trả hàng (COD đã trả xong hàng)",
      };
    case 123:
      return {
        orderStatus: baseOrderStatus.GOODS_IN_TRANSIT,
        trackingStatus: "Shipper báo đã lấy hàng",
      };
    case 127:
      return {
        orderStatus: baseOrderStatus.PENDING_PICKUP,
        trackingStatus:
          "Shipper (nhân viên lấy/giao hàng) báo không lấy được hàng",
      };
    case 128:
      return {
        orderStatus: baseOrderStatus.PENDING_PICKUP,
        trackingStatus: "Shipper báo delay lấy hàng",
      };
    case 45:
      return {
        orderStatus: baseOrderStatus.DELIVERY_SUCCESSFUL,
        trackingStatus: "Shipper báo đã giao hàng",
      };
    case 49:
      return {
        orderStatus: baseOrderStatus.DELIVERY_FAILED,
        trackingStatus: "Shipper báo không giao được giao hàng",
      };
    case 410:
      return {
        orderStatus: baseOrderStatus.DELIVERY_FAILED,
        trackingStatus: "Shipper báo delay giao hàng",
      };
    default:
      return {
        orderStatus: null,
        trackingStatus: null,
      };
  }
};

function generateRandomString(length: number) {
  // const length = Math.floor(Math.random() * (24 - 6 + 1) + 6); // generate random length between 6-24
  const characters =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

export function transformNinjaFormat(data: any) {
  const requestedTrackingNumber = data.merchant_order_number
    ? data.merchant_order_number
    : generateRandomString(10);
  const pickup_service_type = data.pickup_service_level;
  const start_time = "09:00",
    end_time = "22:00";
  const time = isTimeOutOfRange(start_time, end_time, pickup_service_type)
    ? moment().utcOffset(7).add(1, "day").format("YYYY-MM-DD")
    : moment().utcOffset(7).format("YYYY-MM-DD");
  return {
    service_type: `${data.service_type ?? "Parcel"}`,
    service_level: "Standard",
    requested_tracking_number: `${requestedTrackingNumber}`,
    reference: {
      merchant_order_number: "SHIP-1234-56789",
    },
    from: {
      name: `${data.from_name}`,
      phone_number: `${data.from_phone_number}`,
      email: "shoptoanquocghtk@gmail.com",
      address:
        process.env.NODE_ENV === "production"
          ? {
            address1: `${data.from_address}`,
            ward: `${data.from_ward}`,
            district: ` ${data.from_district}`,
            city: `${data.from_province}`,
            country: "VN",
          }
          : {
            address1: `${data.from_address}, ${data.from_ward}, ${data.from_district}, ${data.from_province}`,
            country: "SG",
            postcode: "189930",
          },
    },
    to: {
      name: `${data.to_name}`,
      phone_number: `${data.to_phone_number}`,
      email: "shoptoanquocnjv@gmail.com",
      address:
        process.env.NODE_ENV === "production"
          ? {
            address1: `${data.to_address}`,
            ward: `${data.to_ward}`,
            district: ` ${data.to_district}`,
            city: `${data.to_province}`,
            country: "VN",
          }
          : {
            address1: `${data.to_address}, ${data.to_ward}, ${data.to_district}, ${data.to_province}`,
            country: "SG",
            postcode: "189931",
          },
    },
    parcel_job: {
      is_pickup_required: true,
      cash_on_delivery:
        Number(data.cash_on_delivery ?? 0) +
        (data.payment_type_id == 2
          ? Number(data.shipment_fee ?? 0) +
          Number(data.insurance_fee ?? 0) +
          Number(data.return_fee ?? 0)
          : 0),
      pickup_service_type: "Scheduled",
      pickup_service_level: `${pickup_service_type ?? "Standard"}`,
      pickup_date: time,
      insured_value: Number(data.insurance_fee ?? 0),
      pickup_timeslot: {
        start_time: start_time,
        end_time: end_time,
        timezone:
          process.env.NODE_ENV === "production"
            ? "Asia/Ho_Chi_Minh"
            : "Asia/Singapore",
      },
      pickup_instructions: "Pickup with care!",
      delivery_instructions: `${data.delivery_instructions}`,
      delivery_start_date: time,
      delivery_timeslot: {
        start_time: start_time,
        end_time: end_time,
        timezone:
          process.env.NODE_ENV === "production"
            ? "Asia/Ho_Chi_Minh"
            : "Asia/Singapore",
      },
      dimensions: {
        weight: Number(data.weight),
      },
      items: [
        {
          item_description: `${data.product_name}`,
          quantity: 1,
          is_dangerous_good: false,
        },
      ],
    },
  };
}

export function transformGHTKFormat(data: any) {
  return {
    products: [
      {
        name: `${data.product_name}`,
        weight: Number(data.weight),
        height: Number(data.weight) >= 20 ? 10 : undefined,
        length: Number(data.weight) >= 20 ? 10 : undefined,
        width: Number(data.weight) >= 20 ? 10 : undefined,
        quantity: 1,
      },
    ],
    order: {
      id: `${generateRandomString(10)}`,
      pick_name: `${data.from_name}`,
      pick_address: `${data.from_address}`,
      pick_province: `${data.from_province}`,
      pick_district: `${data.from_district}`,
      pick_ward: `${data.from_ward}`,
      pick_tel: `${data.from_phone_number}`,
      pick_money:
        Number(data.cash_on_delivery ?? 0) +
        (data.payment_type_id == 2
          ? Number(data.shipment_fee ?? 0) +
          Number(data.insurance_fee ?? 0) +
          Number(data.return_fee ?? 0)
          : 0),
      name: `${data.to_name}`,
      address: `${data.to_address}`,
      province: `${data.to_province}`,
      ward: `${data.to_ward}`,
      district: `${data.to_district}`,
      hamlet: `${data.to_address}` || "Khác",
      tel: `${data.to_phone_number}`,
      note: `${data.delivery_instructions ? data.delivery_instructions : "Không có"
        }`,
      email: "mth.hanh@royal.edu.vn",
      value: Number(data.parcel_value),
      // is_freeship: Number(data.is_freeship),
      is_freeship: 1,
      "3pl": data["3pl"],
      transport: "road",
    },
  };
}

export function transformGHNFormat(data: any) {
  return {
    // payment_type_id: Number(data.payment_type_id) || 1,
    payment_type_id: 1,
    from_name: `${data.from_name}`,
    from_phone: `${data.from_phone_number}`,
    from_address: `${data.from_address}`,
    from_ward_name: `${data.from_ward}`,
    from_ward_code: `${data.from_ward_code}`,
    from_district_name: data.from_district,
    from_district_id: Number(data.from_district_code),
    required_note: `${data.required_note}`,
    to_name: `${data.to_name}`,
    to_phone: `${data.to_phone_number}`,
    to_address: `${data.to_address}`,
    to_ward_name: `${data.to_ward}`,
    to_ward_code: `${data.to_ward_code}`,
    to_district_name: data.to_district,
    to_district_id: Number(data.to_district_code),
    weight: Number(data.weight) * 1000, // unit gram,
    service_type_id: Number(data.service_type_id),
    width: Number(data.width),
    height: Number(data.height),
    length: Number(data.length),
    insurance_value: Number(data.insurance_fee ?? 0),
    cod_amount:
      Number(data.cash_on_delivery ?? 0) +
      (data.payment_type_id == 2
        ? Number(data.shipment_fee ?? 0) +
        Number(data.insurance_fee ?? 0) +
        Number(data.return_fee ?? 0)
        : 0),
    content: `${data.product_name}`,
    note: `${data.delivery_instructions}`,
    items: [
      {
        name: `${data.product_name}`,
        quantity: 1,
        width: Number(data.width),
        height: Number(data.height),
        length: Number(data.length),
        weight: Number(data.weight) * 1000, // unit gram,
      },
    ],
  };
}

export function checkOrderFields(body: any, isUploaded: boolean = false): any {
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
    ordersAttributes.TO_NAME,
    ordersAttributes.TO_PHONE_NUMBER,
    ordersAttributes.TO_ADDRESS,
    ordersAttributes.TO_WARD,
    ordersAttributes.TO_DISTRICT,
    ordersAttributes.TO_PROVINCE,
    ordersAttributes.WEIGHT,
    ordersAttributes.COD,
    ordersAttributes.PARCEL_VALUE,
    ordersAttributes.HAS_INSURANCE,
    ordersAttributes.PAYMENT_TYPE_ID,
    ordersAttributes.PRODUCT_NAME,
    ordersAttributes.TO_PROVINCE_CODE,
    ordersAttributes.TO_DISTRICT_CODE,
    ordersAttributes.TO_WARD_CODE,
  ];
  if (!isUploaded) {
    requiredFields.push(ordersAttributes.CUSTOMER, ordersAttributes.CARRIER);
  }

  if (isUploaded) return validateUploadFields(body, requiredFields);

  return validateFields(body, requiredFields);
}

export function setQueryOrder(ctx) {
  let filters = {};
  const { user } = ctx.state;
  const role = user.role;
  if (role.type.toUpperCase() === ROLE.SALE.toUpperCase()) {
    filters = { ...filters, ...{ customer: { sale: user.id } } };
  } else if (role.type.toUpperCase() === ROLE.CUSTOMER.toUpperCase()) {
    filters = { ...filters, ...{ customer: user.id } };
  }

  let sort = { createdAt: "desc" };

  if (ctx.query.filters) {
    filters = { ...filters, ...ctx.query.filters, deleted: false };
  }
  if (ctx.query.sort) {
    sort = {
      ...sort,
      ...ctx.query.sort,
    };
  }

  const fields = ["id", "username", "email"];
  const populate = {
    customer: {
      fields,
      populate: {
        sale: {
          fields,
        },
      },
    },
    carrier: true,
  };

  return {
    ...ctx.query,
    sort,
    filters,
    populate,
  };
}

export function sanitizeOrderOutput(orders: any[] | any, ctx: any) {
  const {
    user: { role },
  } = ctx.state;
  let sanitizedOrders = orders;
  if (
    role.type.toUpperCase() === ROLE.ADMIN.toUpperCase() ||
    role.type.toUpperCase() === ROLE.SALE.toUpperCase() ||
    role.type.toUpperCase() === ROLE.ACCOUNT.toUpperCase() ||
    role.type.toUpperCase() === ROLE.CUSTOMER_CARE.toUpperCase()
  ) {
    sanitizedOrders = sanitizeOutput(orders, [
      "encrypt_data",
      "api_url",
      "reminder_link",
    ]);
  } else {
    sanitizedOrders = sanitizeOutput(orders, ["carrier_account"]);
  }
  return sanitizedOrders;
}

export async function checkUpdateOrderFields(
  body: any,
  orderId: string | number,
): Promise<any> {
  const requiredFields: string[] = [
    ordersAttributes.TO_NAME,
    ordersAttributes.TO_PHONE_NUMBER,
    ordersAttributes.TO_ADDRESS,
    ordersAttributes.TO_WARD,
    ordersAttributes.TO_DISTRICT,
    ordersAttributes.TO_PROVINCE,
    ordersAttributes.TO_PROVINCE_CODE,
    ordersAttributes.TO_DISTRICT_CODE,
    ordersAttributes.TO_WARD_CODE,
    ordersAttributes.COD,
  ];

  const { isValid, errors } = validateFields(body, requiredFields);
  if (!isValid) return { isValid: false, errors };

  requiredFields.push(ordersAttributes.CHANGE_FEE, ordersAttributes.OTHER_FEE);
  for (const [key, value] of Object.entries(body)) {
    if (!requiredFields.includes(key)) {
      return {
        errors: `Các trường cập nhật cho đơn hàng phải là ${requiredFields.join(
          ",",
        )}!`,
        isValid: false,
      };
    }
  }

  const order = await strapi.service(ORDER_ROUTE).findOrderById(orderId);
  const { zone_type, zone_pick } = await checkRegion(
    order.to_province_code,
    body.to_province_code,
    order.carrier.id,
  );
  if (zone_type !== ZONE_TYPE.SAME_PROVINCE) {
    return {
      errors: `Địa chỉ người nhận mới phải cùng tỉnh với địa chỉ đã tạo.`,
      isValid: false,
    };
  }
  return {
    isValid: true,
    errors: "",
  };
}

function isTimeOutOfRange(
  startTime: string,
  endTime: string,
  serviceType: string,
) {
  const [hourStartTime, minuteStartTime] = startTime.split(":").map(Number);
  const [hourEndTime, minuteEndTime] = endTime.split(":").map(Number);
  let hour = 0;
  if (serviceType === "Standard") {
    hour = 3;
  } else if (serviceType === "Premium") {
    hour = 1.5;
  }
  const currentTime = moment().utcOffset(7);
  const newStartTime = moment().utcOffset(7).set({
    hour: hourStartTime,
    minute: minuteStartTime,
    second: 0,
    millisecond: 0,
  });
  const newEndTime = moment().utcOffset(7).set({
    hour: hourEndTime,
    minute: minuteEndTime,
    second: 0,
    millisecond: 0,
  });
  if (serviceType === "Standard") {
    return false; // doesn't need currentTime.isBefore(newStartTime), ninjavan automatically moves to next day
  } else if (serviceType === "Premium") {
    const newPremiumEndTime = moment()
      .utcOffset(7)
      .set({
        hour: hourEndTime - hour,
        minute: minuteEndTime,
        second: 0,
        millisecond: 0,
      });
    return (
      currentTime.isAfter(newPremiumEndTime) && currentTime.isBefore(newEndTime) // doesn't need currentTime.isBefore(newStartTime), ninjavan automatically moves to next day
    );
  }
  return currentTime.isAfter(newEndTime) || currentTime.isBefore(newStartTime);
}
