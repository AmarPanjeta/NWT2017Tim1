package com.example;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurerAdapter;

import com.example.models.TutorialUser;

@Configuration
public class RepositoryConfig extends RepositoryRestConfigurerAdapter{
	@Override
	public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config)
	{
		config.isIdExposedFor(TutorialUser.class);
	}
}
