package Repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import Models.Task;

@RepositoryRestResource(path="tasks",collectionResourceRel="tasks")
public interface TaskRepository extends CrudRepository<Task, Long>{

}
