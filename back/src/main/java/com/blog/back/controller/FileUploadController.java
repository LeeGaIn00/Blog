package com.blog.back.controller;
import org.apache.commons.io.FileUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
public class FileUploadController {
    @PostMapping(value = "/upload")
    public List<Map<String, Object>> upload(@RequestParam("file") List<MultipartFile> files) {

        File file = null;
        List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();

        try {
            for(MultipartFile f: files) {
                Map<String, Object> m = new HashMap<String, Object>();
//                file = new File("/Users/gain/Blog/front/public/img/" + f.getOriginalFilename());
                file = new File("/Users/user/Projects/Blog/front/public/img/" + f.getOriginalFilename());
                InputStream fileStream = f.getInputStream();
                FileUtils.copyInputStreamToFile(fileStream, file);

                m.put("filePath", file.getPath());
                m.put("fileName", file.getName());
                list.add(m);
            }
            //InputStream fileStream = files.getInputStream();
        }
        catch (IOException e) {
            FileUtils.deleteQuietly(file);
            e.printStackTrace();
        }

        return list;
    }
}