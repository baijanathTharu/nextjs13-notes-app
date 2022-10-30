import type { NextApiRequest, NextApiResponse } from 'next';
import { INote, notesDb } from '../../app/db-utils';

export type ICreateNotePayload = {
  content: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<INote>
) {
  if (req.method === 'POST') {
    const body = JSON.parse(req.body) as ICreateNotePayload;

    const createdNote = await notesDb.setNote(body.content);

    res.status(201).json(createdNote);
  }
}
