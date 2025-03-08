import { PlusOutlined } from '@ant-design/icons';
import { useMutation } from '@tanstack/react-query';
import { Button, Input, message, Modal } from 'antd';
import React, { Fragment, useState } from 'react';
import { setNotes } from '../../redux/folder-note-slice/FolderNoteSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { initAxiosInstance } from '../../utils/axiosInstance';

const NewNoteButton: React.FC = () => {
  const dispatch = useAppDispatch();
  const { currentUser } = useAppSelector((state) => state.user);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [noteTitle, setNoteTitle] = useState('');

  const { mutate, isPending } = useMutation({
    mutationKey: ['create-note'],
    mutationFn: (payload) => {
      return initAxiosInstance().post('/notes', JSON.stringify(payload));
    },
    onSuccess: async (response) => {
      message.success(response.data.message);
      setIsModalOpen(false);
      setNoteTitle('');
      dispatch(setNotes(response?.data?.data));
    },
    onError: (error) => {
      console.error('App error: ', error);
      message.error(error.message);
    }
  });

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    const payload = {
      userId: currentUser?.id,
      title: noteTitle || 'Untitled'
    };
    mutate(payload);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNoteTitle(value);
  };

  return (
    <Fragment>
      <Button block icon={<PlusOutlined />} onClick={showModal}>
        New Note
      </Button>

      <Modal
        open={isModalOpen}
        destroyOnClose
        title="New note title"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" loading={isPending} onClick={handleOk}>
            Create
          </Button>
        ]}
      >
        <Input placeholder="enter here" value={noteTitle} onChange={handleChange} />
      </Modal>
    </Fragment>
  );
};

export default NewNoteButton;
