import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'

const Home = (props) => {

    return (
        <View style={styles.HomeContainer}>
            <Image source={require('../assets/LINE_Corporation_Logo.png')} style={styles.HomeImage} />

            <TouchableOpacity style={styles.HomeButton} onPress={() => props.navigation.navigate('Login')}>
                <Text style={styles.HomeButtonText}>로그인</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.HomeButton} onPress={() => props.navigation.navigate('Register')}>
                <Text style={styles.HomeButtonText}>회원가입</Text>
            </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({
    HomeImage: {
        width: "50%",
        resizeMode: "contain",
        height: '30%',
        margin: '5%',
        marginTop: '8%'
    }, HomeContainer: {
        alignItems: 'center',
        marginTop: '20%',
    }, HomeButton: {
        backgroundColor: '#00B900',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 4,
        marginTop: 25,
        width: '40%',
        alignItems: 'center'
    }, HomeButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
})
export default Home