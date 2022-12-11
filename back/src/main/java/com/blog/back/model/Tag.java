package com.blog.back.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class Tag {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "title")
    private String title;

    @Column(name = "created_time")
    private Date createdTime;

    @JsonIgnore
    @OneToMany(mappedBy = "tag")
    private List<Posttag> posttags = new ArrayList<>();

    public Tag(String title) {
        this.title = title;
    }

    @PrePersist
    public void prePersist(){
        this.createdTime = this.createdTime == null ? new Timestamp(System.currentTimeMillis()) : this.createdTime;
    }
}
