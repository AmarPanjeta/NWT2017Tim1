package Repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import Models.Test;

@RepositoryRestResource(path="tests",collectionResourceRel="tests")
public interface TestRepository extends CrudRepository<Test, Long>{

}
