import { notesDb } from '../../db-utils';

export default async function NoteDetailPage(props: any) {
  const note = await notesDb.getNote(props.params.noteId);

  if (!note) {
    return (
      <div className='my-4 text-sm font-bold'>
        <p className='text-red-500 text-center'>Note not found</p>
      </div>
    );
  }

  return (
    <div className='my-4 text-sm'>
      <p>{note.content}</p>
    </div>
  );
}
