package com.er.consumer.util;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.http.client.SimpleClientHttpRequestFactory;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.HttpServerErrorException;
import org.springframework.web.client.RestTemplate;

public class HttpUtil {

	public static ServiceResponse sendPost(String url, String currentPassword, String newPassword, String authkey) {
		ServiceResponse serviceResponse = new ServiceResponse();
		HttpHeaders detailsTokenHeader = new HttpHeaders();
		detailsTokenHeader.setContentType(MediaType.MULTIPART_FORM_DATA);
		detailsTokenHeader.set("Authorization", "Basic " + authkey);
		SimpleClientHttpRequestFactory factory = new SimpleClientHttpRequestFactory();
		RestTemplate rest = new RestTemplate(factory);
		MultiValueMap<String, String> map = new LinkedMultiValueMap<String, String>();
		map.add("currentPassword", currentPassword);
		map.add("newPassword", newPassword);
		HttpEntity<MultiValueMap<String, String>> httpEntity = new HttpEntity<MultiValueMap<String, String>>(map,detailsTokenHeader);
		ResponseEntity<String> responseEntity = null;
		try {
			responseEntity = rest.exchange(url, HttpMethod.POST, httpEntity, String.class);
			serviceResponse.setData(responseEntity.getBody());
			serviceResponse.setStatus(200);
		}
		catch (HttpClientErrorException ce) {
			if (ce.getStatusCode().equals(HttpStatus.CONFLICT)) {
				System.out.println("conflict");
				serviceResponse.setStatus(409);
			}
			if (ce.getStatusCode().equals(HttpStatus.BAD_REQUEST)) {
				System.out.println("bad request");
				serviceResponse.setStatus(400);
			}
			if (ce.getStatusCode().equals(HttpStatus.UNAUTHORIZED))
			{
				System.out.println("unauthrized.Session expired");
				serviceResponse.setStatus(Constant.HTTP_STATUS_CODE_SESSION_EXPIRED);
			}
		}
		catch (HttpServerErrorException es) {
			if (es.getStatusCode().equals(HttpStatus.INTERNAL_SERVER_ERROR)) {
				serviceResponse.setData(es.getResponseBodyAsString());
				serviceResponse.setStatus(500);
			}
			if (es.getStatusCode().equals(HttpStatus.NOT_IMPLEMENTED)) {
				serviceResponse.setData(es.getResponseBodyAsString());
				serviceResponse.setStatus(501);
			}
		}
		catch (Exception e) {

			serviceResponse.setStatus(500);
		}

		return serviceResponse;

	}

	
	public static ServiceResponse sendPostForLoging(String url, String name, String password) {
		ServiceResponse serviceResponse = new ServiceResponse();
		try {
			HttpHeaders detailsTokenHeader = new HttpHeaders();
			detailsTokenHeader.setContentType(MediaType.MULTIPART_FORM_DATA);

			SimpleClientHttpRequestFactory factory = new SimpleClientHttpRequestFactory();
			RestTemplate rest = new RestTemplate(factory);
			MultiValueMap<String, String> map = new LinkedMultiValueMap<String, String>();
			map.add("name", name);
			map.add("password", password);
			HttpEntity<MultiValueMap<String, String>> httpEntity = new HttpEntity<MultiValueMap<String, String>>(map,detailsTokenHeader);

			ResponseEntity<String> responseEntity = null;

			responseEntity = rest.exchange(url, HttpMethod.POST, httpEntity, String.class);
			serviceResponse.setData(responseEntity.getBody());
			serviceResponse.setStatus(200);

		}
		catch (HttpClientErrorException ce) {
			if (ce.getStatusCode().equals(HttpStatus.CONFLICT)) {
				System.out.println("conflict");
				serviceResponse.setStatus(409);
			}
			if (ce.getStatusCode().equals(HttpStatus.BAD_REQUEST)) {
				System.out.println("bad request");
				serviceResponse.setStatus(400);
			}
		}
		catch (HttpServerErrorException es) {
			if (es.getStatusCode().equals(HttpStatus.INTERNAL_SERVER_ERROR)) {
				System.out.println("server error");
				serviceResponse.setStatus(500);
			}
			if (es.getStatusCode().equals(HttpStatus.NOT_IMPLEMENTED)) {
				serviceResponse.setData(es.getResponseBodyAsString());
				serviceResponse.setStatus(501);
			}
		}
		catch (Exception e) {
			System.out.println(e);
			serviceResponse.setStatus(500);
		}

		return serviceResponse;
	}
	
	
	public static ServiceResponse sendPostBeforeLogging(String url, MultiValueMap map) {
		ServiceResponse serviceResponse = new ServiceResponse();
		try {
			HttpHeaders detailsTokenHeader = new HttpHeaders();
			detailsTokenHeader.setContentType(MediaType.MULTIPART_FORM_DATA);

			SimpleClientHttpRequestFactory factory = new SimpleClientHttpRequestFactory();
			RestTemplate rest = new RestTemplate(factory);
			/*MultiValueMap<String, String> map = new LinkedMultiValueMap<String, String>();
			map.add("name", name);
			map.add("subject", subject);
			map.add("template", template);*/
			HttpEntity<MultiValueMap<String, String>> httpEntity = new HttpEntity<MultiValueMap<String, String>>(map,detailsTokenHeader);

			ResponseEntity<String> responseEntity = null;

			responseEntity = rest.exchange(url, HttpMethod.POST, httpEntity, String.class);
			serviceResponse.setData(responseEntity.getBody());
			serviceResponse.setStatus(200);

		}
		catch (HttpClientErrorException ce) {
			if (ce.getStatusCode().equals(HttpStatus.CONFLICT)) {
				System.out.println("conflict");
				serviceResponse.setStatus(409);
			}
			if (ce.getStatusCode().equals(HttpStatus.BAD_REQUEST)) {
				System.out.println("bad request");
				serviceResponse.setStatus(400);
			}
		}
		catch (HttpServerErrorException es) {
			if (es.getStatusCode().equals(HttpStatus.INTERNAL_SERVER_ERROR)) {
				System.out.println("server error");
				serviceResponse.setStatus(500);
			}
			if (es.getStatusCode().equals(HttpStatus.NOT_IMPLEMENTED)) {
				serviceResponse.setData(es.getResponseBodyAsString());
				serviceResponse.setStatus(501);
			}
		}
		catch (Exception e) {
			System.out.println(e);
			serviceResponse.setStatus(500);
		}

		return serviceResponse;
	}
	
