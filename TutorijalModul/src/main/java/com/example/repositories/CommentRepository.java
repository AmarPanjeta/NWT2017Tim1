package com.example.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.example.models.Comment;
import com.example.models.Tag;
import com.example.models.Tutorial;

@RepositoryRestResource(path="comments", collectionResourceRel="comments")
public interface CommentRepository extends CrudRepository<Comment, Long>{

	
	@Query("select t from Tutorial t, TutTagRel ttr where ttr.tutId = t.id and ttr.tagId = :id")
	public List<Tutorial> getTutorialsByTag(@Param("id") Long id);
	
	
	
}


