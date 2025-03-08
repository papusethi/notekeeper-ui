import { DeleteOutlined, FolderOutlined, HomeOutlined, InboxOutlined, StarOutlined } from '@ant-design/icons';
import { Flex, Menu, MenuProps, Typography } from 'antd';
import React from 'react';
import { setSideNavActiveFolderId, setSideNavActiveSection } from '../../redux/folder-note-slice/FolderNoteSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import AccountPreferencesButton from '../account-preferences-button/AccountPreferencesButton';
import DeleteFolderButton from '../delete-folder-button/DeleteFolderButton';
import NewFolderButton from '../new-folder-button/NewFolderButton';
import NewNoteButton from '../new-note-button/NewNoteButton';

export type MenuItem = Required<MenuProps>['items'][number];

export const topLevelKeys = ['home', 'favorites', 'archive', 'trash'];

const SideNavigation: React.FC = () => {
  const dispatch = useAppDispatch();
  const { folders, sideNav } = useAppSelector((state) => state.folderNote);

  const items: MenuItem[] = [
    { key: 'home', label: 'Home', icon: <HomeOutlined /> },
    { key: 'favorites', label: 'Favorites', icon: <StarOutlined /> },
    {
      key: 'archive',
      label: 'Archive',
      icon: <InboxOutlined />
    },
    { key: 'trash', label: 'Trash', icon: <DeleteOutlined /> },
    {
      key: 'folders',
      label: (
        <Flex justify="space-between" align="center">
          <Typography.Text type="secondary">Folders</Typography.Text>
          <NewFolderButton />
        </Flex>
      ),
      type: 'group',
      children: [
        ...folders.map((folder) => ({
          key: folder._id,
          label: (
            <Flex justify="space-between" align="center">
              <Typography.Text>{folder.name}</Typography.Text>
              <DeleteFolderButton folder={folder} />
            </Flex>
          ),
          icon: <FolderOutlined />
        }))
      ]
    }
  ];

  const handleSelect = (value) => {
    if (topLevelKeys?.includes(value?.key)) {
      dispatch(setSideNavActiveSection(value?.key));
      dispatch(setSideNavActiveFolderId(null));
    } else {
      dispatch(setSideNavActiveSection('folders'));
      dispatch(setSideNavActiveFolderId(value?.key));
    }
  };

  const selectedKeys = [];

  if (sideNav?.activeSection === 'folders') {
    selectedKeys.push(sideNav?.activeFolderId);
  } else {
    selectedKeys.push(sideNav?.activeSection);
  }

  return (
    <div style={{ height: 'inherit' }}>
      <div style={{ padding: 16, height: 'inherit' }}>
        <Flex justify="space-between" align="center" gap={4}>
          <Typography.Title level={4} style={{ margin: 0 }}>
            Notekeeper
          </Typography.Title>
          <AccountPreferencesButton />
        </Flex>

        <div style={{ marginTop: 16 }}>
          <NewNoteButton />
        </div>

        <div style={{ marginTop: 16 }}>
          <Menu
            mode="inline"
            items={items}
            style={{ background: 'transparent', border: 'none' }}
            selectedKeys={selectedKeys}
            onSelect={handleSelect}
          />
        </div>
      </div>
    </div>
  );
};

export default SideNavigation;
