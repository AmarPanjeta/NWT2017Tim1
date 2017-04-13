package com.example.controllers;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.atomic.AtomicLong;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.models.Discussion;
import com.example.models.DiscussionTag;
import com.example.models.Tag;
import com.example.repositories.DiscussionRepository;
import com.example.repositories.DiscussionTagRepository;
import com.example.repositories.TagRepository;

@RestController
public class TagController {
	
	private final AtomicLong br = new AtomicLong();
	
	@Autowired
	private TagRepository tr;
	
	@Autowired
	private DiscussionRepository dr;
	
	@Autowired
	private DiscussionTagRepository dtr;
	
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
	
	@RequestMapping("/gettagsofdiscussion")
	public List<Tag> getDiscussionTags(@RequestParam("id") Long id){
		return tr.gettagsofdiscussion(id);
	}
	
	@RequestMapping("/addtagtodiscussion")
	public Boolean addTagDiscussion(@RequestParam("idDiskusije") Long idDiskusije,@RequestParam("idTag") Long idTag){
		
		Discussion d=dr.findOne(idDiskusije);
		Tag t=tr.findOne(idTag);
		
		if(dtr.findDisTagByTagAndDiscussion(idDiskusije, idTag)!=null){
			return false;
		}
		
		DiscussionTag dt=new DiscussionTag();
		dt.setDiscuss(d);
		dt.setTg(t);
		dtr.save(dt);
		
		return true;
	}
	
	@RequestMapping("/addtagbytitletodiscussion")
	public Boolean addTagDiscussion(@RequestParam("idDiskusije") Long idDiskusije,@RequestParam("name") String name){
		
		Discussion d=dr.findOne(idDiskusije);
		Tag t=tr.findByName(name);
		
		if(dtr.findDisTagByTagAndDiscussion(idDiskusije,t.getId())!=null){
			return false;
		}
		
		DiscussionTag dt=new DiscussionTag();
		dt.setDiscuss(d);
		dt.setTg(t);
		dtr.save(dt);
		
		return true;
	}
	
	@RequestMapping("/removetagfromdiscussion")
	public Boolean removeTagFromDiscussion(@RequestParam("idDiskusije") Long idDiskusije,@RequestParam("idTag") Long idTag){
		
		Discussion d=dr.findOne(idDiskusije);
		Tag t=tr.findOne(idTag);
		
		if(dtr.findDisTagByTagAndDiscussion(idDiskusije, idTag)==null){
			return false;
		}
		
		DiscussionTag dt=dtr.findDisTagByTagAndDiscussion(idDiskusije, idTag);
		dtr.delete(dt);
		return true;
		
	}
	

}
