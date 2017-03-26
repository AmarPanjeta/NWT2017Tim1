package com.example.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.example.models.Comment;
import com.example.models.TutTutTagRel;

@RepositoryRestResource(path="tuttuttagrels", collectionResourceRel="tuttuttagrels")
public interface TutTutTagRelRepositoy extends CrudRepository<TutTutTagRel, Long>{

}
