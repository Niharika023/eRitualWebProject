import axios from 'axios';

export const CREATE_EVENT = 'CREATE_EVENT';
export const GET_EVENT_BY_ID = 'GET_EVENT_BY_ID';
export const UPDATE_EVENT='UPDATE_EVENT';
export const CLEAR_EVENT = 'CLEAR_EVENT';
export function setEventData(eventData) {
	  return {
	    type: CREATE_EVENT,
	    eventData
	  };
	}

export function userEventFormsRequest(event) {
	const request = axios.post('http://localhost:8080/ERitual/er/event/create',event);
	  return {
	    type    : CREATE_EVENT,
	    payload : request
	  }
}

export function setImageUpload(imageData) {
	  return {
	    type: IMAGE_UPLOAD,
	    imageData
	  };
	}
export function userEditEventsRequest(eventIdForEdit) {
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

export function userEventUpdateFormsRequest(event) {
	const request = axios.post('http://localhost:8080/ERitual/er/event/update',event);
	  return {
	    type    : UPDATE_EVENT,
	    payload : request
	  }
}





