import { useMutation } from '@tanstack/react-query';
import { Button, Card, Form, Input, message, Typography } from 'antd';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../redux/hooks';
import { setCurrentUser, setIsAuthenticated } from '../../redux/user-slice/userSlice';
import { initAxiosInstance } from '../../utils/axiosInstance';

interface LoginFormValues {
  email: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { mutate: mutateLogin, isPending } = useMutation({
    mutationKey: ['signin'],
    mutationFn: (payload: LoginFormValues) => {
      const response = initAxiosInstance().post('/auth/signin', JSON.stringify(payload));
      return response;
    },
    onSuccess: (response) => {
      const data = response.data.data;

      message.success(response.data.message);

      localStorage.setItem('token', data.token);
      dispatch(setCurrentUser(data?.user));
      dispatch(setIsAuthenticated(true));

      navigate('/dashboard');
    },
    onError: (error) => {
      const errorMessage = error?.response?.data?.message;
      message.error(errorMessage || error.message);

      localStorage.removeItem('token');
      dispatch(setCurrentUser(null));
      dispatch(setIsAuthenticated(false));
    }
  });

  const onFinish = (values: LoginFormValues) => {
    const userData = values;
    mutateLogin(userData);
  };

  return (
    <div
      style={{
        minWidth: 320,
        maxWidth: 540,
        margin: '50px auto',
        textAlign: 'center'
      }}
    >
      <Link to="/">
        <Typography.Title level={2}>Notekeeper</Typography.Title>
      </Link>

      <Card title="Login">
        <Form<LoginFormValues> name="login-form" onFinish={onFinish} layout="vertical">
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                type: 'email',
                message: 'Please enter a valid email!'
              }
            ]}
          >
            <Input placeholder="Enter your email" />
          </Form.Item>

          <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please enter your password!' }]}>
            <Input.Password placeholder="Enter your password" />
          </Form.Item>

          <Form.Item>
            <Button block type="primary" htmlType="submit" loading={isPending}>
              {isPending ? 'Please wait' : 'Login'}
            </Button>
          </Form.Item>
        </Form>

        <Typography.Paragraph>
          New user? <Link to="/signup">Signup</Link>
        </Typography.Paragraph>
      </Card>
    </div>
  );
};

export default LoginPage;
