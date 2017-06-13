package com.example.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.example.models.RegisteredUser;
import com.example.models.Score;
import com.example.repositories.CommentRepository;
import com.example.repositories.DiscussionRepository;
import com.example.repositories.ScoreRepository;
import com.example.repositories.UserRepository;
import com.example.repositories.VoteRepository;

@RequestMapping("/score")
@RestController
public class ScoreController {
	

	@Autowired
	private DiscussionRepository dr;
	
	@Autowired
	private UserRepository ur;
	
	@Autowired
	private CommentRepository cr;
	
	@Autowired
	private VoteRepository vr;
	
	@Autowired
	private ScoreRepository sr;
	
	@Autowired
	private RestTemplate restTemplate;
	
	
	@RequestMapping("/getpositivevotes")
	public int getPositivePointsForUser(@RequestParam(value="id") Long id){
		
		int points=vr.positiveVotesForComment(id);
		return points;
		
	}
	
	@RequestMapping("/getnegativevotes")
	public int getNegativePointsForUser(@RequestParam(value="id") Long id){
		
		int points=vr.negativeVotesForComment(id);
		return points;
		
	}
	
	@RequestMapping("/calculatescore")
	public int calculateScore(@RequestParam(value="id") Long id){
		
		int points=vr.negativeVotesOfUser(id)+vr.positiveVotesOfUser(id);
		return points;

	}
	
	@RequestMapping("/addscore")
	public int addScore(@RequestParam(value="id") Long id){
		
		RegisteredUser user=ur.findOne(id);
		int points=-vr.negativeVotesOfUser(id)+vr.positiveVotesOfUser(id);
		Score s=sr.findByUser(user);
		if(s==null)s=new Score();
		s.setUser(user);
		s.setPoints(points);
		sr.save(s);
		
		return 1;
	}
	
	@RequestMapping("/ranglist")
	public List<Score> ranglist(){
		
		return sr.getscorelist();		
		
	}

}
