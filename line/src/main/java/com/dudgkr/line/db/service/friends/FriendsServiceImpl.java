package com.dudgkr.line.db.service.friends;

import com.dudgkr.line.db.model.friends.dto.FriendsDto;
import com.dudgkr.line.db.model.friends.mapper.FriendsMapper;
import com.dudgkr.line.db.model.user.dto.UserDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FriendsServiceImpl implements FriendsService {

    @Autowired
    private FriendsMapper friendsMapper;

    @Override
    public int addFriend(FriendsDto friendsDto) {
        return friendsMapper.addFriend(friendsDto);
    }
    @Override
    public int accept(FriendsDto friendsDto) {
        return friendsMapper.accept(friendsDto);
    }

    @Override
    public List<UserDto> friendsList(FriendsDto friendsDto) {
        return friendsMapper.friendsList(friendsDto);
    }

    @Override
    public List<UserDto> sentFriendRequests(FriendsDto friendsDto) {
        return friendsMapper.sentFriendRequests(friendsDto);
    }

    @Override
    public List<UserDto> receivedFriendRequests(FriendsDto friendsDto) {
        return friendsMapper.receivedFriendRequests(friendsDto);
    }
}
