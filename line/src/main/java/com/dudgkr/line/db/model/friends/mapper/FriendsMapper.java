package com.dudgkr.line.db.model.friends.mapper;

import com.dudgkr.line.db.model.friends.dto.FriendsDto;
import com.dudgkr.line.db.model.user.dto.UserDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface FriendsMapper {
    int addFriend(FriendsDto FriendsDto);
    List<UserDto> friendsList(FriendsDto FriendsDto);
    int accept(FriendsDto FriendsDto);

}
