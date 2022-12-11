package com.blog.back.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;
import javax.persistence.*;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.*;

@Entity
@Getter
@Setter
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer no;

    @Column(name = "member_id")
    private String memberId;

    @Column(name = "title")
    private String title;

    @Column(name = "text")
    private String text;

    @Column(name = "category")
    private String category;

    @Column(name = "views")
    private Integer views;

    @Column(name = "thumbnail")
    private String thumbnail;

    @Column(name = "created_time")
    private Date createdTime;

    @Column(name = "updated_time")
    private Date updatedTime;

    @JsonIgnore
    @OneToMany(mappedBy = "post")
    private List<Posttag> posttags = new ArrayList<>();

    @PrePersist
    public void prePersist(){
        this.createdTime = this.createdTime == null ? new Timestamp(System.currentTimeMillis()) : this.createdTime;
        this.title = this.title == null ? "제목 없음" : this.title;
    }

    public String getCreatedTime() {
        SimpleDateFormat date = new SimpleDateFormat("yyyy-MM-dd hh:mm");
        return date.format(createdTime);
    }
}
