import axios from 'axios';

export const CREATE_SEVA = 'CREATE_SEVA';
export const GET_SEVA_BY_ID = 'GET_SEVA_BY_ID';
export const GET_TAGCONFIG_BY_KEY = 'GET_TAGCONFIG_BY_KEY';
export const UPDATE_SEVA='UPDATE_SEVA';
export const IMAGE_STREAM='IMAGE_STREAM';
export const CLEAR_SEVA = 'CLEAR_SEVA';
export const ADDAUDVID_INSEVA = 'ADDAUDVID_INSEVA';
export function setSevaData(sevaData) {
	  return {
	    type: CREATE_SEVA,
	    sevaData
	  };
	}
export function userSevaFormsRequest(seva) {
	const request = axios.post('http://localhost:8080/ERitual/er/seva/create',seva);
	  return {
	    type    : CREATE_SEVA,
	    payload : request
	  }
}

export function tagByKeyRequest(key) {
	
	const request = axios.get('http://localhost:8080/ERitual/er/tagConfig/get/byKey'+"?key="+ key);
	  return {
	    type    : GET_TAGCONFIG_BY_KEY,
	    payload : request
	  }
}

export function audVidDetailsFormrequest(audVidDetails) {
		const request = axios.post('http://localhost:8080/ERitual/er/seva/content_create',audVidDetails);
		  return {
		    type    : ADDAUDVID_INSEVA,
		    payload : request
		  }
	}

export function clearSevaData() {
	return {
	    type    : CLEAR_SEVA,
	    payload:'whatever'
	 } 
}

export function setImageStream(imageUrl) {
	  return {
	    type: IMAGE_STREAM,
	    imageUrl
	  };
	}
export function userEditSevasRequest(sevaIdForEdit) {
	const request = axios.get('http://localhost:8080/ERitual/er/seva/get/byId'+"?sevaId="+ sevaIdForEdit);
	  return {
	    type    : GET_SEVA_BY_ID,
	    payload : request
	  }
}

export function userSevaUpdateFormsRequest(seva) {
	const request = axios.post('http://localhost:8080/ERitual/er/seva/update',seva);
	  return {
	    type    : UPDATE_SEVA,
	    payload : request
	  }
}



