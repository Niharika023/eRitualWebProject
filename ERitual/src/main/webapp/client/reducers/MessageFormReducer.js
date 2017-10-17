import { CREATE_MESSAGE } from '../actions/messageFormAction';

export default function(state = [], action) {
	switch (action.type) {
	 case CREATE_MESSAGE:
	      return {
		 messageData: action.payload.messageData
	 }
	      break;
	    default:
	      return state;
	}
}
