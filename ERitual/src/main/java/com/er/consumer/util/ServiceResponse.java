/**
 * 
 */
package com.er.consumer.util;

import org.json.JSONArray;
import org.json.JSONObject;

/**
 * Wrapper class that holds the response from the service layer. This data is used to
 * write to the response stream.
 * 
 * 
 * @author Pradeep
 * 
 */
public class ServiceResponse {

	int status;
	String data;
	JSONObject objData;
	JSONArray arrData;

	public String getResponse() {
		StringBuilder sb = new StringBuilder();
		if (objData != null) {
			sb.append(objData.toString());
		}
		if (arrData != null) {
			sb.append(arrData.toString());
		}
		if (data != null) {
			sb.append(data);
		}
		return sb.toString();
	}

	/**
	 * @param data the data to set
	 */
	public void setData(String data) {
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

	/**
	 * @param objData the objData to set
	 */
	public void setObjData(JSONObject objData) {
		this.objData = objData;
	}

	/**
	 * @param arrData the arrData to set
	 */
	public void setArrData(JSONArray arrData) {
		this.arrData = arrData;
	}

	@Override
	public String toString() {
		StringBuilder sb = new StringBuilder();
		sb.append("Status Code: ").append(this.status).append(Constant.NEWLINE).append("Response: ").append(getResponse());
		return sb.toString();
	}

}