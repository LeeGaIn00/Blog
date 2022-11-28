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
    @GetMapping("/posts/{id}")
    public List<Post> getAllPost(@PathVariable String id) {
        return postService.getAllPost(id);
    }

    // create post
    @PostMapping("/post")
    public Post createPost(@RequestBody Post post) {
        return postService.createPost(post);
    }

    /* 게시글 상세 조회 */
    @GetMapping("/post/{no}")
    public Optional<Post> getPostByNo(@PathVariable Integer no) { return postService.getPost(no); }

    /* 게시글 검색 */
    @GetMapping("/post/search")
    public List<Post> getSearchPost(@RequestParam(value = "search", required = false) String search) {
        return postService.getPostByKeyword(search);
    }
    /* 게시글 수정 */
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
