import type { NextApiRequest, NextApiResponse } from 'next';
import { INote, notesDb } from '../../app/db-utils';

export type IUpateNotePayload = {
  id: string;
  content: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<INote>
) {
  if (req.method === 'POST') {
    const body = JSON.parse(req.body) as IUpateNotePayload;

    const updatedNote = await notesDb.updateNote({
      id: body.id,
      content: body.content,
    });

    res.status(200).json(updatedNote);
  }
}
