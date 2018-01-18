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

if(Validator.isEmpty(data.description)){
    errors.description = "Please enter the description";
}

if(amount==''){
	errors.amount = "Please enter the amount ";	

}
if((amount!='')&&(!Validator.isNumeric(amount))){
	errors.amount = "Please enter the amount in digits only ";

}
/*if(data.time=='' || data.time==null || data.time=="NaN:NaN"){
    errors.time = "Please enter the time ";

} */ 

return {
        errors,
        isValid:isEmpty(errors)
    }
}
