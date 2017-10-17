import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

export default function validateInput(data) {
  let errors = {};
  
  if(Validator.isEmpty(data.emailId)) {
	    errors.emailId = "Please enter Email Id";
	  }
 /* if(Validator.isEmail(data.emailId)) {
	    errors.name = "Please enter valid Email Id";
	  }*/
  if(Validator.isEmpty(data.otp)) {
	    errors.otp = "Please enter otp";
	  }
  if(Validator.isEmpty(data.changePassword)) {
      errors.password = "Please enter password";
    }

if(!Validator.isEmpty(data.changePassword) &&  data.changePassword.length < 6 || data.changePassword.length > 15 ) {
      errors.changePassword = "Password should be between 6 and 15 characters long";
    }

 if ( /[A-Z a-z]+\s[A-Z a-z]*/.test(data.changePassword) || /^\s+/.test(data.changePassword) || /\s+$/.test(data.changePassword)) {
    errors.changePassword = "Sorry whitespaces are not allowed in the password ";
    
  }

if(data.changePassword!=data.confirmPassword) {
      errors.confirmPassword = "Sorry password doesn't match";
    }

if(Validator.isEmpty(data.confirmPassword)) {
      errors.confirmPassword = "Please enter confirm password";
    }
if(!Validator.isEmpty(data.confirmPassword) &&( data.confirmPassword.length < 6 || data.confirmPassword.length > 15) ) {
      errors.confirmPassword = "Confirm Password should be between 6 and 15 characters long";
    }

  return {
    errors,
    isValid:isEmpty(errors)
  }
}
