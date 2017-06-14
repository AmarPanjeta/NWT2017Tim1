package Repositories;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import Models.Solution;

@RepositoryRestResource(path="solutions",collectionResourceRel="solutions")
public interface SolutionRepository extends CrudRepository<Solution, Long>{
	
	//vraca sva rjesenja na neki zadatak
	@Query("select s from Solution s, Task t where t.id=:id and s.task=t")
	public List<Solution> getAllTaskSolutions(@Param("id") long id);
	
	//vraca rjesenja zadatka poredana po passing
	@Query("select s from Solution s, Task t where t.id=:id and s.task=t ORDER BY s.passing DESC")
	public List<Solution> findAllTaskSolutionsOrderedByPassing(@Param("id") long id);
	
	//vraca sva rjesenja koja je postavio korisnik na razl zadatke
	@Query("select s from Solution s, RegisteredUser ru where ru.id=:id and s.user=ru")
	public List<Solution> getAllUserSolutions(@Param("id") long id);
	
	Solution findById(@Param("id") long id);
	
	@Query("select count(s) from Solution s where s.task.id=:id")
	public int countSolutionsByTask(@Param("id") long id);
	
	@Query("select s from Solution s where s.user.username=:username and s.task.id=:taskid")
	public List<Solution> getSolutionsByUserAndTask(@Param("taskid") long taskid, @Param("username") String username);
		
}
