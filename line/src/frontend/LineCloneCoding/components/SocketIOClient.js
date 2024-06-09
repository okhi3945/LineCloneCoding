import io from 'socket.io-client';

let socket = null;

const connectToServer = () => {
  socket = io('http://192.168.35.23:8077', {
    transports: ['websocket'],
  });

  socket.on('connect', () => {
    console.log('Connected to server');
  });

  socket.on('disconnect', () => {
    console.log('Disconnected from server');
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