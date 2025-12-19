export type LogMessageType = 'fetchNotes' | 'addNote' | 'deleteNote' | 'editNote' | 'sendMessage';
export type LogType = 'debug' | 'info' | 'warn' | 'error';
export type LogContext = 'dashboard' | 'myNotes' | 'myNotesLoadMore' | 'contact';

export type LogInfo = {
  type: LogType;
  messageType: LogMessageType,
  context: LogContext
}
