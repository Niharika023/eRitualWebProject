import { SET_CURRENT_USER } from '../actions/typeConstants';
import isEmpty from 'lodash/isEmpty';
import {LOGOUT_ADMIN} from '../actions/authActions';
const initialState = {
  isAuthenticated : false,
  user : {

  }
}

export default (state=initialState,action={}) => {
	 switch (action.type) {
	 case SET_CURRENT_USER:
	      return {
	    	user: action.payload.user
	      }
	      break;
	 case LOGOUT_ADMIN:
	      return {
	    	user: action.payload.user
	      }
	      break;
	    default:
	      return state;

  }
	 
	 

}
