package com.emt.lines;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = {"com.emt.controller", "com.emt.configuration"})
public class EveMarketToolLinesApplication {

	public static void main(String[] args) {
		SpringApplication.run(EveMarketToolLinesApplication.class, args);
	}
}
