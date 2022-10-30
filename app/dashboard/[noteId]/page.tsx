import { notesDb } from '../../db';

export default async function NoteDetailPage({
  params,
}: {
  params: {
    noteId: string;
  };
}) {
  const note = await notesDb.get(params.noteId);

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
