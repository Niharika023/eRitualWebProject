import axios from 'axios';

export const CHANGE_PASSWORD = 'CHANGE_PASSWORD';
export function setChangePasswordData(changePasswordData) {
	  return {
	    type: CHANGE_PASSWORD,
	    changePasswordData
	  };
	}

export function userChangePasswordFormsRequest(changePasswordData) {
	let changePassword= {
			"currentPassword":changePasswordData.currentPassword,
			"newPassword":changePasswordData.newPassword,
	}
	const request = axios.post('http://localhost:8080/ERitual/er/user/changePassword',changePassword);
	  return {
	    type    : CHANGE_PASSWORD,
	    payload : request
	  }
}



