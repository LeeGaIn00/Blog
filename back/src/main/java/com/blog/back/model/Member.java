package com.blog.back.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
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

    @JsonIgnore
    @Column(name = "password")
    private String password;

    @Column(name = "name")
    private String name;

    @Column(name = "email")
    private String email;

    @Column(name = "phone")
    private String phone;

    @Column(name = "profile")
    @ColumnDefault("default.png")
    private String profile;

    @Column(name = "authority")
    @Enumerated(EnumType.STRING)
    private Authority authority;

    public void setProfile(String profile) {
        this.profile = profile;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Builder
    public Member(String id, String password, String name, String email, String phone, String profile, Authority authority) {
        this.id = id;
        this.password = password;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.profile = profile == "" || profile == null ? "default.png" : profile;
        this.authority = authority;
    }

}
