package com.example.repositories;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.example.models.Comment;
import com.example.models.Tag;

@RepositoryRestResource(path="tags", collectionResourceRel="tags")
public interface TagRepository extends CrudRepository<Tag, Long> {

	public List<Tag> findByTextLike(String string);

}
