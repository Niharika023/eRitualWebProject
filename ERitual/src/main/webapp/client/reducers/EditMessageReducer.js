import { GET_MESSAGE_BY_ID } from '../actions/editMessageAction';
import { UPDATE_MESSAGE } from '../actions/editMessageAction';
import { CLEAR_MESSAGE } from '../actions/editMessageAction';

export default function(state = [], action) {
	switch (action.type) {
	 case GET_MESSAGE_BY_ID:
		 return {
		 	editMessage: JSON.parse(decodeURIComponent(action.payload.data.replace(/\+/g,'%20')))
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
