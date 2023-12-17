import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  const orders_carrier_links = await knex
    .select("*")
    .from("orders_carrier_links");
  const price_sheets_carrier_links = await knex
    .select("*")
    .from("price_sheets_carrier_links");
  orders_carrier_links.forEach(async (oC) => {
    const priceSheet = price_sheets_carrier_links.find(
      ({ carrier_id }: any) => oC.carrier_id === carrier_id,
    );
    await knex("orders_price_sheet_links").insert({
      price_sheet_id: priceSheet.price_sheet_id,
      order_id: oC.order_id,
    });
  });
  console.log(await knex.select("*").from("orders_price_sheet_links"));
}

export async function down(knex: Knex): Promise<void> { }
