package com.example.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.example.models.Links;

@RepositoryRestResource(path="links",collectionResourceRel="links")
public interface LinksRepository extends CrudRepository<Links, Long>{
	
	Links findByUserUsername(@Param("username") String username);
	
	int countByUserUsername(String username);
	
	Links findByActivation(String activation);
	
	Links findByForgotPassword(String forgotPassword);

}
