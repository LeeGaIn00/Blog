package com.blog.back.service;

import com.blog.back.dto.MemberResponseDto;
import com.blog.back.model.Member;
import com.blog.back.repository.MemberRepository;
import com.blog.back.util.SecurityUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class MemberService {

    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;

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

    @Transactional(rollbackFor = Exception.class)
    public MemberResponseDto changeMemberProfile(String newProfile) {
        Member member = memberRepository.findById(SecurityUtil.getCurrentMemberId()).orElseThrow(() -> new RuntimeException("로그인 유저 정보가 없습니다"));
        member.setProfile(newProfile);
        return MemberResponseDto.of(memberRepository.save(member));
    }

    @Transactional(rollbackFor = Exception.class)
    public MemberResponseDto changeMemberPassword(String exPassword, String newPassword) {
        Member member = memberRepository.findById(SecurityUtil.getCurrentMemberId()).orElseThrow(() -> new RuntimeException("로그인 유저 정보가 없습니다"));
        if(!passwordEncoder.matches(exPassword, member.getPassword())) {
            throw new RuntimeException("비밀번호가 맞지 않습니다");
        }
        member.setPassword(passwordEncoder.encode((newPassword)));
        return MemberResponseDto.of(memberRepository.save(member));
    }
    
    public Optional<Member> getMember(String id) {
        return memberRepository.findById(id);
    }
}
