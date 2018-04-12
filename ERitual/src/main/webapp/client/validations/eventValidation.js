import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

export default function validateInput(data) {
  let errors = {};
     let date=(data.date).toString();


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
 if(data.date=="")
{
  errors.date = "Please enter the date";
}

  if(Validator.isEmpty(data.city)){
    errors.city = "Please enter the city";
  }
if((!Validator.isEmpty(data.city))&&(!Validator.isAlpha(data.city)))
{
  errors.city = "City name should contain only alphabets";
}
if(Validator.isEmpty(data.address1))
{
  errors.address1 = "Please enter the address "
}
  return {
    errors,
    isValid:isEmpty(errors)
  }
}