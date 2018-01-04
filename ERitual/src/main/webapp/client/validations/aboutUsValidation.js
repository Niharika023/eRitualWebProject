import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

export default function validateInput(data) {
    let errors = {};

    
    /*if(Validator.isEmpty(data.name)) {
        errors.name = "Please enter Name";
    }
    if((/^\s/.test(data.name))|| (/\s$/.test(data.overview))) {
        errors.name = "Please enter the valid  overview";
      }
      if(Validator.isEmpty(data.panchanga)) {
        errors.description = "Please enter panchanga";
    }*/
    return {
        errors,
        isValid:isEmpty(errors)
    }
}