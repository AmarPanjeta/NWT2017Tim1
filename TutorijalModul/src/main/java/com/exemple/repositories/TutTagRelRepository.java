package com.exemple.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.example.models.Comment;
import com.example.models.TutTagRel;

@RepositoryRestResource(path="tuttagrels", collectionResourceRel="tuttagrels")
public interface TutTagRelRepository extends CrudRepository<TutTagRel, Long>{

}
