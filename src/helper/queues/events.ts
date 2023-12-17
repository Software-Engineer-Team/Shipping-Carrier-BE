import { QueueEvents } from "bullmq";
export const generateQueueEvents = (queueName, options: any) => {
  const queueEvents = new QueueEvents(queueName);

  queueEvents.on("waiting", ({ jobId }) => {
    console.log(`A job with ID ${jobId} is waiting`);
  });

  queueEvents.on("active", ({ jobId, prev }) => {
    console.log(`Job ${jobId} is now active; previous status was ${prev}`);
  });

  queueEvents.on("progress", ({ jobId, data }, timestamp) => {
    console.log(`${jobId} reported progress ${data} at ${timestamp}`);
  });

  queueEvents.on("completed", ({ jobId, returnvalue }) => {
    console.log(`${jobId} has completed and returned ${returnvalue}`);
  });

  queueEvents.on("failed", ({ jobId, failedReason }) => {
    console.log(`${jobId} has failed with reason ${failedReason}`);
  });

  queueEvents.on("error", (error) => {
    console.log(`Error: ${error}`);
  });
  return queueEvents;
};
