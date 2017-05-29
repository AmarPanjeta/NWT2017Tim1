package com.example.controllers;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("c")
public class Ctrl {
	
	@RequestMapping("/")
	@PreAuthorize("isAuthorized()")
	public int method(){
		return 1;
	}
}
