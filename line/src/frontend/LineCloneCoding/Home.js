import { View, Text, Button } from 'react-native'
import { connectToServer } from './SocketIOClient';

const Home = (props) => {

    const userId = "user332211"
    const targetUserId = "user112233"
    const handleChatNavigation = () => {
        connectToServer(userId, targetUserId);

        // 채팅방으로 이동
        props.navigation.navigate('ChattingRoom');
    };

    return (
        <View>
            <Text>Home</Text>
            <Button title="채팅방으로" onPress={handleChatNavigation} />
        </View>
    )
}

export default Home