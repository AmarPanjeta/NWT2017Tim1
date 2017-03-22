package com.example;import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.repository.CrudRepository;

import com.example.models.Comment;

@Configuration
@EntityScan(basePackages={
		"com.example.models"
})
@EnableJpaRepositories(basePackages={
		"com.example.repositories"
})
public class Config {

	
}
