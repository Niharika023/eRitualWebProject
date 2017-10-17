import { GET_SEVA_BY_ID } from '../actions/editSevaAction';
import { IMAGE_UPLOAD } from '../actions/editSevaAction';
import { IMAGE_STREAM } from '../actions/editSevaAction';
import { CLEAR_SEVA } from '../actions/editSevaAction';

export default function(state = [], action) {
	switch (action.type) {
	 case GET_SEVA_BY_ID:
		 return {
		 	editSeva: JSON.parse(decodeURIComponent(action.payload.data.replace(/\+/g,'%20')))
	      }
	      break;
	 case IMAGE_UPLOAD:
	      return {
		 imageData: action.payload.imageData
	      }
	      break;
	 case IMAGE_STREAM:
		  return {
	    	...state,  
		 	imageUrl: action.payload.data
	      }
	      break;
	 case CLEAR_SEVA:
		 return {
			 state:[]
		 }
	    default:
	      return state;
	}
}
