package com.blog.back.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;
import javax.persistence.*;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Getter
@Setter
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "memberId")
    private String memberId;

    @Column(name = "title")
    private String title;

    @Column(name = "text")
    private String text;

    @Column(name = "views")
    private Integer views;

    @Column(name = "createdTime")
    private Date createdTime;

    @Column(name = "updatedTime")
    private Date updatedTime;

//    @JsonIgnore
//    @OneToMany(mappedBy = "post")
//    private List<Comment> comments = new ArrayList<>();

//    @JsonIgnore
//    @OneToMany(mappedBy = "post")
//    private List<Comment> comments;

    @PrePersist
    public void prePersist(){
        this.createdTime = this.createdTime == null ? new Timestamp(System.currentTimeMillis()) : this.createdTime;
    }

    public String getCreatedTime() {
        SimpleDateFormat date = new SimpleDateFormat("yyyy-MM-dd hh:mm");
        return date.format(createdTime);
    }
}
