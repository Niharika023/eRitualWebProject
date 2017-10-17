package com.er.consumer.util;

public interface Constant {
	String NEWLINE = "\n";
	String API_PATH = "/KPApi/";
	String AUTH_PATH = "/KPAuth/";
	String DEFAULT_USER = "admin";
	String DEFAULT_PASSWORD = "admin";
	String PRODUCT_ADMIN = "basicadmin";
	String PORDUCT_ADMIN_PASSWORD = "basicadmin";

	String BASEURL = "http://";
	String BASEURL_PORT = "8080";
	String SERVER_IP_FILE_PATH = "resources/serverIP.txt";

	String MEDIA_BASE_PATH = System.getProperty("user.home");
	int SHARD_File_BYTE_LENGTH = 1048576;
	String JK_TOTAL_BYTES = "totalBytes";
	int HTTP_STATUS_CODE_SESSION_EXPIRED=10006;
	String KNOWLEGDE_PODIUM = "Knowledge_Podium";
	String KP_CONSUMER_PATH = "/ERitual/";
	String REGISTRY_PATH_WOW6432NODE="Software\\Wow6432Node\\Knowledge Podium\\KP Learner\\Settings\\";
    String REGISTRY_PATH="Software\\Knowledge Podium\\KP Learner\\Settings\\";
    String MEDIAPATH = "CourseVideo";
    String MARKETINGMEDIAPATH = "MarketingContent";
	// course purchase
	int COURSE_PURCHASE_STATUS_ACTIVE = 1;
	int COURSE_PURCHASE_STATUS_PENDING = 0;
	int COURSE_PURCHASE_STATUS_REJECTED = 2;
	String KP_ROOT_DIR = System.getProperty("user.home") + "/Knowledge_Podium/";
	String COMPRESSED_VIDEO_HLS_KEY_BUCKET_NAME = "kp-compressed-video-hls";
	String AMAZON_S3_BUCKET_NAME = "kp-video-source";
	int STATUS_OK = 200;
	String SUCCESS_UPLOAD_STATUS_CODE = "KP-1212-074";
	String FAILED_UPLOAD_STATUS_CODE = "KP-1212-075";
}