package com.dudgkr.line.socketIO.config;

import com.corundumstudio.socketio.SocketIOClient;
import com.corundumstudio.socketio.SocketIOServer;
import com.corundumstudio.socketio.listener.ConnectListener;
import com.corundumstudio.socketio.listener.DisconnectListener;
import jakarta.annotation.PreDestroy;
import lombok.extern.log4j.Log4j2;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;

/* config 파일을 만들어서 netty-socketio 라이브러리에서 제공하는 SocketIOServer를 빈으로 등록 */
@Log4j2
@Component
@Configuration
public class SocketIoConfig {

    private final Environment environment;
    private SocketIOServer server;

    public SocketIoConfig(Environment environment) {
        this.environment = environment;
    }

    /**
     * Tomcat 서버와 별도로 돌아가는 netty 서버를 생성
     */
    @Bean
    public SocketIOServer socketIoServer() {
        com.corundumstudio.socketio.Configuration config = new com.corundumstudio.socketio.Configuration();
        config.setHostname(environment.getProperty("socket-server.host"));
        config.setPort(environment.getProperty("socket-server.port", Integer.class));
        server = new SocketIOServer(config);
        server.start();
        return server;
    }

    @PreDestroy
    public void stopSocketIOServer() {
        this.server.stop();
    }
}
