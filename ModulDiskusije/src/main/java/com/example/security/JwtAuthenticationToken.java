package com.example.security;

import java.util.Collection;

import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;

public class JwtAuthenticationToken extends AbstractAuthenticationToken{

	private String rawToken;
	private UserContext userContext;
	

    public JwtAuthenticationToken(String unsafeToken) {
        super(null);
        this.rawToken = unsafeToken;
        this.setAuthenticated(false);
    }

    public JwtAuthenticationToken(UserContext userContext, Collection<? extends GrantedAuthority> authorities) {
        super(authorities);
        this.eraseCredentials();
        this.userContext = userContext;
        super.setAuthenticated(true);
    }

    @Override
    public void setAuthenticated(boolean authenticated) {
        if (authenticated) {
            throw new IllegalArgumentException(
                    "Cannot set this token to trusted - use constructor which takes a GrantedAuthority list instead");
        }
        super.setAuthenticated(false);
    }

    @Override
    public Object getCredentials() {
        return rawToken;
    }
    
    @Override
    public String getName() {
    	// TODO Auto-generated method stub
    	return this.userContext.getUsername();
    }

    @Override
    public Object getPrincipal() {
        return this.userContext;
    }

    @Override
    public void eraseCredentials() {        
        super.eraseCredentials();
        this.rawToken = null;
    } 
    
    @Override
    public Collection<GrantedAuthority> getAuthorities() {
    	
    	return super.getAuthorities();
    }
}
