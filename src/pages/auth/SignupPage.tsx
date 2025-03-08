import { useMutation } from '@tanstack/react-query';
import { Button, Card, Form, Input, message, Typography } from 'antd';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../redux/hooks';
import { setCurrentUser, setIsAuthenticated } from '../../redux/user-slice/userSlice';
import { initAxiosInstance } from '../../utils/axiosInstance';
import { formatErrorMessage } from '../../utils/utils';

interface SignUpFormValues {
  username: string;
  email: string;
  password: string;
}

const SignUpPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { mutate: mutateSignup, isPending } = useMutation({
    mutationKey: ['signup'],
    mutationFn: (payload: SignUpFormValues) => {
      const response = initAxiosInstance().post('/auth/signup', JSON.stringify(payload));
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
      const errorMessage = formatErrorMessage(error);
      message.error(errorMessage);

      localStorage.removeItem('token');
      dispatch(setCurrentUser(null));
      dispatch(setIsAuthenticated(false));
    }
  });

  const onFinish = (values: SignUpFormValues) => {
    const userData = values;
    mutateSignup(userData);
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

      <Card title="Sign Up">
        <Form<SignUpFormValues> name="signup-form" onFinish={onFinish} layout="vertical">
          <Form.Item label="Username" name="username" rules={[{ required: true, message: 'Please enter your username!' }]}>
            <Input placeholder="Enter your username" />
          </Form.Item>

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
              {isPending ? 'Please wait' : 'Sign up'}
            </Button>
          </Form.Item>
        </Form>

        <Typography.Paragraph>
          Already have an account? <Link to="/login">Login</Link>
        </Typography.Paragraph>
      </Card>
    </div>
  );
};

export default SignUpPage;
