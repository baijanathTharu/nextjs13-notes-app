import { generateRandomId } from './utils';

interface INote {
  id: string;
  content: string;
}

interface INoteDB {
  notes: INote[];

  get: (noteId: string) => INote;
  set: (content: string) => INote;
  delete: (noteId: string) => INote;
}

class NotesDb implements INoteDB {
  notes: INote[] = [];

  get(noteId: string) {
    const note = this.notes.filter((note) => note.id === noteId)[0];
    return note;
  }

  set(content: string) {
    const id = generateRandomId();
    const note = { id, content };
    this.notes.push(note);
    return note;
  }

  delete(noteId: string) {
    const noteIndex = this.notes.findIndex((note) => note.id === noteId);
    const note = { ...this.notes[noteIndex] };
    this.notes.splice(noteIndex, 1);
    return note;
  }
}

export const notesDb = new NotesDb();
