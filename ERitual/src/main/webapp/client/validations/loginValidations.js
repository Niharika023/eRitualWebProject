import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

export default function validateInput(data) {
  let errors = {};
  
  if(Validator.isEmpty(data.name)) {
	    errors.name = "Please enter User Name";
	  }
 
  if( data.password.length < 6 || data.password.length > 15 ) {
    errors.password = "Password should be between 6 and 15 characters long";
  }

  if(Validator.isEmpty(data.password)) {
    errors.password = "Please enter password";
  }

  return {
    errors,
    isValid:isEmpty(errors)
  }
}
