/**
 * 
 */
package com.er.consumer.util;

import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Properties;
import java.util.Scanner;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.io.FileUtils;
import org.apache.commons.io.IOUtils;
import org.json.JSONArray;
import org.json.JSONObject;

/**
 * @author champa
 * 
 */
public class CommonUtility {
	static Properties msgProp = null;

	public static boolean isNullEmptyString(String str) {
		if (null == str) {
			return false;
		}
		else if ("".equalsIgnoreCase(str.trim())) {
			return false;
		}
		return true;
	}

	public static void writeResponse(HttpServletResponse response, String responseParam, int statusCode) {
		try {
			responseParam = URLEncoder.encode(responseParam, "UTF-8");
		}
		catch (UnsupportedEncodingException e) {
			// TODO Auto-generated catch block
			responseParam = "";
		}
		response.setCharacterEncoding("utf-8");
		response.setHeader("Content-Type", "application/x-www-form-urlencoded");
		response.addIntHeader("Content-Length", responseParam.getBytes().length);
		response.setStatus(statusCode);
		PrintWriter writer = null;
		try {
			writer = response.getWriter();
			if (writer != null) {
				writer.write(responseParam);
				writer.flush();
			}
		}
		catch (IOException e) {
		}
		finally {
			if (writer != null) {
				writer.close();
			}
		}
	}

	public static void writeResponseHLS(HttpServletResponse response, String responseParam, int statusCode) {
		/*
		 * try { responseParam = URLEncoder.encode(responseParam, "UTF-8"); } catch
		 * (UnsupportedEncodingException e) { // TODO Auto-generated catch block
		 * responseParam = ""; }
		 */
		// response.setCharacterEncoding("utf-8");
		response.setHeader("Content-Type", "binary/octet-stream");
		response.addIntHeader("Content-Length", responseParam.getBytes().length);
		response.setStatus(statusCode);

		try {
			OutputStream outputStream = response.getOutputStream();
			outputStream.write(responseParam.getBytes());
			outputStream.close();
		}
		catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

	}

	public static String readMessageForKey(String key) {

		return msgProp.getProperty(key);
	}

	public static JSONObject readInputStream(HttpServletRequest req) {
		// Read the stream and decode the JSON string to JSON Object
		InputStream is;
		StringBuffer response = new StringBuffer();
		JSONObject reqObj = new JSONObject();
		try {
			is = req.getInputStream();

			BufferedReader rd = new BufferedReader(new InputStreamReader(is));
			String line;

			while ((line = rd.readLine()) != null) {
				response.append(line);
				response.append('\r');
			}
			rd.close();
			reqObj = new JSONObject(response.toString());
		}
		catch (Exception e) {
		}
		return reqObj;
	}
	
	public static JSONArray readArrayInputStream(HttpServletRequest req) {
		// Read the stream and decode the JSON string to JSON Object
		InputStream is;
		StringBuffer response = new StringBuffer();
		JSONArray reqObj = new JSONArray();
		try {
			is = req.getInputStream();

			BufferedReader rd = new BufferedReader(new InputStreamReader(is));
			String line;

			while ((line = rd.readLine()) != null) {
				response.append(line);
				response.append('\r');
			}
			rd.close();
			reqObj = new JSONArray(response.toString());
		}
		catch (Exception e) {
		}
		return reqObj;
	}

	public static JSONObject readInputStreamWithUTF8(HttpServletRequest request) {
		// Read the stream and decode the JSON string to JSON Object
		JSONObject reqObj = new JSONObject();
		try {
			InputStream is = request.getInputStream();
			String jsonString = IOUtils.toString(is, "UTF-8");
			// System.out.println("myString"+jsonString);
			reqObj = new JSONObject(jsonString);

		}
		catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return reqObj;
	}

	public static String convertToDate(long time, String dateFormat) {

		Calendar c = Calendar.getInstance();
		c.setTimeInMillis(time);
		return new SimpleDateFormat(dateFormat).format(c.getTime());
	}

	public static void displayPaymentResult(HttpServletResponse response, String responseMsg) {
		PrintWriter writer = null;
		try {
			writer = response.getWriter();
			if (writer != null) {
				writer.write("<html><head><title>Payment Status</title></head><body><center><div><h3>" + responseMsg
						+ "</h3></div></center></body></html>");
				writer.flush();
			}
		}
		catch (IOException e) {
		}
	}

	public static String getServerIP(String path) {
		String serverIp = "";
		try {

			File file = new File(path + Constant.SERVER_IP_FILE_PATH);
			System.out.println(file.getAbsolutePath());
			try (Scanner scanner = new Scanner(file)) {

				if (scanner.hasNextLine()) {
					serverIp = scanner.nextLine();
					System.out.println(serverIp);

				}

			}
		}
		catch (Exception e) {

			e.printStackTrace();
			serverIp = "localhost";
		}
		return serverIp;
	}

	public static String convertPasswordHash(String passwordHash) {
		MessageDigest md = null;
		try {
			md = MessageDigest.getInstance("SHA-256");
		}
		catch (NoSuchAlgorithmException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
		String text = passwordHash;

		try {
			md.update(text.getBytes("UTF-8"));
		}
		catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		} // Change this to "UTF-16" if needed
		byte[] mdbytes = md.digest();
		StringBuffer sb = new StringBuffer();
		for (int i = 0; i < mdbytes.length; i++) {
			sb.append(Integer.toString((mdbytes[i] & 0xff) + 0x100, 16).substring(1));
		}
		System.out.println("hex" + sb.toString());
		return sb.toString();
	}

	public static JSONObject readJSONFromFile(File file) throws IOException {
		String fileContent = FileUtils.readFileToString(file);

		JSONObject fileJSONObj = new JSONObject(fileContent);
		return fileJSONObj;
	}
	
	public static void isSessionActive(HttpServletResponse response ,String access_token){
		if(access_token==null){
			CommonUtility.writeResponse(response,"",Constant.HTTP_STATUS_CODE_SESSION_EXPIRED);
		}
	}

	
}