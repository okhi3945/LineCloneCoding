//로그인 후 화면
import { View, Text } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {useEffect} from 'react'

const Main = () => {
    useEffect(() => {
        const fetchUserInfo = async () => {
            const userInfoString = await AsyncStorage.getItem('userInfo');
            const userInfo = JSON.parse(userInfoString);
            console.log('Fetched user info:', userInfo);
        };
        fetchUserInfo();
    }, []);
    return (
        <View></View>
    )
}
export default Main