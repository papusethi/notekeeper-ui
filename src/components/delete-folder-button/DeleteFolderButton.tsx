import { DeleteOutlined, EditOutlined, EllipsisOutlined } from '@ant-design/icons';
import { useMutation } from '@tanstack/react-query';
import { Button, Dropdown, Input, MenuProps, message, Modal } from 'antd';
import React, { useState } from 'react';
import { setFolders, setSideNavActiveFolderId, setSideNavActiveSection } from '../../redux/folder-note-slice/FolderNoteSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { initAxiosInstance } from '../../utils/axiosInstance';
import { topLevelKeys } from '../side-navigation/SideNavigation';

const DeleteFolderButton: React.FC = (props) => {
  const { folder } = props;

  const dispatch = useAppDispatch();

  const { currentUser } = useAppSelector((state) => state.user);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [folderName, setFolderName] = useState(folder.name);

  const { mutate: mutateDeleteFolder, isPending: isPendingDeleteFolder } = useMutation({
    mutationKey: ['delete-folder'],
    mutationFn: (payload) => {
      return initAxiosInstance().delete(`/folders/${payload?.folderId}`);
    },
    onSuccess: async (response) => {
      message.success(response.data.message);
      dispatch(setFolders(response?.data?.data));
      dispatch(setSideNavActiveSection(topLevelKeys[0]));
      dispatch(setSideNavActiveFolderId(null));
    },
    onError: (error) => {
      console.error('App error: ', error);
      message.error(error.message);
    }
  });

  const { mutate: mutateUpdateFolder, isPending: isPendingUpdateFolder } = useMutation({
    mutationKey: ['update-folder'],
    mutationFn: (payload) => {
      return initAxiosInstance().put(`/folders/${payload.folderId}`, JSON.stringify(payload));
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

  const handleDeleteClick = () => {
    mutateDeleteFolder({ folderId: folder._id });
  };

  const showModal = () => {
    setIsModalOpen(true);
    setFolderName(folder.name);
  };

  const handleOk = () => {
    const payload = {
      userId: currentUser?.id,
      folderId: folder._id,
      name: folderName || folder.name
    };
    mutateUpdateFolder(payload);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFolderName(value);
  };

  const handleMenuClick: MenuProps['onClick'] = (e) => {
    if (e.key === 'rename') {
      showModal();
    }

    if (e.key === 'delete') {
      handleDeleteClick();
    }
  };

  const items: MenuProps['items'] = [
    {
      key: 'rename',
      label: 'Rename',
      icon: <EditOutlined />
    },
    {
      key: 'delete',
      label: 'Delete',
      icon: <DeleteOutlined />,
      danger: true
    }
  ];

  const menuProps = {
    items,
    onClick: handleMenuClick
  };

  return (
    <>
      <Dropdown arrow placement="bottom" menu={menuProps} disabled={isPendingDeleteFolder || isPendingUpdateFolder}>
        <Button
          shape="circle"
          size="small"
          type="text"
          variant="text"
          loading={isPendingDeleteFolder || isPendingUpdateFolder}
          icon={<EllipsisOutlined />}
        />
      </Dropdown>

      <Modal
        open={isModalOpen}
        destroyOnClose
        title="Update folder name"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" loading={isPendingUpdateFolder} onClick={handleOk}>
            Update
          </Button>
        ]}
      >
        <Input placeholder="enter here" value={folderName} onChange={handleChange} />
      </Modal>
    </>
  );
};

export default DeleteFolderButton;
