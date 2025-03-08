import { FolderAddOutlined } from '@ant-design/icons';
import { useMutation } from '@tanstack/react-query';
import { Button, Input, message, Modal, Tooltip } from 'antd';
import React, { Fragment, useState } from 'react';
import { setFolders } from '../../redux/folder-note-slice/FolderNoteSlice';
import { useAppDispatch } from '../../redux/hooks';
import { initAxiosInstance } from '../../utils/axiosInstance';

const NewFolderButton: React.FC = () => {
  const dispatch = useAppDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [folderName, setFolderName] = useState('');

  const { mutate, isPending } = useMutation({
    mutationKey: ['create-folder'],
    mutationFn: (payload: { name: string }) => {
      return initAxiosInstance().post('/folders', JSON.stringify(payload));
    },
    onSuccess: (response) => {
      message.success(response.data.message);
      setIsModalOpen(false);
      setFolderName('');
      dispatch(setFolders(response?.data?.data));
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
      name: folderName || 'New Folder'
    };
    mutate(payload);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFolderName(value);
  };

  return (
    <Fragment>
      <Tooltip arrow title="Create folder">
        <Button shape="circle" size="small" icon={<FolderAddOutlined />} type="text" variant="text" onClick={showModal} />
      </Tooltip>

      <Modal
        open={isModalOpen}
        destroyOnClose
        title="New folder name"
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
        <Input placeholder="enter here" value={folderName} onChange={handleChange} />
      </Modal>
    </Fragment>
  );
};

export default NewFolderButton;
