import io from 'socket.io-client';

let socket = null;

const connectToServer = () => {
    // 이미 연결된 소켓이 있는지 확인
    if (socket && socket.connected) {
        console.log('이미 서버에 연결되어 있습니다.');
        return;
    }

    socket = io('http://192.168.35.23:8077', {
        transports: ['websocket'],
        autoConnect: false
    });
};

const sendMessageToUser = (props) => {
    console.log("보낸 메시지", props)

    const messageData = {
        senderName: props.senderName,
        targetUserName: props.targetUserName,
        message: props.message,
    };

    socket.emit('messageSendToUser', messageData);
};

export { connectToServer, sendMessageToUser, socket };