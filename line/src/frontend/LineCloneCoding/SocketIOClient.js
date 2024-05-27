import io from 'socket.io-client';

let socket;

const connectToServer = (currentUserId, targetUserId) => {
    socket = io('http://192.168.35.23:8077', {
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
    
    socket.on('disconnect', () => {
        console.log('Disconnected from server');
    });
};

const sendMessageToUser = () => {
    const messageData = {
        senderName: 'user332211',
        targetUserName: 'user112233',
        message: 'Hello, server!',
    };

    socket.emit('messageSendToUser', messageData);
};

export { connectToServer, sendMessageToUser, socket };