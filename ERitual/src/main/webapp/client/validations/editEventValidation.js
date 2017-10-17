import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

export default function validateInput(data) {
  let errors = {};
let amount=(data.amount).toString();
  if(Validator.isEmpty(data.name)) {
    errors.name = "Please enter Name";
  }

  if(Validator.isNumeric(data.name)){
    errors.name = "Event name cannot be only numeric";
  }
  
  if((/^\s/.test(data.name))|| (/\s$/.test(data.name))) {
        errors.name = "Please enter the valid  Name";
      }

  if(Validator.isEmpty(data.description)) {
    errors.description = "Please enter description";
  }
  if(Validator.isEmpty(data.date) || data.date=="NaN-NaN-NaN")
{
  errors.date = "please enter the date";
}
 if((data.time)==null || data.time=="NaN:NaN")
{
  errors.time = "please enter the time";
}
      if(Validator.isEmpty(amount)) {
        errors.amount = "Please enter event amount";
      }
      if((!Validator.isEmpty(amount)) && (!Validator.isNumeric(amount))) {
            errors.amount = "Event Amount  should contain only digits";
          }
      if(Validator.isEmpty(data.contactDetails)) {
            errors.contactDetails = "Please enter mobile number";
          }
      if((!Validator.isEmpty(data.contactDetails)) && (!Validator.isNumeric(data.contactDetails))) {
            errors.contactDetails = "Mobile number should contain only numbers";
          }
      if((!Validator.isEmpty(data.contactDetails)) && (Validator.isNumeric(data.contactDetails)) && (data.contactDetails.length!=10 && data.contactDetails.length != 12)) {
            errors.contactDetails = "Mobile Number should contain 10 or 12 digits";
          }
  if(Validator.isEmpty(data.city)){
    errors.city = "Please enter the city";
  }
  if(data.address1==null){
	  data.address1="";
  }
if(Validator.isEmpty(data.address1)|| data.address1==null)
{
  errors.address1 = "Address cannot be empty. Please enter a valid address. "
}
  return {
    errors,
    isValid:isEmpty(errors)
  }
}
