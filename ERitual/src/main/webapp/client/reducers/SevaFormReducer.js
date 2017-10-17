import { CREATE_SEVA } from '../actions/sevaFormAction';
import { IMAGE_UPLOAD } from '../actions/sevaFormAction';

export default function(state = [], action) {
	switch (action.type) {
	 case CREATE_SEVA:
	      return {
		 sevaData: action.payload.sevaData
	      }
	      break;
	 case IMAGE_UPLOAD:
	      return {
		 imageData: action.payload.imageData
	      }
	      break;
	    default:
	      return state;
	}
}
