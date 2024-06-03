package com.dudgkr.line.db.service.user;

import com.dudgkr.line.db.model.user.dto.UserDto;
import com.dudgkr.line.db.model.user.mapper.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserMapper userMapper;

    @Override
    public int regist(UserDto userDto) {
        return userMapper.regist(userDto);
    }

    @Override
    public List<UserDto> login(UserDto userDto) {
        return userMapper.login(userDto);
    }

    @Override
    public List<UserDto> findById(UserDto userDto) {
        return userMapper.findById(userDto);
    }

    @Override
    public List<UserDto> findAll() {
        return userMapper.findAll();
    }

    @Override
    public int modify(UserDto userDto) {
        return userMapper.modify(userDto);
    }

    @Override
    public int delete(UserDto userDto) {
        return userMapper.delete(userDto);
    }
}
