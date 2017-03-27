package com.example.controllers;

import java.util.concurrent.atomic.AtomicLong;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.models.RegisteredUser;

@RestController
public class RegisteredUserController {
	
	private final AtomicLong br = new AtomicLong();
	
	@RequestMapping("/korisnici")
	public RegisteredUser korisnici(@RequestParam(value="username") String username){
		
		RegisteredUser rg = new RegisteredUser();
		rg.setUsername(username);
		rg.setId(br.incrementAndGet());
		return rg;
		
	}

}
