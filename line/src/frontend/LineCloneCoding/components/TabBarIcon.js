import { Image } from 'react-native';

const TabBarIcon = (focused, name) => {
  let iconImagePath;
  if (name === 'Main') {
    iconImagePath = require('../assets/home.png');
  } else if(name === 'ChattingList'){
    iconImagePath = require('../assets/messenger.png')
  } 

  return (
    <Image
      style={{ width: focused ? 24 : 20, height: focused ? 24 : 20 }}
      source={iconImagePath}
    />
  );
};

export default TabBarIcon