package com.example.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.example.models.Comment;
import com.example.models.Tag;
import com.example.models.Tutorial;
import com.example.models.TutorialTag;
import com.example.models.TutorialUser;

@RepositoryRestResource(path="tutorials", collectionResourceRel="tutorials")
public interface TutorialRepository extends CrudRepository<Tutorial, Long>{

		List<Tutorial> findByTextLike(String text);
		
		@Query("select t from Tutorial t where t.title LIKE %:word%")
		List<Tutorial> findByTitleLike(@Param("word") String word);   
		
		//TutorialUser findByName(@Param("name") String name);
		
		@Query("select t from Tutorial t, TutTagRel ttr where ttr.tutId = t.id and ttr.tagId = :id")
		public List<Tutorial> getTutorialsByTag(@Param("id") Long id);
		
		@Query("select ttr.tagId from Tutorial t, TutTutTagRel ttr where ttr.tutId = t.id and t.id = :id")
		public List<TutorialTag> getTutUserTag(@Param("id") Long id);
		
		@Query("select ttr.tagId from Tutorial t, TutTagRel ttr where ttr.tutId = t.id and t.id = :id")
		public List<Tag> getTutTag(@Param("id") Long id);
		
		@Query("select c from Comment c where c.tutId = id")
		List<Comment> getTutComs(long id);

}
