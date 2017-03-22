package com.exemple.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.example.models.Tag;

@RepositoryRestResource(path="tags", collectionResourceRel="tags")
public interface TagRepository extends CrudRepository<Tag, Long> {

}
