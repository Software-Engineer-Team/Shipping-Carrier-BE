import { Job, JobType, JobsOptions, Queue, BulkJobOptions } from "bullmq";
import { initQueue } from "./config";
import { redisConnection } from "./redis-config";

export class ProducerService {
  private readonly queue: Queue;
  private readonly queueName: string;
  async addJob(data: any, options?: JobsOptions): Promise<Job> {
    return await this.queue.add(this.queueName, data, options);
  }

  async addJobs(datas: any, options?: BulkJobOptions): Promise<Job[]> {
    return await this.queue.addBulk(
      datas.map((data) => {
        return {
          name: this.queueName,
          data,
          opts: { ...options },
        };
      }),
    );
  }

  async closeJobQueue(): Promise<void> {
    if (this.queue) {
      await this.queue.close();
    }
  }

  async getJobQueueSize(states: JobType[]): Promise<any> {
    return await this.queue.getJobCounts(...states);
  }

  constructor(queueName: string) {
    if (!this.queue) {
      this.queue = initQueue(queueName, redisConnection);
      this.queueName = queueName;
    }
  }
}
