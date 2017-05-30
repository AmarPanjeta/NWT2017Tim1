package com.example.repositories;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.example.models.RegisteredUser;


@RepositoryRestResource(path="users",collectionResourceRel="users")
public interface UserRepository extends CrudRepository<RegisteredUser, Long>{
	
	@Query("select count(u) from RegisteredUser u where u.username=:username or u.email=:email")
	public int userexists(@Param("username") String username, @Param("email") String email);
	
	public RegisteredUser findUserByUsername(String username);
	
	public RegisteredUser findUserByEmail(String email);

}
