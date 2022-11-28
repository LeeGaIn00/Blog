package com.blog.back.repository;

import com.blog.back.model.Posttag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PosttagRepository extends JpaRepository<Posttag, Integer> {
    @Query("SELECT p.tag.title from Posttag p where p.post.id=:postId and p.id>0 order by p.id ASC")
    List<String> getTagsOfPost(@Param("postId") Integer postId);
}
