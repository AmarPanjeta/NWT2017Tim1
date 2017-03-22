package com.example.repositories;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.example.models.Interest;

@RepositoryRestResource(path="interests",collectionResourceRel="interests")
public interface InterestRepository extends CrudRepository<Interest, Long> {
	
	//@Modifying
	//@Transactional
	//@Query("delete from Interest i where i.user.id=:user and i.discussion.id=:discussion")
	//public int deleteinterest(@Param("user") Long user, @Param("discussion") Long discussion);

}
