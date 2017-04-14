package com.example.controllers;

import java.util.List;
import java.util.concurrent.atomic.AtomicLong;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.example.models.TutorialUser;


@RestController
@RequestMapping("usr")
public class TutorialUserController {

	
	private final AtomicLong br = new AtomicLong();
	
	@Autowired
	RestTemplate restTemplate;
	
	@RequestMapping("/korisnici")
	public TutorialUser korisnici(@RequestParam(value="username") String username){
		
		TutorialUser rg = new TutorialUser();
		rg.setName(username);
		rg.setId(br.incrementAndGet());
		return rg;
		
	}
	
	@RequestMapping("/isadmin")
	
	public Boolean isAdmin(@RequestParam(value="username") String username){
		
		List<String> roles=this.restTemplate.getForObject("http://users-client/user/roles?username="+username,List.class);
		return roles.contains("admin");
	}

}
