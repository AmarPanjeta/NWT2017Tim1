package com.example.controllers;

import java.util.List;
import java.util.concurrent.atomic.AtomicLong;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.models.Tag;
import com.example.models.TutTagRel;
import com.example.models.Tutorial;
import com.example.models.TutorialTag;
import com.example.repositories.TagRepository;
import com.example.repositories.TutTagRelRepository;
import com.example.repositories.TutorialRepository;

@RestController
@RequestMapping("tag")
@CrossOrigin
public class TagController {
	
	@Autowired
	private TagRepository tr;
	
	@Autowired
	private TutorialRepository tutr;
	
	@Autowired 
	private TutTagRelRepository ttr;
    final AtomicLong id = new AtomicLong();

    @RequestMapping("/tagovi")
    public Tag tagovi(@RequestParam(value="name") String name) {
        return new Tag(id.incrementAndGet(), name);
    }
    
    
    @RequestMapping("/gettuttags")
   	public List<Tag> getUserTutTag(@RequestParam("idTut") Long idTut){
   		Tutorial t = tutr.findOne(idTut);
   		List<Tag> tag = tutr.getTutTag(t.getId());
		return tag;
    
    }
    
    @RequestMapping("/addTagToTut")
	public Boolean addTagTut(@RequestParam("idTut") Long idTut,@RequestParam("idTag") Long idTag){
		Tutorial t = tutr.findOne(idTut);
		Tag tag=tr.findOne(idTag);
		
				
		TutTagRel tt=new TutTagRel();
		tt.settagId(tag);
		tt.settutId(t);
		ttr.save(tt);
		
		return true;
	}
    
    @RequestMapping("/addTag")
    public Tag dodaj(@RequestParam(value="name") String name){
        return new Tag(id.incrementAndGet(), name);
    }
    
    @RequestMapping("/ima")
	public Boolean nema(@RequestParam("like") String like){
		List<Tag> lt=tr.findByTextLike("%"+like+"%");
		
		return !lt.isEmpty();
	}
    
    

}
