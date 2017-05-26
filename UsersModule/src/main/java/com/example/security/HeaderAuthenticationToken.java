package com.example.security;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;

public class HeaderAuthenticationToken extends AbstractAuthenticationToken {

	public HeaderAuthenticationToken(Collection<? extends GrantedAuthority> authorities) {
		super(authorities);
		super.setAuthenticated(true);
	}
	
	@Override
	public Object getCredentials() {
		return "X-Resource-Server";
	}

	@Override
	public Object getPrincipal() {
		return "X-Resource-Server";
	}
	
	
	

}
