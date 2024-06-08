package com.dudgkr.line.socketIO.socketController;

import com.corundumstudio.socketio.AckRequest;
import com.corundumstudio.socketio.SocketIOClient;
import com.corundumstudio.socketio.SocketIOServer;
import com.corundumstudio.socketio.listener.ConnectListener;
import com.corundumstudio.socketio.listener.DataListener;
import com.corundumstudio.socketio.listener.DisconnectListener;
import com.dudgkr.line.db.model.messages.dto.MessagesDto;
import com.dudgkr.line.db.service.messages.MessagesService;
import com.dudgkr.line.socketIO.data.Message;
import jakarta.annotation.PostConstruct;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;


@Component
@Log4j2
public class SocketIOController {

    @Autowired
    private SocketIOServer socketServer;

    @Autowired
    private MessagesService messagesService;

    @PostConstruct
    public void initialize() {
        this.socketServer.addConnectListener(onUserConnectWithSocket);
        this.socketServer.addDisconnectListener(onUserDisconnectWithSocket);
        this.socketServer.addEventListener("messageSendToUser", Message.class, onSendMessage);
    }

    public ConnectListener onUserConnectWithSocket = new ConnectListener() {
        @Override
        public void onConnect(SocketIOClient client) {
            log.info("Perform operation on user connect in controller");
        }
    };

    public DisconnectListener onUserDisconnectWithSocket = new DisconnectListener() {
        @Override
        public void onDisconnect(SocketIOClient client) {
            log.info("Perform operation on user disconnect in controller");
        }
    };

    public DataListener<Message> onSendMessage = new DataListener<Message>() {
        @Override
        public void onData(SocketIOClient client, Message message, AckRequest acknowledge) throws Exception {
            log.info(message.getSenderName() + " user send message to user " + message.getTargetUserName() + " and message is " + message.getMessage());
            // 메시지를 DB에 저장
            MessagesDto messagesDto = new MessagesDto();
            messagesDto.setSenderName(message.getSenderName());
            messagesDto.setTargetUserName(message.getTargetUserName());
            messagesDto.setMessage(message.getMessage());
            messagesService.saveMessage(messagesDto);

            socketServer.getBroadcastOperations().sendEvent(message.getTargetUserName(), client, message);

            acknowledge.sendAckData("Message sent to target user successfully");
        }
    };

}