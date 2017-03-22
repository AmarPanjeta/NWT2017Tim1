package Repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import Models.RegisteredUser;

@RepositoryRestResource(path="users",collectionResourceRel="users")
public interface RegisteredUserRepository extends CrudRepository<RegisteredUser, Long>{

}
