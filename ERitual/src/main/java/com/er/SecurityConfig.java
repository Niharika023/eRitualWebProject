package com.er;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        // Prevent the HTTP response header of "Pragma: no-cache".
        //http.headers().cacheControl().disable();
    	http.csrf().disable();
        http.headers().frameOptions().sameOrigin().httpStrictTransportSecurity().disable();
    }

	@Override
	public void configure(WebSecurity web) throws Exception {
	    //web.ignoring().antMatchers("/**");
	}
}
