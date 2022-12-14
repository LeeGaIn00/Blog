package com.blog.back.controller;

import com.blog.back.dto.FileDto;
import com.blog.back.dto.PostDto;
import com.blog.back.exception.ResourceNotFoundException;
import com.blog.back.model.Post;
import com.blog.back.service.CommentService;
import com.blog.back.service.PostService;
import com.blog.back.service.TagService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.ZoneOffset;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequiredArgsConstructor
@RequestMapping("/post")
public class PostController {

    private final PostService postService;
    private final CommentService commentService;
    private final TagService tagService;

    /* 모든 게시글 불러오기 */
    @PostMapping("/{id}")
    public List<Post> getAllPost(@PathVariable String id, String category) {
        if(category.equals("전체")) return postService.getAllPost(id);
        else return postService.getPostByCate(id, category);
    }

    /* 게시글 생성 및 태그 저장 */
    @PostMapping("")
    public ResponseEntity<PostDto> createPost(@RequestBody PostDto postDto) {
        Post post = postService.createPost(postDto);
        List<String> tags = tagService.createTag(postDto);
        PostDto responsePostDto = new PostDto(post, tags);
        return ResponseEntity.ok(responsePostDto);
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
    @PostMapping("/search")
    public List<Post> getSearchPost(@RequestParam(value = "memberId", required = false) String memberId,
                                    @RequestParam(value = "category", required = false) String category,
                                    @RequestParam(value = "search", required = false) String search) {
        if(category.equals("전체")) return postService.getPostByKeyword(memberId, search);
        else return postService.getPostByKeywordCate(memberId, category, search);
    }
    
    /* 태그 검색 */
    @GetMapping("/searchtag")
    public List<Optional<Post>> getSearchPostByTag(@RequestParam(value = "memberId", required = false) String memberId,
                                                   @RequestParam(value = "category", required = false) String category,
                                                   @RequestParam(value = "tag", required = false) String tag) {
        if(category.equals("전체")) return postService.getPostByTag(memberId, tag);
        else return postService.getPostByTagCate(memberId, category, tag);
    }

    /* 게시글 수정 */
    @PutMapping("/{no}")
    public ResponseEntity<PostDto> updatePostByNo(@PathVariable Integer no, @RequestBody PostDto postDto) {
        Post post = postService.updatePost(no, postDto);
        List<String> tags = tagService.updateTag(no, postDto);
        PostDto responsePostDto = new PostDto(post, tags);
        return ResponseEntity.ok(responsePostDto);
    }

    /* 게시글 삭제 */
    @DeleteMapping("/{no}")
    public ResponseEntity<Map<String, Boolean>> deletePostByNo(@PathVariable Integer no,
                                                               @RequestBody FileDto fileDto){
        tagService.deleteTag(no);
        commentService.deleteCommentByPostNo(no);

        // delete file
        for(String f: fileDto.getFilePath()) {
//            File file = new File("/Users/gain/Blog/front/public" + f);
            File file = new File("/Users/user/Projects/Blog/front/public" + f);
            if(file.exists()) {
                file.delete();
                System.out.println(f + " 삭제 완료");
            } else {
                System.out.println("존재하지 않는 파일 : " + file.getName());
            }
        }
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
