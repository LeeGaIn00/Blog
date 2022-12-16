package com.blog.back.dto;

import com.blog.back.model.Authority;
import com.blog.back.model.Member;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MemberRequestDto {
    private String id;
    private String password;
    private String name;
    private String email;
    private String phone;
    private String profile;

    public Member toMember(PasswordEncoder passwordEncoder) {
        return Member.builder()
                .id(id)
                .password(passwordEncoder.encode(password))
                .name(name)
                .email(email)
                .phone(phone)
                .profile(profile)
                .authority(Authority.ROLE_USER)
                .build();
    }

    public UsernamePasswordAuthenticationToken toAuthentication() {
        return new UsernamePasswordAuthenticationToken(id, password);
    }
}
