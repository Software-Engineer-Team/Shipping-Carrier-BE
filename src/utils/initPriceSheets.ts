import _ from "lodash";
import { PRICE_SHEET_ROUTE } from "../helper/constants";

const price_items_ghtk = [
  {
    from_weight: 0,
    to_weight: 1,
    purchase_price: 30000,
    sale_price: 32000,
    zone_type: "Nội Tỉnh",
    step_price: 0,
    return_fee: 0.5,
    zone_pick: [
      {
        name: "MN",
      },
      {
        name: "MT",
      },
      {
        name: "MB",
      },
      {
        name: "HN",
      },
      {
        name: "HCM",
      },
    ],
    carrier_account: 5,
    custom: null,
  },
  {
    from_weight: 1.01,
    to_weight: 2,
    purchase_price: 30000,
    sale_price: 32000,
    zone_type: "Nội Tỉnh",
    step_price: 0,
    return_fee: 0.5,
    zone_pick: [
      {
        name: "MN",
      },
      {
        name: "MT",
      },
      {
        name: "MB",
      },
      {
        name: "HN",
      },
      {
        name: "HCM",
      },
    ],
    carrier_account: 5,
    custom: null,
  },
  {
    from_weight: 2.01,
    to_weight: 3,
    purchase_price: 30000,
    sale_price: 36000,
    zone_type: "Nội Tỉnh",
    step_price: 0,
    return_fee: 0.5,
    zone_pick: [
      {
        name: "MN",
      },
      {
        name: "MT",
      },
      {
        name: "MB",
      },
      {
        name: "HN",
      },
      {
        name: "HCM",
      },
    ],
    carrier_account: 5,
    custom: null,
  },
  {
    from_weight: 3.01,
    to_weight: 4,
    purchase_price: 35000,
    sale_price: 40000,
    zone_type: "Nội Tỉnh",
    step_price: 0,
    return_fee: 0.5,
    zone_pick: [
      {
        name: "MN",
      },
      {
        name: "MT",
      },
      {
        name: "MB",
      },
      {
        name: "HN",
      },
      {
        name: "HCM",
      },
    ],
    carrier_account: 5,
    custom: null,
  },
  {
    from_weight: 4.01,
    to_weight: 5,
    purchase_price: 40000,
    sale_price: 43000,
    zone_type: "Nội Tỉnh",
    step_price: 0,
    return_fee: 0.5,
    zone_pick: [
      {
        name: "MN",
      },
      {
        name: "MT",
      },
      {
        name: "MB",
      },
      {
        name: "HN",
      },
      {
        name: "HCM",
      },
    ],
    carrier_account: 5,
    custom: null,
  },
  {
    from_weight: 5.01,
    to_weight: 6,
    purchase_price: 45000,
    sale_price: 47000,
    zone_type: "Nội Tỉnh",
    step_price: 0,
    return_fee: 0.5,
    zone_pick: [
      {
        name: "MN",
      },
      {
        name: "MT",
      },
      {
        name: "MB",
      },
      {
        name: "HN",
      },
      {
        name: "HCM",
      },
    ],
    carrier_account: 5,
    custom: null,
  },
  {
    from_weight: 6.01,
    to_weight: 7,
    purchase_price: 50000,
    sale_price: 52000,
    zone_type: "Nội Tỉnh",
    step_price: 0,
    return_fee: 0.5,
    zone_pick: [
      {
        name: "MN",
      },
      {
        name: "MT",
      },
      {
        name: "MB",
      },
      {
        name: "HN",
      },
      {
        name: "HCM",
      },
    ],
    carrier_account: 5,
    custom: null,
  },
  {
    from_weight: 7.01,
    to_weight: 8,
    purchase_price: 40000,
    sale_price: 52000,
    zone_type: "Nội Tỉnh",
    step_price: 0,
    return_fee: 0.5,
    zone_pick: [
      {
        name: "MN",
      },
      {
        name: "MT",
      },
      {
        name: "HCM",
      },
    ],
    carrier_account: 3,
    custom: {
      weight: 10,
    },
  },
  {
    from_weight: 8.01,
    to_weight: 9,
    purchase_price: 40000,
    sale_price: 54000,
    zone_type: "Nội Tỉnh",
    step_price: 0,
    return_fee: 0.5,
    zone_pick: [
      {
        name: "MN",
      },
      {
        name: "MT",
      },
      {
        name: "HCM",
      },
    ],
    carrier_account: 3,
    custom: {
      weight: 10,
    },
  },
  {
    from_weight: 9.01,
    to_weight: 10,
    purchase_price: 40000,
    sale_price: 60000,
    zone_type: "Nội Tỉnh",
    step_price: 0,
    return_fee: 0.5,
    zone_pick: [
      {
        name: "MN",
      },
      {
        name: "MT",
      },
      {
        name: "HCM",
      },
    ],
    carrier_account: 3,
    custom: null,
  },
  {
    from_weight: 10.01,
    to_weight: 11,
    purchase_price: 44000,
    sale_price: 65000,
    zone_type: "Nội Tỉnh",
    step_price: 0,
    return_fee: 0.5,
    zone_pick: [
      {
        name: "MN",
      },
      {
        name: "MT",
      },
      {
        name: "HCM",
      },
    ],
    carrier_account: 3,
    custom: null,
  },
  {
    from_weight: 11.01,
    to_weight: 12,
    purchase_price: 48000,
    sale_price: 70000,
    zone_type: "Nội Tỉnh",
    step_price: 0,
    return_fee: 0.5,
    zone_pick: [
      {
        name: "MN",
      },
      {
        name: "MT",
      },
      {
        name: "HCM",
      },
    ],
    carrier_account: 3,
    custom: null,
  },
  {
    from_weight: 12.01,
    to_weight: 13,
    purchase_price: 52000,
    sale_price: 75000,
    zone_type: "Nội Tỉnh",
    step_price: 0,
    return_fee: 0.5,
    zone_pick: [
      {
        name: "MN",
      },
      {
        name: "MT",
      },
      {
        name: "HCM",
      },
    ],
    carrier_account: 3,
    custom: null,
  },
  {
    from_weight: 13.01,
    to_weight: 14,
    purchase_price: 56000,
    sale_price: 80000,
    zone_type: "Nội Tỉnh",
    step_price: 0,
    return_fee: 0.5,
    zone_pick: [
      {
        name: "MN",
      },
      {
        name: "MT",
      },
      {
        name: "HCM",
      },
    ],
    carrier_account: 3,
    custom: null,
  },
  {
    from_weight: 14.01,
    to_weight: 15,
    purchase_price: 60000,
    sale_price: 86000,
    zone_type: "Nội Tỉnh",
    step_price: 0,
    return_fee: 0.5,
    zone_pick: [
      {
        name: "MN",
      },
      {
        name: "MT",
      },
      {
        name: "HCM",
      },
    ],
    carrier_account: 3,
    custom: null,
  },
  {
    from_weight: 15.01,
    to_weight: 16,
    purchase_price: 64000,
    sale_price: 92000,
    zone_type: "Nội Tỉnh",
    step_price: 0,
    return_fee: 0.5,
    zone_pick: [
      {
        name: "MN",
      },
      {
        name: "MT",
      },
      {
        name: "HCM",
      },
    ],
    carrier_account: 3,
    custom: null,
  },
  {
    from_weight: 16.01,
    to_weight: 17,
    purchase_price: 68000,
    sale_price: 98500,
    zone_type: "Nội Tỉnh",
    step_price: 0,
    return_fee: 0.5,
    zone_pick: [
      {
        name: "MN",
      },
      {
        name: "MT",
      },
      {
        name: "HCM",
      },
    ],
    carrier_account: 3,
    custom: null,
  },
  {
    from_weight: 17.01,
    to_weight: 18,
    purchase_price: 72000,
    sale_price: 105000,
    zone_type: "Nội Tỉnh",
    step_price: 0,
    return_fee: 0.5,
    zone_pick: [
      {
        name: "MN",
      },
      {
        name: "MT",
      },
      {
        name: "HCM",
      },
    ],
    carrier_account: 3,
    custom: null,
  },
  {
    from_weight: 18.01,
    to_weight: 19,
    purchase_price: 76000,
    sale_price: 111500,
    zone_type: "Nội Tỉnh",
    step_price: 0,
    return_fee: 0.5,
    zone_pick: [
      {
        name: "MN",
      },
      {
        name: "MT",
      },
      {
        name: "HCM",
      },
    ],
    carrier_account: 3,
    custom: null,
  },
  {
    from_weight: 19.01,
    to_weight: 20,
    purchase_price: 80000,
    sale_price: 118000,
    zone_type: "Nội Tỉnh",
    step_price: 0,
    return_fee: 0.5,
    zone_pick: [
      {
        name: "MN",
      },
      {
        name: "MT",
      },
      {
        name: "HCM",
      },
    ],
    carrier_account: 3,
    custom: null,
  },
  {
    from_weight: 20.01,
    to_weight: 21,
    purchase_price: 84000,
    sale_price: 125000,
    zone_type: "Nội Tỉnh",
    step_price: 0,
    return_fee: 1,
    zone_pick: [
      {
        name: "MN",
      },
      {
        name: "MT",
      },
      {
        name: "HCM",
      },
    ],
    carrier_account: 3,
    custom: null,
  },
  {
    from_weight: 21.01,
    to_weight: 22,
    purchase_price: 88000,
    sale_price: 132000,
    zone_type: "Nội Tỉnh",
    step_price: 0,
    return_fee: 1,
    zone_pick: [
      {
        name: "MN",
      },
      {
        name: "MT",
      },
      {
        name: "HCM",
      },
    ],
    carrier_account: 3,
    custom: null,
  },
  {
    from_weight: 22.01,
    to_weight: 23,
    purchase_price: 92000,
    sale_price: 139000,
    zone_type: "Nội Tỉnh",
    step_price: 0,
    return_fee: 1,
    zone_pick: [
      {
        name: "MN",
      },
      {
        name: "MT",
      },
      {
        name: "HCM",
      },
    ],
    carrier_account: 3,
    custom: null,
  },
  {
    from_weight: 23.01,
    to_weight: 24,
    purchase_price: 96000,
    sale_price: 146000,
    zone_type: "Nội Tỉnh",
    step_price: 0,
    return_fee: 1,
    zone_pick: [
      {
        name: "MN",
      },
      {
        name: "MT",
      },
      {
        name: "HCM",
      },
    ],
    carrier_account: 3,
    custom: null,
  },
  {
    from_weight: 24.01,
    to_weight: 25,
    purchase_price: 100000,
    sale_price: 153000,
    zone_type: "Nội Tỉnh",
    step_price: 0,
    return_fee: 1,
    zone_pick: [
      {
        name: "MN",
      },
      {
        name: "MT",
      },
      {
        name: "HCM",
      },
    ],
    carrier_account: 3,
    custom: null,
  },
  {
    from_weight: 25.01,
    to_weight: 26,
    purchase_price: 104000,
    sale_price: 160000,
    zone_type: "Nội Tỉnh",
    step_price: 0,
    return_fee: 1,
    zone_pick: [
      {
        name: "MN",
      },
      {
        name: "MT",
      },
      {
        name: "HCM",
      },
    ],
    carrier_account: 3,
    custom: null,
  },
  {
    from_weight: 26.01,
    to_weight: 27,
    purchase_price: 108000,
    sale_price: 167000,
    zone_type: "Nội Tỉnh",
    step_price: 0,
    return_fee: 1,
    zone_pick: [
      {
        name: "MN",
      },
      {
        name: "MT",
      },
      {
        name: "HCM",
      },
    ],
    carrier_account: 3,
    custom: null,
  },
  {
    from_weight: 27.01,
    to_weight: 28,
    purchase_price: 112000,
    sale_price: 174000,
    zone_type: "Nội Tỉnh",
    step_price: 0,
    return_fee: 1,
    zone_pick: [
      {
        name: "MN",
      },
      {
        name: "MT",
      },
      {
        name: "HCM",
      },
    ],
    carrier_account: 3,
    custom: null,
  },
  {
    from_weight: 28.01,
    to_weight: 29,
    purchase_price: 116000,
    sale_price: 181000,
    zone_type: "Nội Tỉnh",
    step_price: 0,
    return_fee: 1,
    zone_pick: [
      {
        name: "MN",
      },
      {
        name: "MT",
      },
      {
        name: "HCM",
      },
    ],
    carrier_account: 3,
    custom: null,
  },
  {
    from_weight: 29.01,
    to_weight: 30,
    purchase_price: 120000,
    sale_price: 188000,
    zone_type: "Nội Tỉnh",
    step_price: 0,
    return_fee: 1,
    zone_pick: [
      {
        name: "MN",
      },
      {
        name: "MT",
      },
      {
        name: "HCM",
      },
    ],
    carrier_account: 3,
    custom: null,
  },
  {
    from_weight: 30.01,
    to_weight: 31,
    purchase_price: 124000,
    sale_price: 195000,
    zone_type: "Nội Tỉnh",
    step_price: 0,
    return_fee: 1,
    zone_pick: [
      {
        name: "MN",
      },
      {
        name: "MT",
      },
      {
        name: "HCM",
      },
    ],
    carrier_account: 3,
    custom: null,
  },
  {
    from_weight: 31.01,
    to_weight: 32,
    purchase_price: 128000,
    sale_price: 202000,
    zone_type: "Nội Tỉnh",
    step_price: 0,
    return_fee: 1,
    zone_pick: [
      {
        name: "MN",
      },
      {
        name: "MT",
      },
      {
        name: "HCM",
      },
    ],
    carrier_account: 3,
    custom: null,
  },
  {
    from_weight: 32.01,
    to_weight: 33,
    purchase_price: 132000,
    sale_price: 209000,
    zone_type: "Nội Tỉnh",
    step_price: 0,
    return_fee: 1,
    zone_pick: [
      {
        name: "MN",
      },
      {
        name: "MT",
      },
      {
        name: "HCM",
      },
    ],
    carrier_account: 3,
    custom: null,
  },
  {
    from_weight: 33.01,
    to_weight: 34,
    purchase_price: 136000,
    sale_price: 216000,
    zone_type: "Nội Tỉnh",
    step_price: 0,
    return_fee: 1,
    zone_pick: [
      {
        name: "MN",
      },
      {
        name: "MT",
      },
      {
        name: "HCM",
      },
    ],
    carrier_account: 3,
    custom: null,
  },
  {
    from_weight: 34.01,
    to_weight: 35,
    purchase_price: 140000,
    sale_price: 223000,
    zone_type: "Nội Tỉnh",
    step_price: 0,
    return_fee: 1,
    zone_pick: [
      {
        name: "MN",
      },
      {
        name: "MT",
      },
      {
        name: "HCM",
      },
    ],
    carrier_account: 3,
    custom: null,
  },
  {
    from_weight: 35.01,
    to_weight: 36,
    purchase_price: 144000,
    sale_price: 230000,
    zone_type: "Nội Tỉnh",
    step_price: 0,
    return_fee: 1,
    zone_pick: [
      {
        name: "MN",
      },
      {
        name: "MT",
      },
      {
        name: "HCM",
      },
    ],
    carrier_account: 3,
    custom: null,
  },
  {
    from_weight: 36.01,
    to_weight: 37,
    purchase_price: 148000,
    sale_price: 237000,
    zone_type: "Nội Tỉnh",
    step_price: 0,
    return_fee: 1,
    zone_pick: [
      {
        name: "MN",
      },
      {
        name: "MT",
      },
      {
        name: "HCM",
      },
    ],
    carrier_account: 3,
    custom: null,
  },
  {
    from_weight: 37.01,
    to_weight: 38,
    purchase_price: 152000,
    sale_price: 244000,
    zone_type: "Nội Tỉnh",
    step_price: 0,
    return_fee: 1,
    zone_pick: [
      {
        name: "MN",
      },
      {
        name: "MT",
      },
      {
        name: "HCM",
      },
    ],
    carrier_account: 3,
    custom: null,
  },
  {
    from_weight: 38.01,
    to_weight: 99999,
    purchase_price: 156000,
    sale_price: 252000,
    zone_type: "Nội Tỉnh",
    step_price: 8000,
    return_fee: 1,
    zone_pick: [
      {
        name: "MN",
      },
      {
        name: "MT",
      },
      {
        name: "HCM",
      },
    ],
    carrier_account: 3,
    custom: null,
  },
  {
    from_weight: 7.01,
    to_weight: 8,
    purchase_price: 40000,
    sale_price: 52000,
    zone_type: "Nội Tỉnh",
    step_price: 0,
    return_fee: 0.5,
    zone_pick: [
      {
        name: "MB",
      },
      {
        name: "HN",
      },
    ],
    carrier_account: 4,
    custom: {
      weight: 10,
    },
  },
  {
    from_weight: 8.01,
    to_weight: 9,
    purchase_price: 40000,
    sale_price: 54000,
    zone_type: "Nội Tỉnh",
    step_price: 0,
    return_fee: 0.5,
    zone_pick: [
      {
        name: "MB",
      },
      {
        name: "HN",
      },
    ],
    carrier_account: 4,
    custom: {
      weight: 10,
    },
  },
  {
    from_weight: 9.01,
    to_weight: 10,
    purchase_price: 40000,
    sale_price: 60000,
    zone_type: "Nội Tỉnh",
    step_price: 0,
    return_fee: 0.5,
    zone_pick: [
      {
        name: "MB",
      },
      {
        name: "HN",
      },
    ],
    carrier_account: 4,
    custom: null,
  },
  {
    from_weight: 10.01,
    to_weight: 11,
    purchase_price: 44000,
    sale_price: 65000,
    zone_type: "Nội Tỉnh",
    step_price: 0,
    return_fee: 0.5,
    zone_pick: [
      {
        name: "MB",
      },
      {
        name: "HN",
      },
    ],
    carrier_account: 4,
    custom: null,
  },
  {
    from_weight: 11.01,
    to_weight: 12,
    purchase_price: 48000,
    sale_price: 70000,
    zone_type: "Nội Tỉnh",
    step_price: 0,
    return_fee: 0.5,
    zone_pick: [
      {
        name: "MB",
      },
      {
        name: "HN",
      },
    ],
    carrier_account: 4,
    custom: null,
  },
  {
    from_weight: 12.01,
    to_weight: 13,
    purchase_price: 52000,
    sale_price: 75000,
    zone_type: "Nội Tỉnh",
    step_price: 0,
    return_fee: 0.5,
    zone_pick: [
      {
        name: "MB",
      },
      {
        name: "HN",
      },
    ],
    carrier_account: 4,
    custom: null,
  },
  {
    from_weight: 13.01,
    to_weight: 14,
    purchase_price: 56000,
    sale_price: 80000,
    zone_type: "Nội Tỉnh",
    step_price: 0,
    return_fee: 0.5,
    zone_pick: [
      {
        name: "MB",
      },
      {
        name: "HN",
      },
    ],
    carrier_account: 4,
    custom: null,
  },
  {
    from_weight: 14.01,
    to_weight: 15,
    purchase_price: 60000,
    sale_price: 86000,
    zone_type: "Nội Tỉnh",
    step_price: 0,
    return_fee: 0.5,
    zone_pick: [
      {
        name: "MB",
      },
      {
        name: "HN",
      },
    ],
    carrier_account: 4,
    custom: null,
  },
  {
    from_weight: 15.01,
    to_weight: 16,
    purchase_price: 64000,
    sale_price: 92000,
    zone_type: "Nội Tỉnh",
    step_price: 0,
    return_fee: 0.5,
    zone_pick: [
      {
        name: "MB",
      },
      {
        name: "HN",
      },
    ],
    carrier_account: 4,
    custom: null,
  },
  {
    from_weight: 16.01,
    to_weight: 17,
    purchase_price: 68000,
    sale_price: 98500,
    zone_type: "Nội Tỉnh",
    step_price: 0,
    return_fee: 0.5,
    zone_pick: [
      {
        name: "MB",
      },
      {
        name: "HN",
      },
    ],
    carrier_account: 4,
    custom: null,
  },
  {
    from_weight: 17.01,
    to_weight: 18,
    purchase_price: 72000,
    sale_price: 105000,
    zone_type: "Nội Tỉnh",
    step_price: 0,
    return_fee: 0.5,
    zone_pick: [
      {
        name: "MB",
      },
      {
        name: "HN",
      },
    ],
    carrier_account: 4,
    custom: null,
  },
  {
    from_weight: 18.01,
    to_weight: 19,
    purchase_price: 76000,
    sale_price: 111500,
    zone_type: "Nội Tỉnh",
    step_price: 0,
    return_fee: 0.5,
    zone_pick: [
      {
        name: "MB",
      },
      {
        name: "HN",
      },
    ],
    carrier_account: 4,
    custom: null,
  },
  {
    from_weight: 19.01,
    to_weight: 20,
    purchase_price: 80000,
    sale_price: 118000,
    zone_type: "Nội Tỉnh",
    step_price: 0,
    return_fee: 0.5,
    zone_pick: [
      {
        name: "MB",
      },
      {
        name: "HN",
      },
    ],
    carrier_account: 4,
    custom: null,
  },
  {
    from_weight: 20.01,
    to_weight: 21,
    purchase_price: 84000,
    sale_price: 125000,
    zone_type: "Nội Tỉnh",
    step_price: 0,
    return_fee: 1,
    zone_pick: [
      {
        name: "MB",
      },
      {
        name: "HN",
      },
    ],
    carrier_account: 4,
    custom: null,
  },
  {
    from_weight: 21.01,
    to_weight: 22,
    purchase_price: 88000,
    sale_price: 132000,
    zone_type: "Nội Tỉnh",
    step_price: 0,
    return_fee: 1,
    zone_pick: [
      {
        name: "MB",
      },
      {
        name: "HN",
      },
    ],
    carrier_account: 4,
    custom: null,
  },
  {
    from_weight: 22.01,
    to_weight: 23,
    purchase_price: 92000,
    sale_price: 139000,
    zone_type: "Nội Tỉnh",
    step_price: 0,
    return_fee: 1,
    zone_pick: [
      {
        name: "MB",
      },
      {
        name: "HN",
      },
    ],
    carrier_account: 4,
    custom: null,
  },
  {
    from_weight: 23.01,
    to_weight: 24,
    purchase_price: 96000,
    sale_price: 146000,
    zone_type: "Nội Tỉnh",
    step_price: 0,
    return_fee: 1,
    zone_pick: [
      {
        name: "MB",
      },
      {
        name: "HN",
      },
    ],
    carrier_account: 4,
    custom: null,
  },
  {
    from_weight: 24.01,
    to_weight: 25,
    purchase_price: 100000,
    sale_price: 153000,
    zone_type: "Nội Tỉnh",
    step_price: 0,
    return_fee: 1,
    zone_pick: [
      {
        name: "MB",
      },
      {
        name: "HN",
      },
    ],
    carrier_account: 4,
    custom: null,
  },
  {
    from_weight: 25.01,
    to_weight: 26,
    purchase_price: 104000,
    sale_price: 160000,
    zone_type: "Nội Tỉnh",
    step_price: 0,
    return_fee: 1,
    zone_pick: [
      {
        name: "MB",
      },
      {
        name: "HN",
      },
    ],
    carrier_account: 4,
    custom: null,
  },
  {
    from_weight: 26.01,
    to_weight: 27,
    purchase_price: 108000,
    sale_price: 167000,
    zone_type: "Nội Tỉnh",
    step_price: 0,
    return_fee: 1,
    zone_pick: [
      {
        name: "MB",
      },
      {
        name: "HN",
      },
    ],
    carrier_account: 4,
    custom: null,
  },
  {
    from_weight: 27.01,
    to_weight: 28,
    purchase_price: 112000,
    sale_price: 174000,
    zone_type: "Nội Tỉnh",
    step_price: 0,
    return_fee: 1,
    zone_pick: [
      {
        name: "MB",
      },
      {
        name: "HN",
      },
    ],
    carrier_account: 4,
    custom: null,
  },
  {
    from_weight: 28.01,
    to_weight: 29,
    purchase_price: 116000,
    sale_price: 181000,
    zone_type: "Nội Tỉnh",
    step_price: 0,
    return_fee: 1,
    zone_pick: [
      {
        name: "MB",
      },
      {
        name: "HN",
      },
    ],
    carrier_account: 4,
    custom: null,
  },
  {
    from_weight: 29.01,
    to_weight: 30,
    purchase_price: 120000,
    sale_price: 188000,
    zone_type: "Nội Tỉnh",
    step_price: 0,
    return_fee: 1,
    zone_pick: [
      {
        name: "MB",
      },
      {
        name: "HN",
      },
    ],
    carrier_account: 4,
    custom: null,
  },
  {
    from_weight: 30.01,
    to_weight: 31,
    purchase_price: 124000,
    sale_price: 195000,
    zone_type: "Nội Tỉnh",
    step_price: 0,
    return_fee: 1,
    zone_pick: [
      {
        name: "MB",
      },
      {
        name: "HN",
      },
    ],
    carrier_account: 4,
    custom: null,
  },
  {
    from_weight: 31.01,
    to_weight: 32,
    purchase_price: 128000,
    sale_price: 202000,
    zone_type: "Nội Tỉnh",
    step_price: 0,
    return_fee: 1,
    zone_pick: [
      {
        name: "MB",
      },
      {
        name: "HN",
      },
    ],
    carrier_account: 4,
    custom: null,
  },
  {
    from_weight: 32.01,
    to_weight: 33,
    purchase_price: 132000,
    sale_price: 209000,
    zone_type: "Nội Tỉnh",
    step_price: 0,
    return_fee: 1,
    zone_pick: [
      {
        name: "MB",
      },
      {
        name: "HN",
      },
    ],
    carrier_account: 4,
    custom: null,
  },
  {
    from_weight: 33.01,
    to_weight: 34,
    purchase_price: 136000,
    sale_price: 216000,
    zone_type: "Nội Tỉnh",
    step_price: 0,
    return_fee: 1,
    zone_pick: [
      {
        name: "MB",
      },
      {
        name: "HN",
      },
    ],
    carrier_account: 4,
    custom: null,
  },
  {
    from_weight: 34.01,
    to_weight: 35,
    purchase_price: 140000,
    sale_price: 223000,
    zone_type: "Nội Tỉnh",
    step_price: 0,
    return_fee: 1,
    zone_pick: [
      {
        name: "MB",
      },
      {
        name: "HN",
      },
    ],
    carrier_account: 4,
    custom: null,
  },
  {
    from_weight: 35.01,
    to_weight: 36,
    purchase_price: 144000,
    sale_price: 230000,
    zone_type: "Nội Tỉnh",
    step_price: 0,
    return_fee: 1,
    zone_pick: [
      {
        name: "MB",
      },
      {
        name: "HN",
      },
    ],
    carrier_account: 4,
    custom: null,
  },
  {
    from_weight: 36.01,
    to_weight: 37,
    purchase_price: 148000,
    sale_price: 237000,
    zone_type: "Nội Tỉnh",
    step_price: 0,
    return_fee: 1,
    zone_pick: [
      {
        name: "MB",
      },
      {
        name: "HN",
      },
    ],
    carrier_account: 4,
    custom: null,
  },
  {
    from_weight: 37.01,
    to_weight: 38,
    purchase_price: 152000,
    sale_price: 244000,
    zone_type: "Nội Tỉnh",
    step_price: 0,
    return_fee: 1,
    zone_pick: [
      {
        name: "MB",
      },
      {
        name: "HN",
      },
    ],
    carrier_account: 4,
    custom: null,
  },
  {
    from_weight: 38.01,
    to_weight: 99999,
    purchase_price: 156000,
    sale_price: 252000,
    zone_type: "Nội Tỉnh",
    step_price: 8000,
    return_fee: 1,
    zone_pick: [
      {
        name: "MB",
      },
      {
        name: "HN",
      },
    ],
    carrier_account: 4,
    custom: null,
  },
  {
    from_weight: 0,
    to_weight: 1,
    purchase_price: 20000,
    sale_price: 24000,
    zone_type: "Nội Vùng",
    step_price: 0,
    return_fee: 0.5,
    zone_pick: [
      {
        name: "MN",
      },
      {
        name: "MT",
      },
      {
        name: "MB",
      },
      {
        name: "HN",
      },
      {
        name: "HCM",
      },
    ],
    carrier_account: 5,
    custom: null,
  },
  {
    from_weight: 1.01,
    to_weight: 2,
    purchase_price: 24000,
    sale_price: 28000,
    zone_type: "Nội Vùng",
    step_price: 0,
    return_fee: 0.5,
    zone_pick: [
      {
        name: "MN",
      },
      {
        name: "MT",
      },
      {
        name: "MB",
      },
      {
        name: "HN",
      },
      {
        name: "HCM",
      },
    ],
    carrier_account: 5,
    custom: null,
  },
  {
    from_weight: 2.01,
    to_weight: 3,
    purchase_price: 28000,
    sale_price: 32000,
    zone_type: "Nội Vùng",
    step_price: 0,
    return_fee: 0.5,
    zone_pick: [
      {
        name: "MN",
      },
      {
        name: "MT",
      },
      {
        name: "MB",
      },
      {
        name: "HN",
      },
      {
        name: "HCM",
      },
    ],
    carrier_account: 5,
    custom: null,
  },
  {
    from_weight: 3.01,
    to_weight: 4,
    purchase_price: 32000,
    sale_price: 36000,
    zone_type: "Nội Vùng",
    step_price: 0,
    return_fee: 0.5,
    zone_pick: [
      {
        name: "MN",
      },
      {
        name: "MT",
      },
      {
        name: "MB",
      },
      {
        name: "HN",
      },
      {
        name: "HCM",
      },
    ],
    carrier_account: 5,
    custom: null,
  },
  {
    from_weight: 4.01,
    to_weight: 5,
    purchase_price: 34000,
    sale_price: 40000,
    zone_type: "Nội Vùng",
    step_price: 0,
    return_fee: 0.5,
    zone_pick: [
      {
        name: "MN",
      },
      {
        name: "MT",
      },
      {
        name: "MB",
      },
      {
        name: "HN",
      },
      {
        name: "HCM",
      },
    ],
    carrier_account: 5,
    custom: null,
  },
  {
    from_weight: 5.01,
    to_weight: 6,
    purchase_price: 36000,
    sale_price: 44000,
    zone_type: "Nội Vùng",
    step_price: 0,
    return_fee: 0.5,
    zone_pick: [
      {
        name: "MN",
      },
      {
        name: "MT",
      },
      {
        name: "MB",
      },
      {
        name: "HN",
      },
      {
        name: "HCM",
      },
    ],
    carrier_account: 5,
    custom: null,
  },
  {
    from_weight: 6.01,
    to_weight: 7,
    purchase_price: 38000,
    sale_price: 46000,
    zone_type: "Nội Vùng",
    step_price: 0,
    return_fee: 0.5,
    zone_pick: [
      {
        name: "MN",
      },
      {
        name: "MT",
      },
      {
        name: "MB",
      },
      {
        name: "HN",
      },
      {
        name: "HCM",
      },
    ],
    carrier_account: 5,
    custom: null,
  },
  {
    from_weight: 7.01,
    to_weight: 8,
    purchase_price: 40000,
    sale_price: 50000,
    zone_type: "Nội Vùng",
    step_price: 0,
    return_fee: 0.5,
    zone_pick: [
      {
        name: "MN",
      },
      {
        name: "MT",
      },
      {
        name: "HCM",
      },
    ],
    carrier_account: 3,
    custom: {
      weight: 10,
    },
  },
  {
    from_weight: 8.01,
    to_weight: 9,
    purchase_price: 40000,
    sale_price: 54000,
    zone_type: "Nội Vùng",
    step_price: 0,
    return_fee: 0.5,
    zone_pick: [
      {
        name: "MN",
      },
      {
        name: "MT",
      },
      {
        name: "HCM",
      },
    ],
    carrier_account: 3,
    custom: {
      weight: 10,
    },
  },
  {
    from_weight: 9.01,
    to_weight: 10,
    purchase_price: 40000,
    sale_price: 60000,
    zone_type: "Nội Vùng",
    step_price: 0,
    return_fee: 0.5,
    zone_pick: [
      {
        name: "MN",
      },
      {
        name: "MT",
      },
      {
        name: "HCM",
      },
    ],
    carrier_account: 3,
    custom: null,
  },
  {
    from_weight: 10.01,
    to_weight: 11,
    purchase_price: 44000,
    sale_price: 65000,
    zone_type: "Nội Vùng",
    step_price: 0,
    return_fee: 0.5,
    zone_pick: [
      {
        name: "MN",
      },
      {
        name: "MT",
      },
      {
        name: "HCM",
      },
    ],
    carrier_account: 3,
    custom: null,
  },
  {
    from_weight: 11.01,
    to_weight: 12,
    purchase_price: 48000,
    sale_price: 70000,
    zone_type: "Nội Vùng",
    step_price: 0,
    return_fee: 0.5,
    zone_pick: [
      {
        name: "MN",
      },
      {
        name: "MT",
      },
      {
        name: "HCM",
      },
    ],
    carrier_account: 3,
    custom: null,
  },
  {
    from_weight: 12.01,
    to_weight: 13,
    purchase_price: 52000,
    sale_price: 75000,
    zone_type: "Nội Vùng",
    step_price: 0,
    return_fee: 0.5,
    zone_pick: [
      {
        name: "MN",
      },
      {
        name: "MT",
      },
      {
        name: "HCM",
      },
    ],
    carrier_account: 3,
    custom: null,
  },
  {
    from_weight: 13.01,
    to_weight: 14,
    purchase_price: 56000,
    sale_price: 80000,
    zone_type: "Nội Vùng",
    step_price: 0,
    return_fee: 0.5,
    zone_pick: [
      {
        name: "MN",
      },
      {
        name: "MT",
      },
      {
        name: "HCM",
      },
    ],
    carrier_account: 3,
    custom: null,
  },
  {
    from_weight: 14.01,
    to_weight: 15,
    purchase_price: 60000,
    sale_price: 86000,
    zone_type: "Nội Vùng",
    step_price: 0,
    return_fee: 0.5,
    zone_pick: [
      {
        name: "MN",
      },
      {
        name: "MT",
      },
      {
        name: "HCM",
      },
    ],
    carrier_account: 3,
    custom: null,
  },
  {
    from_weight: 15.01,
    to_weight: 16,
    purchase_price: 64000,
    sale_price: 92000,
    zone_type: "Nội Vùng",
    step_price: 0,
    return_fee: 0.5,
    zone_pick: [
      {
        name: "MN",
      },
      {
        name: "MT",
      },
      {
        name: "HCM",
      },
    ],
    carrier_account: 3,
    custom: null,
  },
  {
    from_weight: 16.01,
    to_weight: 17,
    purchase_price: 68000,
    sale_price: 98500,
    zone_type: "Nội Vùng",
    step_price: 0,
    return_fee: 0.5,
    zone_pick: [
      {
        name: "MN",
      },
      {
        name: "MT",
      },
      {
        name: "HCM",
      },
    ],
    carrier_account: 3,
    custom: null,
  },
  {
    from_weight: 17.01,
    to_weight: 18,
    purchase_price: 72000,
    sale_price: 105000,
    zone_type: "Nội Vùng",
    step_price: 0,
    return_fee: 0.5,
    zone_pick: [
      {
        name: "MN",
      },
      {
        name: "MT",
      },
      {
        name: "HCM",
      },
    ],
    carrier_account: 3,
    custom: null,
  },
  {
    from_weight: 18.01,
    to_weight: 19,
    purchase_price: 76000,
    sale_price: 111500,
    zone_type: "Nội Vùng",
    step_price: 0,
    return_fee: 0.5,
    zone_pick: [
      {
        name: "MN",
      },
      {
        name: "MT",
      },
      {
        name: "HCM",
      },
    ],
    carrier_account: 3,
    custom: null,
  },
  {
    from_weight: 19.01,
    to_weight: 20,
    purchase_price: 80000,
    sale_price: 118000,
    zone_type: "Nội Vùng",
    step_price: 0,
    return_fee: 0.5,
    zone_pick: [
      {
        name: "MN",
      },
      {
        name: "MT",
      },
      {
        name: "HCM",
      },
    ],
    carrier_account: 3,
    custom: null,
  },
  {
    from_weight: 20.01,
    to_weight: 21,
    purchase_price: 84000,
    sale_price: 125000,
    zone_type: "Nội Vùng",
    step_price: 0,
    return_fee: 1,
    zone_pick: [
      {
        name: "MN",
      },
      {
        name: "MT",
      },
      {
        name: "HCM",
      },
    ],
    carrier_account: 3,
    custom: null,
  },
  {
    from_weight: 21.01,
    to_weight: 22,
    purchase_price: 88000,
    sale_price: 132000,
    zone_type: "Nội Vùng",
    step_price: 0,
    return_fee: 1,
    zone_pick: [
      {
        name: "MN",
      },
      {
        name: "MT",
      },
      {
        name: "HCM",
      },
    ],
    carrier_account: 3,
    custom: null,
  },
  {
    from_weight: 22.01,
    to_weight: 23,
    purchase_price: 92000,
    sale_price: 139000,
    zone_type: "Nội Vùng",
    step_price: 0,
    return_fee: 1,
    zone_pick: [
      {
        name: "MN",
      },
      {
        name: "MT",
      },
      {
        name: "HCM",
      },
    ],
    carrier_account: 3,
    custom: null,
  },
  {
    from_weight: 23.01,
    to_weight: 24,
    purchase_price: 96000,
    sale_price: 146000,
    zone_type: "Nội Vùng",
    step_price: 0,
    return_fee: 1,
    zone_pick: [
      {
        name: "MN",
      },
      {
        name: "MT",
      },
      {
        name: "HCM",
      },
    ],
    carrier_account: 3,
    custom: null,
  },
  {
    from_weight: 24.01,
    to_weight: 25,
    purchase_price: 100000,
    sale_price: 153000,
    zone_type: "Nội Vùng",
    step_price: 0,
    return_fee: 1,
    zone_pick: [
      {
        name: "MN",
      },
      {
        name: "MT",
      },
      {
        name: "HCM",
      },
    ],
    carrier_account: 3,
    custom: null,
  },
  {
    from_weight: 25.01,
    to_weight: 26,
    purchase_price: 104000,
    sale_price: 160000,
    zone_type: "Nội Vùng",
    step_price: 0,
    return_fee: 1,
    zone_pick: [
      {
        name: "MN",
      },
      {
        name: "MT",
      },
      {
        name: "HCM",
      },
    ],
    carrier_account: 3,
    custom: null,
  },
  {
    from_weight: 26.01,
    to_weight: 27,
    purchase_price: 108000,
    sale_price: 167000,
    zone_type: "Nội Vùng",
    step_price: 0,
    return_fee: 1,
    zone_pick: [
      {
        name: "MN",
      },
      {
        name: "MT",
      },
      {
        name: "HCM",
      },
    ],
    carrier_account: 3,
    custom: null,
  },
  {
    from_weight: 27.01,
    to_weight: 28,
    purchase_price: 112000,
    sale_price: 174000,
    zone_type: "Nội Vùng",
    step_price: 0,
    return_fee: 1,
    zone_pick: [
      {
        name: "MN",
      },
      {
        name: "MT",
      },
      {
        name: "HCM",
      },
    ],
    carrier_account: 3,
    custom: null,
  },
  {
    from_weight: 28.01,
    to_weight: 29,
    purchase_price: 116000,
    sale_price: 181000,
    zone_type: "Nội Vùng",
    step_price: 0,
    return_fee: 1,
    zone_pick: [
      {
        name: "MN",
      },
      {
        name: "MT",
      },
      {
        name: "HCM",
      },
    ],
    carrier_account: 3,
    custom: null,
  },
  {
    from_weight: 29.01,
    to_weight: 30,
    purchase_price: 120000,
    sale_price: 188000,
    zone_type: "Nội Vùng",
    step_price: 0,
    return_fee: 1,
    zone_pick: [
      {
        name: "MN",
      },
      {
        name: "MT",
      },
      {
        name: "HCM",
      },
    ],
    carrier_account: 3,
    custom: null,
  },
  {
    from_weight: 30.01,
    to_weight: 31,
    purchase_price: 124000,
    sale_price: 195000,
    zone_type: "Nội Vùng",
    step_price: 0,
    return_fee: 1,
    zone_pick: [
      {
        name: "MN",
      },
      {
        name: "MT",
      },
      {
        name: "HCM",
      },
    ],
    carrier_account: 3,
    custom: null,
  },
  {
    from_weight: 31.01,
    to_weight: 32,
    purchase_price: 128000,
    sale_price: 202000,
    zone_type: "Nội Vùng",
    step_price: 0,
    return_fee: 1,
    zone_pick: [
      {
        name: "MN",
      },
      {
        name: "MT",
      },
      {
        name: "HCM",
      },
    ],
    carrier_account: 3,
    custom: null,
  },
  {
    from_weight: 32.01,
    to_weight: 33,
    purchase_price: 132000,
    sale_price: 209000,
    zone_type: "Nội Vùng",
    step_price: 0,
    return_fee: 1,
    zone_pick: [
      {
        name: "MN",
      },
      {
        name: "MT",
      },
      {
        name: "HCM",
      },
    ],
    carrier_account: 3,
    custom: null,
  },
  {
    from_weight: 33.01,
    to_weight: 34,
    purchase_price: 136000,
    sale_price: 216000,
    zone_type: "Nội Vùng",
    step_price: 0,
    return_fee: 1,
    zone_pick: [
      {
        name: "MN",
      },
      {
        name: "MT",
      },
      {
        name: "HCM",
      },
    ],
    carrier_account: 3,
    custom: null,
  },
  {
    from_weight: 34.01,
    to_weight: 35,
    purchase_price: 140000,
    sale_price: 223000,
    zone_type: "Nội Vùng",
    step_price: 0,
    return_fee: 1,
    zone_pick: [
      {
        name: "MN",
      },
      {
        name: "MT",
      },
      {
        name: "HCM",
      },
    ],
    carrier_account: 3,
    custom: null,
  },
  {
    from_weight: 35.01,
    to_weight: 36,
    purchase_price: 144000,
    sale_price: 230000,
    zone_type: "Nội Vùng",
    step_price: 0,
    return_fee: 1,
    zone_pick: [
      {
        name: "MN",
      },
      {
        name: "MT",
      },
      {
        name: "HCM",
      },
    ],
    carrier_account: 3,
    custom: null,
  },
  {
    from_weight: 36.01,
    to_weight: 37,
    purchase_price: 148000,
    sale_price: 237000,
    zone_type: "Nội Vùng",
    step_price: 0,
    return_fee: 1,
    zone_pick: [
      {
        name: "MN",
      },
      {
        name: "MT",
      },
      {
        name: "HCM",
      },
    ],
    carrier_account: 3,
    custom: null,
  },
  {
    from_weight: 37.01,
    to_weight: 38,
    purchase_price: 152000,
    sale_price: 244000,
    zone_type: "Nội Vùng",
    step_price: 0,
    return_fee: 1,
    zone_pick: [
      {
        name: "MN",
      },
      {
        name: "MT",
      },
      {
        name: "HCM",
      },
    ],
    carrier_account: 3,
    custom: null,
  },
  {
    from_weight: 38.01,
    to_weight: 99999,
    purchase_price: 156000,
    sale_price: 252000,
    zone_type: "Nội Vùng",
    step_price: 8000,
    return_fee: 1,
    zone_pick: [
      {
        name: "MN",
      },
      {
        name: "MT",
      },
      {
        name: "HCM",
      },
    ],
    carrier_account: 3,
    custom: null,
  },
  {
    from_weight: 7.01,
    to_weight: 8,
    purchase_price: 40000,
    sale_price: 50000,
    zone_type: "Nội Vùng",
    step_price: 0,
    return_fee: 0.5,
    zone_pick: [
      {
        name: "MB",
      },
      {
        name: "HN",
      },
    ],
    carrier_account: 4,
    custom: {
      weight: 10,
    },
  },
  {
    from_weight: 8.01,
    to_weight: 9,
    purchase_price: 40000,
    sale_price: 54000,
    zone_type: "Nội Vùng",
    step_price: 0,
    return_fee: 0.5,
    zone_pick: [
      {
        name: "MB",
      },
      {
        name: "HN",
      },
    ],
    carrier_account: 4,
    custom: {
      weight: 10,
    },
  },
  {
    from_weight: 9.01,
    to_weight: 10,
    purchase_price: 40000,
    sale_price: 60000,
    zone_type: "Nội Vùng",
    step_price: 0,
    return_fee: 0.5,
    zone_pick: [
      {
        name: "MB",
      },
      {
        name: "HN",
      },
    ],
    carrier_account: 4,
    custom: null,
  },
  {
    from_weight: 10.01,
    to_weight: 11,
    purchase_price: 44000,
    sale_price: 65000,
    zone_type: "Nội Vùng",
    step_price: 0,
    return_fee: 0.5,
    zone_pick: [
      {
        name: "MB",
      },
      {
        name: "HN",
      },
    ],
    carrier_account: 4,
    custom: null,
  },
  {
    from_weight: 11.01,
    to_weight: 12,
    purchase_price: 48000,
    sale_price: 70000,
    zone_type: "Nội Vùng",
    step_price: 0,
    return_fee: 0.5,
    zone_pick: [
      {
        name: "MB",
      },
      {
        name: "HN",
      },
    ],
    carrier_account: 4,
    custom: null,
  },
  {
    from_weight: 12.01,
    to_weight: 13,
    purchase_price: 52000,
    sale_price: 75000,
    zone_type: "Nội Vùng",
    step_price: 0,
    return_fee: 0.5,
    zone_pick: [
      {
        name: "MB",
      },
      {
        name: "HN",
      },
    ],
    carrier_account: 4,
    custom: null,
  },
  {
    from_weight: 13.01,
    to_weight: 14,
    purchase_price: 56000,
    sale_price: 80000,
    zone_type: "Nội Vùng",
    step_price: 0,
    return_fee: 0.5,
    zone_pick: [
      {
        name: "MB",
      },
      {
        name: "HN",
      },
    ],
    carrier_account: 4,
    custom: null,
  },
  {
    from_weight: 14.01,
    to_weight: 15,
    purchase_price: 60000,
    sale_price: 86000,
    zone_type: "Nội Vùng",
    step_price: 0,
    return_fee: 0.5,
    zone_pick: [
      {
        name: "MB",
      },
      {
        name: "HN",
      },
    ],
    carrier_account: 4,
    custom: null,
  },
  {
    from_weight: 15.01,
    to_weight: 16,
    purchase_price: 64000,
    sale_price: 92000,
    zone_type: "Nội Vùng",
    step_price: 0,
    return_fee: 0.5,
    zone_pick: [
      {
        name: "MB",
      },
      {
        name: "HN",
      },
    ],
    carrier_account: 4,
    custom: null,
  },
  {
    from_weight: 16.01,
    to_weight: 17,
    purchase_price: 68000,
    sale_price: 98500,
    zone_type: "Nội Vùng",
    step_price: 0,
    return_fee: 0.5,
    zone_pick: [
      {
        name: "MB",
      },
      {
        name: "HN",
      },
    ],
    carrier_account: 4,
    custom: null,
  },
  {
    from_weight: 17.01,
    to_weight: 18,
    purchase_price: 72000,
    sale_price: 105000,
    zone_type: "Nội Vùng",
    step_price: 0,
    return_fee: 0.5,
    zone_pick: [
      {
        name: "MB",
      },
      {
        name: "HN",
      },
    ],
    carrier_account: 4,
    custom: null,
  },
  {
    from_weight: 18.01,
    to_weight: 19,
    purchase_price: 76000,
    sale_price: 111500,
    zone_type: "Nội Vùng",
    step_price: 0,
    return_fee: 0.5,
    zone_pick: [
      {
        name: "MB",
      },
      {
        name: "HN",
      },
    ],
    carrier_account: 4,
    custom: null,
  },
  {
    from_weight: 19.01,
    to_weight: 20,
    purchase_price: 80000,
    sale_price: 118000,
    zone_type: "Nội Vùng",
    step_price: 0,
    return_fee: 0.5,
    zone_pick: [
      {
        name: "MB",
      },
      {
        name: "HN",
      },
    ],
    carrier_account: 4,
    custom: null,
  },
  {
    from_weight: 20.01,
    to_weight: 21,
    purchase_price: 84000,
    sale_price: 125000,
    zone_type: "Nội Vùng",
    step_price: 0,
    return_fee: 1,
    zone_pick: [
      {
        name: "MB",
      },
      {
        name: "HN",
      },
    ],
    carrier_account: 4,
    custom: null,
  },
  {
    from_weight: 21.01,
    to_weight: 22,
    purchase_price: 88000,
    sale_price: 132000,
    zone_type: "Nội Vùng",
    step_price: 0,
    return_fee: 1,
    zone_pick: [
      {
        name: "MB",
      },
      {
        name: "HN",
      },
    ],
    carrier_account: 4,
    custom: null,
  },
  {
    from_weight: 22.01,
    to_weight: 23,
    purchase_price: 92000,
    sale_price: 139000,
    zone_type: "Nội Vùng",
    step_price: 0,
    return_fee: 1,
    zone_pick: [
      {
        name: "MB",
      },
      {
        name: "HN",
      },
    ],
    carrier_account: 4,
    custom: null,
  },
  {
    from_weight: 23.01,
    to_weight: 24,
    purchase_price: 96000,
    sale_price: 146000,
    zone_type: "Nội Vùng",
    step_price: 0,
    return_fee: 1,
    zone_pick: [
      {
        name: "MB",
      },
      {
        name: "HN",
      },
    ],
    carrier_account: 4,
    custom: null,
  },
  {
    from_weight: 24.01,
    to_weight: 25,
    purchase_price: 100000,
    sale_price: 153000,
    zone_type: "Nội Vùng",
    step_price: 0,
    return_fee: 1,
    zone_pick: [
      {
        name: "MB",
      },
      {
        name: "HN",
      },
    ],
    carrier_account: 4,
    custom: null,
  },
  {
    from_weight: 25.01,
    to_weight: 26,
    purchase_price: 104000,
    sale_price: 160000,
    zone_type: "Nội Vùng",
    step_price: 0,
    return_fee: 1,
    zone_pick: [
      {
        name: "MB",
      },
      {
        name: "HN",
      },
    ],
    carrier_account: 4,
    custom: null,
  },
  {
    from_weight: 26.01,
    to_weight: 27,
    purchase_price: 108000,
    sale_price: 167000,
    zone_type: "Nội Vùng",
    step_price: 0,
    return_fee: 1,
    zone_pick: [
      {
        name: "MB",
      },
      {
        name: "HN",
      },
    ],
    carrier_account: 4,
    custom: null,
  },
  {
    from_weight: 27.01,
    to_weight: 28,
    purchase_price: 112000,
    sale_price: 174000,
    zone_type: "Nội Vùng",
    step_price: 0,
    return_fee: 1,
    zone_pick: [
      {
        name: "MB",
      },
      {
        name: "HN",
      },
    ],
    carrier_account: 4,
    custom: null,
  },
  {
    from_weight: 28.01,
    to_weight: 29,
    purchase_price: 116000,
    sale_price: 181000,
    zone_type: "Nội Vùng",
    step_price: 0,
    return_fee: 1,
    zone_pick: [
      {
        name: "MB",
      },
      {
        name: "HN",
      },
    ],
    carrier_account: 4,
    custom: null,
  },
  {
    from_weight: 29.01,
    to_weight: 30,
    purchase_price: 120000,
    sale_price: 188000,
    zone_type: "Nội Vùng",
    step_price: 0,
    return_fee: 1,
    zone_pick: [
      {
        name: "MB",
      },
      {
        name: "HN",
      },
    ],
    carrier_account: 4,
    custom: null,
  },
  {
    from_weight: 30.01,
    to_weight: 31,
    purchase_price: 124000,
    sale_price: 195000,
    zone_type: "Nội Vùng",
    step_price: 0,
    return_fee: 1,
    zone_pick: [
      {
        name: "MB",
      },
      {
        name: "HN",
      },
    ],
    carrier_account: 4,
    custom: null,
  },
  {
    from_weight: 31.01,
    to_weight: 32,
    purchase_price: 128000,
    sale_price: 202000,
    zone_type: "Nội Vùng",
    step_price: 0,
    return_fee: 1,
    zone_pick: [
      {
        name: "MB",
      },
      {
        name: "HN",
      },
    ],
    carrier_account: 4,
    custom: null,
  },
  {
    from_weight: 32.01,
    to_weight: 33,
    purchase_price: 132000,
    sale_price: 209000,
    zone_type: "Nội Vùng",
    step_price: 0,
    return_fee: 1,
    zone_pick: [
      {
        name: "MB",
      },
      {
        name: "HN",
      },
    ],
    carrier_account: 4,
    custom: null,
  },
  {
    from_weight: 33.01,
    to_weight: 34,
    purchase_price: 136000,
    sale_price: 216000,
    zone_type: "Nội Vùng",
    step_price: 0,
    return_fee: 1,
    zone_pick: [
      {
        name: "MB",
      },
      {
        name: "HN",
      },
    ],
    carrier_account: 4,
    custom: null,
  },
  {
    from_weight: 34.01,
    to_weight: 35,
    purchase_price: 140000,
    sale_price: 223000,
    zone_type: "Nội Vùng",
    step_price: 0,
    return_fee: 1,
    zone_pick: [
      {
        name: "MB",
      },
      {
        name: "HN",
      },
    ],
    carrier_account: 4,
    custom: null,
  },
  {
    from_weight: 35.01,
    to_weight: 36,
    purchase_price: 144000,
    sale_price: 230000,
    zone_type: "Nội Vùng",
    step_price: 0,
    return_fee: 1,
    zone_pick: [
      {
        name: "MB",
      },
      {
        name: "HN",
      },
    ],
    carrier_account: 4,
    custom: null,
  },
  {
    from_weight: 36.01,
    to_weight: 37,
    purchase_price: 148000,
    sale_price: 237000,
    zone_type: "Nội Vùng",
    step_price: 0,
    return_fee: 1,
    zone_pick: [
      {
        name: "MB",
      },
      {
        name: "HN",
      },
    ],
    carrier_account: 4,
    custom: null,
  },
  {
    from_weight: 37.01,
    to_weight: 38,
    purchase_price: 152000,
    sale_price: 244000,
    zone_type: "Nội Vùng",
    step_price: 0,
    return_fee: 1,
    zone_pick: [
      {
        name: "MB",
      },
      {
        name: "HN",
      },
    ],
    carrier_account: 4,
    custom: null,
  },
  {
    from_weight: 38.01,
    to_weight: 99999,
    purchase_price: 156000,
    sale_price: 252000,
    zone_type: "Nội Vùng",
    step_price: 8000,
    return_fee: 1,
    zone_pick: [
      {
        name: "MB",
      },
      {
        name: "HN",
      },
    ],
    carrier_account: 4,
    custom: null,
  },
  {
    from_weight: 0,
    to_weight: 1,
    purchase_price: 20000,
    sale_price: 24000,
    zone_type: "Liên Vùng",
    step_price: 0,
    return_fee: 0.5,
    zone_pick: [
      {
        name: "MN",
      },
      {
        name: "MT",
      },
      {
        name: "MB",
      },
      {
        name: "HN",
      },
      {
        name: "HCM",
      },
    ],
    carrier_account: 5,
    custom: null,
  },
  {
    from_weight: 1.01,
    to_weight: 2,
    purchase_price: 24000,
    sale_price: 28000,
    zone_type: "Liên Vùng",
    step_price: 0,
    return_fee: 0.5,
    zone_pick: [
      {
        name: "MN",
      },
      {
        name: "MT",
      },
      {
        name: "MB",
      },
      {
        name: "HN",
      },
      {
        name: "HCM",
      },
    ],
    carrier_account: 5,
    custom: null,
  },
  {
    from_weight: 2.01,
    to_weight: 3,
    purchase_price: 28000,
    sale_price: 32000,
    zone_type: "Liên Vùng",
    step_price: 0,
    return_fee: 0.5,
    zone_pick: [
      {
        name: "MN",
      },
      {
        name: "MT",
      },
      {
        name: "MB",
      },
      {
        name: "HN",
      },
      {
        name: "HCM",
      },
    ],
    carrier_account: 5,
    custom: null,
  },
  {
    from_weight: 3.01,
    to_weight: 4,
    purchase_price: 37000,
    sale_price: 40000,
    zone_type: "Liên Vùng",
    step_price: 0,
    return_fee: 0.5,
    zone_pick: [
      {
        name: "MN",
      },
      {
        name: "MT",
      },
      {
        name: "MB",
      },
      {
        name: "HN",
      },
      {
        name: "HCM",
      },
    ],
    carrier_account: 5,
    custom: null,
  },
  {
    from_weight: 4.01,
    to_weight: 5,
    purchase_price: 40000,
    sale_price: 43000,
    zone_type: "Liên Vùng",
    step_price: 0,
    return_fee: 0.5,
    zone_pick: [
      {
        name: "MN",
      },
      {
        name: "MT",
      },
      {
        name: "MB",
      },
      {
        name: "HN",
      },
      {
        name: "HCM",
      },
    ],
    carrier_account: 5,
    custom: null,
  },
  {
    from_weight: 5.01,
    to_weight: 6,
    purchase_price: 40000,
    sale_price: 44000,
    zone_type: "Liên Vùng",
    step_price: 0,
    return_fee: 0.5,
    zone_pick: [
      {
        name: "MN",
      },
      {
        name: "MT",
      },
      {
        name: "HCM",
      },
    ],
    carrier_account: 3,
    custom: {
      weight: 10,
    },
  },
  {
    from_weight: 6.01,
    to_weight: 7,
    purchase_price: 40000,
    sale_price: 46000,
    zone_type: "Liên Vùng",
    step_price: 0,
    return_fee: 0.5,
    zone_pick: [
      {
        name: "MN",
      },
      {
        name: "MT",
      },
      {
        name: "HCM",
      },
    ],
    carrier_account: 3,
    custom: {
      weight: 10,
    },
  },
  {
    from_weight: 7.01,
    to_weight: 8,
    purchase_price: 40000,
    sale_price: 50000,
    zone_type: "Liên Vùng",
    step_price: 0,
    return_fee: 0.5,
    zone_pick: [
      {
        name: "MN",
      },
      {
        name: "MT",
      },
      {
        name: "HCM",
      },
    ],
    carrier_account: 3,
    custom: {
      weight: 10,
    },
  },
  {
    from_weight: 8.01,
    to_weight: 9,
    purchase_price: 40000,
    sale_price: 54000,
    zone_type: "Liên Vùng",
    step_price: 0,
    return_fee: 0.5,
    zone_pick: [
      {
        name: "MN",
      },
      {
        name: "MT",
      },
      {
        name: "HCM",
      },
    ],
    carrier_account: 3,
    custom: {
      weight: 10,
    },
  },
  {
    from_weight: 9.01,
    to_weight: 10,
    purchase_price: 40000,
    sale_price: 60000,
    zone_type: "Liên Vùng",
    step_price: 0,
    return_fee: 0.5,
    zone_pick: [
      {
        name: "MN",
      },
      {
        name: "MT",
      },
      {
        name: "HCM",
      },
    ],
    carrier_account: 3,
    custom: null,
  },
  {
    from_weight: 10.01,
    to_weight: 11,
    purchase_price: 44000,
    sale_price: 65000,
    zone_type: "Liên Vùng",
    step_price: 0,
    return_fee: 0.5,
    zone_pick: [
      {
        name: "MN",
      },
      {
        name: "MT",
      },
      {
        name: "HCM",
      },
    ],
    carrier_account: 3,
    custom: null,
  },
  {
    from_weight: 11.01,
    to_weight: 12,
    purchase_price: 48000,
    sale_price: 70000,
    zone_type: "Liên Vùng",
    step_price: 0,
    return_fee: 0.5,
    zone_pick: [
      {
        name: "MN",
      },
      {
        name: "MT",
      },
      {
        name: "HCM",
      },
    ],
    carrier_account: 3,
    custom: null,
  },
  {
    from_weight: 12.01,
    to_weight: 13,
    purchase_price: 52000,
    sale_price: 75000,
    zone_type: "Liên Vùng",
    step_price: 0,
    return_fee: 0.5,
    zone_pick: [
      {
        name: "MN",
      },
      {
        name: "MT",
      },
      {
        name: "HCM",
      },
    ],
    carrier_account: 3,
    custom: null,
  },
  {
    from_weight: 13.01,
    to_weight: 14,
    purchase_price: 56000,
    sale_price: 80000,
    zone_type: "Liên Vùng",
    step_price: 0,
    return_fee: 0.5,
    zone_pick: [
      {
        name: "MN",
      },
      {
        name: "MT",
      },
      {
        name: "HCM",
      },
    ],
    carrier_account: 3,
    custom: null,
  },
  {
    from_weight: 14.01,
    to_weight: 15,
    purchase_price: 60000,
    sale_price: 86000,
    zone_type: "Liên Vùng",
    step_price: 0,
    return_fee: 0.5,
    zone_pick: [
      {
        name: "MN",
      },
      {
        name: "MT",
      },
      {
        name: "HCM",
      },
    ],
    carrier_account: 3,
    custom: null,
  },
  {
    from_weight: 15.01,
    to_weight: 16,
    purchase_price: 64000,
    sale_price: 92000,
    zone_type: "Liên Vùng",
    step_price: 0,
    return_fee: 0.5,
    zone_pick: [
      {
        name: "MN",
      },
      {
        name: "MT",
      },
      {
        name: "HCM",
      },
    ],
    carrier_account: 3,
    custom: null,
  },
  {
    from_weight: 16.01,
    to_weight: 17,
    purchase_price: 68000,
    sale_price: 98500,
    zone_type: "Liên Vùng",
    step_price: 0,
    return_fee: 0.5,
    zone_pick: [
      {
        name: "MN",
      },
      {
        name: "MT",
      },
      {
        name: "HCM",
      },
    ],
    carrier_account: 3,
    custom: null,
  },
  {
    from_weight: 17.01,
    to_weight: 18,
    purchase_price: 72000,
    sale_price: 105000,
    zone_type: "Liên Vùng",
    step_price: 0,
    return_fee: 0.5,
    zone_pick: [
      {
        name: "MN",
      },
      {
        name: "MT",
      },
      {
        name: "HCM",
      },
    ],
    carrier_account: 3,
    custom: null,
  },
  {
    from_weight: 18.01,
    to_weight: 19,
    purchase_price: 76000,
    sale_price: 111500,
    zone_type: "Liên Vùng",
    step_price: 0,
    return_fee: 0.5,
    zone_pick: [
      {
        name: "MN",
      },
      {
        name: "MT",
      },
      {
        name: "HCM",
      },
    ],
    carrier_account: 3,
    custom: null,
  },
  {
    from_weight: 19.01,
    to_weight: 20,
    purchase_price: 80000,
    sale_price: 118000,
    zone_type: "Liên Vùng",
    step_price: 0,
    return_fee: 0.5,
    zone_pick: [
      {
        name: "MN",
      },
      {
        name: "MT",
      },
      {
        name: "HCM",
      },
    ],
    carrier_account: 3,
    custom: null,
  },
  {
    from_weight: 20.01,
    to_weight: 21,
    purchase_price: 84000,
    sale_price: 125000,
    zone_type: "Liên Vùng",
    step_price: 0,
    return_fee: 1,
    zone_pick: [
      {
        name: "MN",
      },
      {
        name: "MT",
      },
      {
        name: "HCM",
      },
    ],
    carrier_account: 3,
    custom: null,
  },
  {
    from_weight: 21.01,
    to_weight: 22,
    purchase_price: 88000,
    sale_price: 132000,
    zone_type: "Liên Vùng",
    step_price: 0,
    return_fee: 1,
    zone_pick: [
      {
        name: "MN",
      },
      {
        name: "MT",
      },
      {
        name: "HCM",
      },
    ],
    carrier_account: 3,
    custom: null,
  },
  {
    from_weight: 22.01,
    to_weight: 23,
    purchase_price: 92000,
    sale_price: 139000,
    zone_type: "Liên Vùng",
    step_price: 0,
    return_fee: 1,
    zone_pick: [
      {
        name: "MN",
      },
      {
        name: "MT",
      },
      {
        name: "HCM",
      },
    ],
    carrier_account: 3,
    custom: null,
  },
  {
    from_weight: 23.01,
    to_weight: 24,
    purchase_price: 96000,
    sale_price: 146000,
    zone_type: "Liên Vùng",
    step_price: 0,
    return_fee: 1,
    zone_pick: [
      {
        name: "MN",
      },
      {
        name: "MT",
      },
      {
        name: "HCM",
      },
    ],
    carrier_account: 3,
    custom: null,
  },
  {
    from_weight: 24.01,
    to_weight: 25,
    purchase_price: 100000,
    sale_price: 153000,
    zone_type: "Liên Vùng",
    step_price: 0,
    return_fee: 1,
    zone_pick: [
      {
        name: "MN",
      },
      {
        name: "MT",
      },
      {
        name: "HCM",
      },
    ],
    carrier_account: 3,
    custom: null,
  },
  {
    from_weight: 25.01,
    to_weight: 26,
    purchase_price: 104000,
    sale_price: 160000,
    zone_type: "Liên Vùng",
    step_price: 0,
    return_fee: 1,
    zone_pick: [
      {
        name: "MN",
      },
      {
        name: "MT",
      },
      {
        name: "HCM",
      },
    ],
    carrier_account: 3,
    custom: null,
  },
  {
    from_weight: 26.01,
    to_weight: 27,
    purchase_price: 108000,
    sale_price: 167000,
    zone_type: "Liên Vùng",
    step_price: 0,
    return_fee: 1,
    zone_pick: [
      {
        name: "MN",
      },
      {
        name: "MT",
      },
      {
        name: "HCM",
      },
    ],
    carrier_account: 3,
    custom: null,
  },
  {
    from_weight: 27.01,
    to_weight: 28,
    purchase_price: 112000,
    sale_price: 174000,
    zone_type: "Liên Vùng",
    step_price: 0,
    return_fee: 1,
    zone_pick: [
      {
        name: "MN",
      },
      {
        name: "MT",
      },
      {
        name: "HCM",
      },
    ],
    carrier_account: 3,
    custom: null,
  },
  {
    from_weight: 28.01,
    to_weight: 29,
    purchase_price: 116000,
    sale_price: 181000,
    zone_type: "Liên Vùng",
    step_price: 0,
    return_fee: 1,
    zone_pick: [
      {
        name: "MN",
      },
      {
        name: "MT",
      },
      {
        name: "HCM",
      },
    ],
    carrier_account: 3,
    custom: null,
  },
  {
    from_weight: 29.01,
    to_weight: 30,
    purchase_price: 120000,
    sale_price: 188000,
    zone_type: "Liên Vùng",
    step_price: 0,
    return_fee: 1,
    zone_pick: [
      {
        name: "MN",
      },
      {
        name: "MT",
      },
      {
        name: "HCM",
      },
    ],
    carrier_account: 3,
    custom: null,
  },
  {
    from_weight: 30.01,
    to_weight: 31,
    purchase_price: 124000,
    sale_price: 195000,
    zone_type: "Liên Vùng",
    step_price: 0,
    return_fee: 1,
    zone_pick: [
      {
        name: "MN",
      },
      {
        name: "MT",
      },
      {
        name: "HCM",
      },
    ],
    carrier_account: 3,
    custom: null,
  },
  {
    from_weight: 31.01,
    to_weight: 32,
    purchase_price: 128000,
    sale_price: 202000,
    zone_type: "Liên Vùng",
    step_price: 0,
    return_fee: 1,
    zone_pick: [
      {
        name: "MN",
      },
      {
        name: "MT",
      },
      {
        name: "HCM",
      },
    ],
    carrier_account: 3,
    custom: null,
  },
  {
    from_weight: 32.01,
    to_weight: 33,
    purchase_price: 132000,
    sale_price: 209000,
    zone_type: "Liên Vùng",
    step_price: 0,
    return_fee: 1,
    zone_pick: [
      {
        name: "MN",
      },
      {
        name: "MT",
      },
      {
        name: "HCM",
      },
    ],
    carrier_account: 3,
    custom: null,
  },
  {
    from_weight: 33.01,
    to_weight: 34,
    purchase_price: 136000,
    sale_price: 216000,
    zone_type: "Liên Vùng",
    step_price: 0,
    return_fee: 1,
    zone_pick: [
      {
        name: "MN",
      },
      {
        name: "MT",
      },
      {
        name: "HCM",
      },
    ],
    carrier_account: 3,
    custom: null,
  },
  {
    from_weight: 34.01,
    to_weight: 35,
    purchase_price: 140000,
    sale_price: 223000,
    zone_type: "Liên Vùng",
    step_price: 0,
    return_fee: 1,
    zone_pick: [
      {
        name: "MN",
      },
      {
        name: "MT",
      },
      {
        name: "HCM",
      },
    ],
    carrier_account: 3,
    custom: null,
  },
  {
    from_weight: 35.01,
    to_weight: 36,
    purchase_price: 144000,
    sale_price: 230000,
    zone_type: "Liên Vùng",
    step_price: 0,
    return_fee: 1,
    zone_pick: [
      {
        name: "MN",
      },
      {
        name: "MT",
      },
      {
        name: "HCM",
      },
    ],
    carrier_account: 3,
    custom: null,
  },
  {
    from_weight: 36.01,
    to_weight: 37,
    purchase_price: 148000,
    sale_price: 237000,
    zone_type: "Liên Vùng",
    step_price: 0,
    return_fee: 1,
    zone_pick: [
      {
        name: "MN",
      },
      {
        name: "MT",
      },
      {
        name: "HCM",
      },
    ],
    carrier_account: 3,
    custom: null,
  },
  {
    from_weight: 37.01,
    to_weight: 38,
    purchase_price: 152000,
    sale_price: 244000,
    zone_type: "Liên Vùng",
    step_price: 0,
    return_fee: 1,
    zone_pick: [
      {
        name: "MN",
      },
      {
        name: "MT",
      },
      {
        name: "HCM",
      },
    ],
    carrier_account: 3,
    custom: null,
  },
  {
    from_weight: 38.01,
    to_weight: 99999,
    purchase_price: 156000,
    sale_price: 252000,
    zone_type: "Liên Vùng",
    step_price: 8000,
    return_fee: 1,
    zone_pick: [
      {
        name: "MN",
      },
      {
        name: "MT",
      },
      {
        name: "HCM",
      },
    ],
    carrier_account: 3,
    custom: null,
  },
  {
    from_weight: 5.01,
    to_weight: 6,
    purchase_price: 40000,
    sale_price: 44000,
    zone_type: "Liên Vùng",
    step_price: 0,
    return_fee: 0.5,
    zone_pick: [
      {
        name: "MB",
      },
      {
        name: "HN",
      },
    ],
    carrier_account: 4,
    custom: {
      weight: 10,
    },
  },
  {
    from_weight: 6.01,
    to_weight: 7,
    purchase_price: 40000,
    sale_price: 46000,
    zone_type: "Liên Vùng",
    step_price: 0,
    return_fee: 0.5,
    zone_pick: [
      {
        name: "MB",
      },
      {
        name: "HN",
      },
    ],
    carrier_account: 4,
    custom: {
      weight: 10,
    },
  },
  {
    from_weight: 7.01,
    to_weight: 8,
    purchase_price: 40000,
    sale_price: 50000,
    zone_type: "Liên Vùng",
    step_price: 0,
    return_fee: 0.5,
    zone_pick: [
      {
        name: "MB",
      },
      {
        name: "HN",
      },
    ],
    carrier_account: 4,
    custom: {
      weight: 10,
    },
  },
  {
    from_weight: 8.01,
    to_weight: 9,
    purchase_price: 40000,
    sale_price: 54000,
    zone_type: "Liên Vùng",
    step_price: 0,
    return_fee: 0.5,
    zone_pick: [
      {
        name: "MB",
      },
      {
        name: "HN",
      },
    ],
    carrier_account: 4,
    custom: {
      weight: 10,
    },
  },
  {
    from_weight: 9.01,
    to_weight: 10,
    purchase_price: 40000,
    sale_price: 60000,
    zone_type: "Liên Vùng",
    step_price: 0,
    return_fee: 0.5,
    zone_pick: [
      {
        name: "MB",
      },
      {
        name: "HN",
      },
    ],
    carrier_account: 4,
    custom: null,
  },
  {
    from_weight: 10.01,
    to_weight: 11,
    purchase_price: 44000,
    sale_price: 65000,
    zone_type: "Liên Vùng",
    step_price: 0,
    return_fee: 0.5,
    zone_pick: [
      {
        name: "MB",
      },
      {
        name: "HN",
      },
    ],
    carrier_account: 4,
    custom: null,
  },
  {
    from_weight: 11.01,
    to_weight: 12,
    purchase_price: 48000,
    sale_price: 70000,
    zone_type: "Liên Vùng",
    step_price: 0,
    return_fee: 0.5,
    zone_pick: [
      {
        name: "MB",
      },
      {
        name: "HN",
      },
    ],
    carrier_account: 4,
    custom: null,
  },
  {
    from_weight: 12.01,
    to_weight: 13,
    purchase_price: 52000,
    sale_price: 75000,
    zone_type: "Liên Vùng",
    step_price: 0,
    return_fee: 0.5,
    zone_pick: [
      {
        name: "MB",
      },
      {
        name: "HN",
      },
    ],
    carrier_account: 4,
    custom: null,
  },
  {
    from_weight: 13.01,
    to_weight: 14,
    purchase_price: 56000,
    sale_price: 80000,
    zone_type: "Liên Vùng",
    step_price: 0,
    return_fee: 0.5,
    zone_pick: [
      {
        name: "MB",
      },
      {
        name: "HN",
      },
    ],
    carrier_account: 4,
    custom: null,
  },
  {
    from_weight: 14.01,
    to_weight: 15,
    purchase_price: 60000,
    sale_price: 86000,
    zone_type: "Liên Vùng",
    step_price: 0,
    return_fee: 0.5,
    zone_pick: [
      {
        name: "MB",
      },
      {
        name: "HN",
      },
    ],
    carrier_account: 4,
    custom: null,
  },
  {
    from_weight: 15.01,
    to_weight: 16,
    purchase_price: 64000,
    sale_price: 92000,
    zone_type: "Liên Vùng",
    step_price: 0,
    return_fee: 0.5,
    zone_pick: [
      {
        name: "MB",
      },
      {
        name: "HN",
      },
    ],
    carrier_account: 4,
    custom: null,
  },
  {
    from_weight: 16.01,
    to_weight: 17,
    purchase_price: 68000,
    sale_price: 98500,
    zone_type: "Liên Vùng",
    step_price: 0,
    return_fee: 0.5,
    zone_pick: [
      {
        name: "MB",
      },
      {
        name: "HN",
      },
    ],
    carrier_account: 4,
    custom: null,
  },
  {
    from_weight: 17.01,
    to_weight: 18,
    purchase_price: 72000,
    sale_price: 105000,
    zone_type: "Liên Vùng",
    step_price: 0,
    return_fee: 0.5,
    zone_pick: [
      {
        name: "MB",
      },
      {
        name: "HN",
      },
    ],
    carrier_account: 4,
    custom: null,
  },
  {
    from_weight: 18.01,
    to_weight: 19,
    purchase_price: 76000,
    sale_price: 111500,
    zone_type: "Liên Vùng",
    step_price: 0,
    return_fee: 0.5,
    zone_pick: [
      {
        name: "MB",
      },
      {
        name: "HN",
      },
    ],
    carrier_account: 4,
    custom: null,
  },
  {
    from_weight: 19.01,
    to_weight: 20,
    purchase_price: 80000,
    sale_price: 118000,
    zone_type: "Liên Vùng",
    step_price: 0,
    return_fee: 0.5,
    zone_pick: [
      {
        name: "MB",
      },
      {
        name: "HN",
      },
    ],
    carrier_account: 4,
    custom: null,
  },
  {
    from_weight: 20.01,
    to_weight: 21,
    purchase_price: 84000,
    sale_price: 125000,
    zone_type: "Liên Vùng",
    step_price: 0,
    return_fee: 1,
    zone_pick: [
      {
        name: "MB",
      },
      {
        name: "HN",
      },
    ],
    carrier_account: 4,
    custom: null,
  },
  {
    from_weight: 21.01,
    to_weight: 22,
    purchase_price: 88000,
    sale_price: 132000,
    zone_type: "Liên Vùng",
    step_price: 0,
    return_fee: 1,
    zone_pick: [
      {
        name: "MB",
      },
      {
        name: "HN",
      },
    ],
    carrier_account: 4,
    custom: null,
  },
  {
    from_weight: 22.01,
    to_weight: 23,
    purchase_price: 92000,
    sale_price: 139000,
    zone_type: "Liên Vùng",
    step_price: 0,
    return_fee: 1,
    zone_pick: [
      {
        name: "MB",
      },
      {
        name: "HN",
      },
    ],
    carrier_account: 4,
    custom: null,
  },
  {
    from_weight: 23.01,
    to_weight: 24,
    purchase_price: 96000,
    sale_price: 146000,
    zone_type: "Liên Vùng",
    step_price: 0,
    return_fee: 1,
    zone_pick: [
      {
        name: "MB",
      },
      {
        name: "HN",
      },
    ],
    carrier_account: 4,
    custom: null,
  },
  {
    from_weight: 24.01,
    to_weight: 25,
    purchase_price: 100000,
    sale_price: 153000,
    zone_type: "Liên Vùng",
    step_price: 0,
    return_fee: 1,
    zone_pick: [
      {
        name: "MB",
      },
      {
        name: "HN",
      },
    ],
    carrier_account: 4,
    custom: null,
  },
  {
    from_weight: 25.01,
    to_weight: 26,
    purchase_price: 104000,
    sale_price: 160000,
    zone_type: "Liên Vùng",
    step_price: 0,
    return_fee: 1,
    zone_pick: [
      {
        name: "MB",
      },
      {
        name: "HN",
      },
    ],
    carrier_account: 4,
    custom: null,
  },
  {
    from_weight: 26.01,
    to_weight: 27,
    purchase_price: 108000,
    sale_price: 167000,
    zone_type: "Liên Vùng",
    step_price: 0,
    return_fee: 1,
    zone_pick: [
      {
        name: "MB",
      },
      {
        name: "HN",
      },
    ],
    carrier_account: 4,
    custom: null,
  },
  {
    from_weight: 27.01,
    to_weight: 28,
    purchase_price: 112000,
    sale_price: 174000,
    zone_type: "Liên Vùng",
    step_price: 0,
    return_fee: 1,
    zone_pick: [
      {
        name: "MB",
      },
      {
        name: "HN",
      },
    ],
    carrier_account: 4,
    custom: null,
  },
  {
    from_weight: 28.01,
    to_weight: 29,
    purchase_price: 116000,
    sale_price: 181000,
    zone_type: "Liên Vùng",
    step_price: 0,
    return_fee: 1,
    zone_pick: [
      {
        name: "MB",
      },
      {
        name: "HN",
      },
    ],
    carrier_account: 4,
    custom: null,
  },
  {
    from_weight: 29.01,
    to_weight: 30,
    purchase_price: 120000,
    sale_price: 188000,
    zone_type: "Liên Vùng",
    step_price: 0,
    return_fee: 1,
    zone_pick: [
      {
        name: "MB",
      },
      {
        name: "HN",
      },
    ],
    carrier_account: 4,
    custom: null,
  },
  {
    from_weight: 30.01,
    to_weight: 31,
    purchase_price: 124000,
    sale_price: 195000,
    zone_type: "Liên Vùng",
    step_price: 0,
    return_fee: 1,
    zone_pick: [
      {
        name: "MB",
      },
      {
        name: "HN",
      },
    ],
    carrier_account: 4,
    custom: null,
  },
  {
    from_weight: 31.01,
    to_weight: 32,
    purchase_price: 128000,
    sale_price: 202000,
    zone_type: "Liên Vùng",
    step_price: 0,
    return_fee: 1,
    zone_pick: [
      {
        name: "MB",
      },
      {
        name: "HN",
      },
    ],
    carrier_account: 4,
    custom: null,
  },
  {
    from_weight: 32.01,
    to_weight: 33,
    purchase_price: 132000,
    sale_price: 209000,
    zone_type: "Liên Vùng",
    step_price: 0,
    return_fee: 1,
    zone_pick: [
      {
        name: "MB",
      },
      {
        name: "HN",
      },
    ],
    carrier_account: 4,
    custom: null,
  },
  {
    from_weight: 33.01,
    to_weight: 34,
    purchase_price: 136000,
    sale_price: 216000,
    zone_type: "Liên Vùng",
    step_price: 0,
    return_fee: 1,
    zone_pick: [
      {
        name: "MB",
      },
      {
        name: "HN",
      },
    ],
    carrier_account: 4,
    custom: null,
  },
  {
    from_weight: 34.01,
    to_weight: 35,
    purchase_price: 140000,
    sale_price: 223000,
    zone_type: "Liên Vùng",
    step_price: 0,
    return_fee: 1,
    zone_pick: [
      {
        name: "MB",
      },
      {
        name: "HN",
      },
    ],
    carrier_account: 4,
    custom: null,
  },
  {
    from_weight: 35.01,
    to_weight: 36,
    purchase_price: 144000,
    sale_price: 230000,
    zone_type: "Liên Vùng",
    step_price: 0,
    return_fee: 1,
    zone_pick: [
      {
        name: "MB",
      },
      {
        name: "HN",
      },
    ],
    carrier_account: 4,
    custom: null,
  },
  {
    from_weight: 36.01,
    to_weight: 37,
    purchase_price: 148000,
    sale_price: 237000,
    zone_type: "Liên Vùng",
    step_price: 0,
    return_fee: 1,
    zone_pick: [
      {
        name: "MB",
      },
      {
        name: "HN",
      },
    ],
    carrier_account: 4,
    custom: null,
  },
  {
    from_weight: 37.01,
    to_weight: 38,
    purchase_price: 152000,
    sale_price: 244000,
    zone_type: "Liên Vùng",
    step_price: 0,
    return_fee: 1,
    zone_pick: [
      {
        name: "MB",
      },
      {
        name: "HN",
      },
    ],
    carrier_account: 4,
    custom: null,
  },
  {
    from_weight: 38.01,
    to_weight: 99999,
    purchase_price: 156000,
    sale_price: 252000,
    zone_type: "Liên Vùng",
    step_price: 8000,
    return_fee: 1,
    zone_pick: [
      {
        name: "MB",
      },
      {
        name: "HN",
      },
    ],
    carrier_account: 4,
    custom: null,
  },
];

