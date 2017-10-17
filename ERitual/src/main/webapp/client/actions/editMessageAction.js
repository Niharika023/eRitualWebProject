import axios from 'axios';

export const GET_MESSAGE_BY_ID = 'GET_MESSAGE_BY_ID';
export const UPDATE_MESSAGE='UPDATE_MESSAGE';
export const CLEAR_MESSAGE = 'CLEAR_MESSAGE';
export function setMessageData(messageData) {
	  return {
	    type: UPDATE_MESSAGE,
	    messageData
	  };
	}

export function userEditMessagesRequest(messageIdForEdit) {
	console.log("action");
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

export function userMessageFormsRequest(messageData) {
	let message= {
			"title":messageData.title,
			"message":messageData.message,
			"imageId":messageData.imageId,
			"id":messageData.id
	}
	const request = axios.post('http://localhost:8080/ERitual/er/message/update',message);
	  return {
	    type    : UPDATE_MESSAGE,
	    payload : request
	  }
}




