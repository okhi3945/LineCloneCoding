package com.dudgkr.line.db.service.messages;

import com.dudgkr.line.db.model.messages.dto.MessagesDto;
import com.dudgkr.line.db.model.user.dto.UserDto;

import java.util.List;

public interface MessagesService {
    int saveMessage(MessagesDto messagesDto);
    List<MessagesDto> fetchMessage(MessagesDto messagesDto);
    List<MessagesDto> fetchLatestMessagePerChatRoom(UserDto userDto);

}
