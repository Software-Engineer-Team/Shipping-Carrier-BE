/**
 * tracking service
 */

import { factories } from "@strapi/strapi";
import { TRACKING_ROUTE } from "../../../helper/constants";
import { BaseConsumerService } from "../../../helper/queues/consumer";
import { handleErrorTrackingSlack, handleWorkerSlack } from "./slack-queue-service";
import { ProducerService } from "../../../helper/queues/producer";

export default factories.createCoreService(TRACKING_ROUTE, {
  async createTracking(data: any) {
    return await strapi.entityService.create(TRACKING_ROUTE, {
      data,
    });
  },
  async notifyToChannelSlack(order: any, updatedOrder: any) {
    const QUEUE_NAME = "SLACK";
    const consumerService = new BaseConsumerService(QUEUE_NAME);
    consumerService.init(handleWorkerSlack);
    const producerService = new ProducerService(QUEUE_NAME);
    await producerService.addJob(
      { order, updatedOrder },
      {
        delay: 30000,
        removeOnComplete: true,
        removeOnFail: true,
      },
    );
    await producerService.closeJobQueue();
    return {
      message: "Thông điệp tới kênh Slack đang được xử lý.",
    };
  },
  async notifyErrorTrackingToChannelSlack(error: any, payload: any) {
    const QUEUE_NAME = "SLACK-ERROR";
    const consumerService = new BaseConsumerService(QUEUE_NAME);
    consumerService.init(handleErrorTrackingSlack);
    const producerService = new ProducerService(QUEUE_NAME);
    await producerService.addJob(
      { error, payload },
      {
        delay: 60000,
        removeOnComplete: true,
        removeOnFail: true,
      },
    );
    await producerService.closeJobQueue();
    return {
      message: "Thông điệp tới kênh Slack đang được xử lý.",
    };
  },
});
