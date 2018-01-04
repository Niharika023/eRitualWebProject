import { CREATE_ABOUT_US } from  '../actions/aboutUsAction';

export default function(state = [], action) {
	switch (action.type) {
	 case CREATE_ABOUT_US:
	      return {
		 data: action.payload.data
	      }
	      break;
	    default:
	      return state;
	}
}
