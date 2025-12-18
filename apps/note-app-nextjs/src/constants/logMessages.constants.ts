import { LogContext, LogMessageType } from '@/types/logMessage.types';

export const LogMessagesConstants = Object.freeze({
  notes: {
    fetchError: 'Error occurred while fetching notes.',
    addError: 'Error occurred while adding the note.',
    editError: 'Error occurred when editing the note.',
    deleteError: 'Error occurred while deleting the note.',
  },
  contact: {
    sendError: 'Error occurred while sending the message.'
  },
  global: {
    internalServerError: 'Internal server error'
  }
});

export const LogMessageTypeMapping: Record<LogMessageType, string> = Object.freeze({
  'fetchNotes': 'Fetch Notes',
  'addNote': 'Add Note',
  'editNote': 'Edit Note',
  'deleteNote': 'Delete Note',
  'sendMessage': 'Send Message',
})

export const LogMessageContextMapping: Record<LogContext, string> = Object.freeze({
  'dashboard': 'Dashboard',
  'myNotes': 'My Notes',
  'myNotesLoadMore': 'My Notes: Load More',
  'contact': 'Contact'
});
