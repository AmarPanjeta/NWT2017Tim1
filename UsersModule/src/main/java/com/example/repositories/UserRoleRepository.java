package com.example.repositories;

import org.springframework.data.repository.CrudRepository;

import com.example.models.UserRole;

public interface UserRoleRepository extends CrudRepository<UserRole, Long> {

}
