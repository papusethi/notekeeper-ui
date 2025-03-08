import { DownOutlined } from '@ant-design/icons';
import { Flex, Typography } from 'antd';
import React from 'react';
import './ScrollDown.css';

const { Text } = Typography;

const ScrollDown: React.FC = () => {
  return (
    <div style={{ marginTop: 100 }}>
      <Flex vertical justify="center" align="center" className="bounce">
        <Text>Scroll Down</Text>
        <DownOutlined style={{ color: '#1890ff' }} />
      </Flex>
    </div>
  );
};

export default ScrollDown;
