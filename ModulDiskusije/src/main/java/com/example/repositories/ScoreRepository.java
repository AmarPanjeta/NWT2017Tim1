package com.example.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.example.models.Score;

@RepositoryRestResource(path="scores",collectionResourceRel="scores")
public interface ScoreRepository extends CrudRepository<Score, Long> {
	
	

}