	public static ServiceResponse sendPostForCreateOrUpdate(String url,MultiValueMap map ,String roleLess, String authkey) {
		ServiceResponse serviceResponse = new ServiceResponse();
		HttpHeaders detailsTokenHeader = new HttpHeaders();
		String DefaultTemple="a81db829-eba2-412c-83bd-b85551c42a02";
		detailsTokenHeader.setContentType(MediaType.MULTIPART_FORM_DATA);
		detailsTokenHeader.set("X-ContextTemple", DefaultTemple);
		detailsTokenHeader.set("Authorization", "Basic " + authkey);
			HttpEntity<Object> httpEntity = new HttpEntity<Object>(map, detailsTokenHeader);
			RestTemplate rest = new RestTemplate();
			ResponseEntity<String> responseEntity = null;
			try {
				responseEntity = rest.exchange(url, HttpMethod.POST, httpEntity, String.class);
				serviceResponse.setData(responseEntity.getBody());
				if(responseEntity.getStatusCode().equals(HttpStatus.NO_CONTENT) || (responseEntity.getBody()).equals("false")){
					serviceResponse.setStatus(204);
				}
				else{
				serviceResponse.setStatus(200);
				}
			}
			catch (HttpClientErrorException ce) {
				if(ce.getStatusCode().equals(HttpStatus.UNAUTHORIZED) && !(roleLess.equals("unauthorized"))){
					serviceResponse.setStatus(600);
				}
				if (ce.getStatusCode().equals(HttpStatus.CONFLICT)) {
					System.out.println("conflict");
					serviceResponse.setStatus(409);
				}
				if (ce.getStatusCode().equals(HttpStatus.NO_CONTENT)) {
					System.out.println("conflict");
					serviceResponse.setStatus(204);
				}
				if (ce.getStatusCode().equals(HttpStatus.BAD_REQUEST)) {
					System.out.println("bad request");
					serviceResponse.setStatus(400);
				}
				if (ce.getStatusCode().equals(HttpStatus.UNAUTHORIZED)&& (roleLess.equals("unauthorized")))
				{
					System.out.println("unauthrized.Session expired");
					serviceResponse.setStatus(Constant.HTTP_STATUS_CODE_SESSION_EXPIRED);
				}
			}
			catch (HttpServerErrorException es) {
				if (es.getStatusCode().equals(HttpStatus.INTERNAL_SERVER_ERROR)) {
					serviceResponse.setData(es.getResponseBodyAsString());
					serviceResponse.setStatus(500);
				}
				if (es.getStatusCode().equals(HttpStatus.NOT_IMPLEMENTED)) {
					serviceResponse.setData(es.getResponseBodyAsString());
					serviceResponse.setStatus(501);
				}
			}
			catch (Exception e) {

				serviceResponse.setStatus(500);
			}

			return serviceResponse;

		}


