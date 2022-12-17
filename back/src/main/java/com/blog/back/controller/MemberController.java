package com.blog.back.controller;

import com.blog.back.dto.ChangePasswordRequestDto;
import com.blog.back.dto.ChangeProfileRequestDto;
import com.blog.back.dto.MemberResponseDto;
import com.blog.back.model.Member;
import com.blog.back.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequiredArgsConstructor
@RequestMapping("/member")
public class MemberController {

    private final MemberService memberService;

    @GetMapping("/index")
    public List<Member> getAllMember() { return memberService.getAllMember(); }

    // get profile by id
    @GetMapping("/profile/{id}")
    public String getProfile(@PathVariable String id) {
        return memberService.getProfile(id);
    }

    // get information by id
    @GetMapping("/{id}")
    public Optional<Member> getMember(@PathVariable String id) {
        return memberService.getMember(id);
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

    @PostMapping("/profile")
    public ResponseEntity<MemberResponseDto> setMemberProfile(@RequestBody ChangeProfileRequestDto request) {
        // delete exProfile
//            File file = new File("/Users/gain/Blog/front/public/img/" + request.getExProfile());
        File file = new File("/Users/user/Projects/Blog/front/public/img/" + request.getExProfile());
        if(file.exists()) {
            file.delete();
            System.out.println(request.getExProfile() + " 삭제 완료");
        } else {
            System.out.println("존재하지 않는 파일 : " + file.getName());
        }
        return ResponseEntity.ok(memberService.changeMemberProfile(request.getNewProfile()));
    }

    @PostMapping("/password")
    public ResponseEntity<MemberResponseDto> setMemberPassword(@RequestBody ChangePasswordRequestDto request) {
        return ResponseEntity.ok(memberService.changeMemberPassword(request.getExPassword(), request.getNewPassword()));
    }
}
