import axios from 'axios';

export const RESET_PASSWORD = 'RESET_PASSWORD';
export const EMAIL_VERIFICATION = 'EMAIL_VERIFICATION';
export function setResetPasswordData(resetPasswordData) {
	  return {
	    type: RESET_PASSWORD,
	    resetPasswordData
	  };
	}

export function userResetPasswordFormsRequest(otpSentData) {
	let otpVerificationData= {
			"emailId":otpSentData.emailId,
			"subject":otpSentData.subject,
			"template":otpSentData.template
	}
	const request = axios.post('http://localhost:8080/ERitual/er/user/emailVerification',otpVerificationData);
	  return {
	    type    : EMAIL_VERIFICATION,
	    payload : request
	  }
}

export function userOtpVerificationFormsRequest(resetPasswordData){
	let resetPassword= {
			"emailId":resetPasswordData.emailId,
			"otp":resetPasswordData.otp,
			"changePassword":resetPasswordData.changePassword
	}
	const request = axios.post('http://localhost:8080/ERitual/er/user/resetPassword',resetPassword);
	  return {
	    type    : RESET_PASSWORD,
	    payload : request
	  }
}

