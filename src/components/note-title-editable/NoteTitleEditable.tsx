import { Input, Typography } from 'antd';
import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { setCurrentNote } from '../../redux/folder-note-slice/FolderNoteSlice';

const NoteTitleEditable: React.FC = () => {
  const dispatch = useAppDispatch();

  const { currentNote } = useAppSelector((state) => state.folderNote);

  const [enableEditable, setEnableEditable] = useState(false);

  const handleClickTitle = () => {
    setEnableEditable(true);
  };

  const handleBlurInput = (e) => {
    const value = e.target.value;
    dispatch(setCurrentNote({ ...currentNote, title: value || 'Untitled' }));
    setEnableEditable(false);
  };

  return (
    <>
      {enableEditable ? (
        <Input autoFocus placeholder="enter title here" defaultValue={currentNote?.title} onBlur={handleBlurInput} />
      ) : (
        <Typography.Title level={4} style={{ margin: 0 }} onClick={handleClickTitle}>
          {currentNote?.title}
        </Typography.Title>
      )}
    </>
  );
};

export default NoteTitleEditable;
