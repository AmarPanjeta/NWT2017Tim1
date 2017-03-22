package com.example.repositories;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.example.models.Vote;

@RepositoryRestResource(path="votes",collectionResourceRel="votes")
public interface VoteRepository extends CrudRepository<Vote, Long>{

	//@Modifying
	//@Transactional
	//@Query("delete from Vote v where v.user.id=:user and v.comment.id=:comment")
	//public int deletevote(@Param("user") Long user, @Param("comment") Long comment);
}
