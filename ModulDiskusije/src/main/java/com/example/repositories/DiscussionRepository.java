package com.example.repositories;


import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.example.models.Discussion;

@RepositoryRestResource(path="discussions",collectionResourceRel="discussions")
public interface DiscussionRepository extends CrudRepository<Discussion, Long>{

	@Query("select d from Discussion d where d.regUser.username=:username")
	public List<Discussion> getDiscussionsByUsername(@Param("username") String username);
	
	@Query("select d from Discussion d where d.open=:status")
	public List<Discussion> getDiscussionsByStatus(@Param("status") Boolean status);
	
	@Query("select d from Discussion d where d.regUser.username=:username and d.open=:status")
	public List<Discussion> getDiscussionsByUsernameAndStatus(@Param("username") String username,@Param("status") Boolean status);

	@Query("select d from Discussion d,Interest i,RegisteredUser ru where ru.username= :username and i.regUser=ru and i.discuss=d")
	public List<Discussion> getInterestingDiscussions(@Param("username") String username);
    
	//DORADITI DA PRIKAZUJE TOP number PO BROJU ZAINTERESOVANIH KORISNIKA
	@Query("select count(i.regUser.id),i.discuss.id from Interest i group by i.discuss.id")
	public List<Object[]> getPopularDiscussions(); 

}
