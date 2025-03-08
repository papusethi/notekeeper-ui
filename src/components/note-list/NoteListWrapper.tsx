import { Card, Empty, Flex, Layout, Typography } from 'antd';
import React, { useMemo } from 'react';
import { INote, setCurrentNote } from '../../redux/folder-note-slice/FolderNoteSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { formatDate } from '../../utils/dateFormatter';

const topLevelNavMapping: Record<string, string> = {
  home: 'Home',
  favorites: 'Favorites',
  archive: 'Archive',
  trash: 'Trash'
};

const NoteListWrapper: React.FC = () => {
  const dispatch = useAppDispatch();
  const { notes, sideNav, foldersMapping } = useAppSelector((state) => state.folderNote);

  let headerTitle = '';

  if (sideNav.activeSection === 'folders' && foldersMapping && sideNav?.activeFolderId) {
    headerTitle = foldersMapping?.[sideNav?.activeFolderId];
  } else {
    headerTitle = topLevelNavMapping?.[sideNav?.activeSection];
  }

  const filteredNotes = useMemo(() => {
    // filteration logic
    let filteredNotes: INote[] = [];

    switch (sideNav.activeSection) {
      case 'home': {
        filteredNotes = notes.filter((item) => {
          if (!item.isArchived && !item.isDeleted) {
            return true;
          } else {
            return false;
          }
        });
        break;
      }
      case 'favorites': {
        filteredNotes = notes.filter((item) => {
          if (item?.isStarred && !item.isArchived && !item.isDeleted) {
            return true;
          } else {
            return false;
          }
        });
        break;
      }
      case 'archive': {
        filteredNotes = notes.filter((item) => {
          if (item.isArchived && !item.isDeleted) {
            return true;
          } else {
            return false;
          }
        });
        break;
      }
      case 'trash': {
        filteredNotes = notes.filter((item) => item?.isDeleted);
        break;
      }
      case 'folders': {
        filteredNotes = notes.filter((item) => {
          if (item?.folderId === sideNav?.activeFolderId && !item.isArchived && !item.isDeleted) {
            return true;
          } else {
            return false;
          }
        });
        break;
      }
    }

    return filteredNotes;
  }, [notes, sideNav?.activeFolderId, sideNav?.activeSection]);

  const handleClickCard = (note: INote) => {
    dispatch(setCurrentNote(note));
  };

  return (
    <Layout style={{ height: 'inherit' }}>
      <div style={{ height: 'inherit' }}>
        <div style={{ padding: 16 }}>
          <Typography.Title level={4} style={{ margin: 0 }}>
            {headerTitle}
          </Typography.Title>
        </div>

        <div style={{ height: 'calc(100vh - 60px)' }}>
          {filteredNotes.length ? (
            <ul
              tabIndex={-1}
              style={{
                height: 'inherit',
                listStyle: 'none',
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
                gap: 8,
                padding: 16,
                paddingTop: 2
              }}
            >
              {filteredNotes?.map((note) => (
                <li key={note?._id}>
                  <Card
                    tabIndex={0}
                    size="small"
                    hoverable
                    style={{
                      padding: 0,
                      textAlign: 'left',
                      cursor: 'pointer'
                    }}
                    onClick={() => handleClickCard(note)}
                  >
                    <Typography.Paragraph style={{ margin: 0, fontWeight: 'bold' }} ellipsis>
                      <Typography.Text>{note?.title}</Typography.Text>
                    </Typography.Paragraph>
                    <Typography.Paragraph style={{ margin: 0 }}>
                      <Typography.Text type="secondary">{formatDate(note?.updatedAt)}</Typography.Text>
                    </Typography.Paragraph>
                  </Card>
                </li>
              ))}
            </ul>
          ) : (
            <div style={{ padding: 16, marginTop: 240 }}>
              <Flex vertical justify="center" align="center">
                <Empty
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  styles={{ image: { height: 60 } }}
                  description={
                    <>
                      <Typography.Title level={5}>It's empty.</Typography.Title>
                      <Typography.Paragraph style={{ width: 400 }}>Create a new note to add to your collection.</Typography.Paragraph>
                    </>
                  }
                ></Empty>
              </Flex>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default NoteListWrapper;
