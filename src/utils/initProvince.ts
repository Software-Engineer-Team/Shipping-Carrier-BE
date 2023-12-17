import {
  DISTRICT_ROUTE,
  PROVINCE_ROUTE,
  WARD_ROUTE,
} from "../helper/constants";

export async function initializeProvinces(strapi: any) {
  try {
    const provinces = await strapi.service(PROVINCE_ROUTE).createProvince();
    console.log(`generating provinces`, provinces);
    if (!provinces.message) {
      const districts = await strapi.service(DISTRICT_ROUTE).createDistrict();
      console.log(`generating districts`, districts);
      if (!districts.message) {
        const wards = await strapi.service(WARD_ROUTE).createWards();
      }
    }
  } catch (error) {
    console.log(error);
  }
}
