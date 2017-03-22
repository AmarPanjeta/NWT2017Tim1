package com.example.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.example.models.Claim;

@RepositoryRestResource(path="claims",collectionResourceRel="klejms")
public interface ClaimRepository extends CrudRepository<Claim, Long>{

}
