package Repositories;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import Models.Task;

@RepositoryRestResource(path="tasks",collectionResourceRel="tasks")
public interface TaskRepository extends CrudRepository<Task, Long>{
	Task findById(@Param("id") long id);
	
	//vraca sve taskove koje je postavio user sa datim id-em
	@Query("select t from Task t, RegisteredUser ru where t.user=ru and ru.id=:id")
	public List<Task> getAllUserTasks(@Param("id") long id);
	
}
