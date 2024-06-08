package com.dudgkr.line.db.model.messages.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MessagesDto {

    private long message_id;
    private String sender_id;
    private String receiver_id;
    private String message_content;
}
