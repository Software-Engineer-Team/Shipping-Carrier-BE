import { Job, Worker, WorkerOptions } from "bullmq";
import { redisConnection } from "./redis-config";
import { initWorker } from "./config";
import {
  AbstractJobHandler,
  BaseJobHandler,
  JobStatus,
  OrderJobHandler,
} from "./handlers";

class AbstractConsumerService {
  protected jobHandler: AbstractJobHandler;
  protected worker: Worker;
  protected readonly queueName: string;

  constructor(queueName: string, jobHandler: AbstractJobHandler) {
    this.queueName = queueName;
    this.jobHandler = jobHandler;
  }

  getWorkerEvents(): void {
    this.worker.on(JobStatus.DRAINED, this.jobHandler.handleDrainedJob);
    this.worker.on(JobStatus.COMPLETED, this.jobHandler.handleCompletedJob);
    this.worker.on(JobStatus.FAILED, this.jobHandler.handleFailedJob);
    this.worker.on(JobStatus.STALLED, this.jobHandler.handleStalledJob);
    this.worker.on(JobStatus.ERROR, this.jobHandler.handleErrorJob);
  }

  public async closeWorker(): Promise<void> {
    if (this.worker) {
      await this.worker.close();
    }
  }

  public init(processor: any, options: any = {}): void {
    if (!this.worker) {
      this.worker = initWorker(
        this.queueName,
        async (job: Job) => {
          await processor(job);
        },
        redisConnection,
        options,
      );
      this.getWorkerEvents();
    }
  }
}

export class ConsumerService extends AbstractConsumerService {
  constructor(queueName: string) {
    super(queueName, new OrderJobHandler());
  }
}

export class BaseConsumerService extends AbstractConsumerService {
  constructor(queueName: string) {
    super(queueName, new BaseJobHandler());
  }
}
