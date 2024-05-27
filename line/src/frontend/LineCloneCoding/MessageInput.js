import { View, TextInput, StyleSheet, Text, InputAccessoryView, TouchableOpacity, } from 'react-native'
import { useState, useEffect } from 'react'
import { GiftedChat } from 'react-native-gifted-chat';
import { connectToServer, sendMessageToUser, socket } from './SocketIOClient.js';

const MessageInput = () => {
    const [message, setMessage] = useState('');
    const onChangeInput = (event) => {
        setMessage(event);
    };
    const [messages, setMessages] = useState([]);
    useEffect(() => {
        socket.on('message', (data) => {
            console.log('Received message:', data); // 수신된 메시지 로그 출력
            setMessages((prevMessages) => GiftedChat.append(prevMessages, data));
        });

        return () => {
            socket.off('message');
        };
    }, []);
    const onSend = (newMessages = []) => {
        console.log('Sending message:', newMessages[0]); // 전송되는 메시지 로그 출력
        setMessages(GiftedChat.append(messages, newMessages));

        // 서버에 메시지 전송
        sendMessageToUser({
            senderName: 'user332211',
            targetUserName: 'user112233',
            message: newMessages[0].text,
        });
    };
    return (
        <View style={{ position: 'absolute', bottom: 0, width: '103%' }}>
            <InputAccessoryView>
                <View style={styles.InputBar}>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                        <GiftedChat
                            messages={messages}
                            onSend={onSend}
                            user={{
                                _id: 1,
                            }}
                        />

                        <TouchableOpacity style={styles.sendButton}>
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
