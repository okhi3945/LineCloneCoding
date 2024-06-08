import { StyleSheet, View, ScrollView, Keyboard, KeyboardAvoidingView, Platform } from 'react-native';
import { useRef, useEffect } from 'react'
import ChatBubble from './ChatBubble';
import MessageInput from './MessageInput';

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

        const fetchMessages = async () => {
            try {
                const response = await axios.get(`https://your-api-url/messages?userId=${currentUserId}&targetId=${targetUserId}`);
                setMessages(response.data);
                scrollToBottom();
            } catch (error) {
                console.error('Failed to fetch messages:', error);
            }
        };

        fetchMessages();

        //소켓 연결
        connectToServer(currentUserId, targetUserId);

        //메시지 수신하기
        socket.on(currentUserId, (data) => {
            console.log(data)
            addMessage(data);
        })

        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            scrollToBottom
        );

        return () => {
            keyboardDidShowListener.remove();
            socket.on('disconnect', () => {
                console.log('Disconnected from server');
            });
        };
    }, []);

    // 메시지 목록을 ChatBubble 컴포넌트로 렌더링
    const renderMessages = messages.map((msg, index) => (
        <ChatBubble key={index} message={msg.text} isMyMessage={msg.user._id === currentUserId} />
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