package com.blog.back.service;

import com.blog.back.dto.PostDto;
import com.blog.back.exception.ResourceNotFoundException;
import com.blog.back.model.Post;
import com.blog.back.model.Tag;
import com.blog.back.repository.PostRepository;
import com.blog.back.repository.PosttagRepository;
import com.blog.back.repository.TagRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.*;

@Service
@RequiredArgsConstructor
public class PostService {
    private final PostRepository postRepository;
    private final TagRepository tagRepository;
    private final PosttagRepository posttagRepository;

    /* 모든 게시글 불러오기 */
    public List<Post> getAllPost(String id) {
        return postRepository.findByMemberId(id);
    }

    /* 카테고리 별 게시글 불러오기 */
    public List<Post> getPostByCate(String id, String category) {
        return postRepository.findPostByCate(id, category);
    }

    /* 게시글 생성 및 태그 저장 */
    public Post createPost(PostDto postDto) {
        return postRepository.save(postDto.getPost());
    }

    /* 게시글 상세 조회 */
    public Optional<Post> getPost(Integer no) {
        Optional<Post> post = postRepository.findById(no);
        return post;
    }

    /* 게시글 검색 */
    public List<Post> getPostByKeyword(String memberId, String search) {
        return postRepository.findPostByKeyword(memberId, search);
    }

    /* 카테고리 별 게시글 검색 */
    public List<Post> getPostByKeywordCate(String memberId, String category, String search) {
        return postRepository.findPostByKeywordCate(memberId, category, search);
    }

    /* 태그 검색 */
    public List<Optional<Post>> getPostByTag(String memberId, String tag) {
        List<Optional<Post>> list = new ArrayList<>();

        Integer tagId = tagRepository.findByTitle(tag).getId();

        List<Integer> postNoList = posttagRepository.getPostNoByTagId(memberId, tagId);

        for(Integer no:postNoList)
            list.add(postRepository.findById(no));
        return list;
    }

    /* 카테고리 별 태그 검색 */
    public List<Optional<Post>> getPostByTagCate(String memberId, String category, String tag) {
        List<Optional<Post>> list = new ArrayList<>();

        Integer tagId = tagRepository.findByTitle(tag).getId();

        List<Integer> postNoList = posttagRepository.getPostNoByTagIdCate(memberId, category, tagId);

        for(Integer no:postNoList)
            list.add(postRepository.findById(no));
        return list;
    }

    public Post updatePost(Integer no, PostDto postDto) {
        Post post = postRepository.findById(no)
                .orElseThrow(() -> new ResourceNotFoundException("Not exist Post Data by no : [" + no + "]"));
        post.setTitle(postDto.getPost().getTitle());
        post.setText(postDto.getPost().getText());
        post.setThumbnail(postDto.getPost().getThumbnail());
        post.setUpdatedTime(new Date());

        Post endUpdatePost = postRepository.save(post);
        return endUpdatePost;
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

    /* 조회수 증가 */
    @Transactional
    public void updateView(Integer no) {
        postRepository.updateView(no);
    }
}
