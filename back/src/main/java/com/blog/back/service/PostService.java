package com.blog.back.service;

import com.blog.back.model.Post;
import com.blog.back.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PostService {
    @Autowired
    private PostRepository postRepository;

    // get all posts
    public List<Post> getAllPost() {
        return postRepository.findAll();
    }

    // create post
    public Post createPost(Post post) {
        return postRepository.save(post);
    }

    /* 게시글 상세 조회 */
    public Optional<Post> getPost(Integer no) {
        Optional<Post> post = postRepository.findById(no);
        return post;
    }
}
