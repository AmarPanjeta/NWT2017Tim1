package com.example.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.example.models.Discussion;

@RepositoryRestResource(path="discussions",collectionResourceRel="discussions")
public interface DiscussionRepository extends CrudRepository<Discussion, Long>{

}
