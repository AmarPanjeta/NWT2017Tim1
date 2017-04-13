package Repositories;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import Models.RegisteredUser;

@RepositoryRestResource(path="users",collectionResourceRel="users")
public interface RegisteredUserRepository extends CrudRepository<RegisteredUser, Long>{
	RegisteredUser findById(@Param("id") long id);
	RegisteredUser findByUsername(@Param("username") String username);
	
	//vraca usere koji su postavili rjesenje za zadatak
	@Query("select ru from RegisteredUser ru, Task t, Solution s where s.user=ru and s.task=t and t.id=:id")
	public List<RegisteredUser> getAllUsersSolvedTask(@Param("id") long id);
}
