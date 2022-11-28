package com.blog.back.repository;

import com.blog.back.model.Tag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface TagRepository extends JpaRepository<Tag, Integer> {
    boolean existsByTitle(String title);

    /* 특정 title의 tag_id 반환 */
//    @Query(value = "SELECT t.id FROM Tag t WHERE t.title=:title", nativeQuery = true)
//    Integer findIdByTitle(@Param("title") String title);

    Tag findByTitle(String title);
}
