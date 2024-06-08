import { View, BackHandler, FlatList, TouchableOpacity, StyleSheet, Text } from 'react-native'
import { useState, useEffect } from 'react'
import ProfileImage from './ProfileImage'
import axios from 'axios'

const ChattingList = ({ currentUserId, navigation }) => {

    const [chatList, setChatList] = useState([]);

    useEffect(() => {
        const fetchChatList = async () => {
            try {
                const response = await axios.get(`http://192.168.35.23:8008/boot/messages/fetchLatestMessagePerChatRoom?senderName=${currentUserId}`);
                console.log(response.data)
                setChatList(response.data.list);
            } catch (error) {
                console.error('Failed to fetch friends list:', error);
            }
        };

        fetchChatList();
        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            return true;
        });

        return () => backHandler.remove();
    }, []);

    const renderChatItem = ({ item }) => (

        <View style={styles.friendItem}>
            <TouchableOpacity onPress={() => navigation.navigate('ChattingRoom', { currentUserId: currentUserId, targetUserId: item.targetUserName, partner: item.targetUserNameName })}>
                <ProfileImage source={require("../assets/user.png")} />
                <View style={{ marginLeft: '20%', marginTop: -15 }}>
                    <Text style={styles.friendName}>{item.targetUserNameName}</Text>
                    <Text>{item.message}</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
    return (
        <View>

            <FlatList
                data={chatList}
                keyExtractor={(item) => item.message_id.toString()}
                renderItem={renderChatItem}
                style={styles.chatList}
            />
        </View>
    )
}
const styles = StyleSheet.create({
    chatList: {
        height: "100%",
        backgroundColor: '#FFFFFF'
    }, friendName: {
        fontSize: 16,
        fontWeight: 'bold',
    }, friendItem: {
        margin: 15,
        justifyContent: 'center',
    },
})
export default ChattingList;