import { CUSTOMER_SERVICE_CHANNEL, ERROR_TRACKING_CHANNEL } from "./constants";

const Slack = require("@slack/bolt");

export const SlackApp = new Slack.App({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  token: process.env.SLACK_BOT_TOKEN,
});

export const notifyCustomerCare = async (order: any, updatedOrder: any) => {
  const userInChannel = await getUserInChannelBySlack(
    (member: any) => member.email === order.customer.email,
  );
  await sendMessageBySlack(
    `\`\`\`<@${userInChannel?.id ? userInChannel.id : order.customer.sale.username
    }> \nMã đơn hàng: ${updatedOrder.tracking_id} \nTrọng lượng: ${order.weight
    }kg -> ${updatedOrder.weight}kg \nCước(giá bán): ${order.shipment_fee
    }đ -> ${updatedOrder.shipment_fee}đ \nBảo hiểm: ${order.insurance_fee
    }đ -> ${updatedOrder.insurance_fee}đ \nPhí hoàn: ${order.return_fee}đ -> ${updatedOrder.return_fee
    }đ \nTổng thu: ${order.return_fee + order.shipment_fee + order.insurance_fee
    }đ -> ${updatedOrder.return_fee +
    updatedOrder.shipment_fee +
    updatedOrder.insurance_fee
    }đ \nPhí thu hộ: ${updatedOrder.cash_on_delivery
    }đ \nHình thức thanh toán: ${order.payment_type_id === 1 ? "Shop trả ship" : "Khách trả ship"
    } \nTruy cập dashboard: ${order.carrier_account.reminder_link
    } với tài khoản: ${order.carrier_account.account_name} 
    \`\`\``,
  );
};

export const notifyPayloadTrackingError = async (error: any, payload: any) => {
  await sendMessageBySlack(
    `\`\`\`${error} \nPayload: ${JSON.stringify(payload)}\`\`\``,
    ERROR_TRACKING_CHANNEL
  );
}

export const sendMessageBySlack = async (
  text: any = "Unknown",
  channel: string = CUSTOMER_SERVICE_CHANNEL,
) => {
  try {
    await SlackApp.client.chat.postMessage({
      token: process.env.SLACK_BOT_TOKEN,
      channel,
      text,
    });
  } catch (error) {
    console.error(error);
  }
};

export const getUserInChannelBySlack = async (
  condition: (m: any) => boolean,
  channel: string = CUSTOMER_SERVICE_CHANNEL,
) => {
  try {
    const result = await SlackApp.client.users.list({
      token: process.env.SLACK_BOT_TOKEN,
      channel,
    });
    return result.members
      .map((member: any) => {
        if (member.profile.email) {
          return {
            id: member.id,
            name: member.name,
            real_name: member.real_name,
            email: member.profile.email,
          };
        }
      })
      .filter((member: any) => member)
      .filter((member: any) => condition(member))?.[0];
  } catch (error) {
    console.error(error);
    return null;
  }
};
