import { StyleSheet, View, ScrollView, Keyboard, KeyboardAvoidingView, Platform } from 'react-native';
import { useRef, useEffect, useState, useCallback } from 'react'
import ChatBubble from './ChatBubble';
import MessageInput from './MessageInput';
import { connectToServer, socket } from './SocketIOClient';
import axios from 'axios'
import { useFocusEffect } from '@react-navigation/native';


const ChattingRoom = (props) => {
    const { route } = props;
    const { currentUserId, targetUserId } = route.params;
    const scrollViewRef = useRef(null);
    const [messages, setMessages] = useState([]);

    const scrollToBottom = () => {
        if (scrollViewRef.current) {
            scrollViewRef.current.scrollToEnd({ animated: true });
        }
    };

    // 메시지 추가 함수
    const addMessage = (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
    };

    useEffect(() => {

        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            scrollToBottom
        );

        return () => {
            keyboardDidShowListener.remove();
        };
    }, []);

    const fetchMessages = async () => {
        try {
            const response = await axios.get(`http://192.168.35.23:8008/boot/messages/fetchMessage?senderName=${currentUserId}&targetUserName=${targetUserId}`);
            console.log(response.data.list)
            setMessages(response.data.list);
            scrollToBottom();
        } catch (error) {
            console.error('Failed to fetch messages:', error);
        }
    };

    useEffect(() => {
        fetchMessages();
        connectToServer();

        // 기존에 등록된 이벤트 리스너를 제거하고 새로 등록
        socket.off(currentUserId).on(currentUserId, async (data) => {
            console.log(data);
            addMessage(data);
            try {
                await axios.post('http://192.168.35.23:8008/boot/messages/saveMessage', {
                    senderName: data.senderName,
                    targetUserName: currentUserId,
                    message: data.message,
                });
            } catch (error) {
                console.error('메시지 저장 실패:', error);
            }
        });

        return () => {
            // 화면에서 벗어날 때 실행될 로직
            socket.off(currentUserId); // 현재 사용자를 대상으로 하는 이벤트 리스너를 제거
            socket.disconnect();
        };
    }, []);

    // 메시지 목록을 ChatBubble 컴포넌트로 렌더링
    const renderMessages = messages.map((msg, index) => (
        <ChatBubble key={index} message={msg.message} isMyMessage={msg.senderName === currentUserId} senderProfilePicture={require('../assets/lasco_13974601.png')} senderName="임임임" />
    ));

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 79}
        >
            <View style={styles.scrollViewContainer}>
                <ScrollView ref={scrollViewRef} style={styles.scrollView}>
                    {/* <ChatBubble
                        message="안녕하세요!"
                        isMyMessage={true}
                        isRead={true}
                        timestamp={new Date()}
                    />
                    <ChatBubble message="안녕하세요! 반가워요." isMyMessage={false} senderName="영학"
                        senderProfilePicture={require('../assets/lasco_13974601.png')}
                    /> */}
                    {renderMessages}
                </ScrollView>
                <MessageInput addMessage={addMessage} currentUserId={currentUserId} targetUserId={targetUserId} />
            </View >
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#8FAFD9',
        alignItems: 'center',
        padding: 5,
    },
    scrollViewContainer: {
        flex: 1,
        width: '102.1%',
    }, scrollView: {
        width: '100%',
        marginBottom: 85,
    },
});

export default ChattingRoom;