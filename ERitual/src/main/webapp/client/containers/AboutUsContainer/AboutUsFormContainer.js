import React,{Component} from 'react';
import classnames from 'classnames';
import map from 'lodash';
import { Link } from 'react-router';
import jwt from 'jsonwebtoken';
import Dropdown from 'react-dropdown';
import AboutUsForm from '../../components/AboutUs/aboutUsForm';



class AboutUsFormContainer extends Component {
    constructor(props){
      super(props);
      // We will be using the state to control the input. This will ensure
		// that the state will always hold the lastest
      this.state = {
        title: '',
        firstTimeFormSubmit:false,
      }

      //this.onSubmit = this.onSubmit.bind(this);
    }
    
    render(){
    	 const {errors ,success,} = this.state;
    return (
    		 <div className="row">
    		   <div clasName="col-md-12">
    			<h2 className="mt0 mb20 text-center">About Us Form</h2>
    		   </div>
    		 </div>
    		)
    	
    }
}

export default AboutUsFormContainer;
