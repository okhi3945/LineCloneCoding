import { View, Text, Button } from 'react-native'

const Home = (props) => {

    return (
        <View>
            <Text>Home</Text>
            <Button title="채팅방으로" onPress={() => {
                props.navigation.navigate('ChattingRoom')
            }} />
        </View>
    )
}

export default Home