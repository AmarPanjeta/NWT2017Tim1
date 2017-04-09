package com.example.controllers;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;

import javax.ws.rs.DELETE;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.models.Discussion;
import com.example.models.RegisteredUser;
import com.example.repositories.DiscussionRepository;
import com.example.repositories.UserRepository;

@RestController
public class DiscussionController {

	@Autowired
	private DiscussionRepository dr;
	
	@Autowired
	private UserRepository ur;
	
	private RegisteredUserController ruc;
	
	@RequestMapping("/diskusije")
	public int deleteDiscussion(@RequestParam(value="id") Long id){
		//Discussion d=dr.findOne(id);
		//String username=ru.getUsername();
		//if (ruc.isAdmin(username)==true || d.getRegUser() ){
			//dr.delete(id);
			//return 1;
		//}
		return 0;
	}
}
