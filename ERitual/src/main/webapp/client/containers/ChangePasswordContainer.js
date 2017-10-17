import React,{Component} from 'react';
import classnames from 'classnames';
import map from 'lodash';
import { Link } from 'react-router';
import jwt from 'jsonwebtoken';
import Dropdown from 'react-dropdown';

import validateInput from '../validations/changePasswordValidation';
import TextFieldGroup from '../components/common/TextFieldGroup';
import setAuthToken from '../utils/setAuthToken';

class ChangePasswordFormContainer extends Component {
    constructor(props){
      super(props);
      // We will be using the state to control the input. This will ensure
		// that the state will always hold the lastest
      this.state = {
        currentPassword: '',
        newPassword:'',
        confirmPassword:null,
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
        let changePasswordData=this.state;
         this.props.userChangePasswordFormsRequest.userChangePasswordFormsRequest(changePasswordData).then(
        		 (res) => {
        			 res.payload.data=JSON.parse(decodeURIComponent(res.payload.data.replace(/\+/g,'%20')));
        	        		let changePasswordFormData= res.payload.data;
        	               	if(changePasswordFormData.message!= null) {
        	               		this.setState({ errors : { "form" : changePasswordFormData.message }, isLoading : false })
        	               		}
        	               	else {
        	               		this.context.router.push('/ERitual/home');
        	               	}
        	         },
        	         );
        	      }
    }
    

    render() {
        const {errors ,success, currentPassword,newPassword,confirmPassword,isLoading,checked} = this.state;
        return (
            <form className="p20 user-entry-forms login-form" onSubmit={this.onSubmit}>
                <h2 className="mt0 mb20 text-center">ChangePassword Form</h2>
                <div className="row mb30">
                  <div className="col-xs-12">
                    <hr/>
                  </div>
                </div>
                { errors.form && <div className="alert alert-danger">{errors.form}</div> }
                <label>Name</label>
                <div className="row mb10">
                <div className="col-xs-12">
                  <TextFieldGroup
                    error={errors.currentPassword}
                    label="Current Password"
                    onChange={this.onChange}
                    value={currentPassword}
                    field="currentPassword"
                    type="password"
                  />
                </div>
              </div>
            <div className="row mb10">
                <div className="col-xs-12">
	                <TextFieldGroup
	                error={errors.newPassword}
	                label="New Password"
	                onChange={this.onChange}
	                value={newPassword}
	                field="newPassword"
	                type="password"
	              />
                 </div>
               </div>
               <div className="row mb10">
               <div className="col-xs-12">
	               <TextFieldGroup
	               error={errors.confirmPassword}
	               label="Confirm Password"
	               onChange={this.onChange}
	               value={confirmPassword}
	               field="confirmPassword"
	               type="password"
	             />
                </div>
              </div>
                <div className="row mt30">
                	<div className="col-md-6 text-center ">
                		<Link to="/ERitual/home" className=" block mb20 link-secondary">Cancel</Link> 
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



ChangePasswordFormContainer.contextTypes = {
  router:React.PropTypes.object.isRequired
}

export default ChangePasswordFormContainer;
