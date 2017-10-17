import axios from 'axios';

export const CREATE_SEVA = 'CREATE_SEVA';
export const IMAGE_UPLOAD = 'IMAGE_UPLOAD';
export const FETCH_RASHI ='FETCH_RASHI';
export const FETCH_NAKSHATRA ='FETCH_NAKSHATRA';
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
export function userSevaFormsRequest(sevaData) {
	let seva= {
			"name":sevaData.name,
			"description":sevaData.description,
			"formFields":sevaData.formFields,
			"available":sevaData.available,
			"amount":sevaData.amount,
			"imageId":sevaData.imageId,
			"time":sevaData.time
	}
	const request = axios.post('http://localhost:8080/ERitual/er/seva/create',seva);
	  return {
	    type    : CREATE_SEVA,
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

export function rashiRequest() {
	const request = axios.get('http://localhost:8080/ERitual/er/seva/rashi/list');
	  return {
	    type    : FETCH_RASHI,
	    payload : request
	  }
}

export function nakshatraRequest() {
	const request = axios.get('http://localhost:8080/ERitual/er/seva/nakshatra/list');
	  return {
	    type    : FETCH_NAKSHATRA,
	    payload : request
	  }
}


