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

  return {
    errors,
    isValid:isEmpty(errors)
  }
}
