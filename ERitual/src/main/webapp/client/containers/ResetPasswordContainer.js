import React,{Component} from 'react';
import classnames from 'classnames';
import map from 'lodash';
import { Link } from 'react-router';
import jwt from 'jsonwebtoken';
import Dropdown from 'react-dropdown';

import validateInput from '../validations/resetPasswordValidation';
import TextFieldGroup from '../components/common/TextFieldGroup';
import setAuthToken from '../utils/setAuthToken';

class ResetPasswordFormContainer extends Component {
    constructor(props){
      super(props);
      // We will be using the state to control the input. This will ensure
		// that the state will always hold the lastest
      this.state = {
        emailId: '',
        subject:'Hello, This is your otp',
        template:'OTP:${otp}',
        errors:{},
        success:{},
        isLoading:false,
        firstTimeFormSubmit:false,
      }

      this.onChange = this.onChange.bind(this);// bind(this) is needed here,
      this.onSubmit = this.onSubmit.bind(this);
    }
    

    onChange(event) {
      this.setState({ [event.target.name]:event.target.value}, function() {
        if(this.state.firstTimeFormSubmit) {
          this.isValid();
        }
      });
    }

    
    // method to check the validity of the form
    isValid() {
      // deconstruct the props
      const {errors, isValid } = validateInput(this.state);
      // if(!isValid) {
        this.setState({ errors });
      // }
      return isValid;
    }

    onSubmit(event) {
      event.preventDefault();
      this.setState({ firstTimeFormSubmit : true })
      if(this.isValid()) {
        this.setState({ errors: {}, isLoading:true });
        let otpSentData=this.state;
         this.props.userResetPasswordFormsRequest(otpSentData).then(
        		 (res) => {
        			 //res.payload.data=JSON.parse(decodeURIComponent(res.payload.data.replace(/\+/g,'%20')));
        	        		let changePasswordFormData= res.payload.data;
        	               	if(changePasswordFormData== false) {
        	               		this.setState({ errors : { "form" : "Please enter registered email id" }, isLoading : false })
        	               		}
        	               		else {
              	               		this.props.addToast({  type:'success', 
              	               			text:`Otp has been sent to your registered emailId `, 
              	               			toastType:'auto'  });
              	               	this.context.router.push('/ERitual/otpVerification');
              	               	}
        		 			},
         				);
        	      }
    }
    

    render() {
        const {errors ,success, emailId,otp,isLoading,checked} = this.state;
        return (
            <form className="p20 user-entry-forms login-form" onSubmit={this.onSubmit}>
                <h3 className="mt0 mb20 text-center">Enter Your Registered Email Id</h3>
                <div className="row mb30">
                  <div className="col-xs-12">
                    <hr/>
                  </div>
                </div>
                { errors.form && <div className="alert alert-danger">{errors.form}</div> }
                <div className="row mb10">
                <div className="col-md-12">
                  <TextFieldGroup
                    error={errors.emailId}
                    onChange={this.onChange}
                    value={emailId}
                    field="emailId"
                    type="email"
                    label="Email Id"
                  />
                </div>
                  </div>
                <div className="row mt30">
                	<div className="col-md-6 text-center ">
                		<Link to="/ERitual/" className=" block mb20 link-secondary">Cancel</Link> 
                	</div>
                	<div className="col-md-6">
                     <div className="form-group">
                    	<button disabled={this.state.isLoading} className="btn btn-lg btn-primary full-width">
                    		Submit
                        </button>
                    </div>
                  </div>
                </div>
            </form>
        );
    }
}



ResetPasswordFormContainer.contextTypes = {
  router:React.PropTypes.object.isRequired
}

export default ResetPasswordFormContainer;
