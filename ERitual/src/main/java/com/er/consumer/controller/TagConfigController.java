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
@RequestMapping("/tagConfig")
public class TagConfigController {
	@Autowired
	Environment environment;
	private static final String TAGCONFIG_LIST = "/list";
	private static final String CREATE_TAGCONFIG = "/create";
	private static final String DELETE_TAGCONFIG_ID="/delete";
	private static final String TAGCONFIG_LIST_BY_ID="/get/byId";
	private static final String UPDATE_TAGCONFIG="/update";
	
	@RequestMapping(value = TAGCONFIG_LIST, method = RequestMethod.GET)
	public void getTagConfigList(HttpServletRequest request, HttpServletResponse response, HttpSession session) {
		String url =null;
		String queryParameter="";
		if( request.getParameter("search") != null)
			queryParameter= ";keyLike=" +request.getParameter("search");
		if(request.getParameter("orderByKey") != null)
			queryParameter+=";orderByKey="+request.getParameter("orderByKey");
			queryParameter+=";pageSize="+request.getParameter("pageSize");
		if(request.getParameter("pageNumber") != null)
			queryParameter+=";pageNumber="+request.getParameter("pageNumber");
		CommonUtility.isSessionActive(response, (String) session.getAttribute("access_token"));
			 url = "http://ec2-54-70-18-17.us-west-2.compute.amazonaws.com:8080/eritual-web/rest/configuration/list"+queryParameter;
		ServiceResponse responseObj = HttpUtil.sendGet(url, (String) session.getAttribute("access_token"));
		CommonUtility.writeResponse(response, responseObj.getResponse(), responseObj.getStatus());
		
	}
	
	@RequestMapping(value = CREATE_TAGCONFIG, method = RequestMethod.POST)
	public void createTagConfig(HttpServletRequest request, HttpServletResponse response, HttpSession session) {
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
		map.add("configuration", urlParameter.toString());
		String url = "http://ec2-54-70-18-17.us-west-2.compute.amazonaws.com:8080/eritual-web/rest/configuration/create-or-update";
		ServiceResponse responseObj = HttpUtil.sendPostForCreateOrUpdate(url, map,roleLess, (String) session.getAttribute("access_token"));
		CommonUtility.writeResponse(response, responseObj.getResponse(), responseObj.getStatus());
		
	}
	
	@RequestMapping(value = DELETE_TAGCONFIG_ID, method = RequestMethod.GET)
	public void removeTagConfigId(HttpServletRequest request, HttpServletResponse response, HttpSession session) {
		String url =null;
		String tagConfigId=null;
		String roleLess="";
		if(session.getAttribute("roles")!=null){
			roleLess="";
		}
		else{
			roleLess="unauthorized";
		}
		if( request.getParameter("tagConfigId") != null)
			tagConfigId= request.getParameter("tagConfigId"); 
		CommonUtility.isSessionActive(response, (String) session.getAttribute("access_token"));
			 url = "http://ec2-54-70-18-17.us-west-2.compute.amazonaws.com:8080/eritual-web/rest/configuration/delete/"+tagConfigId;
		ServiceResponse responseObj = HttpUtil.sendDelete(url, roleLess,(String) session.getAttribute("access_token"));
		CommonUtility.writeResponse(response, responseObj.getResponse(), responseObj.getStatus());
		
	}
	
	@RequestMapping(value = TAGCONFIG_LIST_BY_ID, method = RequestMethod.GET)
	public void getTagConfigListById(HttpServletRequest request, HttpServletResponse response, HttpSession session) {
		String donationId=null;
		if( request.getParameter("donationId") != null)
			donationId= request.getParameter("donationId"); 
		CommonUtility.isSessionActive(response, (String) session.getAttribute("access_token"));
		String url = "http://ec2-54-70-18-17.us-west-2.compute.amazonaws.com:8080/eritual-web/rest/donation/get/"+donationId;
		ServiceResponse responseObj = HttpUtil.sendGet(url, (String) session.getAttribute("access_token"));
		CommonUtility.writeResponse(response, responseObj.getResponse(), responseObj.getStatus());
		
	}
	@RequestMapping(value = UPDATE_TAGCONFIG, method = RequestMethod.POST)
	public void updateTagConfig(HttpServletRequest request, HttpServletResponse response, HttpSession session) {
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
		map.add("donation", urlParameter.toString());
		String url = "http://ec2-54-70-18-17.us-west-2.compute.amazonaws.com:8080/eritual-web/rest/donation/update";
		ServiceResponse responseObj = HttpUtil.sendPostForCreateOrUpdate(url, map,roleLess, (String) session.getAttribute("access_token"));
		CommonUtility.writeResponse(response, responseObj.getResponse(), responseObj.getStatus());
		
	}

}
