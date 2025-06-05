import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, TextInput } from 'flowbite-react';
import { usePostNotesByScanIdMutation } from '@/lib/features/scans/scansAPI'; // 假设你有一个addNote action
import { useSelector } from 'react-redux';
import { selectSelectedScanId, addNote } from '@/lib/features/scans/scansApiSlice';
import { Note } from '@/app/types/Note';

export const BottomContent = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [errors, setErrors] = useState({ title: '', content: '' });
  const dispatch = useDispatch();

  const selectedScanId = useSelector(selectSelectedScanId);
     

  const validateForm = () => {
    let valid = true;
    let newErrors = { title: '', content: '' };

    if (!title.trim()) {
      newErrors.title = 'Title is required';
      valid = false;
    }

    if (!content.trim()) {
      newErrors.content = 'Content is required';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const [postNote, { isLoading, error }] = usePostNotesByScanIdMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
        try {
        const newNote: Note = { title, content, scanId: selectedScanId, notesId: ''};  
        const result = await postNote(newNote).unwrap();
        dispatch(addNote(result)); // 将返回的note添加到Redux store中
        setTitle(''); // 清空表单
        setContent('');
        } catch (error) {
        console.error('Failed to post note:', error);
        }
    }
  };

  return (
    <div className="bottom-content">
      <h1 className="text-2xl">Add Note</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className='text-base'>scanId:</label>
            {selectedScanId}
           
        </div>
        <div className="form-group">
          <label>Title</label>
          <TextInput
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          {errors.title && <p className="text-red-500">{errors.title}</p>}
        </div>
        <div className="form-group">
          <label>Content</label>
          <TextInput
            type="text"
            
            value={content}
            onChange={(e) => setContent(e.target.value)}
            
          />
           {errors.content && <p className="text-red-500">{errors.content}</p>}
        </div>
        <Button className="bg-gray-500" type="submit">Save</Button>
      </form>
    </div>
  );
};