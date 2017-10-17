import { USER_REGISTRATION } from '../actions/registrationAction';

export default function(state = [], action) {
	switch (action.type) {
	 case USER_REGISTRATION:
	      return {
	    	user: action.payload.user
	      }
	      break;
	    default:
	      return state;
	}
}