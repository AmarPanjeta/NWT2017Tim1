package com.example.repositories;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.example.models.DiscussionTag;

@RepositoryRestResource(path="discussiontag",collectionResourceRel="discussiontag")
public interface DiscussionTagRepository extends CrudRepository<DiscussionTag, Long> {
	
	//@Modifying
	//@Transactional
	//@Query("delete from DiscussionTag dt where dt.discussion.id=:discussion and dt.tag.id=:tag")
	//public int deletediscussiontag(@Param("discussion") Long discussion,@Param("tag") Long tag);

}
