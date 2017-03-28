package com.example.controllers;

import java.util.ArrayList;
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
	
	private final AtomicLong br = new AtomicLong();
	
	@Autowired
	private TagRepository tr;
	
	@RequestMapping("/tagovi")
	public Tag tagovi(@RequestParam(value="title") String title){
		return new Tag(br.incrementAndGet(),title);
	}
	
	@RequestMapping("/tagovideset")
	public List<Tag> prvihDeset(@RequestParam(value="name") String name){
		return tr.findFirst10ByName(name);
	}
	
	@RequestMapping("/nema")
	public Boolean nema(@RequestParam("like") String like){
		List<Tag> lt=tr.findByNameLike("%"+like+"%");
		
		return lt.isEmpty();
	}
	

}
