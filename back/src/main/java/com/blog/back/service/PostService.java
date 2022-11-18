package com.blog.back.service;

import com.blog.back.model.Post;
import com.blog.back.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

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
}
