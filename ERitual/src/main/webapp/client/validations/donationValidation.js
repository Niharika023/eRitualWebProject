import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

export default function validateInput(data) {
    let errors = {};

    console.log("hello valid")
    if(Validator.isEmpty(data.name)) {
        errors.name = "Please enter Name";
    }
    if((/^\s/.test(data.name))|| (/\s$/.test(data.name))) {
        errors.name = "Please enter the valid  Name";
      }
     if(Validator.isEmpty(data.amount)) {
        errors.amount = "Please enter donation amount";
      }
     if(Validator.isEmpty(data.description)) {
         errors.description = "Please enter description";
       }
     if(Validator.isEmpty(data.tag)) {
 		errors.tag = "Please enter tag";
 	}
     if(!Validator.isEmpty(data.amount) && !Validator.isNumeric(data.amount)) {
        errors.amount = "Donation amount should contain only numbers";
    }
    return {
        errors,
        isValid:isEmpty(errors)
    }
}