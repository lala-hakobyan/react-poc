import { LogMessageType, LogType } from '@/types/logMessage.types';

/**
 * This is a singleton service which handles logging functionality
 * We can extend it later and configure it to send logs to external services like Datadog
 */
class LoggerService {
  private static instance: LoggerService;

  private readonly logMessageTypeMapping = {
    'fetchNotes': 'Fetch Notes',
    'addNote': 'Add Note',
    'editNote': 'Edit Note',
    'deleteNote': 'Delete Note',
    'sendMessage': 'Send Message',
  }

  public logMessage(logMessageType: LogMessageType, logType: LogType = 'error', details?: unknown) {
    let messageDetails = '';
    const message = this.logMessageTypeMapping[logMessageType];

    if(details) {
      messageDetails = details instanceof Error ? details.message : String(details);
    }

    switch (logType) {
      case 'error':
        console.error(`${message}:`, messageDetails);
        break;
      case 'info':
        console.info(`${message}:`, messageDetails);
        break;
      case 'warning':
        console.warn(`${message}:`, messageDetails);
        break;
      default:
        console.error(`${message}:`, messageDetails);
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
