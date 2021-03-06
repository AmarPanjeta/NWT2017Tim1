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
	
	@Modifying
	@Transactional
	@Query("delete from Interest i where i.id in (select i2.id from Interest i2 where i2.regUser.username=:username and i2.discuss.id=:id)")
	public int deleteinterest(@Param("username") String username, @Param("id") Long id);

	@Query("select count(i) from Interest i where i.regUser.username=:username and i.discuss.id=:discussion")
	public int isInterested(@Param("username") String username, @Param("discussion") Long discussion);
	

}
