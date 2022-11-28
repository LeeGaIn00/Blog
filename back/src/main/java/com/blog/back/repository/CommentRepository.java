package com.blog.back.repository;

import com.blog.back.model.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface CommentRepository extends JpaRepository<Comment, Integer> {

    String sql = "SELECT c from Comment c where c.post.no=:postNo";

    @Query(sql)
    public List<Comment> findComment(@Param("postNo") Integer postNo);
}
