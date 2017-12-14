package com.er.consumer.controller;

import java.io.File;

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
import com.er.consumer.util.HttpUtil;
import com.er.consumer.util.ServiceResponse;


@PropertySource({"classpath:application-prod.properties","classpath:application-dev.properties"})
@RestController
@RequestMapping("/user")
public class UserController {
	@Autowired
	Environment environment;
	private static final String REGISTER = "/register";
	private static final String LOGIN = "/login";
	private static final String ADMIN_LOGOUT ="/logout";
	private static final String CHANGE_PASSWORD="/changePassword";
	private static final String RESET_PASSWORD="/resetPassword";
	private static final String EMAIL_VERIFICATION="/emailVerification";
	
	@RequestMapping(value = REGISTER, method = RequestMethod.POST)
	public void saveUserDetails(HttpServletRequest request, HttpServletResponse response, HttpSession session) {
		JSONObject reqObj = CommonUtility.readInputStream(request);
		/*String email = (String) (reqObj.has("email") == true ? reqObj.getString("email") : "");
		String password = (String) (reqObj.has("password") == true ? reqObj.getString("password") : "");
		JSONObject user=new JSONObject();*/
		/*user.put("email", email);
		user.put("password", password);*/
		MultiValueMap<String, String> map = new LinkedMultiValueMap<String, String>();
		map.add("user", reqObj.toString());
		String url = "http://ec2-54-70-18-17.us-west-2.compute.amazonaws.com:8080/eritual-web/rest/user/create";
		ServiceResponse responseObj = HttpUtil.sendPostBeforeLogging(url, map);
		CommonUtility.writeResponse(response, responseObj.getResponse(), responseObj.getStatus());
		}
	
	
	@RequestMapping(value = LOGIN, method = RequestMethod.POST)
	public void login(HttpServletRequest request, HttpServletResponse response, HttpSession session) {
		JSONObject reqObj = CommonUtility.readInputStream(request);
		String email = (String) (reqObj.has("name") == true ? reqObj.getString("name") : "");
		String password = (String) (reqObj.has("password") == true ? reqObj.getString("password") : "");
		String url = "http://ec2-54-70-18-17.us-west-2.compute.amazonaws.com:8080/eritual-web/rest/user/login";
		ServiceResponse responseObj = HttpUtil.sendPostForLoging(url, email,password);
		JSONObject newJsonObject = new JSONObject(responseObj.getResponse());
		session = request.getSession(true);
		if(newJsonObject.get("token")!=null){
		session.setAttribute("access_token", newJsonObject.get("token"));
		}
		if(newJsonObject.get("id")!=null){
			session.setAttribute("id", newJsonObject.get("id"));
			}
		if(newJsonObject.get("roles")!=null){
			session.setAttribute("roles", newJsonObject.get("roles"));
			}
		CommonUtility.writeResponse(response, responseObj.getResponse(), responseObj.getStatus());
	}
	
	@RequestMapping(value = CHANGE_PASSWORD, method = RequestMethod.POST)
	public void changePassword(HttpServletRequest request, HttpServletResponse response, HttpSession session) {
		CommonUtility.isSessionActive(response, (String) session.getAttribute("access_token"));
		JSONObject reqObj = CommonUtility.readInputStream(request);
		String currentPassword = (String) (reqObj.has("currentPassword") == true ? reqObj.getString("currentPassword") : "");
		String newPasword = (String) (reqObj.has("newPassword") == true ? reqObj.getString("newPassword") : "");
		String url = "http://ec2-54-70-18-17.us-west-2.compute.amazonaws.com:8080/eritual-web/rest/user/change-password";
		ServiceResponse responseObj = HttpUtil.sendPost(url, currentPassword,newPasword, (String) session.getAttribute("access_token"));
		CommonUtility.writeResponse(response, responseObj.getResponse(), responseObj.getStatus());
		
	}
	
	@RequestMapping(value = RESET_PASSWORD, method = RequestMethod.POST)
	public void resetPassword(HttpServletRequest request, HttpServletResponse response, HttpSession session) {
		JSONObject reqObj = CommonUtility.readInputStream(request);
		String name = (String) (reqObj.has("emailId") == true ? reqObj.getString("emailId") : "");
		String otp = (String) (reqObj.has("otp") == true ? reqObj.getString("otp") : "");
		String newPassword = (String) (reqObj.has("changePassword") == true ? reqObj.getString("changePassword") : "");
		MultiValueMap<String, String> map = new LinkedMultiValueMap<String, String>();
		map.add("name", name);
		map.add("otp", otp);
		map.add("newPassword", newPassword);
		String url = "http://ec2-54-70-18-17.us-west-2.compute.amazonaws.com:8080/eritual-web/rest/user/reset-password";
		ServiceResponse responseObj = HttpUtil.sendPostBeforeLogging(url, map);
		CommonUtility.writeResponse(response, responseObj.getResponse(), responseObj.getStatus());
	}
	
	@RequestMapping(value = EMAIL_VERIFICATION, method = RequestMethod.POST)
	public void emailVerification(HttpServletRequest request, HttpServletResponse response, HttpSession session) {
		JSONObject reqObj = CommonUtility.readInputStream(request);
		String name = (String) (reqObj.has("emailId") == true ? reqObj.getString("emailId") : "");
		String subject = (String) (reqObj.has("otp") == true ? reqObj.getString("subject") : "");
		String template = (String) (reqObj.has("template") == true ? reqObj.getString("template") : "");
		MultiValueMap<String, String> map = new LinkedMultiValueMap<String, String>();
		map.add("name", name);
		map.add("subject", subject);
		map.add("template", template);
		String url = "http://ec2-54-70-18-17.us-west-2.compute.amazonaws.com:8080/eritual-web/rest/user/send-lost-password-mail";
		ServiceResponse responseObj = HttpUtil.sendPostBeforeLogging(url, map);
		CommonUtility.writeResponse(response, responseObj.getResponse(), responseObj.getStatus());
	}
	
	@RequestMapping(value = ADMIN_LOGOUT, method = RequestMethod.GET)
	public void logout(HttpServletRequest request, HttpServletResponse response, HttpSession session) {
		CommonUtility.isSessionActive(response, (String) session.getAttribute("access_token"));
		CommonUtility.isSessionActive(response, (String) session.getAttribute("id"));
		session.removeAttribute("access_token");
		session.removeAttribute("id");
		session.invalidate();
		CommonUtility.writeResponse(response, "", 200);
	}
}
