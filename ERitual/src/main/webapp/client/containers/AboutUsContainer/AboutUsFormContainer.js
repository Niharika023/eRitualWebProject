import React,{Component} from 'react';
import classnames from 'classnames';
import map from 'lodash';
import { Link } from 'react-router';
import jwt from 'jsonwebtoken';
import Dropdown from 'react-dropdown';
import AboutUsForm from '../../components/AboutUs/aboutUsForm';
import TextFieldGroup from '../../components/common/TextFieldGroup';



class AboutUsFormContainer extends Component {
    constructor(props){
      super(props);
      // We will be using the state to control the input. This will ensure
		// that the state will always hold the lastest
      this.state = {
        title: '',
        firstTimeFormSubmit:false,
        overview :'',
        panchanga:'',
      }

      //this.onSubmit = this.onSubmit.bind(this);
  	this.onClick=this.onClick.bind(this);
    
    }
    onClick(event){
		this.context.router.push('/ERitual/donation');
	}
    //Submit aboutus Form
   
    
    render(){
    	 const {errors ,success,overview,panchanga} = this.state;
    return (
    		<div>
    		<form className="p20 user-entry-forms details-form" id="aboutUs-form">
    		 <div className="row">
    		   <div clasName="col-md-12">
    			<h2 className="mt0 mb20 text-center">About Us Form</h2>
    		   </div>
    		 </div>
    		 <div className="row">
    		  <div className="col-md-12">
    		  <label>OverView</label>
				<textarea 
				label="Overview"
					cols="83"
						rows="8"
				name="overview"
					placeholder = "Overview"
						value={overview}
				className="wordText messageColor"
					/>
    		  </div>
    		 </div>
    		 <div className="row mt10">
    		   <div className="col-md-12">
    		 
				<TextFieldGroup
				
				value={panchanga}
				field="panchanga"
					label="Panchanga"
						/>
						
    		   </div>
    		 </div>
    		 <div className="row">
    		  <div className="col-md-12">
    			<div className="row mt30">
				<div className="col-md-4 col-md-offset-4">
				  <div className="btn-toolbar">
				  <button type="button" disabled={this.state.isLoading} onClick={this.onClick} className="btn btn-lg btn-primary">
					Cancel
					</button>
				  <button  disabled={this.state.isLoading} className="btn btn-lg btn-primary">
					Submit
					</button>
				</div>
				</div>
				</div>
    		  </div>
    		 </div>
    		 </form>
    		 </div>
    		)
    	
    }
}

export default AboutUsFormContainer;
