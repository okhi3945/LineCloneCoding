// InputModal.js
import {useState} from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';

const InputModal = ({ isVisible, onBackdropPress, onSend }) => {
    const [text, setText] = useState('');

    const handleSend = () => {
        onSend(text);
        setText('');
      };
      
    return (
        <Modal isVisible={isVisible} onBackdropPress={onBackdropPress} style={styles.modal}>
            <View style={styles.modalContent}>
                <TouchableOpacity style={styles.closeButton} onPress={onBackdropPress}>
                    <Text style={styles.closeButtonText}>X</Text>
                </TouchableOpacity>
                <Text style={{fontWeight:'bold',fontSize:16}}>친구 검색</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setText}
                    value={text}
                    placeholder="친구의 아이디를 입력하세요"
                />
                <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
                    <Text>보내기</Text>
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
    },
    input: {
        width: '100%',
        height: 40,
        margin: 12,
        padding: 10,
        borderRadius:10,
        backgroundColor:'#F5F5F5'
    },
    sendButton: {
        backgroundColor: '#00B900',
        padding: 10,
        borderRadius: 5,
    },
});

export default InputModal;
