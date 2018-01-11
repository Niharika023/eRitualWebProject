import { CREATE_MESSAGE } from '../actions/messageFormAction';
import { GET_MESSAGE_BY_ID } from '../actions/messageFormAction';
import { GET_HOSTED_CONTENT_BY_ID } from '../actions/messageFormAction';
import { UPDATE_MESSAGE } from '../actions/messageFormAction';
import { CLEAR_MESSAGE } from '../actions/messageFormAction';

export default function(state = [], action) {
	switch (action.type) {
	 case CREATE_MESSAGE:
	      return {
		 messageData: action.payload.messageData
	 }
	      break;
	 case GET_MESSAGE_BY_ID:
		 
		 return {
		 	...state,
 			editMessage: JSON.parse(decodeURIComponent(action.payload.data.replace(/\+/g,'%20')))
	      }
	      break;
	 case GET_HOSTED_CONTENT_BY_ID:
		 return {
		 	...state,
		 	hostedContentList: JSON.parse(decodeURIComponent(action.payload.data.replace(/\+/g,'%20')))
	      }
	      break;
	      
	 case UPDATE_MESSAGE:
	      return {
		 messageData: action.payload.messageData
	      }
	      break;
	 case CLEAR_MESSAGE:
		 return {
			 state:[]
		 }
	    default:
	      return state;
	}
}
