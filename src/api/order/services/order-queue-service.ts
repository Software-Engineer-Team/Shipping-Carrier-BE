import { Job } from "bullmq";
import { carrierType } from "./utils";
import { ORDER_ROUTE, PROVINCE_ROUTE } from "../../../helper/constants";
import { RATE_LIMITS } from "../../../helper/queues/config";

export const handleWorkerOrders = async (job: Job) => {
  try {
    const createdOrder = await strapi.service(ORDER_ROUTE).createOrder(
      {
        ...job.data,
      },
      job.data.carrier,
    );
    // update data for completed job
    return job.updateData({ creator: job.data.creator, ...createdOrder });
  } catch (error) {
    // Promise.reject to move a job to failure status
    return Promise.reject(error);
  }
};

export const initWorkerOptions = (carrier_type: string, options: any = {}) => {
  if (carrier_type === carrierType.NINJAVAN) {
    options = {
      ...options,
      limiter: {
        max: RATE_LIMITS.NINJAVAN.MAX_JOBS_PROCCESSED,
        duration: RATE_LIMITS.NINJAVAN.DURATION,
      },
    };
  } else if (carrier_type === carrierType.GHN) {
    options = {
      ...options,
      limiter: {
        max: RATE_LIMITS.GHN.MAX_JOBS_PROCCESSED,
        duration: RATE_LIMITS.GHN.DURATION,
      },
    };
  } else if (carrier_type === carrierType.GHTK) {
    options = {
      ...options,
      limiter: {
        max: RATE_LIMITS.GHTK.MAX_JOBS_PROCCESSED,
        duration: RATE_LIMITS.GHTK.DURATION,
      },
    };
  }
  return options;
};
