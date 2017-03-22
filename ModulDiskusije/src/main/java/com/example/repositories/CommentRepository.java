package com.example.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.example.models.Comment;

@RepositoryRestResource(path="comments",collectionResourceRel="comments")
public interface CommentRepository extends CrudRepository<Comment, Long>{
	
	

}
