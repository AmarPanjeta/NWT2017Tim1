package Repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import Models.Solution;

@RepositoryRestResource(path="solutions",collectionResourceRel="solutions")
public interface SolutionRepository extends CrudRepository<Solution, Long>{

}
