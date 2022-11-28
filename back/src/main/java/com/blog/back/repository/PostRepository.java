package com.blog.back.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.blog.back.model.Post;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface PostRepository extends JpaRepository<Post, Integer> {
    List<Post> findByMemberId(String memberId);

    @Modifying
    @Query("UPDATE Post p set p.views = p.views + 1 where p.no = :no")
    void updateView(Integer no);
    
    /* 게시글 검색 */
    public String SELECT_SEARCH_POST = "SELECT * FROM post " +
            "WHERE title LIKE %:search% or text LIKE %:search% ORDER BY no DESC";

    @Query(value = SELECT_SEARCH_POST, nativeQuery = true)
    List<Post> findPostByKeyword(final String search);

}