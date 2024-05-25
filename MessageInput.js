import { View, TextInput, StyleSheet, Text, InputAccessoryView, TouchableOpacity, } from 'react-native'
import { useState, } from 'react'

const MessageInput = () => {
    const [message, setMessage] = useState('');
    const onChangeInput = (event) => {
        setMessage(event);
    };

    return (
        <View style={{ position: 'absolute', bottom: 0, width: '103%' }}>
            <InputAccessoryView>
                <View style={styles.InputBar}>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                        <TextInput
                            style={{ width: '45%', backgroundColor: '#F4F4F4', borderRadius: 10, }}
                            value={message}
                            onChangeText={onChangeInput}
                            placeholder='Aa'
                        />
                        <TouchableOpacity style={styles.sendButton}>
                            <Text>전송</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </InputAccessoryView>
            <View style={{ backgroundColor: '#FFFFFF', height: 50 }}/>
        </View>
    )
}

const styles = StyleSheet.create({
    InputBar: {
        backgroundColor: '#FFFFF8',
        width: '103%',
        height: 50,
        justifyContent: 'center',
    }, sendButton: {
        backgroundColor: 'red',
        width: 50,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    }
});

export default MessageInput
