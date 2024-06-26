import { View, Image, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native';
import React, { useState } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Main from './Main';
import ChattingList from './ChattingList';
import TabBarIcon from './TabBarIcon'
import InputModal from './InputModal';
import useUserInfo from './useUserInfo';
import axios from 'axios';
import LogoutModal from './LogoutModal';

const Tab = createBottomTabNavigator();

function MainTabNavigator({navigation}) {
  const { currentUserId, currentUserName } = useUserInfo();
  const [isModalVisible, setModalVisible] = useState(false);
  const [logoutModalVisible,setLogoutModalVisible] = useState(false)
  
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  
  const toggleLogoutModal = () => {
    setLogoutModalVisible(!logoutModalVisible);
  };

  const handleSend = async (friend_id) => {
    console.log(friend_id);
    try {
      const response = await axios.post('http://192.168.35.23:8008/boot/friends/addFriend', {
        user_id: currentUserId, //dto에 있는 값과 똑같이 보내줘야함
        friend_id,
      });
      console.log(response)
      if (response.status === 200 && response.data.result === 1) {
        Alert.alert('친구 요청 완료');
      } else {
        Alert.alert('친구 요청 실패');
      }
    } catch (error) {
      console.error('add friend failed:', error);
      Alert.alert('친구 요청 실패');
    }
  };


  return (
    <>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarLabel: route.name,
          tabBarIcon: ({ focused }) => (
            TabBarIcon(focused, route.name)
          ),
          gestureEnabled: false,
        })}>
        <Tab.Screen
          name="Main"
          component={Main}
          initialParams={{ user_id: null }}
          options={{
            headerTitle: '', // 헤더 타이틀을 빈 문자열로 설정
            headerRight: () => (
              <View style={styles.headerRightContainer}>
                <TouchableOpacity onPress={toggleModal}>
                  <Image style={styles.tinyImage} source={require('../assets/add-user.png')} />
                </TouchableOpacity>
                <TouchableOpacity onPress={toggleLogoutModal}>
                  <Image style={styles.tinyImage} source={require('../assets/setting.png')} />
                </TouchableOpacity>
              </View>
            ),
          }}
        />
        <Tab.Screen name="ChattingList">
          {props => <ChattingList {...props} currentUserId={currentUserId} />}
        </Tab.Screen>
      </Tab.Navigator>
      {currentUserId && <InputModal isVisible={isModalVisible} onBackdropPress={toggleModal} onSend={handleSend} userId={currentUserId} />}
      <LogoutModal isVisible={logoutModalVisible} onBackdropPress={toggleLogoutModal} navigation={navigation} />
    </>
  );
}

const styles = StyleSheet.create({
  tinyImage: {
    height: 23,
    width: 23,
    resizeMode: 'contain',
    marginHorizontal: 10,
  },
  headerRightContainer: {
    flexDirection: 'row',
    marginRight: 10,
  }, modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 22,
    alignItems: 'center',
    marginTop: '20%',
    borderRadius: 10,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    height: '85%'
  },
});

export default MainTabNavigator;
