import { Processor, Queue, Worker } from "bullmq";

export const initQueue = (queueName, connection: any, options: any = {}) =>
  new Queue(queueName, {
    connection,
    ...options,
  });

export const initWorker = (
  queueName: string,
  processor: Processor,
  connection: any,
  options: any,
) => new Worker(queueName, processor, { connection, ...options });

export const RATE_LIMITS = {
  NINJAVAN: {
    MAX_JOBS_PROCCESSED: 3,
    DURATION: 1,
  },
  GHN: {
    MAX_JOBS_PROCCESSED: 3,
    DURATION: 1,
  },
  GHTK: {
    MAX_JOBS_PROCCESSED: 3,
    DURATION: 1,
  },
};
