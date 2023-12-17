import { Job } from "bullmq";
import { notifyCustomerCare, notifyPayloadTrackingError } from "../../../helper/slack";

export const handleWorkerSlack = async (job: Job) => {
  try {
    const { order, updatedOrder } = job.data;
    await notifyCustomerCare(order, updatedOrder);
  } catch (error) {
    // Promise.reject to move a job to failure status
    return Promise.reject(error);
  }
};

export const handleErrorTrackingSlack = async (job: Job) => {
  try {
    const {error, payload} = job.data;
    await notifyPayloadTrackingError(error, payload);
  } catch (error) {
    // Promise.reject to move a job to failure status
    return Promise.reject(error);
  }
}
