import { LogInfo } from '@/types/logMessage.types';
import { LogMessageContextMapping, LogMessageTypeMapping } from '@/constants/logMessages.constants';

/**
 * This is a singleton service which handles logging functionality
 * We can extend it later and configure it to send logs to external services like Datadog
 */
class LoggerService {
  private static instance: LoggerService;

  private constructor() {}

  public log(logInfo: LogInfo,  messageDetails?: string | null, error?: Error | null) {
    const type = LogMessageTypeMapping[logInfo.messageType];
    const context = LogMessageContextMapping[logInfo.context];

    const finalMessage = messageDetails ? `${context}: ${type}: ${messageDetails}:` : `${context}: ${type}:`;

    switch (logInfo.type) {
      case 'info':
        console.info(finalMessage);
        // Send specific context to monitoring platform
        // datadogLogs.logger.info(finalMessage, {context})
        break;
      case 'warn':
        console.warn(finalMessage);
        // Send specific context to monitoring platform
        // datadogLogs.logger.warn(finalMessage, {context})
        break;
      case 'error':
      default:
        if(error) {
          console.error(finalMessage, error);
          // Send specific context to monitoring platform
          // datadogLogs.logger.error(finalMessage, {context}, error);
        } else {
          console.error(finalMessage);
          // Send specific context to monitoring platform
          // datadogLogs.logger.error(finalMessage, {context});
        }
        break;
    }
  }

  public static getInstance() {
    if(!this.instance) {
      this.instance = new LoggerService();
    }

    return this.instance;
  }
}

const loggerService = LoggerService.getInstance();

export default loggerService;
