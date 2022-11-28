package com.blog.back.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;
import java.sql.Timestamp;

@Getter
@Setter
@Entity
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @NonNull
    @Column(name = "text")
    private String text;

    @Column(name="created_time")
    private String created_time;

    @Column(name="updated_time")
    private String updated_time;

//    @Column(name="post_id")
//    private Integer postId;
//
//    @Column(name="member_id")
//    private String memberId;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name="post_id")
    private Post post;

    @ManyToOne
    @JoinColumn(name="member_id")
    private Member member;

    public Comment(String text) {
        this.text= text;
       // this.deleted = this.deleted == null ? false : this.deleted;
        this.created_time = this.created_time == null ? (new Timestamp(System.currentTimeMillis())).toString() : this.created_time;
    }

    public void changeMember(Member member) {
        this.member = member;
    }
    public void changePost(Post post) {
        this.post = post;
    }
}
