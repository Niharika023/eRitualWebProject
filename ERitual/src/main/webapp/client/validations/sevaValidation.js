import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

export default function validateInput(data) {
	let errors = {};
   console.log("Validator");
	if(Validator.isEmpty(data.name)) {
		errors.name = "Please enter name";
	}

	if((/^\s/.test(data.name))|| (/\s$/.test(data.name))) {
		errors.name = "Please enter the valid  name";
	}

	if(Validator.isEmpty(data.description)){
		errors.description = "Please enter the description";
	}
	if(data.amount==''){
		errors.amount = "Please enter the amount ";
	}
	if((data.amount!='')&&(!Validator.isNumeric(data.amount))){
		errors.amount = "Please enter the amount in digits only ";
	}
	
	if(Validator.isEmpty(data.tag)) {
		errors.tag = "Please enter tag";
	}
	
	/*if(Validator.isEmpty(data.imgName)) {
		errors.imgName = "Please choose an image";
	}*/

	/*if(data.time=='' || data.time==null){
	errors.time = "Please enter the time ";

}*/


	return {
		errors,
		isValid:isEmpty(errors)
	}
}