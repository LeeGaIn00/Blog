package com.blog.back.gain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
public class Member {

    @Id
//    @NotBlank(message = "아이디를 입력하시오.")
//    @Size(min = 6, max = 12, message = "아이디는 6자 이상 12자 이하로 입력하시오.")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String id;

    //    @NotBlank(message = "비밀번호를 입력하시오.")
//    @Pattern(regexp = "(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,20}", message = "비밀번호는 영문, 숫자, 특수문자를 조합하여 8-20자로 입력하시오.")
    @Column(name = "password")
    private String password;

//    @NotBlank(message = "전화번호를 입력하시요.")
//    @Pattern(regexp = "(01[016789])-(\\d{3,4})-(\\d{4})", message = "올바른 휴대폰 번호를 입력해주세요.('-'로 구분)")
    @Column(name = "phone")
    private String phone;

    @Column(name = "profile")
    private String profile;
}
