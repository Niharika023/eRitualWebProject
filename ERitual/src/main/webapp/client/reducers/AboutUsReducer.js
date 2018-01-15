import { CREATE_ABOUT_US } from  '../actions/aboutUsAction';
import { GET_ABOUTUS_BY_ID } from '../actions/tagConfigFormAction';
import { CLEAR_ABOUTUS } from '../actions/tagConfigFormAction';

export default function(state = [], action) {
	switch (action.type) {
	 case CREATE_ABOUT_US:
	      return {
		 data: action.payload.data
	      }
	      break;
case GET_ABOUTUS_BY_ID:
	return {
		 	editAboutUs: JSON.parse(decodeURIComponent(action.payload.data.replace(/\+/g,'%20')))
	      }
		 
	      break;
case CLEAR_ABOUTUS:
	return {
		 state:[]
	 }
	    default:
	      return state;
	}
}
