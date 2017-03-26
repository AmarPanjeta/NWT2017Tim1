package com.example.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.example.models.Tutorial;

@RepositoryRestResource(path="tutorials", collectionResourceRel="tutorials")
public interface TutorialRepository extends CrudRepository<Tutorial, Long>{

}
