import { Note } from '@/types/note.types';
import { LogMessagesConstants } from '@/constants/logMessages.constants';

/**
 * Singleton class for abstracting API requests related to Notes
 */
class NotesApiService {
  private defaultLimitConfig: number = Number(process.env.NEXT_PUBLIC_NOTES_PAGE_SIZE);
  private baseApiUrl = `api/notes`;
  private testAccessToken = process.env.NEXT_PUBLIC_TEST_ACCESS_TOKEN;
  private static instance: NotesApiService;

  public async fetchNotes(offset = 0, limit = this.defaultLimitConfig, signal?:AbortSignal) {
    const response: Response = await fetch(`${this.baseApiUrl}?offset=${offset}&limit=${limit}`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.testAccessToken}`,
      },
      signal
    });

    await this.handleError(response, LogMessagesConstants.notes.fetchError);

    return response.json();
  }

  public async addNote(note: Note) {
    const response = await fetch(this.baseApiUrl, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.testAccessToken}`
      },
      body: JSON.stringify(note)
    });

    await this.handleError(response, LogMessagesConstants.notes.addError);

    return response.json();
  }

  public async editNote(note: Note) {
    const response = await fetch(`${this.baseApiUrl}/${note.id}`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.testAccessToken}`
      },
      body: JSON.stringify(note)
    })

    await this.handleError(response, LogMessagesConstants.notes.editError);

    return response.json();
  }

  public async deleteNote(noteId: string) {
    const response = await fetch(`${this.baseApiUrl}/${noteId}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.testAccessToken}`,
      }
    })

    await this.handleError(response, LogMessagesConstants.notes.deleteError);
  }

  private async handleError(response: Response, errorText: string) {
    if(!response.ok) {
      let errorData;
      let errorMessage = response.status + ' ' + errorText;

      try {
        errorData = await response.json();
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        // backend might not return JSON
        throw new Error(errorMessage);
      }

      errorMessage = errorData?.error ? errorMessage + ' ' + errorData.error : errorMessage;
      throw new Error(errorMessage);
    }
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
