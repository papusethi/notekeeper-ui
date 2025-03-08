import { Flex, Switch, Typography } from 'antd';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { changeThemeMode } from '../../redux/user-slice/userSlice';

const PersonalizeSection: React.FC = () => {
  const dispatch = useAppDispatch();

  const { enableDarkMode } = useAppSelector((state) => state.user.userPreferences);

  const toggleTheme = () => {
    dispatch(changeThemeMode());
  };

  return (
    <Flex align="center" justify="space-between">
      <Typography.Text>Enable Dark Mode</Typography.Text>
      <Switch checked={enableDarkMode} onChange={toggleTheme} />
    </Flex>
  );
};

export default PersonalizeSection;
