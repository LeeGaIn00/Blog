package com.blog.back.repository;

import com.blog.back.model.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface MemberRepository extends JpaRepository<Member, String> {
    @Query("SELECT m.profile FROM Member m WHERE m.id=:id")
    String findProfile(@Param("id") String id);

    @Query("SELECT m FROM Member m WHERE m.id LIKE %:search%")
    List<Member> findMemberByKeyword(@Param("search") String search);

    boolean existsById(String id);
    boolean existsByEmail(String email);
}
