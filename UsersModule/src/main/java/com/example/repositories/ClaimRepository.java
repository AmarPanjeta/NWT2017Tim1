package com.example.repositories;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.example.models.Claim;

@RepositoryRestResource(path="claims",collectionResourceRel="klejms")
public interface ClaimRepository extends CrudRepository<Claim, Long>{
	
	@Query("select count(c) from Claim c where c.userid.username=:username")
	int getnumberofclaims(@Param("username") String username);
}
