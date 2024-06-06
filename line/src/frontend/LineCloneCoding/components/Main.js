//로그인 후 화면
import { View, Text, StyleSheet, BackHandler, FlatList } from 'react-native'
import { useState, useEffect } from 'react'
import ProfileImage from './ProfileImage'
import useUserInfo from './useUserInfo';
import axios from 'axios'

const Main = ({ route }) => {
    console.log(route.params)
    const { user_id } = route.params;
    const { currentUserId, currentUserName } = useUserInfo();
    const [friendsList, setFriendsList] = useState([]);

    useEffect(() => {
        const fetchFriendsList = async () => {
            try {
                const response = await axios.post('http://192.168.35.23:8008/boot/friends/friendsList', {
                    user_id: user_id
                });
                console.log(111)
                console.log(response.data)
                setFriendsList(response.data.list);
            } catch (error) {
                console.error('Failed to fetch friends list:', error);
            }
        };

        fetchFriendsList();
        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            return true;
        });

        return () => backHandler.remove();
    }, []);

    const renderFriendItem = ({ item }) => (

        <View style={styles.friendItem}>
            <View>
                <ProfileImage source={require("../assets/user.png")} />
            </View>
            <View style={{marginLeft:'20%',marginTop:-10}}>
                <Text style={styles.friendName}>{item.name}</Text>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.infoContainer}>
                <View style={styles.leftContainer}>
                    <Text style={styles.idText}>{currentUserName}</Text>
                    <Text>상태 메시지 입력</Text>
                </View>
                <View style={styles.rightContainer}>
                    <ProfileImage source={require("../assets/lasco_13974601.png")} />
                </View>
            </View>
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