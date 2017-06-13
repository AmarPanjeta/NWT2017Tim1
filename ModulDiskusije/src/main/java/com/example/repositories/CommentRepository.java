package com.example.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.example.models.Comment;

@RepositoryRestResource(path="comments",collectionResourceRel="comments")
public interface CommentRepository extends CrudRepository<Comment, Long>{
	
	@Query("select c from Comment c where c.discuss.id=:id order by c.created asc")
	public List<Comment> getCommentsByDiscussion(@Param("id") long id);

}
