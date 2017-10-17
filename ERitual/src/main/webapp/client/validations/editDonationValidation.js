import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

export default function validateInput(data) {
	let errors = {};
	let amount=(data.amount).toString();
	if(Validator.isEmpty(data.name)) {
		errors.name = "Please enter Name";
	}
	if((/^\s/.test(data.name))|| (/\s$/.test(data.name))) {
	    errors.name = "Please enter the valid  Name";
	  }

	if(Validator.isEmpty(data.description)) {
		errors.description = "Please enter description";
	}
	if(Validator.isEmpty(amount)) {
		errors.amount = "Please enter amount";
	}
	
	if(!Validator.isEmpty(amount) && !Validator.isNumeric(amount)) {
		errors.amount = "Donation amount should contain only numbers";
	}
	return {
		errors,
		isValid:isEmpty(errors)
	}
}
