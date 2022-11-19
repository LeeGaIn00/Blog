package com.blog.back.controller;

import com.blog.back.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/member")
public class MemberController {

    @Autowired
    private MemberService memberService;

    // get profile by id
    @GetMapping("/profile/{id}")
    public String getProfile(@PathVariable String id) {
        return memberService.getProfile(id);
    }
}
