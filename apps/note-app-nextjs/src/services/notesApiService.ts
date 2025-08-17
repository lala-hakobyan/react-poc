import { Note } from '@/types/note.types';
import { LogMessagesConstants } from '@/constants/logMessages.constants';

/**
 * Singleton class for abstracting API requests related to Notes
 */
class NotesApiService {
  private defaultLimitConfig: number = Number(process.env.NEXT_PUBLIC_NOTES_PAGE_SIZE);
  private baseApiUrl = `${process.env.NEXT_PUBLIC_API_URL}/notes`;
  private testAccessToken = process.env.NEXT_PUBLIC_TEST_ACCESS_TOKEN;
  private static instance: NotesApiService;

  public async fetchNotes(offset = 0, limit = this.defaultLimitConfig) {
    const response: Response = await fetch(`${this.baseApiUrl}?offset=${offset}&limit=${limit}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.testAccessToken}`,
      }
    });

    if(!response.ok) {
      await this.throwError(response, LogMessagesConstants.notes.addError);
    }

    return response.json();
  }

  public async addNote(note: Note) {
    const response = await fetch(this.baseApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.testAccessToken}`,
      },
      body: JSON.stringify(note)
    });

    if(!response.ok) {
      await this.throwError(response, LogMessagesConstants.notes.addError);
    }

    return response.json();
  }

  public async editNote(note: Note) {
    const response = await fetch(`${this.baseApiUrl}/${note.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.testAccessToken}`
      },
      body: JSON.stringify(note)
    })

    if(!response.ok) {
      await this.throwError(response, LogMessagesConstants.notes.addError);
    }

    return response.json();
  }

  public async deleteNote(noteId: string) {
    const response = await fetch(`${this.baseApiUrl}/${noteId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.testAccessToken}`
      }
    })

    if(!response.ok) {
      await this.throwError(response, LogMessagesConstants.notes.addError);
    }
  }

  private async throwError(response: Response, defaultMessage: string) {
    const result = await response.json();
    throw new Error(result ? result.error : defaultMessage);
  }

  public static getInstance() {
    if(!this.instance) {
      this.instance = new NotesApiService();
    }

    return this.instance;
  }
}

const notesApiService = NotesApiService.getInstance();

export default notesApiService;
