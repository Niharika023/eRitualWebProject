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
 if((data.time)==null)
{
  errors.time = "Please enter the time";
}
      if(Validator.isEmpty(data.amount)) {
        errors.amount = "Please enter event amount";
      }
      if((!Validator.isEmpty(data.amount)) && (!Validator.isNumeric(data.amount))) {
            errors.amount = "Event Amount  should contain only digits";
          }
      if(Validator.isEmpty(data.phoneNo)) {
            errors.phoneNo = "Please enter mobile number";
          }
      if((!Validator.isEmpty(data.phoneNo)) && (!Validator.isNumeric(data.phoneNo))) {
            errors.phoneNo = "Mobile number should contain only numbers";
          }
      if((!Validator.isEmpty(data.phoneNo)) && (Validator.isNumeric(data.phoneNo)) && (data.phoneNo.length!=10 && data.phoneNo.length != 12)) {
            errors.phoneNo = "Mobile Number should contain 10 or 12 digits";
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