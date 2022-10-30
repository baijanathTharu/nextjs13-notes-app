import type { NextApiRequest, NextApiResponse } from 'next';
import { notesDb } from '../../app/db-utils';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const noteId = req.query.noteId as string;
  console.log('noteId', noteId);
  const note = await notesDb.getNote(noteId);
  res.status(200).json(note);
}
