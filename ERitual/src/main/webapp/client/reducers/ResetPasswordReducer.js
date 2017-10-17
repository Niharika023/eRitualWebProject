import { RESET_PASWORD } from '../actions/resetPasswordAction';
import { EMAIL_VERIFICATION } from '../actions/resetPasswordAction';

export default function(state = [], action) {
	switch (action.type) {
	 case RESET_PASWORD:
	      return {
		 data: action.payload.data
	      }
	      break;
	 case EMAIL_VERIFICATION :
	      return {
		 data: action.payload.data
	      }
	      break;
	    default:
	      return state;
	}
}
