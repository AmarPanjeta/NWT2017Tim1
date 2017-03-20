package com.example.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.example.models.RegisteredUser;

@RepositoryRestResource(path="users",collectionResourceRel="users")
public interface UserRepository extends CrudRepository<RegisteredUser, Long>{

}
