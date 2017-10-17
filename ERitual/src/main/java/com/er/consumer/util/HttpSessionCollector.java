package com.er.consumer.util;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpSession;
import javax.servlet.http.HttpSessionEvent;
import javax.servlet.http.HttpSessionListener;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
@Configuration
@PropertySource({"classpath:/application.properties"})
public class HttpSessionCollector implements HttpSessionListener
{
	@Value("${sessiontimeout}")
	private int sessionTimeoutSec;
	
	public HttpSessionCollector()
	{
		super();
		System.out.println("---------------------------HttpSessionCollector");
	}
	private static final Map<String, HttpSession> sessions = new HashMap<String, HttpSession>();
		@Override
	    public void sessionCreated(HttpSessionEvent event) {
	        HttpSession session = event.getSession();

	        session.setMaxInactiveInterval((int) sessionTimeoutSec);
	        sessions.put(session.getId(), session);
	    }
		//private static final Map<String, String> userSessionList = new HashMap<String, String>();

	    @Override
	    public void sessionDestroyed(HttpSessionEvent event) {
	        sessions.remove(event.getSession().getId());
	    }

	    public static HttpSession find(String sessionId) {
	        return sessions.get(sessionId);
	    }
	 /*   public static void addUserId(String sessionId,String userId){
	    	userSessionList.put(sessionId, userId);
	    }
	    public static void removeUserId(String sessionId,String userId) {
	    	String mapUserId=userSessionList.get(sessionId);
	    	if(mapUserId!=null && userId.equals(mapUserId)){
	    		userSessionList.remove("sessionId");
	    	}
	    }*/
	    public static int noOfActiveSessions(){
	    	 int count=0;
	    	for (HttpSession sessionValue : sessions.values()) {
	    	    if(sessionValue !=null && sessionValue.getAttribute("userAccessId")!=null){
	    	    	count=count+1;
	    	    }
	    	}
	    	return count;
	    }
	    public static String currentSessionId(){
	    	String sessionId=null;
	    	for (HttpSession sessionValue : sessions.values()) {
	    	    if(sessionValue !=null && sessionValue.getAttribute("userAccessId")!=null){
	    	    	sessionId=sessionValue.getId();
	    	    }
	    	}
	    	return sessionId;
	    	
	    }
}
