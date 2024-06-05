package com.dudgkr.line.db.model.friends.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FriendsDto {

    String user_id;
    String friend_id;
    Status status;

    public enum Status {
        pending, accepted;
    }
}

