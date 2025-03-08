import {
  CalendarOutlined,
  CloseOutlined,
  DeleteOutlined,
  EllipsisOutlined,
  FolderOutlined,
  InboxOutlined,
  StarOutlined
} from '@ant-design/icons';
import { useMutation } from '@tanstack/react-query';
import { Button, Divider, Dropdown, Empty, Flex, MenuProps, message, theme, Tooltip, Typography } from 'antd';
import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { setCurrentNote, setNotes } from '../../redux/folder-note-slice/FolderNoteSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { initAxiosInstance } from '../../utils/axiosInstance';
import { formatDate } from '../../utils/dateFormatter';
import NoteTitleEditable from '../note-title-editable/NoteTitleEditable';

const NoteEditorWrapper: React.FC = () => {
  const dispatch = useAppDispatch();

  const { currentNote, foldersMapping } = useAppSelector((state) => state.folderNote);

  const [editorValue, setEditorValue] = useState('');

  const color = theme.useToken().token.colorText;

  const { mutate: mutateUpdateNote } = useMutation({
    mutationKey: ['update-current-note'],
    mutationFn: (payload) => {
      return initAxiosInstance().put(`/notes/${payload?.noteId}`, JSON.stringify(payload?.note));
    },
    onSuccess: (data, payload) => {
      message.success(data?.data?.message);
      dispatch(setNotes(data?.data?.data));
      dispatch(setCurrentNote(payload?.note));
    },
    onError: (error) => {
      console.error('App error: ', error);
      message.error(error.message);
    }
  });

  const { mutate: mutateDeleteNote } = useMutation({
    mutationKey: ['delete-current-note'],
    mutationFn: (payload) => {
      return initAxiosInstance().delete(`/notes/${payload?.noteId}`);
    },
    onSuccess: (response) => {
      message.success(response?.data?.message);
      dispatch(setNotes(response?.data?.data));
      dispatch(setCurrentNote(null));
    },
    onError: (error) => {
      console.error('App error: ', error);
      message.error(error.message);
    }
  });

  const handleMenuClick: MenuProps['onClick'] = (e) => {
    if (e.key === 'favorite') {
      const updatedNote = {
        ...currentNote,
        isStarred: !currentNote?.isStarred
      };
      mutateUpdateNote({ noteId: currentNote?._id, note: updatedNote });
    }

    if (e.key === 'archive') {
      const updatedNote = {
        ...currentNote,
        isArchived: !currentNote?.isArchived
      };
      mutateUpdateNote({ noteId: currentNote?._id, note: updatedNote });
    }

    if (e.key === 'trash') {
      const updatedNote = {
        ...currentNote,
        isDeleted: !currentNote?.isDeleted
      };
      mutateUpdateNote({ noteId: currentNote?._id, note: updatedNote });
    }

    if (e.key === 'delete') {
      mutateDeleteNote({ noteId: currentNote?._id });
    }
  };

  const items: MenuProps['items'] = [
    {
      key: 'favorite',
      label: currentNote?.isStarred ? 'Remove from favorites' : 'Add to favorites',
      icon: <StarOutlined />
    },
    {
      key: 'archive',
      label: currentNote?.isArchived ? 'Remove from archive' : 'Move to archive',
      icon: <InboxOutlined />
    },
    {
      key: 'trash',
      label: currentNote?.isDeleted ? 'Remove from trash' : 'Move to trash',
      icon: <DeleteOutlined />
    },
    {
      type: 'divider'
    },
    {
      key: 'delete',
      label: 'Delete permanent',
      icon: <DeleteOutlined />,
      danger: true
    }
  ];

  const menuProps = {
    items,
    onClick: handleMenuClick
  };

  const handleClickSave = () => {
    const updatedNote = { ...currentNote, description: editorValue };
    mutateUpdateNote({ noteId: currentNote?._id, note: updatedNote });
  };

  const handleClickClose = () => {
    dispatch(setCurrentNote(null));
  };

  return (
    <div>
      {currentNote ? (
        <div style={{ padding: 16 }}>
          <Flex justify="space-between" align="center" gap={4}>
            <NoteTitleEditable />

            <Flex justify="space-between" align="center" gap={8}>
              <Button type="primary" onClick={handleClickSave}>
                Save
              </Button>

              <Dropdown arrow menu={menuProps}>
                <Button shape="circle" icon={<EllipsisOutlined />} />
              </Dropdown>
              <Tooltip title="Close">
                <Button shape="circle" icon={<CloseOutlined />} onClick={handleClickClose} />
              </Tooltip>
            </Flex>
          </Flex>

          <div style={{ marginTop: 16 }}>
            <Flex vertical gap={8}>
              <Flex align="center" gap={24}>
                <Flex align="center" gap={16} style={{ width: 90 }}>
                  <CalendarOutlined style={{ fontSize: 16 }} />
                  <Typography.Text type="secondary">Date</Typography.Text>
                </Flex>
                <Typography.Text>{formatDate(currentNote?.updatedAt)}</Typography.Text>
              </Flex>

              <Divider style={{ margin: 0 }} />

              <Flex align="center" gap={24}>
                <Flex align="center" gap={16} style={{ width: 90 }}>
                  <FolderOutlined style={{ fontSize: 16 }} />
                  <Typography.Text type="secondary">Folder</Typography.Text>
                </Flex>
                <Typography.Text>{foldersMapping?.[currentNote?.folderId] || 'Home'}</Typography.Text>
              </Flex>

              <Divider style={{ margin: 0 }} />
            </Flex>
          </div>

          <div style={{ marginTop: 16, color }}>
            <ReactQuill theme="snow" value={editorValue} onChange={(value) => setEditorValue(value)} />
          </div>
        </div>
      ) : (
        <div style={{ padding: 16, marginTop: 300 }}>
          <Flex vertical justify="center" align="center">
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              styles={{ image: { height: 60 } }}
              description={
                <>
                  <Typography.Title level={5}>Select a note to view</Typography.Title>
                  <Typography.Paragraph style={{ width: 400 }}>
                    Choose a note from the list on the left to view its contents, or create a new note to add to your collection.
                  </Typography.Paragraph>
                </>
              }
            ></Empty>
          </Flex>
        </div>
      )}
    </div>
  );
};

export default NoteEditorWrapper;
