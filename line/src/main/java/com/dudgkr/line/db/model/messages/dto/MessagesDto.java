package com.dudgkr.line.db.model.messages.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MessagesDto {

    private long message_id;
    private String senderName;
    private String targetUserName;
    private String message;
    private String timestamp;
    private boolean read_status;
    private String targetUserNameName;

}
