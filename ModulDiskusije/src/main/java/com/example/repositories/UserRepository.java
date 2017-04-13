package com.example.repositories;


import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.ResponseBody;

import com.example.models.RegisteredUser;

@RepositoryRestResource(path="users", collectionResourceRel="users")
public interface UserRepository extends CrudRepository<RegisteredUser, Long> {

	RegisteredUser findByUsername(@Param("username") String username);
	
	@Query("select ru from RegisteredUser ru,Score s where s.user.id=ru.id order by s.points desc")
	List<RegisteredUser> getranglist();
	
	
	
}
