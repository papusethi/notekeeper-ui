import { useMutation } from '@tanstack/react-query';
import { Button, Form, Input, message } from 'antd';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { setCurrentUser } from '../../redux/user-slice/userSlice';
import { initAxiosInstance } from '../../utils/axiosInstance';

const ProfileSection: React.FC = () => {
  const dispatch = useAppDispatch();
  const { currentUser } = useAppSelector((state) => state.user);

  const { mutate: mutateUpdateUser, isPending } = useMutation({
    mutationKey: ['update-user'],
    mutationFn: (payload) => {
      return initAxiosInstance().put(`/user/${currentUser?.id}`, payload);
    },
    onSuccess: (response) => {
      message.success(response?.data?.message);
      dispatch(setCurrentUser(response?.data?.data));
    },
    onError: (error) => {
      console.error('App error: ', error);
      message.error(error.message);
    }
  });

  const [form] = Form.useForm();

  const handleUpdate = (values) => {
    mutateUpdateUser(values);
  };

  return (
    <Form form={form} layout="vertical" onFinish={handleUpdate}>
      <Form.Item
        label="Username"
        name="username"
        initialValue={currentUser?.username}
        rules={[{ required: true, message: 'Please enter your username!' }]}
      >
        <Input placeholder="Enter your username" />
      </Form.Item>

      <Form.Item
        label="Email"
        name="email"
        initialValue={currentUser?.email}
        rules={[
          { required: true, message: 'Please enter your email!' },
          { type: 'email', message: 'Please enter a valid email!' }
        ]}
      >
        <Input placeholder="Enter your email" readOnly />
      </Form.Item>

      <Form.Item label="Password" name="password" initialValue={''}>
        <Input.Password placeholder="Enter your password" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={isPending}>
          {isPending ? 'Please wait' : 'Update'}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ProfileSection;
