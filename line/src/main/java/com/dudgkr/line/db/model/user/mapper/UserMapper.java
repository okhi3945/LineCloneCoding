package com.dudgkr.line.db.model.user.mapper;

import com.dudgkr.line.db.model.user.dto.UserDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface UserMapper {
    int regist(UserDto userDto);
    List<UserDto> findAll();
    List<UserDto> findById(UserDto userDto);
    List<UserDto> login(UserDto userDto);
    int modify(UserDto userDto);
    int delete(UserDto userDto);

}
