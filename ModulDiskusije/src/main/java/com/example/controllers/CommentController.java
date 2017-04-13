package com.example.controllers;

import java.util.List;

import javax.servlet.ServletException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.example.models.Comment;
import com.example.models.Discussion;
import com.example.models.RegisteredUser;
import com.example.models.Vote;
import com.example.repositories.CommentRepository;
import com.example.repositories.DiscussionRepository;
import com.example.repositories.UserRepository;
import com.example.repositories.VoteRepository;

@RestController
public class CommentController {

	@Autowired
	private DiscussionRepository dr;
	
	@Autowired
	private UserRepository ur;
	
	@Autowired
	private CommentRepository cr;
	
	@Autowired
	private VoteRepository vr;
	
	@Autowired
	private RestTemplate restTemplate;
	
	@RequestMapping("/addcomment")
	public Boolean addComment(@RequestParam(value="username") String username,@RequestBody CommentBody comment) throws ServletException{
		
		Boolean logovan=this.restTemplate.getForObject("http://users-client/user/logged?username="+username,Boolean.class);
		
		if(logovan==false){
			throw new ServletException("Niste logovani");
		}
		
		Discussion d=dr.findOne(comment.idDiskusije);
		RegisteredUser user=ur.findByUsername(username);
		Comment c=new Comment();
		c.setDiscuss(d);
		c.setRegUser(user);
		cr.save(c);
		
		return true;
		
	}
	
	@RequestMapping("/removecomment")
	public Boolean removeComment(@RequestParam(value="username") String username, @RequestParam(value="id") Long id) throws ServletException{
		
		Boolean logovan=false;
		logovan=this.restTemplate.getForObject("http://users-client/user/logged?username="+username,Boolean.class);
		
		if (logovan==false){
			throw new ServletException("Niste logovani");
		}
		
		
		Boolean admin=false;
		
		List<String> roles=this.restTemplate.getForObject("http://users-client/user/roles?username="+username,List.class);
		admin=roles.contains("admin");
		
		Comment c=cr.findOne(id);
		
		if(admin==false && c.getRegUser().getUsername()!=username){
			throw new ServletException("Nemate pravo obrisati ovaj komentar");
		}
		
		cr.delete(id);
		return true;
	}
	
	@RequestMapping("/upcomment")
	public int upComment(@RequestParam(value="username") String username, @RequestParam(value="id") Long id) throws ServletException{
	
		Boolean logovan=false;
		logovan=this.restTemplate.getForObject("http://users-client/user/logged?username="+username,Boolean.class);
		
		if (logovan==false){
			throw new ServletException("Niste logovani");
		}
		
		Comment c=cr.findOne(id);
		RegisteredUser user=ur.findByUsername(username);
		
		if(vr.findVoteByUserAndComment(user.getId(),id)!=null){
		Vote v=new Vote();
		v.setComment(c);
		v.setRegUser(user);
		v.setNumber(1);
		vr.save(v);
		}
		
		return 1;
		
	}
	
	@RequestMapping("/downcomment")
	public int downComment(@RequestParam(value="username") String username, @RequestParam(value="id") Long id) throws ServletException{
	
		Boolean logovan=false;
		logovan=this.restTemplate.getForObject("http://users-client/user/logged?username="+username,Boolean.class);
		
		if (logovan==false){
			throw new ServletException("Niste logovani");
		}
		
		RegisteredUser user=ur.findByUsername(username);
		Comment c=cr.findOne(id);
		
		Vote v=new Vote();
		

		v=vr.findVoteByUserAndComment(user.getId(),id);
		
		if(v!=null){
		
			if(v.getNumber()==1){
				v.setNumber(-1);
			}
			else{
				v.setComment(c);
				v.setRegUser(user);
				v.setNumber(-1);
			}
		}else{
			
			v.setComment(c);
			v.setRegUser(user);
			v.setNumber(-1);
		}
		vr.save(v);
		return -1;
	}
	
	@RequestMapping("/positivevotes")
	public int positiveVotes(@RequestParam(value="id") Long id){
		return vr.positiveVotesForComment(id);
	}
	
	@RequestMapping("/negativevotes")
	public int negativeVotes(@RequestParam(value="id") Long id){
		return vr.negativeVotesForComment(id);
	}
	
	
	@SuppressWarnings("unused")
	private static class CommentBody{
		public String tekst;
		public Long idDiskusije;
		public String username;
	}
}
