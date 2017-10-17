import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

export default function validateInput(data) {
  let errors = {};
 
 if(Validator.isEmpty((data.name).toString().trim())) {
    errors.name = "Please enter First Name";
  }
  if((!Validator.isEmpty(data.name))&&(!Validator.isAlpha(data.name)) ){
    errors.name = "First Name  should contain only alphabets";
  }
 
  if(Validator.isEmpty(data.password)) {
        errors.password = "Please enter password";
      }
  
  if(!Validator.isEmpty(data.password) &&  data.password.length < 6 || data.password.length > 15 ) {
        errors.password = "Password should be between 6 and 15 characters long";
      }
  
   if ( /[A-Z a-z]+\s[A-Z a-z]*/.test(data.password) || /^\s+/.test(data.password) || /\s+$/.test(data.password)) {
      errors.password = "Sorry whitespaces are not allowed in the password ";
      
    }

  if(data.password!=data.confirmPassword) {
        errors.confirmPassword = "Sorry password doesn't match";
      }

  if(Validator.isEmpty(data.confirmPassword)) {
        errors.confirmPassword = "Please enter confirm password";
      }
  if(!Validator.isEmpty(data.confirmPassword) &&( data.confirmPassword.length < 6 || data.confirmPassword.length > 15) ) {
        errors.confirmPassword = "Confirm Password should be between 6 and 15 characters long";
      }

  if(!Validator.isNumeric(data.phone)) {
    errors.phone = "Mobile number should contain only numbers";
  }

  if(Validator.isEmpty(data.phone)) {
    errors.phone = "Please enter Mobile No.";
  }
    if((!Validator.isEmpty(data.phone)) && (Validator.isNumeric(data.phone)) && (data.phone.length!=10 && data.phone.length != 12)) {
        errors.phone = "Mobile Number should contain 10 or 12 digits";
      }
   if(Validator.isEmpty(data.email)) {
    errors.email = "Please enter Email Id";
  }
  
  return {
    errors,
    isValid:isEmpty(errors)
  }
}
