import React,{Component} from 'react';
import classnames from 'classnames';
import map from 'lodash';
import { Link } from 'react-router';
import jwt from 'jsonwebtoken';

import validateInput from '../validations/registrationValidation';
import TextFieldGroup from '../components/common/TextFieldGroup';
import setAuthToken from '../utils/setAuthToken';
import Datetime from 'react-datetime';

class RegistrationForm extends Component {
    constructor(props){
      super(props);
      //We will be using the state to control the input. This will ensure that the state will always hold the lastest
      this.state = {
        name: '',
        password:'',
        confirmPassword:'',
        phone:'',
        email:'',
        gender:'',
        female:'',
        male:'',
        dob:'',
        errors:{},
        success:{},
        isLoading:false,
        firstTimeFormSubmit:false,
        scroll:"",
        submitApplied:false


      }

      this.onChange = this.onChange.bind(this);//bind(this) is needed here, otherwise, this will point to the event
      this.onSubmit = this.onSubmit.bind(this);
      this.onKeyPress=this.onKeyPress.bind(this);
      this.handleDateSelect=this.handleDateSelect.bind(this);
      this.valid=this.valid.bind(this);
      this.onGender=this.onGender.bind(this);
          this.scrollPage = this.scrollPage.bind(this);


    }

    onChange(event) {
   this.state.submitApplied=false;

      this.setState({ [event.target.name]:event.target.value}, function() {
        if(this.state.firstTimeFormSubmit) {
          this.isValid();
        }
      });
    }
    
    onGender(event){
    	this.setState({ [event.target.name]:event.target.value}, function() {
            if(this.state.firstTimeFormSubmit) {
              this.isValid();
            }
          });
    }
    onKeyPress(event) {
        this.setState({ [event.target.name]:event.target.value}, function() {
              this.isValid();
          });
        }
    
    valid(current)
    {
    	let yesterday = Datetime.moment().subtract( 1, 'day' );
    	return current.isBefore( yesterday );
    }
    
    handleDateSelect(selectedDate) {
    	let monthFormat=new Date(selectedDate._d).getMonth()+1;
    	let dayFormat=new Date(selectedDate._d).getDate();
    	let yearFormat=new Date(selectedDate._d).getFullYear();
    	this.setState({
    		day:new Date(selectedDate._d).getDate(),
			month:new Date(selectedDate._d).getMonth()+1,
			year:new Date(selectedDate._d).getFullYear(),
			selecDate:`${(monthFormat < 10) ? "0" + monthFormat : monthFormat}/${(dayFormat < 10)? "0"+dayFormat : dayFormat}/${yearFormat}`,
    		dob:`${yearFormat}-${((monthFormat) < 10) ? "0" + monthFormat : monthFormat}-${(dayFormat < 10)? "0"+dayFormat: dayFormat}`
    	})
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




    onSubmit(event) {

      event.preventDefault();
         this.state.submitApplied=true;

      this.setState({ firstTimeFormSubmit : true })
      if(this.isValid()) {
        this.setState({ errors: {}, isLoading:true });
        //uncomment the below code when the API integration starts
         this.props.userRegistrationRequest(this.state).then(
                 (res) => {
                res.payload.data=JSON.parse(decodeURIComponent(res.payload.data.replace(/\+/g,'%20')));
                let registeredData= res.payload.data;
                   if(registeredData.message!= null) {
                       this.setState({ errors : { "form" : registeredData.message }, isLoading : false })

                       }
                   else {
                       this.props.addToast({  type:'success', 
                           text:`You have successfully registered`, 
                           toastType:'auto'  });
                       this.context.router.push('/ERitual/');
                   }
         },
         );

      }

    }

   scrollPage(error){

        for(var scroll in error.errors)
        {
            this.state.scroll= scroll;
            break;                                        
        } 
        let elmnt = document.getElementById('registration-form');
        for(var i=0; i<elmnt.length; i++){
            if(elmnt[i].name==this.state.scroll)
            {
                 elmnt[i].focus();
                 break;
             }
        }
        if(this.state.scroll=='')
        {
          let elmnt = document.querySelector('.site-container');
          elmnt.scrollIntoView();
        }
        this.setState({scroll:''});
 }



    render() {
        const {errors , name,phone, email,gender,dob,isLoading, password,confirmPassword} = this.state;
        return (
            <form className="p20 user-entry-forms login-form" id= "registration-form" onSubmit={this.onSubmit}>
                <h2 className="mt0 mb20 text-center  page-header page-hdrCstm">Registration</h2>
                { errors.form && <div className="alert alert-danger">{errors.form}</div> }
                <div className="row mb10">
                  <div className="col-xs-12" id="myTextField" >
                    <TextFieldGroup
                      error={errors.name}
                      label="Name"
                      onChange={this.onChange}
                      value={name}
                      field="name"
                    />
                  </div>
                </div>
                
                <div className="row mb10">
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
                <div className="row mb10">
                  <div className="col-xs-12">
                    <TextFieldGroup
                      error={errors.phone}
                      label="Mobile No."
                      onChange={this.onChange}
                      onKeyPress={this.onKeyPress}
                      value={phone}
                      field="phone"
                      type="text"
                    />
                  </div>
                </div>
                 
                <div className="row">
                  <div className="col-xs-12">
                    <TextFieldGroup
                      error={errors.email}
                      label="Email Id"
                      onChange={this.onChange}
                      value={email}
                      field="email"
                      type="email"
                    />
                  </div>
                </div>
                <div className="row">
                <div className="col-xs-12">
                  <label>Date Of Birth</label>
	                <Datetime 
	                onChange ={this.handleDateSelect}
	                dateFormat={true}
	                isValidDate={this.valid}
	                timeFormat={false}
	                value={this.state.selecDate}
	                field="date"
	                asterisk=""
	                />
                </div>
              </div>
              <label className="mt10">Gender</label>
                <div className="row">
                	<div className="col-xs-6">
                	<input type="radio" name="gender" field="gender"  onChange={this.onGender} value="male"/> Male
                	</div>
                	<div className="col-xs-6">
                	<input type="radio" name="gender" field="gender" onChange={this.onGender} value="female"/> Female
                	</div>
                </div>
                
                <div className="row mt30">
                <div className="col-md-6 text-center ">
                 <Link to="/ERitual/" className=" block mb20 link-secondary">Cancel</Link> 
                </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <button  className="btn btn-lg btn-primary full-width">
                        Sign Up
                      </button>
                    </div>
                  </div>
                </div>
                { this.state.success.form && <div className="alert alert-success">{this.state.success.form}</div> }
            </form>
        );
    }
}

RegistrationForm.propTypes = {
  userRegistrationRequest:React.PropTypes.func.isRequired,
}

RegistrationForm.contextTypes = {
  router:React.PropTypes.object.isRequired
}

export default RegistrationForm;
