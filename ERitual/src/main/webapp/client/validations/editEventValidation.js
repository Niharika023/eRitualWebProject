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
