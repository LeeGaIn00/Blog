package com.blog.back.service;

import com.blog.back.dto.PostDto;
import com.blog.back.model.Posttag;
import com.blog.back.model.Tag;
import com.blog.back.repository.PosttagRepository;
import com.blog.back.repository.TagRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class TagService {
    @Autowired
    private TagRepository tagRepository;
    @Autowired
    private PosttagRepository posttagRepository;

    /* 태그 저장 */
    public void createTag(PostDto postDto) {
        if(postDto.getTags() != null && postDto.getTags().size() > 0) {
            saveTag(postDto);
            savePostTag(postDto);
        }
   }

   public void updateTag(Integer no, PostDto postDto) {
       if(postDto.getTags() != null && postDto.getTags().size() > 0) {
           saveTag(postDto);
           posttagRepository.deleteAllInBatch(posttagRepository.findByPostNo(no));
           postDto.getPost().setNo(no);
           savePostTag(postDto);
       } else {
           posttagRepository.deleteAllInBatch(posttagRepository.findByPostNo(no));
       }
   }

   public void deleteTag(Integer no) {
       posttagRepository.deleteAllInBatch(posttagRepository.findByPostNo(no));
   }

   /* tag 테이블에 중복 검사하여 태그 추가 */
   private void saveTag(PostDto postDto) {
       List<Tag> tags = new ArrayList<>();
       for(String title : postDto.getTags()) {
           if(!tagRepository.existsByTitle(title)) {
               Tag tag = new Tag(title);
               tags.add(tag);
           }
       }
       tagRepository.saveAll(tags);
   }

   /* post, tag 테이블 매핑 테이블인 posttag 테이블에 데이터 추가 */
   private void savePostTag(PostDto postDto) {
       List<Posttag> posttags = new ArrayList<>();
       for(String title : postDto.getTags()) {
           Tag tag = tagRepository.findByTitle(title);
           Posttag posttag = new Posttag(postDto.getPost(), tag);
           posttags.add(posttag);
       }
       posttagRepository.saveAll(posttags);
   }

   public List<String> getTagsofPost(Integer postNo) {
        return posttagRepository.getTagsOfPost(postNo);
   }
}
