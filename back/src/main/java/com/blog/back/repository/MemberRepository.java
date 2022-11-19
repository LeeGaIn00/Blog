package com.blog.back.repository;

import com.blog.back.model.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface MemberRepository extends JpaRepository<Member, String> {
    public String SELECT_PROFILE = "SELECT m.profile FROM member m WHERE m.id=:id";
    @Query(value = SELECT_PROFILE, nativeQuery = true)
    String findProfile(@Param("id") String id);
}
