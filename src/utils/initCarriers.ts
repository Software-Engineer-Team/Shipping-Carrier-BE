import { CARRIER_ROUTE } from "../helper/constants";

export async function initializeCarriers(strapi: any) {
  const data = [
    {
      name: "NINJAVAN",
    },
    {
      name: "GHTK",
    },
    {
      name: "GHN",
    },
  ];
  for (let d of data) {
    const existingCarrier = await strapi.query(CARRIER_ROUTE).findOne({
      where: {
        name: d.name,
      },
    });
    if (!existingCarrier) {
      const cId = await strapi.query(CARRIER_ROUTE).create({
        data: {
          name: d.name,
        },
      });
      console.log(`generating carrier ::: ${cId.name} ::: ID=${cId.id}`);
    }
  }
}
