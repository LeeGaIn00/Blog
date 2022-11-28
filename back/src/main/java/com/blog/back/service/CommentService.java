package com.blog.back.service;

import com.blog.back.exception.ResourceNotFoundException;
import com.blog.back.model.Comment;
import com.blog.back.model.Member;
import com.blog.back.model.Post;
import com.blog.back.repository.CommentRepository;
import com.blog.back.repository.MemberRepository;
import com.blog.back.repository.PostRepository;
import com.sun.istack.NotNull;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CommentService {

    @Autowired
    private MemberRepository memberRepository;
    @Autowired
    private PostRepository postRepository;
    @Autowired
    private CommentRepository commentRepository;

    /* Create */
    public Comment createComment(Comment comment, String memberId, Integer postNo) {
        Optional<Post> post = postRepository.findById(postNo);
        Optional<Member> member = memberRepository.findById(memberId);

        post.ifPresent(re->{        // null이 아닌 경우 코드 실행
            comment.changePost(re);
        });
        member.ifPresent(re->{
            comment.changeMember(re);
        });
        return commentRepository.save(comment);
    }
    /* Read */
   @Transactional(readOnly = true)
    public List<Comment> getComments(Integer postNo) {
        return commentRepository.findComment(postNo);
    }

    /* Update */
    public ResponseEntity<Comment> updateComment(Integer commentNo, Comment updateComment) {
        Comment comment = commentRepository.findById(commentNo)
                .orElseThrow(() -> new ResourceNotFoundException("Not exist Comment Data by id : [" + commentNo + "]"));
        comment.setText(updateComment.getText());
        comment.setUpdated_time((new Timestamp(System.currentTimeMillis())).toString());

        Comment endUpdatedComment = commentRepository.save(comment);
        return ResponseEntity.ok(endUpdatedComment);
    }

    /* Delete */
    public List<Comment> deleteComment(Integer commentNo, Integer postNo) {
        commentRepository.deleteById(commentNo);
        return commentRepository.findComment(postNo);
    }
}
