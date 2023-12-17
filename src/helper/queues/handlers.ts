import { io } from "../socket.io/init";

export enum JobStatus {
  COMPLETED = "completed",
  DRAINED = "drained",
  FAILED = "failed",
  STALLED = "stalled",
  ERROR = "error",
  // PROGRESS = "progress",
}
// Return always to a job to completed status

export interface AbstractJobHandler {
  handleCompletedJob(job): any;
  handleFailedJob(job, err): any;
  handleStalledJob(job): any;
  handleDrainedJob(): any;
  handleProgressJob(): any;
  handleErrorJob(error: any): any;
}

export class BaseJobHandler implements AbstractJobHandler {
  handleCompletedJob(job) {
    console.info(`Job id ${job.id} completed for ${job.name}`);
    console.info("Job data", job.data);
  }
  handleFailedJob(job, err) {
    console.info("Job data fail", job.data);
    if (job.attemptsMade >= job.opts.attempts) {
      console.info(
        `Job failures above threshold in ${job.queue.name} for: ${job.id}`,
        err,
      );
      return;
    }
    console.info(
      `Job in ${job.queue.name} failed for: ${job.id} with ${err.message}. ${job.opts.attempts - job.attemptsMade
      } attempts left`,
    );
  }
  handleStalledJob(job) {
    console.info(`Job in ${job.queue.name} stalled for: ${job.id}`);
  }
  handleDrainedJob() {
    console.info(`Queue is drained, no more jobs left`);
  }
  handleProgressJob() {
    console.info(`Queue is drained, no more jobs left`);
  }
  handleErrorJob(error) {
    console.info(`Error: ${error}`);
  }
}

export class OrderJobHandler extends BaseJobHandler {
  handleCompletedJob(job) {
    console.info(`Job id ${job.id} completed for ${job.name}`);
    console.info("Job data", job.data);
    console.log("rooms", io.sockets.adapter.rooms);
    io.to(job.data.creator).emit("message-success", job.data);
  }
  handleFailedJob(job, err) {
    console.info("Job data fail", job.data);
    console.log("rooms", io.sockets.adapter.rooms);
    if (job.attemptsMade >= job.opts.attempts) {
      console.info(
        `Job failures above threshold in ${job.queue.name} for: ${job.id}`,
        err,
      );
      io.to(job.data.creator).emit("message-error", err);
      return;
    }
    console.info(
      `Job in ${job.queue.name} failed for: ${job.id} with ${err.message}. ${job.opts.attempts - job.attemptsMade
      } attempts left`,
    );
  }
}
