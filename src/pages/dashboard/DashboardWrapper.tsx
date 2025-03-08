import { useMutation } from '@tanstack/react-query';
import { Flex, Spin } from 'antd';
import React, { useEffect } from 'react';
import { setFolders, setNotes } from '../../redux/folder-note-slice/FolderNoteSlice';
import { useAppDispatch } from '../../redux/hooks';
import { initAxiosInstance } from '../../utils/axiosInstance';
import Dashboard from './Dashboard';

const DashboardWrapper: React.FC = () => {
  const dispatch = useAppDispatch();

  const { mutate: mutateFolders, isPending: isFetchingFolders } = useMutation({
    mutationKey: ['folders'],
    mutationFn: () => {
      return initAxiosInstance().get('/folders');
    },
    onSuccess: (response) => {
      const data = response.data.data;
      dispatch(setFolders(data));
    }
  });

  const { mutate: mutateNotes, isPending: isFetchingNotes } = useMutation({
    mutationKey: ['notes'],
    mutationFn: () => {
      return initAxiosInstance().get('/notes');
    },
    onSuccess: (response) => {
      const data = response.data.data;
      dispatch(setNotes(data));
    }
  });

  useEffect(() => {
    mutateFolders();
    mutateNotes();
  }, []);

  if (isFetchingFolders || isFetchingNotes) {
    return (
      <Flex justify="center" align="center" style={{ height: 'inherit' }}>
        <Spin />
      </Flex>
    );
  }

  return <Dashboard />;
};

export default DashboardWrapper;
