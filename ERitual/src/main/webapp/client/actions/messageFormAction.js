import axios from 'axios';

export const CREATE_MESSAGE = 'CREATE_MESSAGE';
export function setMessageData(messageData) {
	  return {
	    type: CREATE_MESSAGE,
	    messageData
	  };
	}

export function userMessageFormsRequest(messageData) {
	let message= {
			"title":messageData.title,
			"message":messageData.message,
			"imageId":messageData.imageId,
	}
	const request = axios.post('http://localhost:8080/ERitual/er/message/create',message);
	  return {
	    type    : CREATE_MESSAGE,
	    payload : request
	  }
}



