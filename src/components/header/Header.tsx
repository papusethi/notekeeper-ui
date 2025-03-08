import { Menu } from 'antd';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <Menu mode="horizontal">
      <Menu.Item key="home">
        <Link to="/">Home</Link>
      </Menu.Item>
      <Menu.Item key="login">
        <Link to="/login">Login</Link>
      </Menu.Item>
      <Menu.Item key="signup">
        <Link to="/signup">Sign Up</Link>
      </Menu.Item>
    </Menu>
  );
};

export default Header;
