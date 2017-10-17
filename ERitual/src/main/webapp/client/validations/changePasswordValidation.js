import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

export default function validateInput(data) {
	let errors = {};


	if(Validator.isEmpty(data.currentPassword)) {
		errors.currentPassword = "Please enter Current Password";
	}

	if(Validator.isEmpty(data.newPassword)) {
	    errors.password = "Please enter First Name";
	  }
  
  if(!Validator.isEmpty(data.newPassword) &&  data.newPassword.length < 6 || data.newPassword.length > 15 ) {
	    errors.newPassword = "Password should be between 6 and 15 characters long";
	  }
  
  if(data.newPassword!=data.confirmPassword) {
	    errors.confirmPassword = "Sorry password doesn't match";
	  }
  if(Validator.isEmpty(data.confirmPassword)) {
	    errors.confirmPassword = "Please enter confirm password";
	  }
  if(!Validator.isEmpty(data.confirmPassword) &&( data.confirmPassword.length < 6 || data.confirmPassword.length > 15) ) {
	    errors.confirmPassword = "Confirm Password should be between 6 and 15 characters long";
	  }
	if(Validator.isEmpty(data.confirmPassword)) {
		errors.confirmPassword = "Please enter confirmPassword";
	}
	
	return {
		errors,
		isValid:isEmpty(errors)
	}
}