const price_items_ghn = [
  {
    from_weight: 0,
    to_weight: 0.5,
    purchase_price: 19000,
    sale_price: 21000,
    zone_type: "Nội Tỉnh",
    step_price: 0,
    return_fee: 0.5,
    zone_pick: [
      {
        name: "MN",
      },
      {
        name: "MT",
      },
      {
        name: "MB",
      },
      {
        name: "HN",
      },
      {
        name: "HCM",
      },
    ],
    carrier_account: 6,
    custom: {
      weight: 0.5,
    },
  },
  {
    from_weight: 0.501,
    to_weight: 1,
    purchase_price: 19000,
    sale_price: 22000,
    zone_type: "Nội Tỉnh",
    step_price: 0,
    return_fee: 0.5,
    zone_pick: [
      {
        name: "MN",
      },
      {
        name: "MT",
      },
      {
        name: "MB",
      },
      {
        name: "HN",
      },
      {
        name: "HCM",
      },
    ],
    carrier_account: 6,
    custom: {
      weight: 0.5,
    },
  },
  {
    from_weight: 1.1,
    to_weight: 2,
    purchase_price: 19000,
    sale_price: 23000,
    zone_type: "Nội Tỉnh",
    step_price: 0,
    return_fee: 0.5,
    zone_pick: [
      {
        name: "MN",
      },
      {
        name: "MT",
      },
      {
        name: "MB",
      },
      {
        name: "HN",
      },
      {
        name: "HCM",
      },
    ],
    carrier_account: 6,
    custom: {
      weight: 0.5,
    },
  },
  {
    from_weight: 2.01,
    to_weight: 2.5,
    purchase_price: 20500,
    sale_price: 24000,
    zone_type: "Nội Tỉnh",
    step_price: 0,
    return_fee: 0.5,
    zone_pick: [
      {
        name: "MN",
      },
      {
        name: "MT",
      },
      {
        name: "MB",
      },
      {
        name: "HN",
      },
      {
        name: "HCM",
      },
    ],
    carrier_account: 6,
    custom: {
      weight: 2,
    },
  },
  {
    from_weight: 2.501,
    to_weight: 3,
    purchase_price: 22000,
    sale_price: 25000,
    zone_type: "Nội Tỉnh",
    step_price: 0,
    return_fee: 0.5,
    zone_pick: [
      {
        name: "MN",
      },
      {
        name: "MT",
      },
      {
        name: "MB",
      },
      {
        name: "HN",
      },
      {
        name: "HCM",
      },
    ],
    carrier_account: 6,
    custom: {
      weight: 2.5,
    },
  },
  {
    from_weight: 3.01,
    to_weight: 3.5,
    purchase_price: 23500,
    sale_price: 26000,
    zone_type: "Nội Tỉnh",
    step_price: 0,
    return_fee: 0.5,
    zone_pick: [
      {
        name: "MN",
      },
      {
        name: "MT",
      },
      {
        name: "MB",
      },
      {
        name: "HN",
      },
      {
        name: "HCM",
      },
    ],
    carrier_account: 6,
    custom: {
      weight: 3,
    },
  },
  {
    from_weight: 3.501,
    to_weight: 4,
    purchase_price: 25000,
    sale_price: 27000,
    zone_type: "Nội Tỉnh",
    step_price: 0,
    return_fee: 0.5,
    zone_pick: [
      {
        name: "MN",
      },
      {
        name: "MT",
      },
      {
        name: "MB",
      },
      {
        name: "HN",
      },
      {
        name: "HCM",
      },
    ],
    carrier_account: 6,
    custom: {
      weight: 3.5,
    },
  },
  {
    from_weight: 4.01,
    to_weight: 4.5,
    purchase_price: 26500,
    sale_price: 28500,
    zone_type: "Nội Tỉnh",
    step_price: 0,
    return_fee: 0.5,
    zone_pick: [
      {
        name: "MN",
      },
      {
        name: "MT",
      },
      {
        name: "MB",
      },
      {
        name: "HN",
      },
      {
        name: "HCM",
      },
    ],
    carrier_account: 6,
    custom: {
      weight: 4,
    },
  },
  {
    from_weight: 4.501,
    to_weight: 5,
    purchase_price: 28000,
    sale_price: 30000,
    zone_type: "Nội Tỉnh",
    step_price: 0,
    return_fee: 0.5,
    zone_pick: [
      {
        name: "MN",
      },
      {
        name: "MT",
      },
      {
        name: "MB",
      },
      {
        name: "HN",
      },
      {
        name: "HCM",
      },
    ],
    carrier_account: 6,
    custom: {
      weight: 4.5,
    },
  },
  {
    from_weight: 5.01,
    to_weight: 7,
    purchase_price: 40000,
    sale_price: 45000,
    zone_type: "Nội Tỉnh",
    step_price: 0,
    return_fee: 0.5,
    zone_pick: [
      {
        name: "MN",
      },
      {
        name: "MT",
      },
      {
        name: "MB",
      },
      {
        name: "HN",
      },
      {
        name: "HCM",
      },
    ],
    carrier_account: 7,
    custom: {
      weight: 10,
    },
  },
  {
    from_weight: 7.01,
    to_weight: 9,
    purchase_price: 40000,
    sale_price: 50000,
    zone_type: "Nội Tỉnh",
    step_price: 0,
    return_fee: 0.5,
    zone_pick: [
      {
        name: "MN",
      },
      {
        name: "MT",
      },
      {
        name: "MB",
      },
      {
        name: "HN",
      },
      {
        name: "HCM",
      },
    ],
    carrier_account: 7,
    custom: {
      weight: 10,
    },
  },
  {
    from_weight: 9.01,
    to_weight: 10,
    purchase_price: 40000,
    sale_price: 55000,
    zone_type: "Nội Tỉnh",
    step_price: 0,
    return_fee: 0.5,
    zone_pick: [
      {
        name: "MN",
      },
      {
        name: "MT",
      },
      {
        name: "MB",
      },
      {
        name: "HN",
      },
      {
        name: "HCM",
      },
    ],
    carrier_account: 7,
    custom: {
      weight: 10,
    },
  },
  {
    from_weight: 10.01,
    to_weight: 99999,
    purchase_price: 44000,
    sale_price: 61000,
    zone_type: "Nội Tỉnh",
    step_price: 6000,
    return_fee: 0.5,
    zone_pick: [
      {
        name: "MN",
      },
      {
        name: "MT",
      },
      {
        name: "MB",
      },
      {
        name: "HN",
      },
      {
        name: "HCM",
      },
    ],
    carrier_account: 7,
    custom: {
      weight: 10,
    },
  },
  {
    from_weight: 0,
    to_weight: 0.5,
    purchase_price: 19000,
    sale_price: 21000,
    zone_type: "Nội Vùng",
    step_price: 0,
    return_fee: 0.5,
    zone_pick: [
      {
        name: "MN",
      },
      {
        name: "MT",
      },
      {
        name: "MB",
      },
      {
        name: "HN",
      },
      {
        name: "HCM",
      },
    ],
    carrier_account: 6,
    custom: {
      weight: 0.5,
    },
  },
  {
    from_weight: 0.501,
    to_weight: 1,
    purchase_price: 20000,
    sale_price: 22000,
    zone_type: "Nội Vùng",
    step_price: 0,
    return_fee: 0.5,
    zone_pick: [
      {
        name: "MN",
      },
      {
        name: "MT",
      },
      {
        name: "MB",
      },
      {
        name: "HN",
      },
      {
        name: "HCM",
      },
    ],
    carrier_account: 6,
    custom: {
      weight: 0.5,
    },
  },
  {
    from_weight: 1.1,
    to_weight: 2,
    purchase_price: 23000,
    sale_price: 25000,
    zone_type: "Nội Vùng",
    step_price: 0,
    return_fee: 0.5,
    zone_pick: [
      {
        name: "MN",
      },
      {
        name: "MT",
      },
      {
        name: "MB",
      },
      {
        name: "HN",
      },
      {
        name: "HCM",
      },
    ],
    carrier_account: 6,
    custom: {
      weight: 0.5,
    },
  },
  {
    from_weight: 2.01,
    to_weight: 2.5,
    purchase_price: 24500,
    sale_price: 26500,
    zone_type: "Nội Vùng",
    step_price: 0,
    return_fee: 0.5,
    zone_pick: [
      {
        name: "MN",
      },
      {
        name: "MT",
      },
      {
        name: "MB",
      },
      {
        name: "HN",
      },
      {
        name: "HCM",
      },
    ],
    carrier_account: 6,
    custom: {
      weight: 2,
    },
  },
  {
    from_weight: 2.501,
    to_weight: 3,
    purchase_price: 26000,
    sale_price: 28000,
    zone_type: "Nội Vùng",
    step_price: 0,
    return_fee: 0.5,
    zone_pick: [
      {
        name: "MN",
      },
      {
        name: "MT",
      },
      {
        name: "MB",
      },
      {
        name: "HN",
      },
      {
        name: "HCM",
      },
    ],
    carrier_account: 6,
    custom: {
      weight: 2.5,
    },
  },
  {
    from_weight: 3.01,
    to_weight: 3.5,
    purchase_price: 27500,
    sale_price: 29500,
    zone_type: "Nội Vùng",
    step_price: 0,
    return_fee: 0.5,
    zone_pick: [
      {
        name: "MN",
      },
      {
        name: "MT",
      },
      {
        name: "MB",
      },
      {
        name: "HN",
      },
      {
        name: "HCM",
      },
    ],
    carrier_account: 6,
    custom: {
      weight: 3,
    },
  },
  {
    from_weight: 3.501,
    to_weight: 4,
    purchase_price: 29000,
    sale_price: 31000,
    zone_type: "Nội Vùng",
    step_price: 0,
    return_fee: 0.5,
    zone_pick: [
      {
        name: "MN",
      },
      {
        name: "MT",
      },
      {
        name: "MB",
      },
      {
        name: "HN",
      },
      {
        name: "HCM",
      },
    ],
    carrier_account: 6,
    custom: {
      weight: 3.5,
    },
  },
  {
    from_weight: 4.01,
    to_weight: 4.5,
    purchase_price: 30500,
    sale_price: 32500,
    zone_type: "Nội Vùng",
    step_price: 0,
    return_fee: 0.5,
    zone_pick: [
      {
        name: "MN",
      },
      {
        name: "MT",
      },
      {
        name: "MB",
      },
      {
        name: "HN",
      },
      {
        name: "HCM",
      },
    ],
    carrier_account: 6,
    custom: {
      weight: 4,
    },
  },
  {
    from_weight: 4.501,
    to_weight: 5,
    purchase_price: 32000,
    sale_price: 34000,
    zone_type: "Nội Vùng",
    step_price: 0,
    return_fee: 0.5,
    zone_pick: [
      {
        name: "MN",
      },
      {
        name: "MT",
      },
      {
        name: "MB",
      },
      {
        name: "HN",
      },
      {
        name: "HCM",
      },
    ],
    carrier_account: 6,
    custom: {
      weight: 4.5,
    },
  },
  {
    from_weight: 5.01,
    to_weight: 7,
    purchase_price: 40000,
    sale_price: 45000,
    zone_type: "Nội Vùng",
    step_price: 0,
    return_fee: 0.5,
    zone_pick: [
      {
        name: "MN",
      },
      {
        name: "MT",
      },
      {
        name: "MB",
      },
      {
        name: "HN",
      },
      {
        name: "HCM",
      },
    ],
    carrier_account: 7,
    custom: {
      weight: 10,
    },
  },
  {
    from_weight: 7.01,
    to_weight: 9,
    purchase_price: 40000,
    sale_price: 50000,
    zone_type: "Nội Vùng",
    step_price: 0,
    return_fee: 0.5,
    zone_pick: [
      {
        name: "MN",
      },
      {
        name: "MT",
      },
      {
        name: "MB",
      },
      {
        name: "HN",
      },
      {
        name: "HCM",
      },
    ],
    carrier_account: 7,
    custom: {
      weight: 10,
    },
  },
  {
    from_weight: 9.01,
    to_weight: 10,
    purchase_price: 40000,
    sale_price: 55000,
    zone_type: "Nội Vùng",
    step_price: 0,
    return_fee: 0.5,
    zone_pick: [
      {
        name: "MN",
      },
      {
        name: "MT",
      },
      {
        name: "MB",
      },
      {
        name: "HN",
      },
      {
        name: "HCM",
      },
    ],
    carrier_account: 7,
    custom: {
      weight: 10,
    },
  },
  {
    from_weight: 10.01,
    to_weight: 99999,
    purchase_price: 44000,
    sale_price: 61000,
    zone_type: "Nội Vùng",
    step_price: 6000,
    return_fee: 0.5,
    zone_pick: [
      {
        name: "MN",
      },
      {
        name: "MT",
      },
      {
        name: "MB",
      },
      {
        name: "HN",
      },
      {
        name: "HCM",
      },
    ],
    carrier_account: 7,
    custom: {
      weight: 10,
    },
  },
  {
    from_weight: 0,
    to_weight: 0.5,
    purchase_price: 19000,
    sale_price: 21000,
    zone_type: "Liên Vùng",
    step_price: 0,
    return_fee: 0.5,
    zone_pick: [
      {
        name: "MN",
      },
      {
        name: "MT",
      },
      {
        name: "MB",
      },
      {
        name: "HN",
      },
      {
        name: "HCM",
      },
    ],
    carrier_account: 6,
    custom: {
      weight: 0.5,
    },
  },
  {
    from_weight: 0.501,
    to_weight: 1,
    purchase_price: 20000,
    sale_price: 22000,
    zone_type: "Liên Vùng",
    step_price: 0,
    return_fee: 0.5,
    zone_pick: [
      {
        name: "MN",
      },
      {
        name: "MT",
      },
      {
        name: "MB",
      },
      {
        name: "HN",
      },
      {
        name: "HCM",
      },
    ],
    carrier_account: 6,
    custom: {
      weight: 0.5,
    },
  },
  {
    from_weight: 1.1,
    to_weight: 2,
    purchase_price: 23000,
    sale_price: 25000,
    zone_type: "Liên Vùng",
    step_price: 0,
    return_fee: 0.5,
    zone_pick: [
      {
        name: "MN",
      },
      {
        name: "MT",
      },
      {
        name: "MB",
      },
      {
        name: "HN",
      },
      {
        name: "HCM",
      },
    ],
    carrier_account: 6,
    custom: {
      weight: 0.5,
    },
  },
  {
    from_weight: 2.01,
    to_weight: 2.5,
    purchase_price: 26000,
    sale_price: 28000,
    zone_type: "Liên Vùng",
    step_price: 0,
    return_fee: 0.5,
    zone_pick: [
      {
        name: "MN",
      },
      {
        name: "MT",
      },
      {
        name: "MB",
      },
      {
        name: "HN",
      },
      {
        name: "HCM",
      },
    ],
    carrier_account: 6,
    custom: {
      weight: 2,
    },
  },
  {
    from_weight: 2.501,
    to_weight: 3,
    purchase_price: 29000,
    sale_price: 31000,
    zone_type: "Liên Vùng",
    step_price: 0,
    return_fee: 0.5,
    zone_pick: [
      {
        name: "MN",
      },
      {
        name: "MT",
      },
      {
        name: "MB",
      },
      {
        name: "HN",
      },
      {
        name: "HCM",
      },
    ],
    carrier_account: 6,
    custom: {
      weight: 2.5,
    },
  },
  {
    from_weight: 3.01,
    to_weight: 3.5,
    purchase_price: 32000,
    sale_price: 34000,
    zone_type: "Liên Vùng",
    step_price: 0,
    return_fee: 0.5,
    zone_pick: [
      {
        name: "MN",
      },
      {
        name: "MT",
      },
      {
        name: "MB",
      },
      {
        name: "HN",
      },
      {
        name: "HCM",
      },
    ],
    carrier_account: 6,
    custom: {
      weight: 3,
    },
  },
  {
    from_weight: 3.501,
    to_weight: 4,
    purchase_price: 35000,
    sale_price: 37000,
    zone_type: "Liên Vùng",
    step_price: 0,
    return_fee: 0.5,
    zone_pick: [
      {
        name: "MN",
      },
      {
        name: "MT",
      },
      {
        name: "MB",
      },
      {
        name: "HN",
      },
      {
        name: "HCM",
      },
    ],
    carrier_account: 6,
    custom: {
      weight: 3.5,
    },
  },
  {
    from_weight: 4.01,
    to_weight: 4.5,
    purchase_price: 38000,
    sale_price: 40000,
    zone_type: "Liên Vùng",
    step_price: 0,
    return_fee: 0.5,
    zone_pick: [
      {
        name: "MN",
      },
      {
        name: "MT",
      },
      {
        name: "MB",
      },
      {
        name: "HN",
      },
      {
        name: "HCM",
      },
    ],
    carrier_account: 6,
    custom: {
      weight: 4,
    },
  },
  {
    from_weight: 4.501,
    to_weight: 5,
    purchase_price: 41000,
    sale_price: 43000,
    zone_type: "Liên Vùng",
    step_price: 0,
    return_fee: 0.5,
    zone_pick: [
      {
        name: "MN",
      },
      {
        name: "MT",
      },
      {
        name: "MB",
      },
      {
        name: "HN",
      },
      {
        name: "HCM",
      },
    ],
    carrier_account: 6,
    custom: {
      weight: 4.5,
    },
  },
  {
    from_weight: 5.01,
    to_weight: 7,
    purchase_price: 40000,
    sale_price: 45000,
    zone_type: "Liên Vùng",
    step_price: 0,
    return_fee: 0.5,
    zone_pick: [
      {
        name: "MN",
      },
      {
        name: "MT",
      },
      {
        name: "MB",
      },
      {
        name: "HN",
      },
      {
        name: "HCM",
      },
    ],
    carrier_account: 7,
    custom: {
      weight: 10,
    },
  },
  {
    from_weight: 7.01,
    to_weight: 9,
    purchase_price: 40000,
    sale_price: 50000,
    zone_type: "Liên Vùng",
    step_price: 0,
    return_fee: 0.5,
    zone_pick: [
      {
        name: "MN",
      },
      {
        name: "MT",
      },
      {
        name: "MB",
      },
      {
        name: "HN",
      },
      {
        name: "HCM",
      },
    ],
    carrier_account: 7,
    custom: {
      weight: 10,
    },
  },
  {
    from_weight: 9.01,
    to_weight: 10,
    purchase_price: 40000,
    sale_price: 55000,
    zone_type: "Liên Vùng",
    step_price: 0,
    return_fee: 0.5,
    zone_pick: [
      {
        name: "MN",
      },
      {
        name: "MT",
      },
      {
        name: "MB",
      },
      {
        name: "HN",
      },
      {
        name: "HCM",
      },
    ],
    carrier_account: 7,
    custom: {
      weight: 10,
    },
  },
  {
    from_weight: 10.01,
    to_weight: 99999,
    purchase_price: 44000,
    sale_price: 61000,
    zone_type: "Liên Vùng",
    step_price: 6000,
    return_fee: 0.5,
    zone_pick: [
      {
        name: "MN",
      },
      {
        name: "MT",
      },
      {
        name: "MB",
      },
      {
        name: "HN",
      },
      {
        name: "HCM",
      },
    ],
    carrier_account: 7,
    custom: {
      weight: 10,
    },
  },
];

