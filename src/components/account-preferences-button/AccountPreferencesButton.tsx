import { DatabaseOutlined, LogoutOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { useMutation } from '@tanstack/react-query';
import { Button, Flex, Menu, message, Modal, Tooltip } from 'antd';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../redux/hooks';
import { setCurrentUser, setIsAuthenticated } from '../../redux/user-slice/userSlice';
import { initAxiosInstance } from '../../utils/axiosInstance';
import { MenuItem } from '../side-navigation/SideNavigation';
import DataControlSection from './DataControlSection';
import PersonalizeSection from './PersonalizeSection';
import ProfileSection from './ProfileSection';

const AccountPreferencesButton: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [selectedMenuKey, setSelectedMenuKey] = useState('profile');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { mutate: mutateLogout } = useMutation({
    mutationKey: ['logout'],
    mutationFn: () => {
      return initAxiosInstance().get('/auth/signout');
    },
    onSuccess: (response) => {
      message.success(response.data.message);

      localStorage.removeItem('token');

      dispatch(setCurrentUser(null));
      dispatch(setIsAuthenticated(false));

      navigate('/login');
    },
    onError: (error) => {
      const errorMessage = error?.response?.data?.message;
      message.error(errorMessage || error.message);
    }
  });

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleMenuClick = (e: { key: string }) => {
    switch (e.key) {
      case 'profile':
      case 'personalize':
      case 'data-control':
        setSelectedMenuKey(e.key);
        break;
      case 'logout':
        mutateLogout();
        break;
      default:
        console.log('Unknown action');
    }
  };

  const items: MenuItem[] = [
    { key: 'profile', label: 'Profile', icon: <UserOutlined /> },
    { key: 'personalize', label: 'Personalize', icon: <SettingOutlined /> },
    {
      key: 'data-control',
      label: 'Data Control',
      icon: <DatabaseOutlined />
    },
    { key: 'logout', label: 'Logout', icon: <LogoutOutlined />, danger: true }
  ];

  return (
    <>
      <Tooltip title="Account & Preferences">
        <Button shape="circle" icon={<UserOutlined />} onClick={showModal} />
      </Tooltip>

      <Modal
        open={isModalOpen}
        destroyOnClose
        title="Account & Preferences"
        onCancel={handleCancel}
        footer={<></>}
        width={{
          xs: '90%',
          sm: '80%',
          md: '70%',
          lg: '60%',
          xl: '50%',
          xxl: '40%'
        }}
      >
        <Flex gap={16}>
          <Menu
            mode="inline"
            items={items}
            style={{
              width: 180,
              border: 'none',
              background: 'transparent'
            }}
            selectedKeys={[selectedMenuKey]}
            onClick={handleMenuClick}
          />

          <div style={{ flex: 1 }}>
            {selectedMenuKey === 'profile' && <ProfileSection />}
            {selectedMenuKey === 'personalize' && <PersonalizeSection />}
            {selectedMenuKey === 'data-control' && <DataControlSection />}
          </div>
        </Flex>
      </Modal>
    </>
  );
};

export default AccountPreferencesButton;
