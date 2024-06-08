import io from 'socket.io-client';

let socket;

const connectToServer = (currentUserId, targetUserId) => {
    socket = io('http://192.168.123.104:8077', {
        transports: ['websocket'],
    });

    socket.on('connect', () => {
        console.log('Connected to server');
        socket.emit('join', { userId: currentUserId });
    });

    socket.on('join', ({ userId }) => {
        // 사용자 ID를 기반으로 소켓 연결 정보 저장
        userSockets[userId] = socket;
    });
};

const sendMessageToUser = (props) => {
    console.log("보낸 메시지",props)
    const messageData = {
        senderName: props.senderName,
        targetUserName: props.targetUserName,
        message: props.message,
    };

    socket.emit('messageSendToUser', messageData);
};

export { connectToServer, sendMessageToUser, socket };