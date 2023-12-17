import { CARRIER_ACCOUNT_ROUTE } from "../helper/constants";

// production
const data_production = [
  {
    carrier: 1,
    account_name: "shoptoanquocnjv@gmail.com",
    reminder_link: "https://dashboard.ninjavan.co",
    api_url: "https://api.ninjavan.co",
    encrypt_data: {
      CLIENT_ID: "d1d1f1a6cfa8425499689aaa0662cb55",
      CLIENT_SECRET: "54d79c4818514e4d925ef361211fe114",
    },
    settings: {
      service_type: "Parcel",
      pickup_service_level: "Standard",
    },
  },
  {
    carrier: 1,
    account_name: "shoptoanquocghtk@gmail.com",
    reminder_link: "https://dashboard.ninjavan.co",
    api_url: "https://api.ninjavan.co",
    encrypt_data: {
      CLIENT_ID: "1183e844789e4805a15c55ad96089558",
      CLIENT_SECRET: "1aa99f0a61e8430bb288adc80d649105",
    },
    settings: {
      service_type: "Parcel",
      pickup_service_level: "Standard",
    },
  },
  {
    carrier: 1,
    account_name: "bigsizeship02@gmail.com",
    reminder_link: "https://dashboard.ninjavan.co",
    api_url: "https://api.ninjavan.co",
    encrypt_data: {
      CLIENT_ID: "cb002214451a4303b88215c06c66b4af",
      CLIENT_SECRET: "f88d3b8e5c6f447794b28562c3ae42c8",
    },
    settings: {
      service_type: "Parcel",
      pickup_service_level: "Premium",
    },
  },
  {
    carrier: 2,
    account_name: "bigsizeshipmaster@gmail.com",
    reminder_link: "https://khachhang.giaohangtietkiem.vn",
    api_url: "https://services.giaohangtietkiem.vn",
    encrypt_data: {
      TOKEN_ID: "0A7E68C8FBF82dBe397B60B5b255C5C976D8768d",
    },
  },
  {
    carrier: 2,
    account_name: "minhhieu300593@gmail.com",
    reminder_link: "https://khachhang.giaohangtietkiem.vn",
    api_url: "https://services.giaohangtietkiem.vn",
    encrypt_data: {
      TOKEN_ID: "58a931aF2A241fb5062ff1eDcC8b381695ED46ff",
    },
  },
  {
    carrier: 2,
    account_name: "hungtatee.shop1993@gmail.com",
    reminder_link: "https://khachhang.giaohangtietkiem.vn",
    api_url: "https://services.giaohangtietkiem.vn",
    encrypt_data: {
      TOKEN_ID: "3C9Af0288a5b0A8803612C5992681958FD7B64Ad",
    },
  },
  {
    carrier: 3,
    account_name: "0934081096",
    reminder_link: "https://khachhang.ghn.vn",
    api_url: "https://online-gateway.ghn.vn",
    encrypt_data: {
      TOKEN_ID: "376f88b4-1f1e-11ee-9718-de6f804954c9",
    },
  },
  {
    carrier: 3,
    account_name: "0369081096",
    reminder_link: "https://khachhang.ghn.vn",
    api_url: "https://online-gateway.ghn.vn",
    encrypt_data: {
      TOKEN_ID: "868c9c12-215c-11ee-96dc-de6f804954c9",
    },
  },
];

// staging
const data_staging = [
  {
    carrier: 1,
    account_name: "shoptoanquocnjv@gmail.com",
    reminder_link: "https://dashboard-sandbox.ninjavan.co",
    api_url: "https://api-sandbox.ninjavan.co",
    encrypt_data: {
      CLIENT_ID: "32e8221299674f2d88e8dd8624a051e9",
      CLIENT_SECRET: "ae633936b02740549bbf9497872934f5",
    },
    settings: {
      service_type: "Parcel",
      pickup_service_level: "Standard",
    },
  },
  {
    carrier: 1,
    account_name: "shoptoanquocghtk@gmail.com",
    reminder_link: "https://dashboard-sandbox.ninjavan.co",
    api_url: "https://api-sandbox.ninjavan.co",
    encrypt_data: {
      CLIENT_ID: "59df4e61243e441c8e4abe0a9c9797cc",
      CLIENT_SECRET: "44b5fb7ff59c404cae5a29b57a348c76",
    },
    settings: {
      service_type: "Parcel",
      pickup_service_level: "Standard",
    },
  },
  {
    carrier: 1,
    account_name: "bigsizeship02@gmail.com",
    reminder_link: "https://dashboard-sandbox.ninjavan.co",
    api_url: "https://api-sandbox.ninjavan.co",
    encrypt_data: {
      CLIENT_ID: "87f9d5c58f104617b04141c052e21d96",
      CLIENT_SECRET: "46d34521b0e347a38f46e86ca977352b",
    },
    settings: {
      service_type: "Parcel",
      pickup_service_level: "Premium",
    },
  },
  {
    carrier: 2,
    account_name: "bigsizeshipmaster@gmail.com",
    reminder_link: "https://khachhang-staging.ghtklab.com",
    api_url: "https://services-staging.ghtklab.com",
    encrypt_data: {
      TOKEN_ID: "0A7E68C8FBF82dBe397B60B5b255C5C976D8768d",
    },
  },
  {
    carrier: 2,
    account_name: "minhhieu300593@gmail.com",
    reminder_link: "https://khachhang-staging.ghtklab.com",
    api_url: "https://services-staging.ghtklab.com",
    encrypt_data: {
      TOKEN_ID: "58a931aF2A241fb5062ff1eDcC8b381695ED46ff",
    },
  },
  {
    carrier: 2,
    account_name: "hungtatee.shop1993@gmail.com",
    reminder_link: "https://khachhang-staging.ghtklab.com",
    api_url: "https://services-staging.ghtklab.com",
    encrypt_data: {
      TOKEN_ID: "3C9Af0288a5b0A8803612C5992681958FD7B64Ad",
    },
  },
  {
    carrier: 3,
    account_name: "0934081096",
    reminder_link: "https://5sao.ghn.dev",
    api_url: "https://dev-online-gateway.ghn.vn",
    encrypt_data: {
      TOKEN_ID: "2035de37-2f72-11ee-b1d4-92b443b7a897",
    },
  },
  {
    carrier: 3,
    account_name: "0369081096",
    reminder_link: "https://5sao.ghn.dev",
    api_url: "https://dev-online-gateway.ghn.vn",
    encrypt_data: {
      TOKEN_ID: "e4c9d967-43ec-11ee-8bfa-8a2dda8ec551",
    },
  },
];

export async function initializeCarrierAccounts(strapi: any) {
  let data = null;
  if (process.env.NODE_ENV === "production") {
    data = data_production;
  } else {
    data = data_staging;
  }
  for (let d of data) {
    try {
      const account = await strapi
        .service(CARRIER_ACCOUNT_ROUTE)
        .createOneCarrierAccount(d.carrier, d);
      if (!account.message) {
        console.log(
          `generating account ::: ${account.data.account_name} ::: ID=${account.data.id}`,
        );
      }
    } catch (error) {
      console.log(error);
    }
  }
}
