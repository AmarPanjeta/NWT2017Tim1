package com.example.controllers;

import java.util.List;
import java.util.concurrent.atomic.AtomicLong;

import javax.servlet.ServletException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.example.models.Comment;
import com.example.models.Tag;
import com.example.models.Tutorial;
import com.example.models.TutorialUser;
import com.example.repositories.CommentRepository;
import com.example.repositories.TutorialRepository;
import com.example.repositories.TutorialUserRepository;

@RestController
@RequestMapping("comment")
@CrossOrigin	
public class CommentController {

	
	 final AtomicLong id = new AtomicLong();
	 @Autowired
	 private CommentRepository cr ;
	 
	 @Autowired
	 private TutorialRepository tr;
	 
	 @Autowired
	 private TutorialUserRepository tu;
		
	 
	 @Autowired
	 private RestTemplate restTemplate;
	 
	 
	 @SuppressWarnings("unused")
		private static class CommentBody{
			public String tekst;
			public Long tutId;
			public String username;
		}
	 
	    @RequestMapping("/coms")
	    public Comment tagovi(@RequestParam(value="name") String name, @RequestParam(value="usrId") Long usrId, @RequestParam(value="tutId") Long tutId) {
	        return new Comment(id.incrementAndGet(), name, usrId, tutId);
	    }
	    
	    
	    /*@RequestMapping("/create")
		public boolean createComment(@RequestBody CommentBody comment) throws ServletException{
			Comment c = new Comment();
			c.setText(comment.tekst);
			c.settutId(comment.idTutorial);
			
	    	cr.save(c);
	    	return true;		
			
		}*/
	    
	    
	    @RequestMapping("/addcomment")
		public Boolean addComment(@RequestBody CommentBody comment) throws ServletException{
			/*
			Boolean logovan=this.restTemplate.getForObject("http://users-client/user/logged?username="+comment.username,Boolean.class);
			
			if(logovan==false){
				throw new ServletException("Niste logovani");
			}
			
			*/
			TutorialUser user = tu.findByName(comment.username);
	    	Tutorial t = tr.findOne(comment.tutId);
			Comment c=new Comment();
			c.setTutId(t);
			c.setText(comment.tekst);
			
		
		    c.setTutUsrID(user);
			cr.save(c);
			
			return true;
			
		}
	    
	    @RequestMapping("/gettutcoms")
	   	public List<Comment> getTutComs(@RequestParam("idTut") Long idTut){
	   		Tutorial t = tr.findOne(idTut);
	   		List<Comment> coms = tr.getTutComs(t.getId());
			return coms;
	    
	    }

	    
	    
}
