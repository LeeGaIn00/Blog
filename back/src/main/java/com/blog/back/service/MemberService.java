package com.blog.back.service;

import com.blog.back.model.Member;
import com.blog.back.repository.MemberRepository;
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
}
