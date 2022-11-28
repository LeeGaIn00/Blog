package com.blog.back.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.blog.back.model.Post;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface PostRepository extends JpaRepository<Post, Integer> {
    List<Post> findByMemberId(String memberId);

    @Modifying
    @Query("UPDATE Post p set p.views = p.views + 1 where p.id = :id")
    void updateView(Integer id);
}