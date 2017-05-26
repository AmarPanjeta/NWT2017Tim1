package com.example.security;

import java.io.IOException;
import java.util.ArrayList;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

public class HeaderFilter extends OncePerRequestFilter{
	@Override
	protected void doFilterInternal(HttpServletRequest req, HttpServletResponse res, FilterChain filterChain)
			throws ServletException, IOException {
		String header=req.getHeader("X-Resource-Server");
		if(header!=null){
			ArrayList<GrantedAuthority> authorities=new ArrayList<GrantedAuthority>();
			authorities.add(new SimpleGrantedAuthority("X-Resource-Server"));
			Authentication auth=new HeaderAuthenticationToken(authorities);
			SecurityContextHolder.getContext().setAuthentication(auth);
		}
		
		filterChain.doFilter(req, res);
	}
}