const price_items_ninjavan = [
  {
    from_weight: 0,
    to_weight: 1.5,
    purchase_price: 17500,
    sale_price: 19000,
    zone_type: "Nội Tỉnh",
    step_price: 0,
    return_fee: 0,
    zone_pick: [
      {
        name: "MN",
      },
      {
        name: "MT",
      },
      {
        name: "MB",
      },
      {
        name: "HN",
      },
      {
        name: "HCM",
      },
    ],
    carrier_account: 1,
    custom: null,
  },
  {
    from_weight: 1.51,
    to_weight: 3,
    purchase_price: 18500,
    sale_price: 22000,
    zone_type: "Nội Tỉnh",
    step_price: 0,
    return_fee: 0,
    zone_pick: [
      {
        name: "MN",
      },
      {
        name: "MT",
      },
      {
        name: "MB",
      },
      {
        name: "HN",
      },
      {
        name: "HCM",
      },
    ],
    carrier_account: 1,
    custom: null,
  },
  {
    from_weight: 3.01,
    to_weight: 4,
    purchase_price: 20000,
    sale_price: 25000,
    zone_type: "Nội Tỉnh",
    step_price: 0,
    return_fee: 0,
    zone_pick: [
      {
        name: "MN",
      },
      {
        name: "MT",
      },
      {
        name: "MB",
      },
      {
        name: "HN",
      },
      {
        name: "HCM",
      },
    ],
    carrier_account: 1,
    custom: null,
  },
  {
    from_weight: 4.01,
    to_weight: 5,
    purchase_price: 22000,
    sale_price: 25000,
    zone_type: "Nội Tỉnh",
    step_price: 0,
    return_fee: 0,
    zone_pick: [
      {
        name: "MN",
      },
      {
        name: "MT",
      },
      {
        name: "MB",
      },
      {
        name: "HN",
      },
      {
        name: "HCM",
      },
    ],
    carrier_account: 2,
    custom: {
      weight: 4,
    },
  },
  {
    from_weight: 5.01,
    to_weight: 6,
    purchase_price: 22000,
    sale_price: 30000,
    zone_type: "Nội Tỉnh",
    step_price: 0,
    return_fee: 0,
    zone_pick: [
      {
        name: "MN",
      },
      {
        name: "MT",
      },
      {
        name: "MB",
      },
      {
        name: "HN",
      },
      {
        name: "HCM",
      },
    ],
    carrier_account: 2,
    custom: {
      weight: 4,
    },
  },
  {
    from_weight: 6.01,
    to_weight: 7,
    purchase_price: 24000,
    sale_price: 30000,
    zone_type: "Nội Tỉnh",
    step_price: 0,
    return_fee: 0,
    zone_pick: [
      {
        name: "MN",
      },
      {
        name: "MT",
      },
      {
        name: "MB",
      },
      {
        name: "HN",
      },
      {
        name: "HCM",
      },
    ],
    carrier_account: 2,
    custom: {
      weight: 4,
    },
  },
  {
    from_weight: 7.01,
    to_weight: 8,
    purchase_price: 27000,
    sale_price: 33000,
    zone_type: "Nội Tỉnh",
    step_price: 0,
    return_fee: 0,
    zone_pick: [
      {
        name: "MN",
      },
      {
        name: "MT",
      },
      {
        name: "MB",
      },
      {
        name: "HN",
      },
      {
        name: "HCM",
      },
    ],
    carrier_account: 2,
    custom: {
      weight: 4,
    },
  },
  {
    from_weight: 8.01,
    to_weight: 9,
    purchase_price: 30000,
    sale_price: 36000,
    zone_type: "Nội Tỉnh",
    step_price: 0,
    return_fee: 0,
    zone_pick: [
      {
        name: "MN",
      },
      {
        name: "MT",
      },
      {
        name: "MB",
      },
      {
        name: "HN",
      },
      {
        name: "HCM",
      },
    ],
    carrier_account: 2,
    custom: {
      weight: 5,
    },
  },
  {
    from_weight: 9.01,
    to_weight: 99999,
    purchase_price: 33000,
    sale_price: 39000,
    zone_type: "Nội Tỉnh",
    step_price: 5000,
    return_fee: 0,
    zone_pick: [
      {
        name: "MN",
      },
      {
        name: "MT",
      },
      {
        name: "MB",
      },
      {
        name: "HN",
      },
      {
        name: "HCM",
      },
    ],
    carrier_account: 2,
    custom: {
      weight: 6,
    },
  },
  {
    from_weight: 0,
    to_weight: 1.5,
    purchase_price: 17500,
    sale_price: 19000,
    zone_type: "Nội Vùng",
    step_price: 0,
    return_fee: 0,
    zone_pick: [
      {
        name: "MN",
      },
      {
        name: "MT",
      },
      {
        name: "MB",
      },
      {
        name: "HN",
      },
      {
        name: "HCM",
      },
    ],
    carrier_account: 1,
    custom: null,
  },
  {
    from_weight: 1.501,
    to_weight: 3,
    purchase_price: 18500,
    sale_price: 22000,
    zone_type: "Nội Vùng",
    step_price: 0,
    return_fee: 0,
    zone_pick: [
      {
        name: "MN",
      },
      {
        name: "MT",
      },
      {
        name: "MB",
      },
      {
        name: "HN",
      },
      {
        name: "HCM",
      },
    ],
    carrier_account: 1,
    custom: null,
  },
  {
    from_weight: 3.01,
    to_weight: 4,
    purchase_price: 20000,
    sale_price: 28000,
    zone_type: "Nội Vùng",
    step_price: 0,
    return_fee: 0,
    zone_pick: [
      {
        name: "MN",
      },
      {
        name: "MT",
      },
      {
        name: "MB",
      },
      {
        name: "HN",
      },
      {
        name: "HCM",
      },
    ],
    carrier_account: 1,
    custom: null,
  },
  {
    from_weight: 4.01,
    to_weight: 5,
    purchase_price: 22000,
    sale_price: 32000,
    zone_type: "Nội Vùng",
    step_price: 0,
    return_fee: 0,
    zone_pick: [
      {
        name: "MN",
      },
      {
        name: "MT",
      },
      {
        name: "MB",
      },
      {
        name: "HN",
      },
      {
        name: "HCM",
      },
    ],
    carrier_account: 2,
    custom: {
      weight: 4,
    },
  },
  {
    from_weight: 5.01,
    to_weight: 6,
    purchase_price: 22000,
    sale_price: 36000,
    zone_type: "Nội Vùng",
    step_price: 0,
    return_fee: 0,
    zone_pick: [
      {
        name: "MN",
      },
      {
        name: "MT",
      },
      {
        name: "MB",
      },
      {
        name: "HN",
      },
      {
        name: "HCM",
      },
    ],
    carrier_account: 2,
    custom: {
      weight: 4,
    },
  },
  {
    from_weight: 6.01,
    to_weight: 7,
    purchase_price: 24000,
    sale_price: 38000,
    zone_type: "Nội Vùng",
    step_price: 0,
    return_fee: 0,
    zone_pick: [
      {
        name: "MN",
      },
      {
        name: "MT",
      },
      {
        name: "MB",
      },
      {
        name: "HN",
      },
      {
        name: "HCM",
      },
    ],
    carrier_account: 2,
    custom: {
      weight: 4,
    },
  },
  {
    from_weight: 7.01,
    to_weight: 8,
    purchase_price: 28000,
    sale_price: 42000,
    zone_type: "Nội Vùng",
    step_price: 0,
    return_fee: 0,
    zone_pick: [
      {
        name: "MN",
      },
      {
        name: "MT",
      },
      {
        name: "MB",
      },
      {
        name: "HN",
      },
      {
        name: "HCM",
      },
    ],
    carrier_account: 2,
    custom: {
      weight: 4,
    },
  },
  {
    from_weight: 8.01,
    to_weight: 9,
    purchase_price: 32000,
    sale_price: 46000,
    zone_type: "Nội Vùng",
    step_price: 0,
    return_fee: 0,
    zone_pick: [
      {
        name: "MN",
      },
      {
        name: "MT",
      },
      {
        name: "MB",
      },
      {
        name: "HN",
      },
      {
        name: "HCM",
      },
    ],
    carrier_account: 2,
    custom: {
      weight: 5,
    },
  },
  {
    from_weight: 9.01,
    to_weight: 99999,
    purchase_price: 36000,
    sale_price: 50000,
    zone_type: "Nội Vùng",
    step_price: 6000,
    return_fee: 0,
    zone_pick: [
      {
        name: "MN",
      },
      {
        name: "MT",
      },
      {
        name: "MB",
      },
      {
        name: "HN",
      },
      {
        name: "HCM",
      },
    ],
    carrier_account: 2,
    custom: {
      weight: 6,
    },
  },
  {
    from_weight: 0,
    to_weight: 1.5,
    purchase_price: 17500,
    sale_price: 19000,
    zone_type: "Liên Vùng",
    step_price: 0,
    return_fee: 0,
    zone_pick: [
      {
        name: "MN",
      },
      {
        name: "MT",
      },
      {
        name: "MB",
      },
      {
        name: "HN",
      },
      {
        name: "HCM",
      },
    ],
    carrier_account: 1,
    custom: null,
  },
  {
    from_weight: 1.501,
    to_weight: 3,
    purchase_price: 18500,
    sale_price: 22000,
    zone_type: "Liên Vùng",
    step_price: 0,
    return_fee: 0,
    zone_pick: [
      {
        name: "MN",
      },
      {
        name: "MT",
      },
      {
        name: "MB",
      },
      {
        name: "HN",
      },
      {
        name: "HCM",
      },
    ],
    carrier_account: 1,
    custom: null,
  },
  {
    from_weight: 3.01,
    to_weight: 4,
    purchase_price: 28000,
    sale_price: 30000,
    zone_type: "Liên Vùng",
    step_price: 0,
    return_fee: 0,
    zone_pick: [
      {
        name: "MN",
      },
      {
        name: "MT",
      },
      {
        name: "MB",
      },
      {
        name: "HN",
      },
      {
        name: "HCM",
      },
    ],
    carrier_account: 1,
    custom: null,
  },
  {
    from_weight: 4.01,
    to_weight: 5,
    purchase_price: 35000,
    sale_price: 36000,
    zone_type: "Liên Vùng",
    step_price: 0,
    return_fee: 0,
    zone_pick: [
      {
        name: "MN",
      },
      {
        name: "MT",
      },
      {
        name: "MB",
      },
      {
        name: "HN",
      },
      {
        name: "HCM",
      },
    ],
    carrier_account: 2,
    custom: {
      weight: 4,
    },
  },
  {
    from_weight: 5.01,
    to_weight: 6,
    purchase_price: 43000,
    sale_price: 45000,
    zone_type: "Liên Vùng",
    step_price: 0,
    return_fee: 0,
    zone_pick: [
      {
        name: "MN",
      },
      {
        name: "MT",
      },
      {
        name: "MB",
      },
      {
        name: "HN",
      },
      {
        name: "HCM",
      },
    ],
    carrier_account: 2,
    custom: {
      weight: 4,
    },
  },
  {
    from_weight: 6.01,
    to_weight: 7,
    purchase_price: 50000,
    sale_price: 52000,
    zone_type: "Liên Vùng",
    step_price: 0,
    return_fee: 0,
    zone_pick: [
      {
        name: "MN",
      },
      {
        name: "MT",
      },
      {
        name: "MB",
      },
      {
        name: "HN",
      },
      {
        name: "HCM",
      },
    ],
    carrier_account: 2,
    custom: {
      weight: 4,
    },
  },
  {
    from_weight: 7.01,
    to_weight: 8,
    purchase_price: 57000,
    sale_price: 60000,
    zone_type: "Liên Vùng",
    step_price: 0,
    return_fee: 0,
    zone_pick: [
      {
        name: "MN",
      },
      {
        name: "MT",
      },
      {
        name: "MB",
      },
      {
        name: "HN",
      },
      {
        name: "HCM",
      },
    ],
    carrier_account: 2,
    custom: {
      weight: 4,
    },
  },
  {
    from_weight: 8.01,
    to_weight: 9,
    purchase_price: 64000,
    sale_price: 66000,
    zone_type: "Liên Vùng",
    step_price: 0,
    return_fee: 0,
    zone_pick: [
      {
        name: "MN",
      },
      {
        name: "MT",
      },
      {
        name: "MB",
      },
      {
        name: "HN",
      },
      {
        name: "HCM",
      },
    ],
    carrier_account: 2,
    custom: {
      weight: 5,
    },
  },
  {
    from_weight: 9.01,
    to_weight: 99999,
    purchase_price: 71000,
    sale_price: 76000,
    zone_type: "Liên Vùng",
    step_price: 7000,
    return_fee: 0,
    zone_pick: [
      {
        name: "MN",
      },
      {
        name: "MT",
      },
      {
        name: "MB",
      },
      {
        name: "HN",
      },
      {
        name: "HCM",
      },
    ],
    carrier_account: 2,
    custom: {
      weight: 6,
    },
  },
];

//staging
export const initPriceSheetsdata = [
  {
    name: "NINJAVAN Price Sheet",
    carrier: 1,
    price_items: price_items_ninjavan,
    default: true,
  },
  {
    name: "GHTK Price Sheet",
    carrier: 2,
    price_items: price_items_ghtk,
    default: true,
  },
  {
    name: "GHN Price Sheet",
    carrier: 3,
    price_items: price_items_ghn,
    default: true,
  },
];

export function initializePriceSheets(strapi: any) {
  return Promise.all(
    _.map(initPriceSheetsdata, async (data) => {
      try {
        const existedPriceSheet = await strapi.db
          .query(PRICE_SHEET_ROUTE)
          .findOne({
            where: {
              name: data.name,
            },
          });
        if (!existedPriceSheet) {
          const price_sheet = await strapi.entityService.create(
            PRICE_SHEET_ROUTE,
            {
              data,
            },
          );
          console.log(
            `generating price_sheet ::: ${price_sheet.name} ::: ID=${price_sheet.id}`,
          );
          return price_sheet;
        }
        return existedPriceSheet;
      } catch (error) {
        console.log(error);
      }
    }),
  );
}
