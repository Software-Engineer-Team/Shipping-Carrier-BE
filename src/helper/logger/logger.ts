import {
  FLUENT_BIT_INPUT_TAG,
  fluentLogger,
} from "../fluent-org/fluent-logger";

import winston from "winston";
const { metadata, combine, timestamp, printf, colorize } = winston.format;

export class Logger {
  private readonly logger: any;
  private readonly timestampFormat: string = "YYYY-MM-DD hh:mm:ss.SSS";
  private readonly levelPattern: any =
    /info|debug|warn|error|http|verbose|silly/;
  constructor(methodName: string) {
    this.logger = this.createWinstonLogger().child({ method: methodName });
  }

  private createWinstonLogger(): any {
    return winston.createLogger({
      format: combine(
        timestamp({
          format: this.timestampFormat,
        }),
        metadata({ fillExcept: ["message", "level", "timestamp", "method"] }),
      ),
      transports: [
        new winston.transports.Console({
          level: "debug",
          format: combine(
            colorize({ level: true, message: false }),
            printf(this.formatLogMessage),
          ),
        }),
      ],
    });
  }

  private formatLogMessage = (info) => {
    try {
      let message: any =
        typeof info.message === "object"
          ? JSON.stringify(info.message)
          : info.message;
      let metadata: any =
        Object.keys(info.metadata).length === 0
          ? ""
          : JSON.stringify(info.metadata);
      fluentLogger.emit(FLUENT_BIT_INPUT_TAG, {
        message,
        level: info.level.match(this.levelPattern)?.[0] ?? info.level,
        method: info.method,
        metadata,
      });
      return `[${info.timestamp}] [${info.method}] ${info.level} : ${message}${metadata}`;
    } catch (error) {
      console.log(error);
    }
  };

  public getLogger(): any {
    return this.logger;
  }
}
