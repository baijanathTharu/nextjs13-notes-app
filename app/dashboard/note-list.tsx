import Link from 'next/link';
import { notesDb } from '../db';
import { asyncComponent } from '../utils';

async function getNotes() {
  const notes = await notesDb.getAllNotes();
  return notes;
}

async function NoteListAsync() {
  const notes = await getNotes();
  return (
    <div className='flex flex-col'>
      {notes.map(({ id, content }) => {
        return (
          <Link href={`/dashboard/${id}`} key={id}>
            <div className='my-4 border-2 rounded p-4 m-2 cursor-pointer hover:bg-slate-300'>
              {content.slice(0, 50)}
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export const NoteList = asyncComponent(NoteListAsync);
