//로그인 후 화면
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import { useState, useEffect, useContext } from 'react'
import ProfileImage from './ProfileImage'
import useUserInfo from './useUserInfo';
import { fetchFriendsList } from './api';
import { FriendsContext } from './context';
import { useIsFocused } from '@react-navigation/native';

const Main = ({ route, navigation }) => {
    const isFocused = useIsFocused();
    const { user_id } = route.params;
    const { currentUserId, currentUserName } = useUserInfo();
    const { friendsList, setFriendsList } = useContext(FriendsContext);

    useEffect(() => {
        if (isFocused) {
            const init = async () => {
                const list = await fetchFriendsList(user_id);
                setFriendsList(list);
            };

            init();
        }
    }, [isFocused]);

    const renderFriendItem = ({ item }) => (

        <View style={styles.friendItem}>
            <TouchableOpacity onPress={() => navigation.navigate('ChattingRoom', { currentUserId: user_id, targetUserId: item.id, partner: item.name })}>
                <ProfileImage source={require("../assets/user.png")} />
                <View style={{ marginLeft: '20%', marginTop: -15 }}>
                    <Text style={styles.friendName}>{item.name}</Text>
                    <Text>{item.statusMessage}</Text>
                </View>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={{backgroundColor:'#FFFFFF'}}>
            <View style={styles.infoContainer}>
                <View style={styles.leftContainer}>
                    <Text style={styles.idText}>{currentUserName}</Text>
                    <Text>상태 메시지 입력</Text>
                </View>
                <View style={styles.rightContainer}>
                    <ProfileImage source={require("../assets/lasco_13974601.png")} />
                </View>
            </View>
            <View style={styles.lengthContainer}><Text style={{fontWeight:'bold', fontSize:14}}>친구 목록 {friendsList.length}명</Text></View>
            <FlatList
                data={friendsList}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderFriendItem}
                style={styles.friendList}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    infoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 90,
        backgroundColor: '#FFFFFF'
    }, lengthContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        margin:10
    }, tinyImage: {
        height: 25,
        width: 25,
        resizeMode: 'contain'
    }, topView: {
        flexDirection: 'row',
        backgroundColor: 'red',
        justifyContent: 'flex-end'
    }, leftContainer: {
        marginLeft: 20,
    },
    rightContainer: {
        marginRight: 30,
        marginBottom: 20
    }, idText: {
        fontSize: 24,
        fontWeight: 'bold'
    }, friendList: {
        height: "100%",
        backgroundColor: '#FFFFFF'
    }, friendItem: {
        margin: 15,
        justifyContent: 'center',
    }, friendName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
})
export default Main