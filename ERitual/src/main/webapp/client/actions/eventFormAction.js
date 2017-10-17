import axios from 'axios';

export const CREATE_EVENT = 'CREATE_EVENT';
export const IMAGE_UPLOAD = 'IMAGE_UPLOAD';
export const FETCH_RASHI ='FETCH_RASHI';
export const FETCH_NAKSHATRA ='FETCH_NAKSHATRA';
export function setEventData(eventData) {
	  return {
	    type: CREATE_EVENT,
	    eventData
	  };
	}

export function setImageUpload(imageData) {
	  return {
	    type: IMAGE_UPLOAD,
	    imageData
	  };
	}
export function userEventFormsRequest(eventData) {
	let event= {
			"name":eventData.name,
			"description":eventData.description,
			"formFields":eventData.formFields,
			"available":eventData.available,
			"address1":eventData.address1,
			"address2":eventData.address2,
			"locality":eventData.locality,
			"city":eventData.city,
			"contactDetails":eventData.phoneNo,
			"amount":eventData.amount,
			"date":eventData.date,
			"time":eventData.time,
			"imageId":eventData.imageId
			
	}
	const request = axios.post('http://localhost:8080/ERitual/er/event/create',event);
	  return {
	    type    : CREATE_EVENT,
	    payload : request
	  }
}

export function imageUploadRequest(imageData) {
	const request = axios.post('http://localhost:8080/ERitual/er/event/image',imageData);
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


