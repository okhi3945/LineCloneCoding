import { View, TextInput, StyleSheet, Text, InputAccessoryView, TouchableOpacity, } from 'react-native'
import { useState, useEffect } from 'react'
import { connectToServer, sendMessageToUser, socket } from './SocketIOClient.js';

const MessageInput = () => {
    const [message, setMessage] = useState('');
    const onChangeInput = (event) => {
        setMessage(event);
    };
    const [messages, setMessages] = useState([]);
    
    //메시지 수신
    useEffect(() => {
        socket.on(currentUserId, (data) => {
            console.log('Received message:', data); // 수신된 메시지 로그 출력
            setMessages((prevMessages) => [...prevMessages, data]);
        });

        return () => {
            socket.off('message');
        };
    }, []);
    const onSend = () => {
        console.log('Sending message:', message); // 전송되는 메시지 로그 출력
        setMessages((prevMessages) => [...prevMessages, { text: message, user: { _id: 1 } }]);

        // 서버에 메시지 전송
        sendMessageToUser({
            senderName: 'user332211',
            targetUserName: 'user112233',
            message: message,
        });

        setMessage(''); // 입력창 초기화
    };
    return (
        <View style={{ position: 'absolute', bottom: 0, width: '103%' }}>
            <InputAccessoryView>
                <View style={styles.InputBar}>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                        <TextInput
                            style={{ width: '45%', backgroundColor: '#F4F4F4', borderRadius: 10, marginRight: 10 }}
                            value={message}
                            onChangeText={onChangeInput}
                            placeholder=' Aa'
                        />

                        <TouchableOpacity style={styles.sendButton} onPress={onSend}>
                            <Text>전송</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </InputAccessoryView>
            <View style={{ backgroundColor: '#FFFFFF', height: 50 }} />
        </View>
    )
}

const styles = StyleSheet.create({
    InputBar: {
        backgroundColor: '#FFFFF8',
        width: '103%',
        height: 50,
        justifyContent: 'center',
    }, sendButton: {
        backgroundColor: 'red',
        width: 50,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    }
});

export default MessageInput
