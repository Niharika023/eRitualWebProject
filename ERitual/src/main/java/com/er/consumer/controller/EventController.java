package com.er.consumer.controller;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.er.consumer.util.CommonUtility;
import com.er.consumer.util.Constant;
import com.er.consumer.util.HttpUtil;
import com.er.consumer.util.ServiceResponse;


@PropertySource({"classpath:application-prod.properties","classpath:application-dev.properties"})
@RestController
@RequestMapping("/event")
public class EventController {
	@Autowired
	Environment environment;
	private static final String EVENT_LIST = "/list";
	private static final String CREATE_EVENT = "/create";
	private static final String DELETE_EVENT_ID="/delete";
	private static final String UPDATE_EVENT="/update";
	private static final String EVENT_LIST_BY_ID="/get/byId";
	private static final String UPLOAD_IMAGE = "/image";
	
	@RequestMapping(value = EVENT_LIST, method = RequestMethod.GET)
	public void getEventList(HttpServletRequest request, HttpServletResponse response, HttpSession session) {
		String url =null;
		String queryParameter="";
		if( request.getParameter("search") != null)
			queryParameter= "nameLike=" +request.getParameter("search");
		if(request.getParameter("searchByCity") != null)
			queryParameter+=";cityLike="+request.getParameter("searchByCity");
		if(request.getParameter("searchByLocality") != null)
			queryParameter+=";localityLike="+request.getParameter("searchByLocality");
		if(request.getParameter("orderByName") != null)
			queryParameter+=";orderByName="+request.getParameter("orderByName");
		if(request.getParameter("orderByAmount") !=null)
			queryParameter+=";orderByAmount="+request.getParameter("orderByAmount");
		if(request.getParameter("orderByDate") != null)
			queryParameter+=";orderByDate="+request.getParameter("orderByDate");
		if(request.getParameter("orderByUpdatedTS") != null)
			queryParameter+=";orderByUpdatedTS="+request.getParameter("orderByUpdatedTS");
		if(request.getParameter("orderByCity") != null)
			queryParameter+=";orderByCity="+request.getParameter("orderByCity");
		if(request.getParameter("amountLesserThan") != null)
			queryParameter+=";amountLesserThan="+request.getParameter("amountLesserThan");
		if(request.getParameter("amountGreaterThan") != null)
			queryParameter+=";amountGreaterThan="+request.getParameter("amountGreaterThan");
		if(request.getParameter("dateGreaterThan") != null)
			queryParameter+=";dateGreaterThan="+request.getParameter("dateGreaterThan");
		if(request.getParameter("dateLesserThan") != null)
			queryParameter+=";dateLesserThan="+request.getParameter("dateLesserThan");
		if(request.getParameter("available") != null)
			queryParameter+=";available="+request.getParameter("available");
		String pageSize=request.getParameter("pageSize");
		String pageNumber=request.getParameter("pageNumber");
		CommonUtility.isSessionActive(response, (String) session.getAttribute("access_token"));
			 url = "http://ec2-54-70-18-17.us-west-2.compute.amazonaws.com:8080/eritual-web/rest/event/list;"+queryParameter+";pageSize="+pageSize+";pageNumber="+pageNumber;
		ServiceResponse responseObj = HttpUtil.sendGet(url, (String) session.getAttribute("access_token"));
		CommonUtility.writeResponse(response, responseObj.getResponse(), responseObj.getStatus());
		
	}
	
	
	@RequestMapping(value = CREATE_EVENT, method = RequestMethod.POST)
	public void createEvent(HttpServletRequest request, HttpServletResponse response, HttpSession session) {
		CommonUtility.isSessionActive(response, (String) session.getAttribute("access_token"));
		JSONObject reqObj = CommonUtility.readInputStream(request);
		String roleLess="";
		if(session.getAttribute("roles")!=null){
			roleLess="";
		}
		else{
			roleLess="unauthorized";
		}
		MultiValueMap<String, String> map = new LinkedMultiValueMap<String, String>();
		String urlParameter = reqObj.toString();
		map.add("event", urlParameter.toString());
		String url = "http://ec2-54-70-18-17.us-west-2.compute.amazonaws.com:8080/eritual-web/rest/event/create";
		ServiceResponse responseObj = HttpUtil.sendPostForCreateOrUpdate(url, map, roleLess,(String) session.getAttribute("access_token"));
		CommonUtility.writeResponse(response, responseObj.getResponse(), responseObj.getStatus());
		
	}
	
	@RequestMapping(value = DELETE_EVENT_ID, method = RequestMethod.GET)
	public void removeEventId(HttpServletRequest request, HttpServletResponse response, HttpSession session) {
		String url =null;
		String eventId=null;
		String roleLess="";
		if(session.getAttribute("roles")!=null){
			roleLess="";
		}
		else{
			roleLess="unauthorized";
		}
		if( request.getParameter("eventId") != null)
			eventId= request.getParameter("eventId"); 
		CommonUtility.isSessionActive(response, (String) session.getAttribute("access_token"));
			 url = "http://ec2-54-70-18-17.us-west-2.compute.amazonaws.com:8080/eritual-web/rest/event/delete/"+eventId;
		ServiceResponse responseObj = HttpUtil.sendDelete(url, roleLess,(String) session.getAttribute("access_token"));
		CommonUtility.writeResponse(response, responseObj.getResponse(), responseObj.getStatus());
		
	}
	@RequestMapping(value = EVENT_LIST_BY_ID, method = RequestMethod.GET)
	public void getEventListById(HttpServletRequest request, HttpServletResponse response, HttpSession session) {
		String eventId=null;
		if( request.getParameter("eventId") != null)
			eventId= request.getParameter("eventId"); 
		CommonUtility.isSessionActive(response, (String) session.getAttribute("access_token"));
		String url = "http://ec2-54-70-18-17.us-west-2.compute.amazonaws.com:8080/eritual-web/rest/event/get/"+eventId;
		ServiceResponse responseObj = HttpUtil.sendGet(url, (String) session.getAttribute("access_token"));
		CommonUtility.writeResponse(response, responseObj.getResponse(), responseObj.getStatus());
		
	}
	
	
	@RequestMapping(value = UPDATE_EVENT, method = RequestMethod.POST)
	public void updateEvent(HttpServletRequest request, HttpServletResponse response, HttpSession session) {
		CommonUtility.isSessionActive(response, (String) session.getAttribute("access_token"));
		String roleLess="";
		if(session.getAttribute("roles")!=null){
			roleLess="";
		}
		else{
			roleLess="unauthorized";
		}
		JSONObject reqObj = CommonUtility.readInputStream(request);
		MultiValueMap<String, String> map = new LinkedMultiValueMap<String, String>();
		String urlParameter = reqObj.toString();
		map.add("event", urlParameter.toString());
		String url = "http://ec2-54-70-18-17.us-west-2.compute.amazonaws.com:8080/eritual-web/rest/event/update";
		ServiceResponse responseObj = HttpUtil.sendPostForCreateOrUpdate(url, map,roleLess, (String) session.getAttribute("access_token"));
		CommonUtility.writeResponse(response, responseObj.getResponse(), responseObj.getStatus());
		
	}
	}