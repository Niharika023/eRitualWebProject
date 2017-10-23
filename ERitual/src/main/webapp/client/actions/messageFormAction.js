import axios from 'axios';

export const CREATE_MESSAGE = 'CREATE_MESSAGE';
export const GET_MESSAGE_BY_ID = 'GET_MESSAGE_BY_ID';
export const UPDATE_MESSAGE='UPDATE_MESSAGE';
export const CLEAR_MESSAGE = 'CLEAR_MESSAGE';
export function setMessageData(messageData) {
	  return {
	    type: CREATE_MESSAGE,
	    messageData
	  };
	}

export function userMessageFormsRequest(message) {
	const request = axios.post('http://localhost:8080/ERitual/er/message/create',message);
	  return {
	    type    : CREATE_MESSAGE,
	    payload : request
	  }
}

export function userEditMessagesRequest(messageIdForEdit) {
	const request = axios.get('http://localhost:8080/ERitual/er/message/get/byId'+"?messageId="+ messageIdForEdit);
	  return {
	    type    : GET_MESSAGE_BY_ID,
	    payload : request
	  }
}

export function clearMessageData() {
	return {
	    type    : CLEAR_MESSAGE,
	    payload:'clear'
	 } 
}

export function userMessageUpdateFormsRequest(message) {
	const request = axios.post('http://localhost:8080/ERitual/er/message/update',message);
	  return {
	    type    : UPDATE_MESSAGE,
	    payload : request
	  }
}


