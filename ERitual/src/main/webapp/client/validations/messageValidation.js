import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

export default function validateInput(data) {
    let errors = {};

      if(Validator.isEmpty(data.title)) {
        errors.title = "Please enter title";
    }
    return {
        errors,
        isValid:isEmpty(errors)
    }
}