	//send get without any content type
	public static ServiceResponse sendGet(String url, String authkey) {
		ServiceResponse serviceResponse = new ServiceResponse();
		HttpHeaders detailsTokenHeader = new HttpHeaders();
		String DefaultTemple="a81db829-eba2-412c-83bd-b85551c42a02";
		detailsTokenHeader.set("X-ContextTemple", DefaultTemple);
		HttpEntity<Object> httpEntity = new HttpEntity<Object>(detailsTokenHeader);
		RestTemplate rest = new RestTemplate();
		ResponseEntity<String> responseEntity = null;
		try {
			responseEntity = rest.exchange(url, HttpMethod.GET, httpEntity, String.class);
			serviceResponse.setData(responseEntity.getBody());
			serviceResponse.setStatus(200);
		}
		catch (HttpClientErrorException ce) {
			if (ce.getStatusCode().equals(HttpStatus.CONFLICT)) {
				System.out.println("conflict");
				serviceResponse.setStatus(409);
			}
			if (ce.getStatusCode().equals(HttpStatus.BAD_REQUEST)) {
				System.out.println("bad request");
				serviceResponse.setStatus(400);
			}
			if (ce.getStatusCode().equals(HttpStatus.REQUEST_TIMEOUT)) {
				System.out.println("request time out");
				serviceResponse.setData(ce.getResponseBodyAsString());
				serviceResponse.setStatus(408);
			}
			if (ce.getStatusCode().equals(HttpStatus.UNAUTHORIZED))
			{
				System.out.println("unauthorized.Session expired");
				serviceResponse.setStatus(Constant.HTTP_STATUS_CODE_SESSION_EXPIRED);
			}
		}
		catch (HttpServerErrorException es) {
			if (es.getStatusCode().equals(HttpStatus.INTERNAL_SERVER_ERROR)) {
				System.out.println("server error");
				serviceResponse.setStatus(500);
			}
			if (es.getStatusCode().equals(HttpStatus.NOT_IMPLEMENTED)) {
				serviceResponse.setData(es.getResponseBodyAsString());
				serviceResponse.setStatus(501);
			}
		}
		catch (Exception e) {

			serviceResponse.setStatus(500);
		}

		return serviceResponse;

	}
	
