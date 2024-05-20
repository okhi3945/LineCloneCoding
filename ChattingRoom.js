import { StyleSheet, Text, View } from 'react-native';
import ChatBubble from './ChatBubble';

const ChattingRoom = () => {
    return (
        <View style={styles.container}>
            <Text>채팅방</Text>
            <ChatBubble message="안녕하세요!" isMyMessage={true} />
            <ChatBubble message="안녕하세요! 반가워요." isMyMessage={false} />
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#8FAFD9',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5
    },
});

export default ChattingRoom;