package com.blog.back.service;

import com.blog.back.dto.PostDto;
import com.blog.back.model.Posttag;
import com.blog.back.model.Tag;
import com.blog.back.repository.PosttagRepository;
import com.blog.back.repository.TagRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TagService {
    private final TagRepository tagRepository;
    private final PosttagRepository posttagRepository;

    /* 태그 저장 */
    public List<String> createTag(PostDto postDto) {
        List<Tag> saveTags = new ArrayList<>();
        List<String> tags = new ArrayList<>();
        if(postDto.getTags() != null && postDto.getTags().size() > 0) {
            saveTags.addAll(saveTag(postDto));
            savePostTag(postDto);
        }
        for(Tag tag : saveTags) {
            tags.add(tag.getTitle());
        }
        return tags;
   }

   public List<String> updateTag(Integer no, PostDto postDto) {
       List<Tag> saveTags = new ArrayList<>();
       List<String> tags = new ArrayList<>();
       if(postDto.getTags() != null && postDto.getTags().size() > 0) {
           saveTags.addAll(saveTag(postDto));
           posttagRepository.deleteAllInBatch(posttagRepository.findByPostNo(no));
           postDto.getPost().setNo(no);
           savePostTag(postDto);
           for(Tag tag : saveTags) {
               tags.add(tag.getTitle());
           }
       } else {
           posttagRepository.deleteAllInBatch(posttagRepository.findByPostNo(no));
       }
       return tags;
   }

   public void deleteTag(Integer no) {
       posttagRepository.deleteAllInBatch(posttagRepository.findByPostNo(no));
   }

   /* tag 테이블에 중복 검사하여 태그 추가 */
   private List<Tag> saveTag(PostDto postDto) {
       List<Tag> tags = new ArrayList<>();
       for(String title : postDto.getTags()) {
           if(!tagRepository.existsByTitle(title)) {
               Tag tag = new Tag(title);
               tags.add(tag);
           }
       }
       return tagRepository.saveAll(tags);
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
