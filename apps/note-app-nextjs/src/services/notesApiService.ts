import { Note } from '@/types/note.types';
import { LogMessagesConstants } from '@/constants/logMessages.constants';

/**
 * Singleton class for abstracting API requests related to Notes
 */
class NotesApiService {
  private defaultLimitConfig: number = Number(process.env.NEXT_PUBLIC_NOTES_PAGE_SIZE);
  private baseApiUrl = `${process.env.NEXT_PUBLIC_API_URL}/notes`;
  private static instance: NotesApiService;

  public async fetchNotes(offset = 0, limit = this.defaultLimitConfig) {
    const response = await fetch(`${this.baseApiUrl}?offset=${offset}&limit=${limit}`);

    if(!response.ok) {
      throw new Error(LogMessagesConstants.notes.fetchError);
    }

    return response.json();
  }

  public async addNote(note: Note) {
    const response = await fetch(this.baseApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(note)
    });

    if(!response.ok) {
      throw new Error(LogMessagesConstants.notes.addError);
    }

    return response.json();
  }

  public async editNote(note: Note) {
    const response = await fetch(`${this.baseApiUrl}/${note.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(note)
    })

    if (!response.ok) {
      throw new Error(LogMessagesConstants.notes.editError);
    }

    return response.json();
  }

  public async deleteNote(noteId: string) {
    const response = await fetch(`${this.baseApiUrl}/${noteId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    if(!response.ok) {
      throw new Error(LogMessagesConstants.notes.deleteError);
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
