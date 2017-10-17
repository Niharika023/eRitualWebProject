import { CHANGE_PASWWORD } from '../actions/changePasswordAction';

export default function(state = [], action) {
	switch (action.type) {
	 case CHANGE_PASWWORD:
	      return {
		 data: action.payload.data
	      }
	      break;
	    default:
	      return state;
	}
}
