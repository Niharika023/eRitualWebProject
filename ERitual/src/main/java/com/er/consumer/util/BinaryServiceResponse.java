package com.er.consumer.util;

import java.io.InputStream;
import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpHeaders;

public class BinaryServiceResponse {
	int status;
	InputStream data;
	Map<String, String> headers;

	public Map<String, String> getHeaders() {
		return headers;
	}

	public void setHeaders(HttpHeaders headers) {
		this.headers = new HashMap<String, String>();
		if (headers.get("Content-Disposition") != null && headers.get("Content-Disposition").size() >= 1)
			this.headers.put("Content-Disposition", headers.get("Content-Disposition").get(0));
	}

	public InputStream getResponse() {
		return data;
	}

	/**
	 * @param data the data to set
	 */
	public void setData(InputStream data) {
		this.data = data;
	}

	/**
	 * @return the status
	 */
	public int getStatus() {
		return status;
	}

	/**
	 * @param status the status to set
	 */
	public void setStatus(int status) {
		this.status = status;
	}

}