import { Note } from '@/types/note.types';

/**
 * Singleton class for abstracting API requests related to Notes
 */
class NotesApiService {
  private baseApiUrl = 'api/notes';
  private static instance: NotesApiService;

  public async fetchNotes(offset = 0, limit = 9) {
    const response = await fetch(`${this.baseApiUrl}?offset=${offset}&limit=${limit}`);

    if(!response.ok) {
      throw new Error('Error occurred while fetching notes.');
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
      throw new Error('Error occurred while adding note.');
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
    });

    if (!response.ok) {
      throw new Error('Error happened when editing note.');
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
      throw new Error('Error occurred while deleting note.');
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
