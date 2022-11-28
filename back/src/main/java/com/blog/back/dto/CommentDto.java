package com.blog.back.dto;

import com.sun.istack.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CommentDto {
    @NotNull
    private String text;

    //@NotBlank
    private String memberId;

    //@NotBlank
    private Integer postNo;

}
