package com.blog.back.controller;

import com.blog.back.dto.CommentDto;
import com.blog.back.model.Comment;
import com.blog.back.service.CommentService;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequiredArgsConstructor
@RequestMapping("/post/comment")
class CommentController {

    private final CommentService commentService;

    @PostMapping("/add")
    public Comment addComment(@RequestBody CommentDto commentDto) {
        return commentService.createComment(new Comment(commentDto.getText()), commentDto.getMemberId(), commentDto.getPostNo());
    }


    @GetMapping("/{postNo}")
//    public ResponseEntity<List<Comment>> addComment(@PathVariable Integer postNo){
//        return new ResponseEntity<>(commentService.getComments(postNo), HttpStatus.CREATED);
//    }
    public List<Comment> getCommentByNO(@PathVariable Integer postNo) {
        return commentService.getComments((postNo));
    }

    @PutMapping("/update/{commentId}")
    public ResponseEntity<Comment> updateCommentByNo(@PathVariable Integer commentId, @RequestBody CommentDto commentDto) {
        return commentService.updateComment(commentId, new Comment(commentDto.getText()));
    }

    @DeleteMapping("/delete/{postNo}/{commentNo}")
    public ResponseEntity<List<Comment>> deleteCommentByNo(@PathVariable Integer postNo, @PathVariable Integer commentNo) {
        return new ResponseEntity<>(this.commentService.deleteComment(commentNo, postNo),HttpStatus.CREATED);
    }
}
