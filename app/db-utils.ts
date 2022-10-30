import { prisma } from './db';

export interface INote {
  id: string;
  content: string;
}

export const notesDb = {
  async getNote(noteId: string) {
    const note = await prisma.note.findUnique({
      where: {
        id: noteId,
      },
    });
    return note;
  },

  async getAllNotes() {
    const notes = await prisma.note.findMany();
    return notes;
  },

  async setNote(content: string) {
    const createdNote = await prisma.note.create({
      data: {
        content,
      },
    });

    return createdNote;
  },

  async deleteNote(noteId: string) {
    const noteToDelete = await prisma.note.findUnique({
      where: {
        id: noteId,
      },
    });

    await prisma.note.delete({
      where: {
        id: noteId,
      },
    });

    return noteToDelete;
  },
};
