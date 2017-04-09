package com.example.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.example.models.Role;

public interface RoleRepository extends CrudRepository<Role, Long>{
	
	@Query("select distinct(r) from Role r,RegisteredUser u,UserRole ur where ur.user.username=:username and ur.role=r")
	List<Role> getrolesbyuser(@Param("username") String username);
}
