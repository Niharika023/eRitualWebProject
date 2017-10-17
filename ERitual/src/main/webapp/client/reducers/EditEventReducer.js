import { GET_EVENT_BY_ID } from '../actions/editEventAction';
import { IMAGE_UPLOAD } from '../actions/editEventAction';
import { CLEAR_EVENT } from '../actions/editEventAction';

export default function(state = [], action) {
	switch (action.type) {
	 case GET_EVENT_BY_ID:
		 console.log("event edit ", JSON.parse(decodeURIComponent(action.payload.data.replace(/\+/g,'%20')))); 
		 return {
		 	editEvent: JSON.parse(decodeURIComponent(action.payload.data.replace(/\+/g,'%20')))
		 }		 
	      break;
	 case IMAGE_UPLOAD:
	      return {
	 imageData: action.payload.imageData
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
