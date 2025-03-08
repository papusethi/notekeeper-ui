import {
  CloudSyncOutlined,
  FileTextOutlined,
  GithubOutlined,
  InstagramOutlined,
  LinkedinOutlined,
  LockOutlined,
  MoonOutlined,
  SunOutlined
} from '@ant-design/icons';
import { Button, Card, Col, Divider, Layout, Row, Space, Switch, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { changeThemeMode } from '../../redux/user-slice/userSlice';
import ScrollDown from './ScrollDown';

const { Content, Footer } = Layout;
const { Title, Text } = Typography;

const LandingPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const darkMode = useAppSelector((state) => state.user.userPreferences.enableDarkMode);

  const toggleTheme = () => {
    dispatch(changeThemeMode());
  };

  const handleClickGetStarted = () => {
    navigate('/dashboard');
  };

  const handleClickSignUp = () => {
    navigate('/signup');
  };

  return (
    <Layout
      style={{
        minHeight: '100vh',
        background: darkMode ? '#141414' : '#f4f4f4'
      }}
    >
      <Content style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        {/* Hero Section */}
        <section
          style={{
            textAlign: 'center',
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 32
          }}
        >
          <Title level={1} style={{ color: darkMode ? '#ffffff' : '#141414' }}>
            Notekeeper
          </Title>
          <Text
            style={{
              fontSize: '20px',
              color: darkMode ? '#d9d9d9' : '#595959'
            }}
          >
            Organize your thoughts, ideas, and notes in one secure place.
          </Text>

          <div style={{ marginTop: 20 }}>
            <Switch checked={darkMode} onChange={toggleTheme} checkedChildren={<MoonOutlined />} unCheckedChildren={<SunOutlined />} />
          </div>

          <div style={{ marginTop: 30 }}>
            <Button type="primary" style={{ marginRight: 10 }} onClick={handleClickGetStarted}>
              Get Started
            </Button>
            <Button variant="outlined">Get Demo</Button>
          </div>

          <ScrollDown />
        </section>

        <Divider />

        <section style={{ maxWidth: '1200px', padding: '60px 0' }}>
          <div>
            <Title
              level={2}
              style={{
                textAlign: 'center',
                color: darkMode ? '#ffffff' : '#141414',
                marginBottom: 32
              }}
            >
              Why Choose Notekeeper?
            </Title>

            <Row gutter={[24, 24]} justify="center">
              {/* Column 1 */}
              <Col xs={24} sm={12} md={8}>
                <Card
                  hoverable
                  bordered={false}
                  style={{
                    background: darkMode ? '#2a2a2a' : '#ffffff',
                    borderRadius: 8,
                    textAlign: 'center'
                  }}
                >
                  <CloudSyncOutlined
                    style={{
                      fontSize: 32,
                      marginBottom: 10,
                      color: darkMode ? '#40a9ff' : '#1890ff'
                    }}
                  />
                  <Title level={4}>Cloud Sync</Title>
                  <Text>
                    Seamlessly sync your notes across all devices. Access your ideas and to-do lists anytime, anywhere, with automatic
                    synchronization.
                  </Text>
                </Card>
              </Col>

              {/* Column 2 */}
              <Col xs={24} sm={12} md={8}>
                <Card
                  hoverable
                  bordered={false}
                  style={{
                    background: darkMode ? '#2a2a2a' : '#ffffff',
                    borderRadius: 8,
                    textAlign: 'center'
                  }}
                >
                  <LockOutlined
                    style={{
                      fontSize: 32,
                      marginBottom: 10,
                      color: darkMode ? '#ff7875' : '#f5222d'
                    }}
                  />
                  <Title level={4}>Privacy First</Title>
                  <Text>
                    We prioritize your privacy. Your notes are fully encrypted and secured, so you can rest assured your data stays private
                    and safe.
                  </Text>
                </Card>
              </Col>

              {/* Column 3 */}
              <Col xs={24} sm={12} md={8}>
                <Card
                  hoverable
                  bordered={false}
                  style={{
                    background: darkMode ? '#2a2a2a' : '#ffffff',
                    borderRadius: 8,
                    textAlign: 'center'
                  }}
                >
                  <FileTextOutlined
                    style={{
                      fontSize: 32,
                      marginBottom: 10,
                      color: darkMode ? '#ffc53d' : '#faad14'
                    }}
                  />
                  <Title level={4}>Minimalist UI</Title>
                  <Text>
                    A simple, distraction-free design to help you focus on what matters most. Write, organize, and manage your ideas without
                    unnecessary clutter.
                  </Text>
                </Card>
              </Col>
            </Row>
          </div>
        </section>

        <Divider />

        {/* Call to Action Section */}
        <section
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '60px 0'
          }}
        >
          <div
            style={{
              width: '100%',
              textAlign: 'center',
              padding: '40px',
              background: darkMode ? '#1f1f1f' : '#ffffff',
              borderRadius: 8
            }}
          >
            <Title level={3} style={{ color: darkMode ? '#ffffff' : '#141414' }}>
              Start Organizing Your Ideas Today
            </Title>
            <Text style={{ color: darkMode ? '#d9d9d9' : '#595959' }}>Sign up now and simplify your workflow.</Text>
            <div style={{ marginTop: 20 }}>
              <Button type="primary" onClick={handleClickSignUp}>
                Sign Up Free
              </Button>
            </div>
          </div>
        </section>
      </Content>

      <Footer
        style={{
          textAlign: 'center',
          background: darkMode ? '#1f1f1f' : '#ffffff',
          padding: '60px 20px'
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <Title
            level={3}
            style={{
              color: darkMode ? '#ffffff' : '#141414',
              marginBottom: 10
            }}
          >
            Notekeeper
          </Title>

          <Text style={{ color: darkMode ? '#bfbfbf' : '#595959' }}>The ultimate place to store and organize your thoughts securely.</Text>

          <Row gutter={[24, 24]} justify="center" style={{ marginTop: 32 }}>
            {/* Column 1: Company */}
            <Col xs={24} sm={8}>
              <Title level={5} style={{ color: darkMode ? '#ffffff' : '#141414' }}>
                Company
              </Title>
              <Space direction="vertical">
                <a href="#" style={{ color: darkMode ? '#bfbfbf' : '#595959' }}>
                  About Us
                </a>
                <a href="#" style={{ color: darkMode ? '#bfbfbf' : '#595959' }}>
                  Careers
                </a>
                <a href="#" style={{ color: darkMode ? '#bfbfbf' : '#595959' }}>
                  Blog
                </a>
              </Space>
            </Col>

            {/* Column 2: Support */}
            <Col xs={24} sm={8}>
              <Title level={5} style={{ color: darkMode ? '#ffffff' : '#141414' }}>
                Support
              </Title>
              <Space direction="vertical">
                <a href="#" style={{ color: darkMode ? '#bfbfbf' : '#595959' }}>
                  Help Center
                </a>
                <a href="#" style={{ color: darkMode ? '#bfbfbf' : '#595959' }}>
                  Privacy Policy
                </a>
                <a href="#" style={{ color: darkMode ? '#bfbfbf' : '#595959' }}>
                  Terms of Service
                </a>
              </Space>
            </Col>

            {/* Column 3: Follow Us */}
            <Col xs={24} sm={8}>
              <Title level={5} style={{ color: darkMode ? '#ffffff' : '#141414' }}>
                Follow Us
              </Title>
              <Space size="middle">
                <a href="#">
                  <LinkedinOutlined
                    style={{
                      fontSize: 20,
                      color: darkMode ? '#bfbfbf' : '#595959'
                    }}
                  />
                </a>
                <a href="#">
                  <GithubOutlined
                    style={{
                      fontSize: 20,
                      color: darkMode ? '#bfbfbf' : '#595959'
                    }}
                  />
                </a>
                <a href="#">
                  <InstagramOutlined
                    style={{
                      fontSize: 20,
                      color: darkMode ? '#bfbfbf' : '#595959'
                    }}
                  />
                </a>
              </Space>
            </Col>
          </Row>

          <Divider />

          <Text
            style={{
              color: darkMode ? '#8c8c8c' : '#8c8c8c',
              fontSize: '14px'
            }}
          >
            &copy; {new Date().getFullYear()} Notekeeper. All rights reserved.
          </Text>
        </div>
      </Footer>
    </Layout>
  );
};

export default LandingPage;
