package com.dudgkr.line.db.controller.messages;

import com.dudgkr.line.db.model.friends.dto.FriendsDto;
import com.dudgkr.line.db.model.messages.dto.MessagesDto;
import com.dudgkr.line.db.model.user.dto.UserDto;
import com.dudgkr.line.db.service.messages.MessagesService;
import org.apache.catalina.User;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("boot/messages")
public class MessagesController {

    Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    private MessagesService messagesService;

    @PostMapping("/saveMessage")
    public HashMap<String,Object> saveMessage(@RequestBody MessagesDto messagesDto){
        //HashMap은 뷰에 전달할 데이터를 담는 용도로 사용
        HashMap<String,Object> mv = new HashMap<>();
        logger.info("보낸 메시지 확인: {}", messagesDto.getMessage());

        int resNum = messagesService.saveMessage(messagesDto);
        mv.put("result",resNum);
        return mv;
    }

    @GetMapping("/fetchMessage")
    public HashMap<String,Object> fetchMessage(
            @RequestParam("senderName") String senderName,
            @RequestParam("targetUserName") String targetUserName){
        HashMap<String,Object> mv = new HashMap<>();


        MessagesDto messagesDto = new MessagesDto();
        messagesDto.setSenderName(senderName);
        messagesDto.setTargetUserName(targetUserName);
        logger.info("아이디 재확인: {}", messagesDto.getSenderName());
        logger.info("상대 아이디 재확인: {}", messagesDto.getTargetUserName());

        List<MessagesDto> list = messagesService.fetchMessage(messagesDto);
        mv.put("list",list);
        return mv;
    }

    @GetMapping("/fetchLatestMessagePerChatRoom")
    public HashMap<String,Object> fetchLatestMessagePerChatRoom(
            @RequestParam("senderName") String senderName){
        HashMap<String,Object> mv = new HashMap<>();

        UserDto userDto = new UserDto();
        userDto.setId(senderName);
        List<MessagesDto> list = messagesService.fetchLatestMessagePerChatRoom(userDto);
        mv.put("list",list);
        return mv;
    }

}
