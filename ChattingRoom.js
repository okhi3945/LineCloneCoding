import { StyleSheet, View, ScrollView, } from 'react-native';
import ChatBubble from './ChatBubble';
import MessageInput from './MessageInput';

const ChattingRoom = () => {
    return (
        <View style={styles.container}>
            <ScrollView style={styles.scrollView}>
                <ChatBubble
                    message="안녕하세요!"
                    isMyMessage={true}
                    isRead={true}
                    timestamp={new Date()}
                />
                <ChatBubble message="안녕하세요! 반가워요." isMyMessage={false} senderName="영학"
                    senderProfilePicture={require('C:/Users/okhi3/Documents/GitHub/LineCloneCoding/LineCloneCoding/assets/lasco_13974601.png')}
                />
                <ChatBubble message="안녕하세요! 반가워요." isMyMessage={false} senderName="영학"
                    senderProfilePicture={require('C:/Users/okhi3/Documents/GitHub/LineCloneCoding/LineCloneCoding/assets/lasco_13974601.png')}
                />
                <ChatBubble message="안녕하세요! 반가워요." isMyMessage={false} senderName="영학"
                    senderProfilePicture={require('C:/Users/okhi3/Documents/GitHub/LineCloneCoding/LineCloneCoding/assets/lasco_13974601.png')}
                />
                <ChatBubble message="안녕하세요! 반가워요." isMyMessage={false} senderName="영학"
                    senderProfilePicture={require('C:/Users/okhi3/Documents/GitHub/LineCloneCoding/LineCloneCoding/assets/lasco_13974601.png')}
                />
                <ChatBubble message="안녕하세요! 반가워요." isMyMessage={false} senderName="영학"
                    senderProfilePicture={require('C:/Users/okhi3/Documents/GitHub/LineCloneCoding/LineCloneCoding/assets/lasco_13974601.png')}
                />
                <ChatBubble message="안녕하세요! 반가워요." isMyMessage={false} senderName="영학"
                    senderProfilePicture={require('C:/Users/okhi3/Documents/GitHub/LineCloneCoding/LineCloneCoding/assets/lasco_13974601.png')}
                />
                <ChatBubble message="안녕하세요! 반가워요." isMyMessage={false} senderName="영학"
                    senderProfilePicture={require('C:/Users/okhi3/Documents/GitHub/LineCloneCoding/LineCloneCoding/assets/lasco_13974601.png')}
                />
                <ChatBubble message="안녕하세요! 반가워요." isMyMessage={false} senderName="영학"
                    senderProfilePicture={require('C:/Users/okhi3/Documents/GitHub/LineCloneCoding/LineCloneCoding/assets/lasco_13974601.png')}
                />
                <ChatBubble message="안녕하세요! 반가워요." isMyMessage={false} senderName="영학"
                    senderProfilePicture={require('C:/Users/okhi3/Documents/GitHub/LineCloneCoding/LineCloneCoding/assets/lasco_13974601.png')}
                />
                <ChatBubble message="안녕하세요! 반가워요." isMyMessage={false} senderName="영학"
                    senderProfilePicture={require('C:/Users/okhi3/Documents/GitHub/LineCloneCoding/LineCloneCoding/assets/lasco_13974601.png')}
                />
                <ChatBubble message="안녕하세요! 반가워요." isMyMessage={false} senderName="영학"
                    senderProfilePicture={require('C:/Users/okhi3/Documents/GitHub/LineCloneCoding/LineCloneCoding/assets/lasco_13974601.png')}
                />
            </ScrollView>
            <MessageInput />
        </View >
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#8FAFD9',
        alignItems: 'center',
        padding: 5,
    }, scrollView: {
        width: '100%',
        marginBottom: 79, 
    },
});

export default ChattingRoom;