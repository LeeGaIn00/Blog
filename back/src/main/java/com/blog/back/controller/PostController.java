package com.blog.back.controller;

import com.blog.back.model.Post;
import com.blog.back.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("")
public class PostController {

    @Autowired
    private PostService postService;

    // get all posts
    @GetMapping("/post")
    public List<Post> getAllBoards() {
        return postService.getAllPost();
    }

    // create post
    @PostMapping("/post")
    public Post createBoard(@RequestBody Post post) {
        return postService.createPost(post);
    }
}
