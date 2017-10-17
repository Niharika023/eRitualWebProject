import axios from 'axios';


export const USER_REGISTRATION = 'USER_REGISTRATION';

export function setRegistrationData(user) {
	  return {
	    type: USER_REGISTRATION,
	    user
	  };
	}
export function userRegistrationRequest(userdata) {
	let user = {
	   	      "email":userdata.email,
	   	      "password":userdata.password,
	   	      "dob":userdata.dob,
	   	      //"gender":userdata.gender,
	   	      "phone":userdata.phone,
	   	      "name":userdata.name
	   	  }
	const request = axios.post('http://localhost:8080/ERitual/er/user/register',user);
	  return {
	    type    : USER_REGISTRATION,
	    payload : request
	  }
}