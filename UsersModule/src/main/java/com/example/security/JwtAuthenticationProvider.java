package com.example.security;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;

@Component
public class JwtAuthenticationProvider implements AuthenticationProvider{
	

	@Override
	public Authentication authenticate(Authentication auth) throws AuthenticationException {
		
		String rawToken=(String)auth.getCredentials();
		Claims claims=Jwts.parser().setSigningKey("secretkey")
                .parseClaimsJws(rawToken).getBody();
		List<String> scopes = (List<String>) claims.get("roles");
		List<GrantedAuthority> authorities = scopes.stream()
				.map(authority->new SimpleGrantedAuthority(authority))
				.collect(Collectors.toList());
		String username=claims.getSubject();
		UserContext context = UserContext.create(username, authorities);
		
		return new JwtAuthenticationToken(context, authorities);
	}
	
	@Override
	public boolean supports(Class<?> authentication) {
		return (JwtAuthenticationToken.class.isAssignableFrom(authentication));
	}
	

}
