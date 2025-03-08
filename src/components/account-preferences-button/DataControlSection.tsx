import { useMutation } from '@tanstack/react-query';
import { Button, Flex, message, Modal, Typography } from 'antd';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { setCurrentUser, setIsAuthenticated } from '../../redux/user-slice/userSlice';
import { initAxiosInstance } from '../../utils/axiosInstance';

const DataControlSection: React.FC = () => {
  const dispatch = useAppDispatch();
  const { currentUser } = useAppSelector((state) => state.user);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const { mutate: mutateDeleteAccount, isPending } = useMutation({
    mutationKey: ['delete-account'],
    mutationFn: () => {
      return initAxiosInstance().delete(`/user/${currentUser?.id}`);
    },
    onSuccess: (response) => {
      message.success(response.data.message);
      dispatch(setCurrentUser(null));
      dispatch(setIsAuthenticated(false));
    },
    onError: (error) => {
      console.error('App error: ', error);
      message.error(error.message);
    }
  });

  const showDeleteModal = () => {
    setIsModalVisible(true);
  };

  const handleDelete = () => {
    mutateDeleteAccount();
  };

  return (
    <>
      <Flex align="center" justify="space-between">
        <Typography.Text>Delete Account Permanently</Typography.Text>

        <Button type="primary" danger onClick={showDeleteModal}>
          Delete
        </Button>
      </Flex>

      {/* Confirmation Modal */}
      <Modal
        open={isModalVisible}
        destroyOnClose
        title="Confirm Account Deletion"
        onOk={handleDelete}
        onCancel={() => setIsModalVisible(false)}
        okText={isPending ? 'Please wait' : 'Yes, Delete'}
        okButtonProps={{ danger: true, loading: isPending }}
        cancelText="Cancel"
      >
        <Typography.Paragraph>Are you sure you want to permanently delete your account?</Typography.Paragraph>
        <Typography.Paragraph>
          This action cannot be undone. All your folders, notes, and preferences will be permanently deleted.
        </Typography.Paragraph>
      </Modal>
    </>
  );
};

export default DataControlSection;
