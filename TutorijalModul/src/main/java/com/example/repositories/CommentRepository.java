package com.example.repositories;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.example.models.Comment;
import com.example.models.Tag;

@RepositoryRestResource(path="comments", collectionResourceRel="comments")
public interface CommentRepository extends CrudRepository<Comment, Long>{

//public List<Comment> findFirst10ByName(String name);
	
}


