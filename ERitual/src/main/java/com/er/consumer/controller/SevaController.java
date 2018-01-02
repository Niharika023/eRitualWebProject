package com.er.consumer.controller;
import java.util.ArrayList;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.er.consumer.util.CommonUtility;
import com.er.consumer.util.Constant;
import com.er.consumer.util.HttpUtil;
import com.er.consumer.util.ServiceResponse;


@PropertySource({"classpath:application-prod.properties","classpath:application-dev.properties"})
@RestController
@RequestMapping("/seva")
public class SevaController {
	@Autowired
	Environment environment;
	private static final String SEVA_LIST = "/list";
	private static final String CREATE_SEVA = "/create";
	private static final String DELETE_SEVA_ID="/delete";
	private static final String SEVA_LIST_BY_ID="/get/byId";
	private static final String UPDATE_SEVA="/update";
	private static final String CREATE_CONTENT="/content_create";
	
	
	@RequestMapping(value = SEVA_LIST, method = RequestMethod.GET)
	public void getSevaList(HttpServletRequest request, HttpServletResponse response, HttpSession session) {
		String url =null;
		String queryParameter="";
		if( request.getParameter("search") != null)
			queryParameter= "nameLike=" +request.getParameter("search");
		if(request.getParameter("orderByName") != null)
			queryParameter+=";orderByName="+request.getParameter("orderByName");
		if(request.getParameter("orderByAmount") !=null)
			queryParameter+=";orderByAmount="+request.getParameter("orderByAmount");
		if(request.getParameter("orderByTime") != null)
			queryParameter+=";orderByTime="+request.getParameter("orderByTime");
		if(request.getParameter("orderByUpdatedTS") != null)
			queryParameter+=";orderByUpdatedTS="+request.getParameter("orderByUpdatedTS");
		if(request.getParameter("amountLesserThan") != null)
			queryParameter+=";amountLesserThan="+request.getParameter("amountLesserThan");
		if(request.getParameter("amountGreaterThan") != null)
			queryParameter+=";amountGreaterThan="+request.getParameter("amountGreaterThan");
		if(request.getParameter("timeGreaterThan") != null)
			queryParameter+=";timeGreaterThan="+request.getParameter("timeGreaterThan");
		if(request.getParameter("timeLesserThan") != null)
			queryParameter+=";timeLesserThan="+request.getParameter("timeLesserThan");
		if(request.getParameter("available") != null)
			queryParameter+=";available="+request.getParameter("available");
		String pageSize=request.getParameter("pageSize");
		String pageNumber=request.getParameter("pageNumber");
		CommonUtility.isSessionActive(response, (String) session.getAttribute("access_token"));
			 url = "http://ec2-54-70-18-17.us-west-2.compute.amazonaws.com:8080/eritual-web/rest/seva/list;"+queryParameter+";pageSize="+pageSize+";pageNumber="+pageNumber;
		ServiceResponse responseObj = HttpUtil.sendGet(url, (String) session.getAttribute("access_token"));
		CommonUtility.writeResponse(response, responseObj.getResponse(), responseObj.getStatus());
		
	}
	
	@RequestMapping(value = CREATE_SEVA, method = RequestMethod.POST)
	public void createSeva(HttpServletRequest request, HttpServletResponse response, HttpSession session) {
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
		map.add("seva", urlParameter.toString());
		String url = "http://ec2-54-70-18-17.us-west-2.compute.amazonaws.com:8080/eritual-web/rest/seva/create";
		ServiceResponse responseObj = HttpUtil.sendPostForCreateOrUpdate(url, map,roleLess,(String) session.getAttribute("access_token"));
		CommonUtility.writeResponse(response, responseObj.getResponse(), responseObj.getStatus());
	}
	
	@RequestMapping(value = CREATE_CONTENT, method = RequestMethod.POST)
	public void createContent(HttpServletRequest request, HttpServletResponse response, HttpSession session) {
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
		map.add("hostedContent", urlParameter.toString());
		String url = "http://ec2-54-70-18-17.us-west-2.compute.amazonaws.com:8080/eritual-web/rest/hosted-content/create";
		ServiceResponse responseObj = HttpUtil.sendPostForCreateOrUpdate(url, map,roleLess,(String) session.getAttribute("access_token"));
		CommonUtility.writeResponse(response, responseObj.getResponse(), responseObj.getStatus());
	}
	
	@RequestMapping(value = DELETE_SEVA_ID, method = RequestMethod.GET)
	public void removeSevaId(HttpServletRequest request, HttpServletResponse response, HttpSession session) {
		String url =null;
		String sevaId=null;
		String roleLess="";
		if(session.getAttribute("roles")!=null){
			roleLess="";
		}
		else{
			roleLess="unauthorized";
		}
		if( request.getParameter("sevaId") != null)
			sevaId= request.getParameter("sevaId"); 
		CommonUtility.isSessionActive(response, (String) session.getAttribute("access_token"));
			 url = "http://ec2-54-70-18-17.us-west-2.compute.amazonaws.com:8080/eritual-web/rest/seva/delete/"+sevaId;
		ServiceResponse responseObj = HttpUtil.sendDelete(url,roleLess, (String) session.getAttribute("access_token"));
		CommonUtility.writeResponse(response, responseObj.getResponse(), responseObj.getStatus());
		
	}
	
	@RequestMapping(value = SEVA_LIST_BY_ID, method = RequestMethod.GET)
	public void getSevaListById(HttpServletRequest request, HttpServletResponse response, HttpSession session) {
		String sevaId=null;
		if( request.getParameter("sevaId") != null)
			sevaId= request.getParameter("sevaId"); 
		CommonUtility.isSessionActive(response, (String) session.getAttribute("access_token"));
		String url = "http://ec2-54-70-18-17.us-west-2.compute.amazonaws.com:8080/eritual-web/rest/seva/get/"+sevaId;
		ServiceResponse responseObj = HttpUtil.sendGet(url, (String) session.getAttribute("access_token"));
		CommonUtility.writeResponse(response, responseObj.getResponse(), responseObj.getStatus());
		
	}
	
	
	@RequestMapping(value = UPDATE_SEVA, method = RequestMethod.POST)
	public void updateSeva(HttpServletRequest request, HttpServletResponse response, HttpSession session) {
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
		map.add("seva", urlParameter.toString());
		String url = "http://ec2-54-70-18-17.us-west-2.compute.amazonaws.com:8080/eritual-web/rest/seva/update";
		ServiceResponse responseObj = HttpUtil.sendPostForCreateOrUpdate(url, map, roleLess,(String) session.getAttribute("access_token"));
		CommonUtility.writeResponse(response, responseObj.getResponse(), responseObj.getStatus());
		
	}

	
}