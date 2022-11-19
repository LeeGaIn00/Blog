package com.blog.back.service;

import com.blog.back.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class MemberService {

    @Autowired
    private MemberRepository memberRepository;

    public String getProfile(String id) {
        return memberRepository.findProfile(id);
    }
}
