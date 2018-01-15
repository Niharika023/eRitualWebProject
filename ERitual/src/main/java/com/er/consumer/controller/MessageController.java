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
@RequestMapping("/message")
public class MessageController {
	@Autowired
	Environment environment;
	private static final String MESSAGE_LIST = "/list";
	private static final String CREATE_MESSAGE = "/create";
	private static final String DELETE_MESSAGE_ID="/delete";
	private static final String MESSAGE_LIST_BY_ID="/get/byId";
	private static final String HOSTED_CONTENT_LIST_BY_ID="/get/hosted_content/byId";
	private static final String UPDATE_MESSAGE="/update";
	
	@RequestMapping(value = MESSAGE_LIST, method = RequestMethod.GET)
	public void getMessageList(HttpServletRequest request, HttpServletResponse response, HttpSession session) {
		String url =null;
		String queryParameter="";
		if( request.getParameter("searchByTitle") != null)
			queryParameter+= "titleLike=" +request.getParameter("searchByTitle");
		if( request.getParameter("searchByTag") != null)
			queryParameter+= ";withTagPath=" +request.getParameter("searchByTag");
		if( request.getParameter("searchByMessage") != null)
			queryParameter+= ";messageLike=" +request.getParameter("searchByMessage");
		if(request.getParameter("orderByTitle") != null)
			queryParameter+=";orderByTitle="+request.getParameter("orderByTitle");
		if(request.getParameter("orderByUpdatedTS") != null)
			queryParameter+=";orderByUpdatedTS="+request.getParameter("orderByUpdatedTS");
		if(request.getParameter("creationDateGreaterThan") != null)
			queryParameter+=";creationDateGreaterThan="+request.getParameter("creationDateGreaterThan");
		if(request.getParameter("creationDateLesserThan") != null)
			queryParameter+=";creationDateLesserThan="+request.getParameter("creationDateLesserThan");
		String pageSize=request.getParameter("pageSize");
		String pageNumber=request.getParameter("pageNumber");
		CommonUtility.isSessionActive(response, (String) session.getAttribute("access_token"));
		if(queryParameter !=""){
			 url = "http://ec2-54-70-18-17.us-west-2.compute.amazonaws.com:8080/eritual-web/rest/message/list;"+queryParameter+";pageSize="+pageSize+";pageNumber="+pageNumber;
		}
		else{
			url = "http://ec2-54-70-18-17.us-west-2.compute.amazonaws.com:8080/eritual-web/rest/message/list"+";pageSize="+pageSize+";pageNumber="+pageNumber;
		}
		ServiceResponse responseObj = HttpUtil.sendGet(url, (String) session.getAttribute("access_token"));
		CommonUtility.writeResponse(response, responseObj.getResponse(), responseObj.getStatus());
		
	}
	
	@RequestMapping(value = CREATE_MESSAGE, method = RequestMethod.POST)
	public void createMessage(HttpServletRequest request, HttpServletResponse response, HttpSession session) {
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
		map.add("message", urlParameter.toString());
		String url = "http://ec2-54-70-18-17.us-west-2.compute.amazonaws.com:8080/eritual-web/rest/message/create";
		ServiceResponse responseObj = HttpUtil.sendPostForCreateOrUpdate(url, map, roleLess,(String) session.getAttribute("access_token"));
		CommonUtility.writeResponse(response, responseObj.getResponse(), responseObj.getStatus());
		
	}
	
	
	@RequestMapping(value = DELETE_MESSAGE_ID, method = RequestMethod.GET)
	public void removeMessageId(HttpServletRequest request, HttpServletResponse response, HttpSession session) {
		String url =null;
		String messageId=null;
		String roleLess="";
		if(session.getAttribute("roles")!=null){
			roleLess="";
		}
		else{
			roleLess="unauthorized";
		}
		if( request.getParameter("messageId") != null)
			messageId= request.getParameter("messageId"); 
		CommonUtility.isSessionActive(response, (String) session.getAttribute("access_token"));
			 url = "http://ec2-54-70-18-17.us-west-2.compute.amazonaws.com:8080/eritual-web/rest/message/delete/"+messageId;
		ServiceResponse responseObj = HttpUtil.sendDelete(url, roleLess,(String) session.getAttribute("access_token"));
		CommonUtility.writeResponse(response, responseObj.getResponse(), responseObj.getStatus());
		
	}
	
	@RequestMapping(value = HOSTED_CONTENT_LIST_BY_ID, method = RequestMethod.GET)
	public void getHostedContentById(HttpServletRequest request, HttpServletResponse response, HttpSession session) {
		String hostedContentId=null;
		if( request.getParameter("hostedContentId") != null)
			hostedContentId= request.getParameter("hostedContentId"); 
		CommonUtility.isSessionActive(response, (String) session.getAttribute("access_token"));
		String url = "http://ec2-54-70-18-17.us-west-2.compute.amazonaws.com:8080/eritual-web/rest/hosted-content/get/"+hostedContentId;
		ServiceResponse responseObj = HttpUtil.sendGet(url, (String) session.getAttribute("access_token"));
		CommonUtility.writeResponse(response, responseObj.getResponse(), responseObj.getStatus());
		
	}
	
	@RequestMapping(value = MESSAGE_LIST_BY_ID, method = RequestMethod.GET)
	public void getMessageListById(HttpServletRequest request, HttpServletResponse response, HttpSession session) {
		String messageId=null;
		if( request.getParameter("messageId") != null)
			messageId= request.getParameter("messageId"); 
		CommonUtility.isSessionActive(response, (String) session.getAttribute("access_token"));
		String url = "http://ec2-54-70-18-17.us-west-2.compute.amazonaws.com:8080/eritual-web/rest/message/get/"+messageId;
		ServiceResponse responseObj = HttpUtil.sendGet(url, (String) session.getAttribute("access_token"));
		CommonUtility.writeResponse(response, responseObj.getResponse(), responseObj.getStatus());
		
	}
	@RequestMapping(value = UPDATE_MESSAGE, method = RequestMethod.POST)
	public void updateMessage(HttpServletRequest request, HttpServletResponse response, HttpSession session) {
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
		map.add("message", urlParameter.toString());
		String url = "http://ec2-54-70-18-17.us-west-2.compute.amazonaws.com:8080/eritual-web/rest/message/update";
		ServiceResponse responseObj = HttpUtil.sendPostForCreateOrUpdate(url, map, roleLess,(String) session.getAttribute("access_token"));
		CommonUtility.writeResponse(response, responseObj.getResponse(), responseObj.getStatus());
		
	}

}