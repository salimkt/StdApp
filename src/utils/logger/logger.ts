import {logger} from 'react-native-logs';
import type {LoggerType} from './loggerType';
import {LogLevel} from './loggerType';
import {LoggerConfig} from './customTransport';
import utils from '../meetingUtils/utils';

/**
 * Logger writes logs with console
 * ```typescript
 * // working with the Logger
 * const logger: Logger = Logger.getInstance(); // default level is LogLevel.All
 * logger.log('Logging');
 * logger.info('info');
 * logger.warn('warn');
 * logger.error('error');
 *
 * // setting logging levels
 * const logger: Logger = Logger.getInstance(LogLevel.info);
 * logger.log('Logging'); // this will not show up
 * logger.warn('warning'); // this will show up
 * ```
 */
class Logger implements LoggerType {
  static instance: Logger;
  static user_id: string;
  grafana: any;
  level: LogLevel;
  isGrafanalogger?: boolean;
  private constructor(level = LogLevel.ALL, isGrafanalogger?: boolean) {
    this.level = level;
    this.isGrafanalogger = isGrafanalogger;
    this.grafana = logger.createLogger<'info' | 'warn' | 'error'>(LoggerConfig);
    Logger.user_id = Logger.user_id ?? utils.uuidGenerator();
  }

  public static getInstance(
    level?: LogLevel,
    isGrafanalogger?: boolean,
  ): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger(level, isGrafanalogger);
    }
    return Logger.instance;
  }

  log(msg: string, data?: string, option?: string): void {
    this.consoleLogger(LogLevel.ALL, msg, data, option);
  }

  info(msg: string, data?: string, option?: string): void {
    this.consoleLogger(LogLevel.INFO, msg, data, option);
  }

  warn(msg: string, data?: string, option?: string): void {
    this.consoleLogger(LogLevel.WARN, msg, data, option);
  }

  error(msg: string, data?: string, option?: string): void {
    this.consoleLogger(LogLevel.ERROR, msg, data, option);
  }

  grafanaLogger(message: unknown[], options?: any): void {
    this.consoleLogger(LogLevel.ALL, JSON.stringify(message, options));
  }

  getLogLevel(): LogLevel {
    return this.level;
  }
  setLogLevel(level: LogLevel): void {
    this.level = level;
  }

  private consoleLogger(
    type: LogLevel,
    msg: string,
    data?: string,
    option?: string,
  ) {
    if (type < this.level) {
      return;
    }
    const timestamp = new Date().toTimeString();
    let logMessage = `${msg} - ${timestamp}`;
    if (data) {
      logMessage = logMessage + '&&&' + data;
    }
    if (option) {
      logMessage = logMessage + '&&&' + option;
    }
    switch (type) {
      case LogLevel.ALL: {
        console.log(logMessage);
        if (this.isGrafanalogger) {
          this.grafana.info(
            JSON.stringify({
              id: Logger.user_id,
              message: logMessage,
            }),
          );
        }
        break;
      }
      case LogLevel.INFO: {
        console.info(logMessage);
        if (this.isGrafanalogger) {
          this.grafana.info(
            JSON.stringify({
              id: Logger.user_id,
              message: logMessage,
            }),
          );
        }
        break;
      }
      case LogLevel.WARN: {
        console.warn(logMessage);
        if (this.isGrafanalogger) {
          this.grafana.warn(
            JSON.stringify({
              id: Logger.user_id,
              message: logMessage,
            }),
          );
        }
        break;
      }
      case LogLevel.ERROR: {
        console.error(logMessage);
        if (this.isGrafanalogger) {
          this.grafana.error(
            JSON.stringify({
              id: Logger.user_id,
              message: logMessage,
            }),
          );
        }
        break;
      }
      default: {
        console.log(logMessage);
      }
    }
  }
}
export default Logger;
