import { generateRandomId } from './utils';

interface INote {
  id: string;
  content: string;
}

interface INoteDB {
  notes: INote[];

  get: (noteId: string) => Promise<INote>;
  getAll: () => Promise<INote[]>;
  set: (content: string) => Promise<INote>;
  delete: (noteId: string) => Promise<INote>;
}

class NotesDb implements INoteDB {
  notes: INote[] = [
    {
      id: generateRandomId(),
      content: 'This is a note of a user to do following tasks.',
    },
  ];

  async get(noteId: string) {
    const note = this.notes.filter((note) => note.id === noteId)[0];
    return note;
  }

  async getAll() {
    return this.notes;
  }

  async set(content: string) {
    const id = generateRandomId();
    const note = { id, content };
    this.notes.push(note);
    return note;
  }

  async delete(noteId: string) {
    const noteIndex = this.notes.findIndex((note) => note.id === noteId);
    const note = { ...this.notes[noteIndex] };
    this.notes.splice(noteIndex, 1);
    return note;
  }
}

export const notesDb = new NotesDb();
