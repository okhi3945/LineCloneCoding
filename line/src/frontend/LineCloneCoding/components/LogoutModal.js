import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import Modal from 'react-native-modal';
import AsyncStorage from '@react-native-async-storage/async-storage'


const LogoutModal = ({ isVisible, onBackdropPress, navigation }) => {

    const Logout = async () => {
        try {
            await AsyncStorage.removeItem('userInfo');
            console.log('userInfo 삭제 완료');
            Alert.alert("로그아웃 완료")
            navigation.navigate('Home')
        } catch (error) {
            console.error('userInfo 삭제 실패:', error);
        }
    }
    return (
        <Modal isVisible={isVisible} onBackdropPress={onBackdropPress} style={styles.modal}>
            <View style={styles.modalContent}>
                <TouchableOpacity style={styles.closeButton} onPress={onBackdropPress}>
                    <Text style={styles.closeButtonText}>X</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.LogoutButton} onPress={Logout}>
                    <Text style={styles.LogoutButtonText}>로그아웃</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modal: {
        justifyContent: 'flex-end',
        margin: 0,
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 22,
        alignItems: 'center',
        borderRadius: 10,
        borderColor: 'rgba(0, 0, 0, 0.1)',
        height: '85%'
    }, closeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        padding: 10,
    },
    closeButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
    }, LogoutButton: {
        backgroundColor: '#00B900',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 4,
        marginTop: 25,
        width: '40%',
        alignItems: 'center'
    }, LogoutButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default LogoutModal;
