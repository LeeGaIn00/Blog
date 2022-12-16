package com.blog.back.service;

import com.blog.back.dto.MemberResponseDto;
import com.blog.back.model.Member;
import com.blog.back.repository.MemberRepository;
import com.blog.back.util.SecurityUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MemberService {

    @Autowired
    private MemberRepository memberRepository;

    public List<Member> getAllMember() { return memberRepository.findAll(); }

    public String getProfile(String id) {
        return memberRepository.findProfile(id);
    }

    public List<Member> getMemberByKeyword(String search) { return memberRepository.findMemberByKeyword(search); }

    public boolean checkId(String id) {
        return memberRepository.existsById(id);
    };

    public boolean checkEmail(String email) {
        return memberRepository.existsByEmail(email);
    };

    public MemberResponseDto getMyInfoBySecurity() {
        return memberRepository.findById(SecurityUtil.getCurrentMemberId())
                .map(MemberResponseDto::of)
                .orElseThrow(() -> new RuntimeException("로그인 유저 정보가 없습니다"));
    }

    public Optional<Member> getMember(String id) {
        return memberRepository.findById(id);
    }
}
