import React,{Component} from 'react';
import classnames from 'classnames';
import map from 'lodash';
import { Link } from 'react-router';
import jwt from 'jsonwebtoken';

import validateInput from '../../validations/loginValidations';
import TextFieldGroup from '../common/TextFieldGroup';
import setAuthToken from '../../utils/setAuthToken';

class LoginForm extends Component {
    constructor(props){
      super(props);
      //We will be using the state to control the input. This will ensure that the state will always hold the lastest
      this.state = {
        name: '',
        password:'',
        errors:{},
        isLoading:false,
        firstTimeFormSubmit:false,
        submitApplied:false,
        scroll:''
      }

      this.onChange = this.onChange.bind(this);//bind(this) is needed here, otherwise, this will point to the event
      this.onSubmit = this.onSubmit.bind(this);
      this.scrollPage=this.scrollPage.bind(this);


    }

    onChange(event) {
      this.state.submitApplied=false;

      this.setState({ [event.target.name]:event.target.value}, function() {
        if(this.state.firstTimeFormSubmit) {
          this.isValid();
        }
      });
    }

    //method to check the validity of the form
    isValid() {
      //deconstruct the props
      const {errors, isValid } = validateInput(this.state);
      //if(!isValid) {
        this.setState({ errors });

      //}
       if(this.state.submitApplied)
          this.scrollPage({errors});
      return isValid;
    }

    scrollPage(error){

        for(var scroll in error.errors)
        {
            this.state.scroll= scroll;
            break;                                        
        } 
        let elmnt = document.getElementById('login-form');
        for(var i=0; i<elmnt.length; i++){
            if(elmnt[i].name==this.state.scroll)
            {
                 elmnt[i].focus();
                 break;
             }
        }
    }
    onSubmit(event) {
      event.preventDefault();
      this.state.submitApplied=true;

      this.setState({ firstTimeFormSubmit : true })
      if(this.isValid()) {
        this.setState({ errors: {}, isLoading:true });
        let userRequest = {
        	'name':this.state.name,
        	'password':this.state.password
        }
        this.props.userLoginRequest(userRequest).then(
         (res) => {
        	 let authData= JSON.parse(decodeURIComponent(res.payload.data.replace(/\+/g,'%20')));
            	if(authData.message!= null) {
            		this.setState({ errors : { "form" : authData.message }, isLoading : false })
            		}
            	else {
                    localStorage.setItem('user',JSON.stringify({
                     'name':authData.name,
                     'id':authData.id,
                     'token':authData.token,
                     'email':authData.email,
                     'roles':authData.roles
                    }));
                    this.context.router.push('/ERitual/home');
                }
        	}
         );
      }
    }

    render() {
        const {errors , name, password, isLoading} = this.state;
        return (
            <form className="p20 user-entry-forms login-form" onSubmit={this.onSubmit} id="login-form">
                <h2 className="mt0 mb20 text-center">Login</h2>
                <div className="row mb30">
                  <div className="col-xs-12">
                    <hr/>
                  </div>
                </div>
                { errors.form && <div className="alert alert-danger">{errors.form}</div> }
                <div className="row mb10">
                  <div className="col-xs-12">
                    <TextFieldGroup
                      error={errors.name}
                      label="User Name"
                      onChange={this.onChange}
                      value={name}
                      field="name"
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-xs-12">
                    <TextFieldGroup
                      error={errors.password}
                      label="Password"
                      onChange={this.onChange}
                      value={password}
                      field="password"
                      type="password"
                    />
                  </div>
                </div>
                 <Link to="/ERitual/resetPassword" className="text-center full-width block mb20 link-secondary">Forgot Password?</Link> 
                <div className="row mb10">
                  <div className="col-xs-12">
                    <hr/>
                  </div>
                </div>
                <div className="row mt30">
                  <div className="col-md-6 col-md-offset-3">
                    <div className="form-group">
                      <button disabled={this.state.isLoading} className="btn btn-lg btn-primary full-width">
                        Login
                      </button>
                    </div>
                  </div>
                  <div className="col-md-12 text-center ">
                  <Link to="/ERitual/registration" className=" block mb20 link-secondary">Not registered? Sign up</Link> 
                 </div>
                </div>
            </form>
        );
    }
}

//It's a good practice to have propTypes for components. It becomes easy to track bugs where the developer
//doesn't pass all the required props.
LoginForm.propTypes = {
  userLoginRequest:React.PropTypes.func.isRequired,
}

LoginForm.contextTypes = {
  router:React.PropTypes.object.isRequired
}

export default LoginForm;
