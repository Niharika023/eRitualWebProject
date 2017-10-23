import { CREATE_EVENT } from '../actions/eventFormAction';
import { GET_EVENT_BY_ID } from '../actions/eventFormAction';
import { CLEAR_EVENT } from '../actions/eventFormAction';

export default function(state = [], action) {
	switch (action.type) {
	 case CREATE_EVENT:
	      return {
		 eventData: action.payload.eventData
	      }
	      break;
	 case GET_EVENT_BY_ID:
		 return {
		 	editEvent: JSON.parse(decodeURIComponent(action.payload.data.replace(/\+/g,'%20')))
		 }		 
	      break;
	 case CLEAR_EVENT:
		 return {
			 state:[]
		 }
	    default:
	      return state;
	}
}
