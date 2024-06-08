package com.dudgkr.line.db.controller.messages;

import com.dudgkr.line.db.model.friends.dto.FriendsDto;
import com.dudgkr.line.db.model.messages.dto.MessagesDto;
import com.dudgkr.line.db.model.user.dto.UserDto;
import com.dudgkr.line.db.service.messages.MessagesService;
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
        logger.info("보낸 메시지 확인: {}", messagesDto.getMessage_content());

        int resNum = messagesService.saveMessage(messagesDto);
        mv.put("result",resNum);
        return mv;
    }

    @GetMapping("/fetchMessage")
    public HashMap<String,Object> fetchMessage(
            @RequestParam("userId") String userId,
            @RequestParam("targetId") String targetId){
        HashMap<String,Object> mv = new HashMap<>();

        MessagesDto messagesDto = new MessagesDto();
        messagesDto.setSender_id(userId);
        messagesDto.setReceiver_id(targetId);

        List<MessagesDto> list = messagesService.fetchMessage(messagesDto);
        mv.put("list",list);
        return mv;
    }
}
