import Link from 'next/link';
import { CreateNote } from './create-note';
import { NoteList } from './note-list';

export function Sidebar() {
  return (
    <aside className='max-w-xs w-full h-screen shadow-sm border bg-[#eee] border-[#eee]'>
      <h2 className='text-center my-4 text-2xl font-semibold'>
        <Link href={'/dashboard'}>Notes</Link>
      </h2>

      <CreateNote />

      <NoteList />
    </aside>
  );
}
