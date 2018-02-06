import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

export default function validateInput(data) {
    let errors = {};
      console.log("Hello validater");
      if(Validator.isEmpty(data.title)) {
        errors.title = "Please enter title";
    }
      if(Validator.isEmpty(data.message)) {
          errors.message = "Please Enter Description";
      }
      if(Validator.isEmpty(data.tag)) {
    		errors.tag = "Please enter tag";
    	}
      if(!(Validator.isEmpty(data.tag)) && Validator.isEmpty(data.imageId) && (data.selectImageorPdf == "selectedImg") ) {
          errors.imageId = "Please Select Image";
      }else 
    	  if (!(Validator.isEmpty(data.tag)) && Validator.isEmpty(data.imageId) && (data.selectImageorPdf == "selectedPdf")){
    		  errors.aboutPdf = "Please Select Pdf";
    		  errors.message= '';
    	  }
  
    return {
        errors,
        isValid:isEmpty(errors)
    }
}