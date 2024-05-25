import { StyleSheet, Text, View } from 'react-native';
import ChatBubble from './ChatBubble';
import MessageInput from './MessageInput';

const ChattingRoom = () => {
    return (
        <View style={styles.container}>
            <ChatBubble
                message="안녕하세요!"
                isMyMessage={true}
                isRead={true}
                timestamp={new Date()}
            />
            <ChatBubble message="안녕하세요! 반가워요." isMyMessage={false} />
            <MessageInput/>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#8FAFD9',
        alignItems: 'center',
        padding: 5,
    },
});

export default ChattingRoom;