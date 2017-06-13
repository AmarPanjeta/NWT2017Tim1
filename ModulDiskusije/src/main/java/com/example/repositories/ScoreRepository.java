package com.example.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.example.models.RegisteredUser;
import com.example.models.Score;

@RepositoryRestResource(path="scores",collectionResourceRel="scores")
public interface ScoreRepository extends CrudRepository<Score, Long> {
	
	public Score findByUser(RegisteredUser User);
	
	@Query("select s from Score s order by points desc")
	public List<Score> getscorelist();
	

}
