package com.er.consumer.controller;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;
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
@RequestMapping("/order")
public class OrderController {
	@Value("${api.baseUrl}")
	private String baseUrl;
	@Autowired
	Environment environment;
	private static final String ORDER_LIST = "/list";
	
	@RequestMapping(value = ORDER_LIST, method = RequestMethod.GET)
	public void getOrderList(HttpServletRequest request, HttpServletResponse response, HttpSession session) {
		String url =null;
		String name=null;
		String queryParameter="";
		if( request.getParameter("search") != null)
			queryParameter= "creatorLike=" +request.getParameter("search");
		if( request.getParameter("targetType") != null)
			queryParameter+= ";targetType=" +request.getParameter("targetType");
		String pageSize=request.getParameter("pageSize");
		String pageNumber=request.getParameter("pageNumber");
		String roleLess="";
		if(session.getAttribute("roles")!="null"){
		roleLess="";
		}
		else{
		roleLess="unauthorized";
		}
		
		CommonUtility.isSessionActive(response, (String) session.getAttribute("access_token"));
			 url = baseUrl+"/eritual-web/rest/customer-order/list;"+queryParameter+";pageSize="+pageSize+";pageNumber="+pageNumber;
		ServiceResponse responseObj = HttpUtil.sendGetWithToken(url, roleLess,(String) session.getAttribute("access_token"));
		CommonUtility.writeResponse(response, responseObj.getResponse(), responseObj.getStatus());
		
	}
	

}
