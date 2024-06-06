package com.dudgkr.line.db.controller.friends;

import com.dudgkr.line.db.model.friends.dto.FriendsDto;
import com.dudgkr.line.db.model.user.dto.UserDto;
import com.dudgkr.line.db.service.friends.FriendsService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("boot/friends")
public class FriendsController {

    Logger logger = LoggerFactory.getLogger(this.getClass());
    @Autowired
    private FriendsService friendsService;

    @PostMapping("/addFriend")
    public HashMap<String,Object> addFriend(@RequestBody FriendsDto friendsDto){
        HashMap<String,Object> mv = new HashMap<>();

        int resNum = friendsService.addFriend(friendsDto);
        mv.put("result",resNum);
        return mv;
    }

    @PostMapping("/friendsList")
    public HashMap<String,Object> friendsList(@RequestBody FriendsDto friendsDto){
        HashMap<String,Object> mv = new HashMap<>();
        logger.info("내 아이디 확인: {}", friendsDto.getUser_id());
        List<UserDto> list = friendsService.friendsList(friendsDto);
        mv.put("list",list);
        return mv;
    }

    @PostMapping("/sentFriendRequests")
    public HashMap<String,Object> sentFriendRequests(@RequestBody FriendsDto friendsDto){
        HashMap<String,Object> mv = new HashMap<>();
        logger.info("내 아이디 확인: {}", friendsDto.getUser_id());
        List<UserDto> list = friendsService.sentFriendRequests(friendsDto);
        mv.put("list",list);
        return mv;
    }

    @PostMapping("/receivedFriendRequests")
    public HashMap<String,Object> receivedFriendRequests(@RequestBody FriendsDto friendsDto){
        HashMap<String,Object> mv = new HashMap<>();
        logger.info("내 아이디 확인: {}", friendsDto.getUser_id());
        List<UserDto> list = friendsService.receivedFriendRequests(friendsDto);
        mv.put("list",list);
        return mv;
    }

}
