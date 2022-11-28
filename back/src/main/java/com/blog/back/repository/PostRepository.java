package com.blog.back.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.blog.back.model.Post;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface PostRepository extends JpaRepository<Post, Integer> {
    List<Post> findByMemberId(String memberId);

    /* 게시글 검색 */
    public String SELECT_SEARCH_POST = "SELECT * FROM post " +
            "WHERE title LIKE %:search% or text LIKE %:search% ORDER BY id DESC";

    @Query(value = SELECT_SEARCH_POST, nativeQuery = true)
    List<Post> findPostByKeyword(final String search);

}