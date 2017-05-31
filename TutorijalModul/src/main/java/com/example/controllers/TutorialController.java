package com.example.controllers;

import java.util.List;

import javax.servlet.ServletException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.example.models.Tag;
import com.example.models.TutTagRel;
import com.example.models.Tutorial;
import com.example.models.TutorialUser;
import com.example.models.UserTutRel;
import com.example.repositories.TagRepository;
import com.example.repositories.TutTagRelRepository;
import com.example.repositories.TutorialRepository;
import com.example.repositories.TutorialUserRepository;
import com.example.repositories.UserTutRelRepository;


@RestController
@RequestMapping("tut")
public class TutorialController {

	@Autowired
	private TutorialRepository tr;
	
	@Autowired
	private TutorialUserRepository tu;
	
	@Autowired
	private RestTemplate restTemplate;
	
	@Autowired
	private TagRepository tagr;
	
	@Autowired
	private TutorialUserRepository ur;
	
	@Autowired
	private TutTagRelRepository ttr;
	
	@Autowired
	private UserTutRelRepository utrr;
	
	
	@SuppressWarnings("unused")
	private static class TutorialBody{
		public String title;
		public String text;
		public String about;
		public String username;
	}
	
	@RequestMapping("/create")
	public Tutorial createTutorial(@RequestBody TutorialBody tutorial) throws ServletException{
		
		Boolean logovan=this.restTemplate.getForObject("http://users-client/user/logged?username="+tutorial.username,Boolean.class);
		
		//provjeriti je li admin?
		Boolean admin = false;
		List<String> roles=this.restTemplate.getForObject("http://users-client/user/roles?username="+tutorial.username,List.class);
		admin=roles.contains("admin");
		
		if(logovan==false){
			throw new ServletException("Niste logovani");
		}
		if(admin==false){
			throw new ServletException("Niste admin");
		}
		
   	
		Tutorial t = new Tutorial();
		t.setAbout(tutorial.about);
		t.setText(tutorial.text);
		t.setTitle(tutorial.title);
    	tr.save(t);
    	return t;		
		
	}
	
	@RequestMapping("/addTutToUser")
	public Boolean addTagTut(@RequestParam("idTut") Long idTut,@RequestParam("idUser") Long idUser) throws ServletException{
		Tutorial t = tr.findOne(idTut);
		TutorialUser u = ur.findOne(idUser);
		
		Boolean logovan=this.restTemplate.getForObject("http://users-client/user/logged?username="+u.getName(),Boolean.class);
		
		if(logovan==false){
			throw new ServletException("Niste logovani");
		}
		
		UserTutRel utr = new UserTutRel();
		utr.setTutId(t);
		utr.setUserId(u);
		utrr.save(utr);
		
		return true;
	}
	
	@RequestMapping("/delete")
	public int deleteTutorial(@RequestParam(value="id") Long id, @RequestParam(value="username") String username){
		
		Boolean logovan=false;
		logovan=this.restTemplate.getForObject("http://users-client/user/logged?username="+username,Boolean.class);
		
		if (logovan==false){
			return 0;
		}
		
		Tutorial t = tr.findOne(id);
		Boolean admin = false;
		
		List<String> roles=this.restTemplate.getForObject("http://users-client/user/roles?username="+username,List.class);
		admin=roles.contains("admin");
		
	
		if(admin==true){
			tr.delete(t);
			return 1;
		}
		
		return 0;
	}
	
	@RequestMapping("/getTutorials")
	public List<Tutorial> getTutorials(){
		List<Tutorial> tut;
		
		tut=(List<Tutorial>) tr.findAll();
		
		return tut;
	}
	
	@RequestMapping("/gettutbytitle" )
	public List<Tutorial> getTutorialsByName(@RequestParam(value="searchWord") String word){
		List<Tutorial> tut;
		
		tut=(List<Tutorial>) tr.findByTitleLike(word);
		
		return tut;
	}
	
	
	@RequestMapping("/gettutbycontent" )
	public List<Tutorial> getTutorialsByContent(@RequestParam(value="searchWord") String word){
		List<Tutorial> tut;
		
		tut=(List<Tutorial>) tr.findByTextLike(word);
		
		return tut;
	}
	
	@RequestMapping("/gettutbytag" )
	public List<Tutorial> getTutorialsByTag(@RequestParam(value="tagId") Long id){
		List<Tutorial> tut;
		
		tut=(List<Tutorial>) tr.getTutorialsByTag(id);
		
		return tut;
	}
	
}
