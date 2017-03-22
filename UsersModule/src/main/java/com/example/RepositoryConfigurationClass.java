package com.example;

import javax.annotation.security.RolesAllowed;

import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurerAdapter;
import org.springframework.stereotype.Component;

import com.example.models.Claim;
import com.example.models.Role;
import com.example.models.UserRole;

@Component
public class RepositoryConfigurationClass extends RepositoryRestConfigurerAdapter{

	@Override
	public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config) {
		config.exposeIdsFor(Claim.class);
		config.exposeIdsFor(Role.class);
		config.exposeIdsFor(UserRole.class);
		super.configureRepositoryRestConfiguration(config);
	}
	
}
