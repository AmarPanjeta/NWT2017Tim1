package com.example.controllers;

import java.util.List;
import java.util.concurrent.atomic.AtomicLong;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.models.TutTutTagRel;
import com.example.models.Tutorial;
import com.example.models.TutorialTag;
import com.example.repositories.TutTutTagRelRepository;
import com.example.repositories.TutorialRepository;
import com.example.repositories.TutorialTagRepository;

@RestController
@RequestMapping("startag")
@CrossOrigin
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
   	
    @RequestMapping("/gettutkorisnickitagsuma")
   	public int getUserTutTagSum(@RequestParam("idTut") Long idTut){
   		Tutorial t = tutr.findOne(idTut);
   		List<TutorialTag> tag = tutr.getTutUserTag(t.getId());
   		int sum = 0;
   		int i;
   		for( i=0; i < tag.size(); i++) sum = sum + tag.get(i).getStars();
   		if(i == 0) return 0;
		return sum/tag.size();
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
    public TutorialTag dodaj(@RequestParam(value="Stars") int Stars){
        return new TutorialTag(id.incrementAndGet(), Stars);
    }
    
    
}
