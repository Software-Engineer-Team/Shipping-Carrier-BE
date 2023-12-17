/**
 * address service
 */

import { factories } from "@strapi/strapi";
import { ADDRESS_ROUTE } from "../../../helper/constants";
const { ApplicationError } = require("@strapi/utils").errors;

export default factories.createCoreService(ADDRESS_ROUTE, {
  async createAddress(body: any) {
    const existedAddresses = await strapi
      .service(ADDRESS_ROUTE)
      .findAddresses(body.user);

    let isDefault = !existedAddresses.length ? true : !!body.default;

    if (isDefault) {
      await strapi.service(ADDRESS_ROUTE).updateDefaultAddresses(body.user);
    }

    return await strapi.db.query(ADDRESS_ROUTE).create({
      data: { ...body, default: isDefault },
    });
  },

  async findAddresses(user_id: number) {
    return await strapi.db.query(ADDRESS_ROUTE).findMany({
      where: {
        user: user_id,
      },
    });
  },

  async findAddressesByUserId(user_id: number) {
    return await strapi.db.query(ADDRESS_ROUTE).findMany({
      where: {
        user: user_id,
      },
    });
  },

  async updateDefaultAddresses(user_id: number, isDefault: boolean = false) {
    return await strapi.db.query(ADDRESS_ROUTE).update({
      where: {
        user: user_id,
        default: true,
      },
      data: {
        default: isDefault,
      },
    });
  },

  async updateOneAddress(
    addressId: number,
    user_id: number,
    body?: any,
    isDefault: boolean = false,
  ) {
    if (isDefault) {
      await strapi.service(ADDRESS_ROUTE).updateDefaultAddresses(user_id);
    }
    return await strapi.entityService.update(ADDRESS_ROUTE, addressId, {
      data: {
        default: isDefault,
        ...body,
      },
    });
  },

  async deleteOneAddress(addressId: number) {
    const address = await strapi.entityService.findOne(
      ADDRESS_ROUTE,
      addressId,
    );
    if (!address) {
      throw new ApplicationError("Không tìm thấy địa chỉ.");
    }
    if (address.default) {
      throw new ApplicationError("Không thể xóa địa chỉ mặc định.");
    }
    return await strapi.entityService.delete(ADDRESS_ROUTE, addressId);
  },
});
