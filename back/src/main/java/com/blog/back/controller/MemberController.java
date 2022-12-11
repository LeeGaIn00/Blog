package com.blog.back.controller;

import com.blog.back.dto.MemberResponseDto;
import com.blog.back.model.Member;
import com.blog.back.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/member")
public class MemberController {

    @Autowired
    private MemberService memberService;
    @Autowired
    private PasswordEncoder pwEncoder;

    @GetMapping("/index")
    public List<Member> getAllMember() { return memberService.getAllMember(); }

    // get profile by id
    @GetMapping("/profile/{id}")
    public String getProfile(@PathVariable String id) {
        return memberService.getProfile(id);
    }

    /* 검색 */
    @GetMapping("")
    public List<Member> getMemberByKeyword(@RequestParam(value = "search", required = false) String search) { return memberService.getMemberByKeyword(search); }

    @GetMapping("/me")
    public ResponseEntity<MemberResponseDto> getMyMemberInfo() {
        MemberResponseDto myInfoBySecurity = memberService.getMyInfoBySecurity();
        return ResponseEntity.ok((myInfoBySecurity));
    }

    @GetMapping("/check/id/{id}")
    public ResponseEntity<?> checkNickname(@PathVariable("id") String id) {
        return ResponseEntity.status(HttpStatus.OK).body(memberService.checkId(id));
    }

    @GetMapping("/check/email/{email}")
    public ResponseEntity<?> checkEmail(@PathVariable("email") String email) {
        return ResponseEntity.status(HttpStatus.OK).body(memberService.checkEmail(email));
    }
}
