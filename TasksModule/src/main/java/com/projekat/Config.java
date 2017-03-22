package com.projekat;

import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@Configuration
@EntityScan(basePackages={"Models"})
@EnableJpaRepositories(basePackages={"Repositories"})
@ComponentScan("Controllers")

public class Config {

}
