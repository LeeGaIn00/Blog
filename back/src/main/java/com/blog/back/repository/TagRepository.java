package com.blog.back.repository;

import com.blog.back.model.Tag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface TagRepository extends JpaRepository<Tag, Integer> {
    boolean existsByTitle(String title);

    Tag findByTitle(String title);
}
