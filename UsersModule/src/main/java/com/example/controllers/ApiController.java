package com.example.controllers;

import java.security.Principal;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.jsonwebtoken.Claims;

@RestController
@RequestMapping("api")
public class ApiController {
	
	@RequestMapping("neradinista")
	public void nista(){
		
	}
	
	@RequestMapping("/")
	public String pr(Authentication a){
		return a.getAuthorities().toString();
	}
	
	@RequestMapping("/claims")
	public List<String> login(final HttpServletRequest request) {
		final Claims claims = (Claims) request.getAttribute("claims");
		
		return ((List<String>) claims.get("roles"));
		}
	
	@RequestMapping("/user")
	@PreAuthorize("hasAuthority('user')")
	public int i(){
		return 1;
	}
	
}
