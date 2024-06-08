import { View, Text, Button } from 'react-native'

const Home = (props) => {

    return (
        <View style={{flex:1,marginTop:'30%'}}>
            <Text>Home</Text>
            <Button title="로그인하기" onPress={() => props.navigation.navigate('Login')} />
            <Button title="회원가입하기" onPress={() => props.navigation.navigate('Register')} />
        </View>
    )
}

export default Home