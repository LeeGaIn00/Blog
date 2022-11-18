package com.blog.back.gain;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("")
public class PostController {

    @Autowired
    private PostService postService;

    @Autowired
    private MemberService memberService;

    @GetMapping("/post")
    public List<Post> getAllPost() {
        return postService.getAllPost();
    }
//    @GetMapping("")
//    public List<Member> getAllMember() {
//       // System.out.println(postService.getAllPost());
//        return memberService.getAllMember();
//    }
    /* 게시글 상세 조회 */
    @GetMapping("/post/{no}")
    public Optional<Post> getPostByNo(@PathVariable Integer no) {
        return postService.getPost(no);
    }

}
