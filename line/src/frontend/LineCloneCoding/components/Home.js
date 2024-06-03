import { View, Text, Button } from 'react-native'
import { connectToServer } from './SocketIOClient';

const Home = (props) => {

    const userId = "user332211"
    const targetUserId = "user112233"
    const handleChatNavigation = () => {
        connectToServer(userId, targetUserId);
        props.navigation.navigate('ChattingRoom',{currentUserId:userId});
    };

    return (
        <View style={{flex:1,marginTop:'30%'}}>
            <Text>Home</Text>
            <Button title="채팅방으로" onPress={handleChatNavigation} />
            <Button title="로그인하기" onPress={() => props.navigation.navigate('Login')} />
            <Button title="회원가입하기" onPress={() => props.navigation.navigate('Register')} />
        </View>
    )
}

export default Home