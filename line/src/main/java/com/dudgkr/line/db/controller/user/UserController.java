package com.dudgkr.line.db.controller.user;


import com.dudgkr.line.db.model.user.dto.UserDto;
import com.dudgkr.line.db.service.user.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("boot/user")
public class UserController {
    Logger logger = LoggerFactory.getLogger(this.getClass());
    @Autowired
    private UserService userService;

    // 서버 연결 확인
    @PostMapping("/")
    public void hello(){
        logger.info("hello world");
    }
    
    //회원가입 - mv : model and view
    @PostMapping("/regist")
    public HashMap<String,Object> regist(@RequestBody UserDto userDto){
        //HashMap은 뷰에 전달할 데이터를 담는 용도로 사용
        HashMap<String,Object> mv = new HashMap<>();
        logger.info("아이디 확인: {}", userDto.getId());
        int resNum = userService.regist(userDto);
        mv.put("result",resNum);
        return mv;
    }
    // 아이디 중복 확인
    @PostMapping("/checkId")
    public HashMap<String,Object> findById(@RequestBody UserDto userDto){
        HashMap<String,Object> mv = new HashMap<>();
        logger.info("아이디 확인: {}", userDto.getId());
        List<UserDto> list = userService.findById(userDto);
        mv.put("List", list);
        return mv;
    }
    @PostMapping("/login")
    public HashMap<String,Object> login(@RequestBody UserDto userDto){
        HashMap<String,Object> mv = new HashMap<>();
        logger.info("아이디 확인: {}", userDto.getId());
        logger.info("비밀번호 확인: {}", userDto.getPassword());
        List<UserDto> list = userService.login(userDto);
        mv.put("List", list);
        return mv;
    }

}
