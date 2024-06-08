// InputModal.js
import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList } from 'react-native';
import Modal from 'react-native-modal';
import axios from 'axios';
import ProfileImage from './ProfileImage'

const InputModal = ({ isVisible, onBackdropPress, onSend, userId }) => {
    const [text, setText] = useState('');
    const [viewMode, setViewMode] = useState('received');
    const [friendRequests, setFriendRequests] = useState([]);

    useEffect(() => {

        const fetchData = async () => {
            try {
                const endpoint = viewMode === 'received' ? '/receivedFriendRequests' : '/sentFriendRequests';
                const response = await axios.post(`http://192.168.123.104:8008/boot/friends${endpoint}`, {
                    user_id: userId
                }
                );
                console.log(response.data.list)
                setFriendRequests(response.data.list);
            } catch (error) {
                console.error("친구 요청 데이터를 가져오는데 실패했습니다.", error);
            }
        };

        fetchData();
    }, [viewMode, userId]);


    const handleSend = () => {
        onSend(text);
        setText('');
    };

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
                        onPress={() => {/* 요청 취소 로직 */ }}>
                        <Text style={styles.actionButtonText}>취소</Text>
                    </TouchableOpacity>
                ) : viewMode === 'received' ? (
                    <TouchableOpacity
                        style={styles.actionButton}
                        onPress={() => {/* 요청 수락 로직 */ }}>
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
                    <Text>보내기</Text>
                </TouchableOpacity>


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
        marginTop:-27
    }
});

export default InputModal;
