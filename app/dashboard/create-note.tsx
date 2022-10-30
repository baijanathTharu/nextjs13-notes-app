'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ICreateNotePayload } from '../../pages/api/create-note';
import { INote } from '../db-utils';

async function createNoteReq(body: ICreateNotePayload) {
  try {
    const res = await fetch(`/api/create-note`, {
      method: 'POST',
      body: JSON.stringify(body),
    });
    const data = (await res.json()) as INote;
    return data;
  } catch (error: any) {
    console.log('Creating note failed', error.message);
    throw new Error(error.message);
  }
}

export function CreateNote() {
  const [showForm, setShowForm] = React.useState(false);

  const [content, setContent] = React.useState('');

  const [error, setError] = React.useState('');

  const [submitting, setSubmitting] = React.useState(false);

  const contentRef = React.useRef<HTMLTextAreaElement>(null);

  const router = useRouter();

  React.useEffect(() => {
    contentRef.current?.focus();
  }, [showForm]);

  const clearError = () => setError('');

  const handleSave = async () => {
    try {
      setSubmitting(true);
      clearError();
      await createNoteReq({
        content,
      });
      setContent('');
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
              {submitting ? 'Saving...' : 'Save'}
            </button>
            <button
              className='flex gap-2 mx-auto border border-black px-4 py-2 text-center text-white bg-red-400 hover:bg-red-500'
              onClick={() => {
                clearError();
                setShowForm(false);
                setContent('');
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
        ) : (
          <button
            className='flex gap-2 mx-auto border border-black px-4 py-2 text-center hover:bg-slate-300'
            onClick={() => {
              clearError();
              setShowForm(true);
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
                d='M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10'
              />
            </svg>
            Create
          </button>
        )}
      </div>

      {showForm ? (
        <form className='p-4 w-full'>
          <textarea
            ref={contentRef}
            className='p-2 w-full'
            name='content'
            placeholder='content'
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
            }}
          />

          {error ? <p className='text-red-500'>{error}</p> : null}
        </form>
      ) : null}
    </div>
  );
}
