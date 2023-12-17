import _ from "lodash";
import { CARRIER_ZONE_ROUTE, PROVINCE_ROUTE } from "../helper/constants";

let zonesGhnMapping = null,
  zonesNinjavanMapping = null,
  zonesGhtkMapping = null;
zonesGhnMapping = zonesNinjavanMapping = [
  {
    name: "MB",
    provinceCodes: [
      269, 263, 265, 264, 266, 227, 246, 245, 247, 228, 244, 229, 248, 230, 249,
      232, 225, 224, 268, 231, 233, 226, 221, 267,
    ],
  },
  {
    name: "MN",
    provinceCodes: [
      239, 205, 204, 240, 206, 211, 216, 212, 217, 213, 215, 214, 250, 219, 218,
      253, 252, 220,
    ],
  },
  {
    name: "MT",
    provinceCodes: [
      234, 235, 236, 237, 238, 223, 203, 243, 242, 262, 260, 208, 261, 258, 259,
      207, 209, 210, 241,
    ],
  },
  {
    name: "HCM",
    provinceCodes: [202],
  },
  {
    name: "HN",
    provinceCodes: [201],
  },
];

zonesGhtkMapping = [
  {
    name: "MB",
    provinceCodes: [
      236, 235, 234, 233, 221, 226, 231, 268, 224, 225, 232, 249, 230, 248, 247,
      244, 245, 246, 228, 227, 229, 263, 269, 264, 265, 266, 267,
    ],
  },
  {
    name: "MN",
    provinceCodes: [
      261, 209, 258, 215, 214, 212, 218, 211, 219, 250, 216, 220, 252, 213, 253,
      217, 240, 204, 239, 205, 206, 210, 207,
    ],
  },
  {
    name: "MT",
    provinceCodes: [241, 259, 208, 260, 262, 242, 243, 203, 223, 238, 237],
  },
  {
    name: "HCM",
    provinceCodes: [202],
  },
  {
    name: "HN",
    provinceCodes: [201],
  },
];

export function initializeCarrierZones(strapi: any) {
  const data = [
    {
      carrier: 1,
      carrierZone: zonesNinjavanMapping,
    },
    {
      carrier: 2,
      carrierZone: zonesGhtkMapping,
    },
    {
      carrier: 3,
      carrierZone: zonesGhnMapping,
    },
  ];
  _.forEach(data, async ({ carrier, carrierZone }) => {
    _.forEach(carrierZone, async ({ name, provinceCodes }) => {
      const provinces = await strapi.db.query(PROVINCE_ROUTE).findMany({
        where: {
          province_id: {
            $in: provinceCodes,
          },
        },
      });
      if (provinces.length === provinceCodes.length) {
        const payload = {
          carrier,
          provinces: provinces.map((p) => p.id),
          region_name: name,
        };
        const existingCarrierZone = await strapi.db
          .query(CARRIER_ZONE_ROUTE)
          .findOne({
            where: {
              carrier: payload.carrier,
              region_name: payload.region_name,
            },
          });
        if (!existingCarrierZone) {
          const cId = await strapi.db.query(CARRIER_ZONE_ROUTE).create({
            data: {
              ...payload,
            },
            populate: ["carrier", "provinces"],
          });
          console.log(
            `generating carrier-zone ::: ${cId.region_name} ::: ${cId.provinces
              .map((p) => p.id)
              .join(",")} ::: ${cId.carrier.name} ::: ID=${cId.id}`,
          );
        }
      }
    });
  });
}
