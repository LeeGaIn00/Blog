package com.blog.back.model;

import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Getter
@NoArgsConstructor(access= AccessLevel.PROTECTED)
@DynamicInsert
@DynamicUpdate
public class Member {
    @Id
    private String id;

    @Column(name = "password")
    private String password;

    @Column(name = "name")
    private String name;

    @Column(name = "email")
    private String email;

    @Column(name = "phone")
    private String phone;

    @Column(name = "profile")
    @ColumnDefault("img/default.png")
    private String profile;

    @Column(name = "authority")
    @Enumerated(EnumType.STRING)
    private Authority authority;

    @Builder
    public Member(String id, String password, String name, String email, String phone, Authority authority) {
        this.id = id;
        this.password = password;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.profile = "img/default.png";
        this.authority = authority;
    }

}
