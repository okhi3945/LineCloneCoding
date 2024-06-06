package com.dudgkr.line.db.service.friends;

import com.dudgkr.line.db.model.friends.dto.FriendsDto;
import com.dudgkr.line.db.model.user.dto.UserDto;

import java.util.List;

public interface FriendsService {

    int addFriend(FriendsDto friendsDto);
    List<UserDto> friendsList(FriendsDto friendsDto);
    int accept(FriendsDto friendsDto);

    List<UserDto> sentFriendRequests(FriendsDto friendsDto);
    List<UserDto> receivedFriendRequests(FriendsDto friendsDto);

}
