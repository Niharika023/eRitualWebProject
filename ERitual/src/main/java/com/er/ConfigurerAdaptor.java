package com.er;

import org.springframework.boot.context.embedded.ServletRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;
import org.springframework.web.servlet.DispatcherServlet;
import org.springframework.web.servlet.config.annotation.DefaultServletHandlerConfigurer;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.PathMatchConfigurer;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;
import org.springframework.web.servlet.view.InternalResourceViewResolver;
import com.er.consumer.util.HttpSessionCollector;

@Configuration
@EnableWebMvc
public class ConfigurerAdaptor extends WebMvcConfigurerAdapter {
	@Override
	public void configureDefaultServletHandling(DefaultServletHandlerConfigurer configurer) {
		configurer.enable();
	}
	
	@Bean 
	public CommonsMultipartResolver multipartResolver(){ 
		CommonsMultipartResolver resolver = new CommonsMultipartResolver(); 
		return resolver;
	}

	@Bean
	public InternalResourceViewResolver viewResolver() {
		InternalResourceViewResolver resolver = new InternalResourceViewResolver();
		resolver.setPrefix("");
		resolver.setSuffix(".html");
		return resolver;
	}

	@Bean
	public InternalResourceViewResolver jspViewResolver() {
		InternalResourceViewResolver resolver = new InternalResourceViewResolver();
		resolver.setPrefix("WEB-INF/jspViews/");
		resolver.setSuffix(".jsp");
		// resolver.setOrder(1);
		return resolver;
	}

	@Bean
	public ServletRegistrationBean dispatcherRegistration(DispatcherServlet dispatcherServlet) {
		ServletRegistrationBean registration = new ServletRegistrationBean(dispatcherServlet);
		registration.addUrlMappings("/er/*");
		return registration;
	}

	

	@Bean
    public HttpSessionCollector executorListener() {
       return new HttpSessionCollector();
    }
	/**
	 * Overrides the configurePathMatch() method in WebMvcConfigurerAdapter <br/>
	 * Allows us to set a custom path matcher, used by the MVC for @RequestMapping's
	 * @param configurer
	 */
	@Override
	public void configurePathMatch(PathMatchConfigurer configurer) {
		configurer.getPathMatcher();// = pathMatcher();
	}
	
	
}