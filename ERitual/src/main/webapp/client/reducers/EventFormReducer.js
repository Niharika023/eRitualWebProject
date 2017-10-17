import { CREATE_EVENT } from '../actions/eventFormAction';
import { IMAGE_UPLOAD } from '../actions/eventFormAction';
import { FETCH_RASHI } from '../actions/eventFormAction';
import { FETCH_NAKSHATRA } from '../actions/eventFormAction';

export default function(state = [], action) {
	switch (action.type) {
	 case CREATE_EVENT:
	      return {
		 eventData: action.payload.eventData
	      }
	      break;
	 case IMAGE_UPLOAD:
	      return {
		 imageData: action.payload.imageData
	      }
	    default:
	      return state;
	}
}