	public static ServiceResponse sendDelete(String url,String roleLess, String authkey) {
		ServiceResponse serviceResponse = new ServiceResponse();
		HttpHeaders detailsTokenHeader = new HttpHeaders();
		detailsTokenHeader.set("Authorization", "Basic " + authkey);
		String DefaultTemple="a81db829-eba2-412c-83bd-b85551c42a02";
		detailsTokenHeader.set("X-ContextTemple", DefaultTemple);
		HttpEntity<Object> httpEntity = new HttpEntity<Object>(detailsTokenHeader);
		RestTemplate rest = new RestTemplate();
		ResponseEntity<String> responseEntity = null;
		try {
			responseEntity = rest.exchange(url, HttpMethod.GET, httpEntity, String.class);
			serviceResponse.setData(responseEntity.getBody());
			if(responseEntity.getStatusCode().equals(HttpStatus.NO_CONTENT) || (responseEntity.getBody()).equals("false")){
				serviceResponse.setStatus(204);
			}
			else{
			serviceResponse.setStatus(200);
			}
		}
		catch (HttpClientErrorException ce) {
			if(ce.getStatusCode().equals(HttpStatus.UNAUTHORIZED) && !(roleLess.equals("unauthorized"))){
				serviceResponse.setStatus(600);
			}
			if (ce.getStatusCode().equals(HttpStatus.CONFLICT)) {
				System.out.println("conflict");
				serviceResponse.setStatus(409);
			}
			if (ce.getStatusCode().equals(HttpStatus.BAD_REQUEST)) {
				System.out.println("bad request");
				serviceResponse.setStatus(400);
			}
			if (ce.getStatusCode().equals(HttpStatus.REQUEST_TIMEOUT)) {
				System.out.println("request time out");
				serviceResponse.setData(ce.getResponseBodyAsString());
				serviceResponse.setStatus(408);
			}
			if (ce.getStatusCode().equals(HttpStatus.UNAUTHORIZED)&& (roleLess.equals("unauthorized")))
			{
				System.out.println("unauthrized.Session expired");
				serviceResponse.setStatus(Constant.HTTP_STATUS_CODE_SESSION_EXPIRED);
			}
		}
		catch (HttpServerErrorException es) {
			if (es.getStatusCode().equals(HttpStatus.INTERNAL_SERVER_ERROR)) {
				System.out.println("server error");
				serviceResponse.setStatus(500);
			}
			if (es.getStatusCode().equals(HttpStatus.NOT_IMPLEMENTED)) {
				serviceResponse.setData(es.getResponseBodyAsString());
				serviceResponse.setStatus(501);
			}
		}
		catch (Exception e) {

			serviceResponse.setStatus(500);
		}

		return serviceResponse;

	}
	public static ServiceResponse sendGetWithToken(String url,String roleLess, String authkey) {
		ServiceResponse serviceResponse = new ServiceResponse();
		HttpHeaders detailsTokenHeader = new HttpHeaders();
		String DefaultTemple="a81db829-eba2-412c-83bd-b85551c42a02";
		detailsTokenHeader.set("X-ContextTemple", DefaultTemple);
		detailsTokenHeader.set("Authorization", "Basic " + authkey);
		HttpEntity<Object> httpEntity = new HttpEntity<Object>(detailsTokenHeader);
		RestTemplate rest = new RestTemplate();
		ResponseEntity<String> responseEntity = null;
		try {
			responseEntity = rest.exchange(url, HttpMethod.GET, httpEntity, String.class);
			serviceResponse.setData(responseEntity.getBody());
			serviceResponse.setStatus(200);
		}
		catch (HttpClientErrorException ce) {
			if (ce.getStatusCode().equals(HttpStatus.UNAUTHORIZED) && !(roleLess.equals("unauthorized"))) {
				serviceResponse.setStatus(600);
			}
			if (ce.getStatusCode().equals(HttpStatus.CONFLICT)) {
				System.out.println("conflict");
				serviceResponse.setStatus(409);
			}
			if (ce.getStatusCode().equals(HttpStatus.BAD_REQUEST)) {
				System.out.println("bad request");
				serviceResponse.setStatus(400);
			}
			if (ce.getStatusCode().equals(HttpStatus.REQUEST_TIMEOUT)) {
				System.out.println("request time out");
				serviceResponse.setData(ce.getResponseBodyAsString());
				serviceResponse.setStatus(408);
			}
			if (ce.getStatusCode().equals(HttpStatus.UNAUTHORIZED) && (roleLess.equals("unauthorized")))
			{
				System.out.println("unauthorized.Session expired");
				serviceResponse.setStatus(Constant.HTTP_STATUS_CODE_SESSION_EXPIRED);
			}
		}
		catch (HttpServerErrorException es) {
			if (es.getStatusCode().equals(HttpStatus.INTERNAL_SERVER_ERROR)) {
				System.out.println("server error");
				serviceResponse.setStatus(500);
			}
			if (es.getStatusCode().equals(HttpStatus.NOT_IMPLEMENTED)) {
				serviceResponse.setData(es.getResponseBodyAsString());
				serviceResponse.setStatus(501);
			}
		}
		catch (Exception e) {

			serviceResponse.setStatus(500);
		}

		return serviceResponse;

	}
	
	
}