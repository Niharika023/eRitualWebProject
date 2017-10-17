import axios from 'axios';

export const GET_SEVA_BY_ID = 'GET_SEVA_BY_ID';
export const IMAGE_UPLOAD = 'IMAGE_UPLOAD';
export const FETCH_RASHI ='FETCH_RASHI';
export const FETCH_NAKSHATRA ='FETCH_NAKSHATRA';
export const UPDATE_SEVA='UPDATE_SEVA';
export const IMAGE_STREAM='IMAGE_STREAM';
export const CLEAR_SEVA = 'CLEAR_SEVA';
export function setSevaData(sevaData) {
	  return {
	    type: CREATE_SEVA,
	    sevaData
	  };
	}

export function setImageUpload(imageData) {
	  return {
	    type: IMAGE_UPLOAD,
	    imageData
	  };
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
	console.log("action");
	const request = axios.get('http://localhost:8080/ERitual/er/seva/get/byId'+"?sevaId="+ sevaIdForEdit);
	  return {
	    type    : GET_SEVA_BY_ID,
	    payload : request
	  }
}

export function userSevaFormsRequest(sevaData) {
	let seva= {
			"name":sevaData.name,
			"description":sevaData.description,
			"formFields":sevaData.formFields,
			"available":sevaData.available,
			"amount":sevaData.amount,
			"imageId":sevaData.imageId,
			"time":sevaData.time,
			"id":sevaData.id
	}
	const request = axios.post('http://localhost:8080/ERitual/er/seva/update',seva);
	  return {
	    type    : UPDATE_SEVA,
	    payload : request
	  }
}

export function imageUploadRequest(imageData) {
	const request = axios.post('http://localhost:8080/ERitual/er/seva/image',imageData);
	  return {
	    type    : IMAGE_UPLOAD,
	    payload : request
	  }
}

export function imageStreamRequest(imageId) {
	const request = axios.get('http://localhost:8080/ERitual/er/seva/image/stream'+"?imageId="+ imageId);
	/*const request = axios({
		method:'GET',
		url:'http://localhost:8080/ERitual/er/seva/image/stream'+"?imageId="+ imageId,
		responseType:'blob'
	})*/
	  return {
	    type    : IMAGE_STREAM,
	    payload : request
	  }
}



