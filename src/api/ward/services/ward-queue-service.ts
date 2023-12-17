import { Job } from "bullmq";
import { WARD_ROUTE } from "../../../helper/constants";

export const handleWorkerWards = async (job: Job) => {
  try {
    const createdWard = await strapi
      .service(WARD_ROUTE)
      .createWard(job.data.district_id);
    // update data for completed job
    return job.updateData({ ...createdWard });
  } catch (error) {
    // Promise.reject to move a job to failure status
    return Promise.reject(error);
  }
};

export const initWorkerOptions = (options: any = {}) => {
  options = {
    ...options,
    limiter: {
      max: 5,
      duration: 1,
    },
  };
  return options;
};
