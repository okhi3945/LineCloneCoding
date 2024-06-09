// InputModal.js
import { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, Alert } from 'react-native';
import Modal from 'react-native-modal';
import axios from 'axios';
import ProfileImage from './ProfileImage'
import { fetchFriendsList } from './api';
import { FriendsContext } from './context'

const InputModal = ({ isVisible, onBackdropPress, onSend, userId, }) => {
    const { setFriendsList } = useContext(FriendsContext);
    const [text, setText] = useState('');
    const [viewMode, setViewMode] = useState('received');
    const [friendRequests, setFriendRequests] = useState([]);

    const fetchData = async () => {
        try {
            const endpoint = viewMode === 'received' ? '/receivedFriendRequests' : '/sentFriendRequests';
            const response = await axios.post(`http://192.168.35.23:8008/boot/friends${endpoint}`, {
                user_id: userId
            }
            );
            console.log(response.data.list)
            setFriendRequests(response.data.list);
        } catch (error) {
            console.error("친구 요청 데이터를 가져오는데 실패했습니다.", error);
        }
    };
    
    useEffect(() => {
        fetchData();
    }, [viewMode, userId]);


    const handleSend = () => {
        onSend(text);
        setText('');
    };

    const accept = async (friend_id) => {
        try {
            const response = await axios.post('http://192.168.35.23:8008/boot/friends/accept', {
                user_id: userId,
                friend_id: friend_id,
            });
            console.log(response)
            Alert.alert("친구 요청 수락")
            fetchData();
            const updatedList = await fetchFriendsList(userId);
            setFriendsList(updatedList);
        } catch (error) {
            console.error('accept failed:', error);
        }
    }

    const cancelRequest = async (friend_id) => {
        try {
            const response = await axios.post('http://192.168.35.23:8008/boot/friends/cancelRequest', {
                user_id: userId,
                friend_id: friend_id,
            });
            console.log(response)
            Alert.alert("친구 요청 취소")
            fetchData();
        } catch (error) {
            console.error('cancelRequest failed:', error);
        }
    }

    const renderFriendItem = ({ item }) => (

        <View style={styles.friendItem}>
            <View>
                <ProfileImage source={require("../assets/user.png")} />
            </View>
            <View style={{ marginLeft: '20%', marginTop: -10 }}>
                <Text style={styles.friendName}>{item.name}</Text>
            </View>
            <View style={styles.buttonAccept}>
                {viewMode === 'sent' ? (
                    <TouchableOpacity
                        style={styles.actionButton}
                        onPress={() => { cancelRequest(item.id) }}>
                        <Text style={styles.actionButtonText}>취소</Text>
                    </TouchableOpacity>
                ) : viewMode === 'received' ? (
                    <TouchableOpacity
                        style={styles.actionButton}
                        onPress={() => { accept(item.id) }}>
                        <Text style={styles.actionButtonText}>수락</Text>
                    </TouchableOpacity>
                ) : null}
            </View>
        </View>
    );

    return (
        <Modal isVisible={isVisible} onBackdropPress={onBackdropPress} style={styles.modal}>
            <View style={styles.modalContent}>
                <TouchableOpacity style={styles.closeButton} onPress={onBackdropPress}>
                    <Text style={styles.closeButtonText}>X</Text>
                </TouchableOpacity>
                <Text style={{ fontWeight: 'bold', fontSize: 16 }}>친구 검색</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setText}
                    value={text}
                    placeholder="친구의 아이디를 입력하세요"
                />
                <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
                    <Text style={{ color: 'white', fontWeight: 'bold' }}>보내기</Text>
                </TouchableOpacity>
                <View style={styles.viewModeButtons}>
                    <TouchableOpacity
                        style={viewMode === 'received' ? styles.viewModeButtonSelected : styles.viewModeButton}
                        onPress={() => setViewMode('received')}
                    >
                        <Text style={viewMode === 'received' ? styles.viewModeButtonTextSelected : styles.viewModeButtonText}>받은 요청</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={viewMode === 'sent' ? styles.viewModeButtonSelected : styles.viewModeButton}
                        onPress={() => setViewMode('sent')}
                    >
                        <Text style={viewMode === 'sent' ? styles.viewModeButtonTextSelected : styles.viewModeButtonText}>보낸 요청</Text>
                    </TouchableOpacity>
                </View>

                <FlatList
                    data={friendRequests}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={renderFriendItem}
                    style={styles.friendList}
                />
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modal: {
        justifyContent: 'flex-end',
        margin: 0,
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 22,
        alignItems: 'center',
        borderRadius: 10,
        borderColor: 'rgba(0, 0, 0, 0.1)',
        height: '85%'
    }, closeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        padding: 10,
    },
    closeButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    input: {
        width: '100%',
        height: 40,
        margin: 12,
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#F5F5F5'
    },
    sendButton: {
        backgroundColor: '#00B900',
        padding: 10,
        borderRadius: 5,
    }, friendItem: {
        margin: 15,
        justifyContent: 'center',
        flex: 1
    }, friendName: {
        fontSize: 16,
        fontWeight: 'bold',
    }, friendList: {
        width: '100%',
    }, actionButton: {
        backgroundColor: '#00B900', // 예시 색상
        padding: 10,
        borderRadius: 5,
        width: '20%',
        alignItems: 'center',
    },
    actionButtonText: {
        color: 'white',
        fontWeight: 'bold'
    }, buttonAccept: {
        alignItems: 'flex-end',
        marginTop: -27
    }, viewModeButtons: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 10,
    },
    viewModeButton: {
        marginHorizontal: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        backgroundColor: 'lightgray',
    },
    viewModeButtonSelected: {
        marginHorizontal: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        backgroundColor: 'blue',
    },
    viewModeButtonText: {
        color: 'black',
    },
    viewModeButtonTextSelected: {
        color: 'white',
    },
});

export default InputModal;
