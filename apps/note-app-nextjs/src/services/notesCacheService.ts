import { Note } from '@/types/note.types';

class NotesCacheService {
  private static instance: NotesCacheService;
  private static readonly dbName = 'react-note-app';
  private static readonly dbVersion = 1;
  private static readonly storeName = 'notes';

  private dbPromise: Promise<IDBDatabase> | null = null;

  private getDb(): Promise<IDBDatabase> {
    if (typeof indexedDB === 'undefined') {
      return Promise.reject(new Error('IndexedDB is not available in this environment'));
    }

    if (!this.dbPromise) {
      this.dbPromise = new Promise((resolve, reject) => {
        const request = indexedDB.open(
          NotesCacheService.dbName,
          NotesCacheService.dbVersion
        );

        request.onupgradeneeded = () => {
          const db = request.result;
          if (!db.objectStoreNames.contains(NotesCacheService.storeName)) {
            const store = db.createObjectStore(NotesCacheService.storeName, { keyPath: 'id' });
            store.createIndex('creationDate', 'creationDate', { unique: false });
          }
        };

        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
      });
    }

    return this.dbPromise;
  }

  async saveNotes(notes: Note[]): Promise<void> {
    const db = await this.getDb();

    return new Promise((resolve, reject) => {
      const tx = db.transaction(NotesCacheService.storeName, 'readwrite');
      const store = tx.objectStore(NotesCacheService.storeName);

      notes.forEach((note) => {
        store.put(note); // insert or update by id
      });

      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  }

  async deleteNotes(noteIds: string[]): Promise<void> {
    const db = await this.getDb();

    return new Promise((resolve, reject) => {
      const tx = db.transaction(NotesCacheService.storeName, 'readwrite');
      const store = tx.objectStore(NotesCacheService.storeName);

      // Loop through and delete all of them in the same transaction
      noteIds.forEach((id) => {
        store.delete(id);
      });

      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  }

  async loadAllNotes(): Promise<Note[]> {
    const db = await this.getDb();

    return new Promise((resolve, reject) => {
      const tx = db.transaction(NotesCacheService.storeName, 'readonly');
      const store = tx.objectStore(NotesCacheService.storeName);
      const request = store.getAll();

      request.onsuccess = () => {
        resolve(request.result as Note[]);
      };
      request.onerror = () => reject(request.error);
    });
  }

  async loadNotes(offset: number = 0, limit: number = 9): Promise<Note[]> {
    const db = await this.getDb();

    return new Promise((resolve, reject) => {
      const tx = db.transaction(NotesCacheService.storeName, 'readonly');
      const store = tx.objectStore(NotesCacheService.storeName);
      const results: Note[] = [];
      let advanced = false;

      const index = store.index('creationDate');
      const request = index.openCursor(null, 'prev');

      request.onsuccess = (event: Event) => {
        const target = event.target as IDBRequest<IDBCursorWithValue | null>;
        const cursor = target.result;

        if (!cursor) {
          resolve(results); // End of store
          return;
        }

        // 1. Move to the starting point (the Offset)
        if (offset > 0 && !advanced) {
          advanced = true;
          cursor.advance(offset);
          return;
        }

        // 2. Collect notes until the Limit is reached
        results.push(cursor.value);

        if (results.length < limit) {
          cursor.continue();
        } else {
          resolve(results); // Limit reached
        }
      };

      request.onerror = () => reject(request.error);
    });
  }

  async clearNotes(): Promise<void> {
    const db = await this.getDb();

    return new Promise((resolve, reject) => {
      const tx = db.transaction(NotesCacheService.storeName, 'readwrite');
      const store = tx.objectStore(NotesCacheService.storeName);
      const request = store.clear();

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  public static getInstance() {
    if(!NotesCacheService.instance) {
      NotesCacheService.instance = new NotesCacheService();
    }

    return NotesCacheService.instance;
  }
}

const notesCacheService = NotesCacheService.getInstance();

export default notesCacheService;
