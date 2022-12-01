package com.blog.back.controller;

import com.blog.back.dto.PostDto;
import com.blog.back.exception.ResourceNotFoundException;
import com.blog.back.model.Post;
import com.blog.back.service.PostService;
import com.blog.back.service.TagService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.ZoneOffset;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/post")
public class PostController {

    @Autowired
    private PostService postService;

    @Autowired
    private TagService tagService;

    /* 모든 게시글 불러오기 */
    @GetMapping("/{id}")
    public List<Post> getAllPost(@PathVariable String id) {
        return postService.getAllPost(id);
    }

    /* 게시글 생성 및 태그 저장 */
    @PostMapping("")
    public void createPost(@RequestBody PostDto postDto) {
        postService.createPost(postDto);
        tagService.createTag(postDto);
    }

    /* 게시글 상세 조회 */
    @GetMapping("/detail/{no}")
    public ResponseEntity<PostDto> getPostByNo(@PathVariable Integer no,
                                      HttpServletRequest request,
                                      HttpServletResponse response) {
        updateView(no, request, response); // 조회수 증가
        Post post = postService.getPost(no)
                .orElseThrow(() -> new ResourceNotFoundException("Post does not exist"));
        List<String> tags = tagService.getTagsofPost(no);
        PostDto postDto = new PostDto(post, tags);
        return ResponseEntity.ok(postDto);
    }

    /* 게시글 검색 */
    @GetMapping("/search")
    public List<Post> getSearchPost(@RequestParam(value = "search", required = false) String search) {
        return postService.getPostByKeyword(search);
    }

    /* 게시글 수정 */
    @PutMapping("/{no}")
    public void updatePostByNo(@PathVariable Integer no, @RequestBody PostDto postDto) {
        postService.updatePost(no, postDto);
        tagService.updateTag(no, postDto);
    }

    /* 게시글 삭제 */
    @DeleteMapping("/{no}")
    public ResponseEntity<Map<String, Boolean>> deletePostByNo(
            @PathVariable Integer no){
        tagService.deleteTag(no);
        return postService.deletePost(no);
    }

    private void updateView(Integer no, HttpServletRequest request, HttpServletResponse response) {
        Cookie[] cookies = request.getCookies();
        Cookie cookie = null;
        boolean isCookie = false;
        // request에 쿠키들이 있을 때
        for (int i = 0; cookies != null && i < cookies.length; i++) {
            // postView 쿠키가 있을 때
            if (cookies[i].getName().equals("postView")) {
                // cookie 변수에 저장
                cookie = cookies[i];
                // 만약 cookie 값에 현재 게시글 번호가 없을 때
                if (!cookie.getValue().contains("[" + no + "]")) {
                    // 해당 게시글 조회수를 증가시키고, 쿠키 값에 해당 게시글 번호를 추가
                    postService.updateView(no);
                    cookie.setValue(cookie.getValue() + "[" + no + "]");
                }
                isCookie = true;
                break;
            }
        }

        // 만약 postView라는 쿠키가 없으면 처음 접속한 것이므로 새로 생성
        if (!isCookie) {
            postService.updateView(no);
            cookie = new Cookie("postView", "[" + no + "]"); // oldCookie에 새 쿠키 생성
        }

        // 쿠키 유지시간을 오늘 하루 자정까지로 설정
        long todayEndSecond = LocalDate.now().atTime(LocalTime.MAX).toEpochSecond(ZoneOffset.UTC);
        long currentSecond = LocalDateTime.now().toEpochSecond(ZoneOffset.UTC);
        cookie.setPath("/"); // 모든 경로에서 접근 가능
        cookie.setMaxAge((int) (todayEndSecond - currentSecond));
        response.addCookie(cookie);
    }
}
