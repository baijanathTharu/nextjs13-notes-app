import Link from 'next/link';
import { notesDb } from '../db';

export async function NoteList() {
  const notes = await notesDb.getAll();
  return (
    <div className='flex flex-col'>
      {notes.map(({ id, content }) => {
        return (
          <Link href={`/dashboard/${id}`} key={id}>
            <div className='my-4 border-2 rounded p-4 m-2 cursor-pointer hover:bg-white'>
              {content.slice(0, 50)}
            </div>
          </Link>
        );
      })}
    </div>
  );
}
