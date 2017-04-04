package Repositories;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import Models.Test;

@RepositoryRestResource(path="tests",collectionResourceRel="tests")
public interface TestRepository extends CrudRepository<Test, Long>{
	Test findById(@Param("id") long id);
	
	@Query("select t from Test t, Task tt where t.task=tt and tt.id=:id")
	public List<Test> getAllTaskTests(@Param("id") long id);
}
