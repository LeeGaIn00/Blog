package com.blog.back.controller;

import com.blog.back.model.Member;
import com.blog.back.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("")
public class MemberController {

    @Autowired
    private MemberService memberService;

    @GetMapping("/index")
    public List<Member> getAllMember() { return memberService.getAllMember(); }

    // get profile by id
    @GetMapping("/member/profile/{id}")
    public String getProfile(@PathVariable String id) {
        return memberService.getProfile(id);
    }

    /* 검색 */
    @GetMapping("/member")
    public List<Member> getMemberByKeyword(@RequestParam(value = "search", required = false) String search) { return memberService.getMemberByKeyword(search); }
}
