package com.dudgkr.line.db.service.messages;

import com.dudgkr.line.db.model.messages.dto.MessagesDto;
import com.dudgkr.line.db.model.messages.mapper.MessagesMapper;
import com.dudgkr.line.db.model.user.dto.UserDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MessagesServiceImpl implements MessagesService{

    @Autowired
    private MessagesMapper messagesMapper;


    @Override
    public int saveMessage(MessagesDto messagesDto) {
        return messagesMapper.saveMessage(messagesDto);
    }

    @Override
    public List<MessagesDto> fetchMessage(MessagesDto messagesDto) {
        return messagesMapper.fetchMessage(messagesDto);
    }

    @Override
    public List<MessagesDto> fetchLatestMessagePerChatRoom(UserDto userDto) {
        return messagesMapper.fetchLatestMessagePerChatRoom(userDto);
    }
}
