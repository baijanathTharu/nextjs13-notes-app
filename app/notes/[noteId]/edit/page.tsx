'use client';

import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { IUpateNotePayload } from '../../../../pages/api/update-note';
import { INote } from '../../../db-utils';

async function updateNoteReq(body: IUpateNotePayload) {
  try {
    const res = await fetch(`/api/update-note`, {
      method: 'POST',
      body: JSON.stringify(body),
    });
    const data = (await res.json()) as INote;
    return data;
  } catch (error: any) {
    console.log('Updating note failed', error.message);
    throw new Error(error.message);
  }
}

async function getNoteReq(noteId: string) {
  try {
    const res = await fetch(`/api/get-note?noteId=${noteId}`);
    const data = await res.json();
    return data;
  } catch (error: any) {
    console.log('fetching note failed', error.message);
    throw new Error(error);
  }
}

export default function EditNotePage() {
  const pathname = usePathname();

  const noteId = pathname.split(`/`)[2];

  const [showForm, setShowForm] = React.useState(true);

  const [note, setNote] = React.useState<{
    id: string;
    content: string;
  } | null>(null);

  const [error, setError] = React.useState('');

  const [submitting, setSubmitting] = React.useState(false);

  const contentRef = React.useRef<HTMLTextAreaElement>(null);

  const router = useRouter();

  React.useEffect(() => {
    setSubmitting(true);
    getNoteReq(noteId)
      .then((data) => {
        setNote(data);
        setSubmitting(false);
      })
      .catch((e) => {
        console.log(e);
        setError(e.message);
        setSubmitting(false);
      });

    return () => {
      setNote(null);
    };
  }, [noteId]);

  React.useEffect(() => {
    contentRef.current?.focus();
  }, [showForm]);

  const clearError = () => setError('');

  const handleSave = async () => {
    try {
      setSubmitting(true);
      clearError();
      await updateNoteReq({
        content: note?.content as string,
        id: noteId,
      });
      setNote(null);
      router.refresh();
      setShowForm(false);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className='my-4 flex flex-col gap-4 w-full'>
      <div className='flex'>
        {showForm ? (
          <>
            <button
              className='flex gap-2 mx-auto border border-black px-4 py-2 text-center hover:bg-slate-300'
              onClick={handleSave}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-6 h-6'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M12 4.5v15m7.5-7.5h-15'
                />
              </svg>
              {submitting ? 'Updating...' : 'Update'}
            </button>
            <button
              className='flex gap-2 mx-auto border border-black px-4 py-2 text-center text-white bg-red-400 hover:bg-red-500'
              onClick={() => {
                clearError();
                setShowForm(false);
                setNote(null);
                router.back();
              }}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-6 h-6'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M6 18L18 6M6 6l12 12'
                />
              </svg>
              Cancel
            </button>
          </>
        ) : null}
      </div>

      {showForm ? (
        <form className='p-4 w-full'>
          <textarea
            ref={contentRef}
            className='p-2 w-full'
            name='content'
            placeholder='content'
            value={note?.content}
            onChange={(e) => {
              setNote({
                id: noteId,
                content: e.target.value,
              });
            }}
          />

          {error ? <p className='text-red-500'>{error}</p> : null}
        </form>
      ) : null}
    </div>
  );
}
