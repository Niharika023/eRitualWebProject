import axios from 'axios';
import jwt from 'jsonwebtoken';

import { SET_CURRENT_USER } from './typeConstants';
import { LOGOUT_ADMIN } from './typeConstants';
import {setAuthToken} from '../utils/setAuthToken';

export function setCurrentUser(user) {
  return {
    type: SET_CURRENT_USER,
    payload: user
  };
}

export function userLoginRequest(authData) {
	const request = axios.post('http://localhost:8080/ERitual/er/user/login',authData);
	  return {
	    type    : SET_CURRENT_USER,
	    payload : request
	  }
}

export function logout() {
	const request = axios.get('http://localhost:8080/ERitual/er/user/logout');
	  return {
	    type    : LOGOUT_ADMIN,
	    payload : request
	  }
	}
