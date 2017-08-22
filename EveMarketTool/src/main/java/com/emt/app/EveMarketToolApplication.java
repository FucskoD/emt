package com.emt.app;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;


@SpringBootApplication
@ComponentScan(basePackages = {"com.emt.controller", "com.emt.configuration"})
public class EveMarketToolApplication {
			
	public static void main(String[] args) {
		SpringApplication.run(EveMarketToolApplication.class, args);
	}
}
