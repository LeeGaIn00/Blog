package com.blog.back.repository;

import com.blog.back.model.Posttag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PosttagRepository extends JpaRepository<Posttag, Integer> {
    @Query("SELECT p.tag.title from Posttag p where p.post.no=:postNo and p.id>0 order by p.id ASC")
    List<String> getTagsOfPost(@Param("postNo") Integer postNo);

    List<Posttag> findByPostNo(@Param("postNo") Integer postNo);

    @Query("SELECT p.post.no from Posttag p where p.tag.id=:tagId order by p.post.no ASC")
    List<Integer> getPostNoByTagId(@Param("tagId") Integer tagId);
}
