package com.exemple.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.example.models.Comment;
import com.example.models.TutorialTag;

@RepositoryRestResource(path="tutorialtags", collectionResourceRel="tutorialtags")
public interface TutorialTagRepository extends CrudRepository<TutorialTag, Long>{

}
