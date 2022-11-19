package com.blog.back.controller;

import com.blog.back.model.Post;
import com.blog.back.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("")
public class PostController {

    @Autowired
    private PostService postService;

    // get all posts
    @GetMapping("/post")
    public List<Post> getAllPost() {
        return postService.getAllPost();
    }

    // create post
    @PostMapping("/post")
    public Post createPost(@RequestBody Post post) {
        return postService.createPost(post);
    }

    /* 게시글 상세 조회 */
    @GetMapping("/post/{no}")
    public Optional<Post> getPostByNo(@PathVariable Integer no) { return postService.getPost(no); }

    @PutMapping("/post/{no}")
    public ResponseEntity<Post> updatePostByNo(@PathVariable Integer no, @RequestBody Post post) {
        return postService.updatePost(no, post);
    }

    /* 게시글 삭제 */
    @DeleteMapping("/post/{no}")
    public ResponseEntity<Map<String, Boolean>> deletePostByNo(
            @PathVariable Integer no){
        return postService.deletePost(no);
    }
}
