import { StyleSheet, View, ScrollView, Keyboard, KeyboardAvoidingView, Platform } from 'react-native';
import { useRef, useEffect } from 'react'
import ChatBubble from './ChatBubble';
import MessageInput from './MessageInput';


const ChattingRoom = () => {
    const scrollViewRef = useRef(null);

    const scrollToBottom = () => {
        if (scrollViewRef.current) {
            scrollViewRef.current.scrollToEnd({ animated: true });
        }
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
    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 79}
        >
            <View style={styles.scrollViewContainer}>
                <ScrollView ref={scrollViewRef} style={styles.scrollView}>
                    <ChatBubble
                        message="안녕하세요!"
                        isMyMessage={true}
                        isRead={true}
                        timestamp={new Date()}
                    />
                    <ChatBubble message="안녕하세요! 반가워요." isMyMessage={false} senderName="영학"
                        senderProfilePicture={require('./assets/lasco_13974601.png')}
                    />
                    
                </ScrollView>
                <MessageInput />
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