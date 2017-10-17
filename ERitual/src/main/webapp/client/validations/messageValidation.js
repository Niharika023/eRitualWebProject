import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

export default function validateInput(data) {
    let errors = {};

      if(Validator.isEmpty(data.title)) {
        errors.title = "Please enter title";
    }
     if(Validator.isEmpty(data.message)) {
        errors.message = "Please enter message";
      }
    return {
        errors,
        isValid:isEmpty(errors)
    }
}