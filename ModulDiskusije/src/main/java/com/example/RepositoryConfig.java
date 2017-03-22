package com.example;

import javax.persistence.criteria.CriteriaBuilder.In;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurerAdapter;
import org.springframework.data.rest.webmvc.config.RepositoryRestMvcConfiguration;

import com.example.models.Comment;
import com.example.models.Discussion;
import com.example.models.DiscussionTag;
import com.example.models.Interest;
import com.example.models.RegisteredUser;
import com.example.models.Score;
import com.example.models.Tag;
import com.example.models.Vote;

@Configuration
public class RepositoryConfig extends RepositoryRestConfigurerAdapter{
	
	@Override
	public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config){
		config.exposeIdsFor(RegisteredUser.class);
		config.exposeIdsFor(Comment.class);
		config.exposeIdsFor(Discussion.class);
		config.exposeIdsFor(DiscussionTag.class);
		config.exposeIdsFor(Interest.class);
		config.exposeIdsFor(Score.class);
		config.exposeIdsFor(Tag.class);
		config.exposeIdsFor(Vote.class);
	
	}

}
