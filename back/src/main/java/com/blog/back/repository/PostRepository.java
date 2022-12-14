package com.blog.back.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.blog.back.model.Post;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface PostRepository extends JpaRepository<Post, Integer> {
    List<Post> findByMemberId(String memberId);

    /* 카테고리 */
    @Query("SELECT p FROM Post p WHERE p.memberId = :memberId and p.category = :category")
    List<Post> findPostByCate(String memberId, String category);

    @Modifying
    @Query("UPDATE Post p set p.views = p.views + 1 where p.no = :no")
    void updateView(Integer no);
    
    /* 게시글 검색 */
    @Query("SELECT p FROM Post p WHERE p.memberId = :memberId and (p.title LIKE %:search% or p.text LIKE %:search%) ORDER BY p.no DESC")
    List<Post> findPostByKeyword(String memberId, String search);

    /* 카테고리 별 게시글 검색 */
    @Query("SELECT p FROM Post p WHERE p.memberId = :memberId and p.category = :category and (p.title LIKE %:search% or p.text LIKE %:search%) ORDER BY p.no DESC")
    List<Post> findPostByKeywordCate(String memberId, String category, String search);
}