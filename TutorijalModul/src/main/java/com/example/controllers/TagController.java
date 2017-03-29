package com.example.controllers;

import java.util.List;
import java.util.concurrent.atomic.AtomicLong;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.models.Tag;
import com.example.repositories.TagRepository;

@RestController
public class TagController {
	
	@Autowired
	private TagRepository tr;
	
    final AtomicLong id = new AtomicLong();

    @RequestMapping("/tagovi")
    public Tag tagovi(@RequestParam(value="name") String name) {
        return new Tag(id.incrementAndGet(), name);
    }
    
    @RequestMapping("/ima")
	public Boolean nema(@RequestParam("like") String like){
		List<Tag> lt=tr.findByTextLike("%"+like+"%");
		
		return !lt.isEmpty();
	}
    
    

}
