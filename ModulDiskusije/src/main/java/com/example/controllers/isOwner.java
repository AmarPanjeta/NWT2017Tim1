package com.example.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.RequestParam;

import com.example.models.Discussion;
import com.example.repositories.DiscussionRepository;

@Component("userPermissions")
public class isOwner {
	@Autowired
	DiscussionRepository dr;
	public boolean isOwner(long id,String username){
		Discussion d=dr.findOne(id);
		return d.getRegUser().getUsername().equals(username);
	}
}
