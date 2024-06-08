package com.dudgkr.line.db.model.messages.mapper;

import com.dudgkr.line.db.model.messages.dto.MessagesDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface MessagesMapper {
    int saveMessage(MessagesDto messagesDto);
    List<MessagesDto> fetchMessage(MessagesDto messagesDto);
}
