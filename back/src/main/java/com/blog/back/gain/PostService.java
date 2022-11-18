package com.blog.back.gain;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PostService {

    @Autowired
    private PostRepository postRepository;

    /* 전체 게시글 조회 */
    public List<Post> getAllPost() { return postRepository.findAll(); }

    /* 게시글 상세 조회 */
    public Optional<Post> getPost(Integer no) {
        Optional<Post> post = postRepository.findById(no);
        return post;
    }
}
