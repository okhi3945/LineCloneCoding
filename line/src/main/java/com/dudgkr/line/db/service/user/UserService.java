package com.dudgkr.line.db.service.user;

import com.dudgkr.line.db.model.user.dto.UserDto;
import org.apache.catalina.User;

import java.util.List;

public interface UserService {

    int regist(UserDto userDto);

    List<UserDto> findAll();

    List<UserDto> findById(UserDto userDto);
    List<UserDto> login(UserDto userDto);
    int modify(UserDto userDto);

    int delete(UserDto userDto);


}
