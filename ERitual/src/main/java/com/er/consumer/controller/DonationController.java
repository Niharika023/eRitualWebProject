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
@RequestMapping("/donation")
public class DonationController {
	@Autowired
	Environment environment;
	private static final String DONATION_LIST = "/list";
	private static final String CREATE_DONATION = "/create";
	private static final String DELETE_DONATION_ID="/delete";
	private static final String DONATION_LIST_BY_ID="/get/byId";
	private static final String UPDATE_DONATION="/update";
	
	@RequestMapping(value = DONATION_LIST, method = RequestMethod.GET)
	public void getDonationList(HttpServletRequest request, HttpServletResponse response, HttpSession session) {
		String url =null;
		String queryParameter="";
		if( request.getParameter("search") != null)
			queryParameter= "nameLike=" +request.getParameter("search");
		if(request.getParameter("orderByName") != null)
			queryParameter+=";orderByName="+request.getParameter("orderByName");
		if(request.getParameter("orderByAmount") !=null)
			queryParameter+=";orderByAmount="+request.getParameter("orderByAmount");
		if(request.getParameter("orderByUpdatedTS") != null)
			queryParameter+=";orderByUpdatedTS="+request.getParameter("orderByUpdatedTS");
		if(request.getParameter("amountLesserThan") != null)
			queryParameter+=";amountLesserThan="+request.getParameter("amountLesserThan");
		if(request.getParameter("amountGreaterThan") != null)
			queryParameter+=";amountGreaterThan="+request.getParameter("amountGreaterThan");
		if(request.getParameter("available") != null)
			queryParameter+=";available="+request.getParameter("available");
		String pageSize=request.getParameter("pageSize");
		String pageNumber=request.getParameter("pageNumber");
		CommonUtility.isSessionActive(response, (String) session.getAttribute("access_token"));
			 url = "http://ec2-54-70-18-17.us-west-2.compute.amazonaws.com:8080/eritual-web/rest/donation/list;"+queryParameter+";pageSize="+pageSize+";pageNumber="+pageNumber;
		ServiceResponse responseObj = HttpUtil.sendGet(url, (String) session.getAttribute("access_token"));
		CommonUtility.writeResponse(response, responseObj.getResponse(), responseObj.getStatus());
		
	}
	
	@RequestMapping(value = CREATE_DONATION, method = RequestMethod.POST)
	public void createDonation(HttpServletRequest request, HttpServletResponse response, HttpSession session) {
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
		String url = "http://ec2-54-70-18-17.us-west-2.compute.amazonaws.com:8080/eritual-web/rest/donation/create";
		ServiceResponse responseObj = HttpUtil.sendPostForCreateOrUpdate(url, map,roleLess, (String) session.getAttribute("access_token"));
		CommonUtility.writeResponse(response, responseObj.getResponse(), responseObj.getStatus());
		
	}
	
	@RequestMapping(value = DELETE_DONATION_ID, method = RequestMethod.GET)
	public void removeDonationId(HttpServletRequest request, HttpServletResponse response, HttpSession session) {
		String url =null;
		String donationId=null;
		String roleLess="";
		if(session.getAttribute("roles")!=null){
			roleLess="";
		}
		else{
			roleLess="unauthorized";
		}
		if( request.getParameter("donationId") != null)
			donationId= request.getParameter("donationId"); 
		CommonUtility.isSessionActive(response, (String) session.getAttribute("access_token"));
			 url = "http://ec2-54-70-18-17.us-west-2.compute.amazonaws.com:8080/eritual-web/rest/donation/delete/"+donationId;
		ServiceResponse responseObj = HttpUtil.sendDelete(url, roleLess,(String) session.getAttribute("access_token"));
		CommonUtility.writeResponse(response, responseObj.getResponse(), responseObj.getStatus());
		
	}
	
	@RequestMapping(value = DONATION_LIST_BY_ID, method = RequestMethod.GET)
	public void getDonationListById(HttpServletRequest request, HttpServletResponse response, HttpSession session) {
		String donationId=null;
		if( request.getParameter("donationId") != null)
			donationId= request.getParameter("donationId"); 
		CommonUtility.isSessionActive(response, (String) session.getAttribute("access_token"));
		String url = "http://ec2-54-70-18-17.us-west-2.compute.amazonaws.com:8080/eritual-web/rest/donation/get/"+donationId;
		ServiceResponse responseObj = HttpUtil.sendGet(url, (String) session.getAttribute("access_token"));
		CommonUtility.writeResponse(response, responseObj.getResponse(), responseObj.getStatus());
		
	}
	@RequestMapping(value = UPDATE_DONATION, method = RequestMethod.POST)
	public void updateDonation(HttpServletRequest request, HttpServletResponse response, HttpSession session) {
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
