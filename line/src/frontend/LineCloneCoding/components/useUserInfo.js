// useUserInfo.js
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage'

const useUserInfo = () => {
  const [currentUserId, setCurrentUserId] = useState(null);
  const [currentUserName, setCurrentUserName] = useState('');

  useEffect(() => {
    const fetchUserInfo = async () => {
      const userInfoString = await AsyncStorage.getItem('userInfo');
      const userInfo = JSON.parse(userInfoString);
      if (userInfo) {
        setCurrentUserId(userInfo.id);
        setCurrentUserName(userInfo.name);
      }
    };

    fetchUserInfo();
  }, []);

  return { currentUserId, currentUserName };
};

export default useUserInfo;
