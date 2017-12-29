import { CREATE_SEVA } from '../actions/sevaFormAction';
import { CLEAR_SEVA } from '../actions/sevaFormAction';
import { GET_SEVA_BY_ID } from '../actions/sevaFormAction';
import { ADDAUDVID_INSEVA } from '../actions/sevaFormAction';

export default function(state = [], action) {
	switch (action.type) {
	 case CREATE_SEVA:
	      return {
		 sevaData: action.payload.sevaData
	      }
	      break;
	 case ADDAUDVID_INSEVA:
	      return {
		 audVidData: action.payload.sevaData
	      }
	      break;
	 case GET_SEVA_BY_ID:
		 return {
		 	editSeva: JSON.parse(decodeURIComponent(action.payload.data.replace(/\+/g,'%20')))
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
