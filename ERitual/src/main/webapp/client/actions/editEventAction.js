import axios from 'axios';

export const GET_EVENT_BY_ID = 'GET_EVENT_BY_ID';
export const IMAGE_UPLOAD = 'IMAGE_UPLOAD';
export const FETCH_RASHI ='FETCH_RASHI';
export const FETCH_NAKSHATRA ='FETCH_NAKSHATRA';
export const UPDATE_EVENT='UPDATE_EVENT';
export const CLEAR_EVENT = 'CLEAR_EVENT';
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
export function userEditEventsRequest(eventIdForEdit) {
	console.log("action");
	const request = axios.get('http://localhost:8080/ERitual/er/event/get/byId'+"?eventId="+ eventIdForEdit);
	  return {
	    type    : GET_EVENT_BY_ID,
	    payload : request
	  }
}

export function clearEventData() {
	return {
	    type    : CLEAR_EVENT,
	    payload:'whatever'
	 } 
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
			"imageId":eventData.imageId,
			"id":eventData.id
	}
	const request = axios.post('http://localhost:8080/ERitual/er/event/update',event);
	  return {
	    type    : UPDATE_EVENT,
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



