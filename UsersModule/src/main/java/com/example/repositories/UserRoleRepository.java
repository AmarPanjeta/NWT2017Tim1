package com.example.repositories;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.example.models.UserRole;

public interface UserRoleRepository extends CrudRepository<UserRole, Long> {
	
	@Modifying
	@Transactional
	@Query("delete from UserRole u where u.user.username=:username and u.role.name=:rolename")
	public int removeRole(@Param("username") String username, @Param("rolename") String rolename);
}
