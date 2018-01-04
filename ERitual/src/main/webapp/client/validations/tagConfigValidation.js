import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

export default function validateInput(data) {
    let errors = {};

    
    /*if(Validator.isEmpty(data.tagKey)) {
        errors.tagKey = "Please enter key";
    }
    if((/^\s/.test(data.tagKey))|| (/\s$/.test(data.tagKey))) {
        errors.tagKey = "Please enter the valid  tagKey";
      }*/
      if(Validator.isEmpty(data.value)) {
        errors.value = "Please enter value";
    }
    return {
        errors,
        isValid:isEmpty(errors)
    }
}