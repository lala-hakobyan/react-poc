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
            db.createObjectStore(NotesCacheService.storeName, { keyPath: 'id' });
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

  async loadNotes(): Promise<Note[]> {
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
