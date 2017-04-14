package com.example.controllers;

import java.util.List;
import java.util.concurrent.atomic.AtomicLong;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.example.models.TutTutTagRel;
import com.example.models.Tutorial;
import com.example.models.TutorialTag;
import com.example.repositories.TutTutTagRelRepository;
import com.example.repositories.TutorialRepository;
import com.example.repositories.TutorialTagRepository;

public class TutorialTagController {

	
	@Autowired
	private TutorialTagRepository tr;
	
	@Autowired
	private TutorialRepository tutr;
	
	@Autowired 
	private TutTutTagRelRepository ttr;
    final AtomicLong id = new AtomicLong();
    
    
    @RequestMapping("/gettutkorisnickitag")
   	public List<TutorialTag> getUserTutTag(@RequestParam("idTut") Long idTut){
   		Tutorial t = tutr.findOne(idTut);
   		List<TutorialTag> tag = tutr.getTutUserTag(t.getId());
		return tag;
    
    }
    
    @RequestMapping("/addkorisnickitagtotut")
	public Boolean addKTagTut(@RequestParam("idTut") Long idTut,@RequestParam("idTag") Long idTag){
		Tutorial t = tutr.findOne(idTut);
		TutorialTag tag=tr.findOne(idTag);
		
				
		TutTutTagRel tt=new TutTutTagRel();
		tt.settagId(tag);
		tt.settutId(t);
		ttr.save(tt);
		
		return true;
	}
    
    @RequestMapping("/addusertag")
    public TutorialTag dodaj(@RequestParam(value="text") String tekst){
        return new TutorialTag(id.incrementAndGet(), tekst);
    }
    
    
}
