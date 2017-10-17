package com.er;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.context.web.SpringBootServletInitializer;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

@Configuration
@ComponentScan
@EnableAutoConfiguration
@SpringBootApplication
@EnableScheduling
public class ERitual extends SpringBootServletInitializer {
	private static Class<ERitual> applicationClass = ERitual.class;

	public static void main(String[] args) {
		SpringApplication.run(applicationClass, args);
	}

	/*@Override
	protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
		String logPath = this.getClass().getClassLoader().getResource("").getPath();
		logPath = logPath.replace("%20", " ");
		logPath = logPath.substring(0, logPath.indexOf("WEB-INF/classes/")) + "logs/kpLog.log";
		System.setProperty("kpSiteConsumerLogPath", logPath);
		return application.sources(applicationClass);
	}*/
}
