package com.blog.back.repository;

import com.blog.back.model.Posttag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PosttagRepository extends JpaRepository<Posttag, Integer> {
    @Query("SELECT p.tag.title from Posttag p where p.post.no=:postNo and p.id>0 order by p.id ASC")
    List<String> getTagsOfPost(Integer postNo);

    List<Posttag> findByPostNo(Integer postNo);

    /* 태그 검색 */
    @Query("SELECT p.post.no from Posttag p where p.post.memberId = :memberId and p.tag.id=:tagId order by p.post.no ASC")
    List<Integer> getPostNoByTagId(String memberId, Integer tagId);

    /* 카테고리 별 태그 검색 */
    @Query("SELECT p.post.no from Posttag p where p.post.memberId = :memberId and p.post.category = :category and p.tag.id=:tagId order by p.post.no ASC")
    List<Integer> getPostNoByTagIdCate(String memberId, String category, Integer tagId);
}
