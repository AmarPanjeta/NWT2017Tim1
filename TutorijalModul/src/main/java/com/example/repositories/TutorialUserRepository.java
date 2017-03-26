package com.example.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.example.models.Comment;
import com.example.models.TutorialUser;

@RepositoryRestResource(path="tutusers", collectionResourceRel="tutusers")
public interface TutorialUserRepository extends CrudRepository<TutorialUser, Long>{

}
