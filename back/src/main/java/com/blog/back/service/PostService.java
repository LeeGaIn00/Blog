package com.blog.back.service;

import com.blog.back.exception.ResourceNotFoundException;
import com.blog.back.model.Post;
import com.blog.back.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.swing.text.html.Option;
import java.util.*;

@Service
public class PostService {
    @Autowired
    private PostRepository postRepository;

    // get all posts
    public List<Post> getAllPost(String id) {
        return postRepository.findByMemberId(id);
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

    /* 게시글 검색 */
    public List<Post> getPostByKeyword(String search){
        return postRepository.findPostByKeyword((search));
    }

    /* 게시글 수정 */
    public ResponseEntity<Post> updatePost(Integer no, Post updatePost) {
        Post post = postRepository.findById(no)
                .orElseThrow(() -> new ResourceNotFoundException("Not exist Post Data by no : [" + no + "]"));
        post.setTitle(updatePost.getTitle());
        post.setText((updatePost.getText()));
        post.setUpdatedTime(new Date());

        Post endUpdatePosst = postRepository.save(post);
        return ResponseEntity.ok(endUpdatePosst);
    }

    /* 게시글 삭제 */
    public ResponseEntity<Map<String, Boolean>> deletePost(Integer no) {
        Post post = postRepository.findById(no)
                .orElseThrow(() -> new ResourceNotFoundException("Not exist Post Data by no : [" + no + "]"));

        postRepository.delete(post);
        Map<String, Boolean> response = new HashMap<>();
        response.put("Deleted Post Data by id : [" + no + "]", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }
}
