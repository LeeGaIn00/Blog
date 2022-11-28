package com.blog.back.dto;

import com.blog.back.model.Post;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class PostDto {
    private Post post;
    private List<String> tags;

    public PostDto(Post post, List<String> tags) {
        this.post = post;
        this.tags = tags;
    }
}
