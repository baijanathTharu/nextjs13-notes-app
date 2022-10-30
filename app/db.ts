import { generateRandomId } from './utils';

export interface INote {
  id: string;
  content: string;
}

const notes: INote[] = [
  {
    id: generateRandomId(),
    content: 'This is a note of a user to do following tasks.',
  },
];

export const notesDb = {
  async getNote(noteId: string) {
    const note = notes.filter((note) => note.id === noteId);
    return note[0];
  },

  async getAllNotes() {
    return notes;
  },

  async setNote(content: string) {
    const id = generateRandomId();
    const note = { id, content };
    notes.push(note);

    return note;
  },

  async deleteNote(noteId: string) {
    const noteIndex = notes.findIndex((note) => note.id === noteId);
    const note = { ...notes[noteIndex] };
    notes.splice(noteIndex, 1);
    return note;
  },
};
