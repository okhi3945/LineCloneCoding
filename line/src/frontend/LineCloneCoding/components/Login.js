import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native'
import { useState } from 'react'
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'


const Login = (props) => {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [isLoginValid, setIsLoginValid] = useState(false)

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://192.168.35.23:8008/boot/user/login', {
                id,
                password,
            });
            if (response.data.List && response.data.List.length > 0) {
                const userInfo = response.data.List[0];
                await AsyncStorage.setItem('userInfo', JSON.stringify({ id: userInfo.id, name: userInfo.name, phone: userInfo.phone }));
                Alert.alert('로그인', "환영합니다!");
                props.navigation.navigate('Main', { screen: 'Main', params: { user_id: userInfo.id }});
                console.log('Login successful:', response.data);
            } else {
                Alert.alert('로그인 실패', '올바르지 않은 아이디와 비밀번호 입니다.');
            }
        } catch (error) {
            console.error('Registration failed:', error);
            Alert.alert('Error', '로그인 도중 오류가 발생하였습니다.');
        }
    }

    return (
        <View style={styles.LoginContainer}>
            <TouchableOpacity
                style={styles.backButton}
                onPress={() => props.navigation.goBack()}
            >
                <Text style={styles.backButtonText}>뒤로</Text>
            </TouchableOpacity>
            <Image source={require('../assets/LINE_Corporation_Logo.png')} style={styles.LoginImage} />
            <Text style={{ fontSize: 24, color: '#00B900', fontWeight: 'bold', marginBottom: '10%' }}>로그인</Text>
            <TextInput
                style={styles.InputForm}
                placeholder="아이디"
                value={id}
                onChangeText={(text) => {
                    setId(text);
                }}
            />
            <TextInput
                style={styles.InputForm}
                placeholder="비밀번호"
                secureTextEntry={true}
                value={password}
                onChangeText={(text) => {
                    setPassword(text);
                }}
            />
            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                <Text style={styles.loginButtonText}>로그인</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    LoginContainer: {
        alignItems: 'center',
        marginTop: '20%',
    },
    LoginImage: {
        width: "50%",
        resizeMode: "contain",
        height: '30%',
        margin: '5%',
        marginTop: '8%'
    }, InputForm: {
        padding: 15,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: '#00B900',
        width: '70%',
    }, loginButton: {
        backgroundColor: '#00B900',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 4,
        marginTop: 25,
        width: '40%',
        alignItems: 'center'
    }, loginButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    }, backButton: {
        position: 'absolute',
        top: 10,
        left: 20,
        padding: 10,
        backgroundColor: '#00B900',
        borderRadius: 5, // 모서리 둥글기
    },
    backButtonText: {
        color: '#FFFFFF', // 글자색
        fontSize: 16, // 글자 크기
    },
}
)
export default Login