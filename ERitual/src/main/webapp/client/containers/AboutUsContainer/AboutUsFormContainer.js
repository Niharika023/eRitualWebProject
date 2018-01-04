import React,{Component} from 'react';
import classnames from 'classnames';
import map from 'lodash';
import { Link } from 'react-router';
import jwt from 'jsonwebtoken';
import Dropdown from 'react-dropdown';
import AboutUsForm from '../../components/AboutUs/aboutUsForm';
import TextFieldGroup from '../../components/common/TextFieldGroup';
import validateInput from '../../validations/aboutUsValidation';
import setAuthToken from '../../utils/setAuthToken';


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
        errors:{},
		success:{},
		isLoading:false,
		firstTimeFormSubmit:false,
        submitApplied:false,
        scroll:'',
        tagValue:'',
        tags:''
        
      }

      this.onChange = this.onChange.bind(this);// bind(this) is needed here,
		this.onSubmit = this.onSubmit.bind(this);
		this.scrollPage=this.scrollPage.bind(this);
		this.onClick=this.onClick.bind(this);    
    }
    onClick(event){
		this.context.router.push('/ERitual/aboutUs');
	}
    
    
    onChange(event) {
	      this.state.submitApplied=false;
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
		  if(this.state.submitApplied)
		      this.scrollPage({errors});
		// }
		return isValid;
	}
  //method to scroll the page on reload
	scrollPage(error){

        for(var scroll in error.errors)
        {
            this.state.scroll= scroll;
            break;                                        
        } 
        let elmnt = document.getElementById('aboutUs-form');
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

    //Submit aboutus Form
    onSubmit(event) {
		event.preventDefault();
	     this.state.submitApplied=true;
		this.setState({ firstTimeFormSubmit : true })
		//condition for checking the validation
		if(this.isValid()) {
			this.setState({ errors: {}, isLoading:true });
			let tagConfig= {
					"ui.tab.about-us":{
						"overview":this.state.overview,
						"panchanga":this.state.panchanga
					}
			}
			this.props.userTagConfigFormsRequest(tagConfig).then(
					(res) => {
						//condition for unauthorized admin
						if(!res.payload.response && res.payload.status==600) {
							this.props.addToast({  type:'error', 
								text:`Sorry,you are not authorized to create or update aboutUs, please contact to your  admin`, 
								toastType:'auto'  });
							this.context.router.push('/ERitual/aboutUs');
						}
						//conditon for duplicate aboutUs name
						 else if(res.payload.status==204){
		  	        			this.setState({ errors : { "form" : "AboutUs Name already exist" }, isLoading : false })
		  	        		}
						//conditon when response is not null
						else{
							res.payload.data=JSON.parse(decodeURIComponent(res.payload.data.replace(/\+/g,'%20')));
							let aboutUsFormData= res.payload.data;
							if(aboutUsFormData.message!= null) {
								this.setState({ errors : { "form" : aboutUsFormData.message }, isLoading : false })
							}
							else {
								this.props.addToast({  type:'success', 
									text:`AboutUs created successfully`, 
									toastType:'auto'  });
								this.context.router.push('/ERitual/aboutUs');
							}
						}
					},
			);
		}
	}
    
    render(){
    	 const {errors ,success,overview,panchanga,isLoading} = this.state;
    return (
    		<form className="p20 user-entry-forms details-form" onSubmit={this.onSubmit} id="aboutUs-form">
			<h2 className="mt0 mb20 text-center">About Us Form</h2>
			<div className="row mb30">
			<div className="col-xs-12">
			<hr/>
			</div>
			</div>
			{ errors.form && <div className="alert alert-danger">{errors.form}</div> }

			<div className="row">
  		  <div className="col-md-12">
  		  <label>OverView</label>
				<textarea 
				label="Overview"
					cols="83"
						rows="8"
				name="overview"
					onChange={this.onChange}
					placeholder = "Overview"
						value={overview}
				className="wordText messageColor"
					/>
  		  </div>
  		 </div>
  		<div className="row">
		  <div className="col-md-12">
		  <label>Panchanga</label>
			<textarea 
			label="Panchanga"
				cols="83"
					rows="8"
			name="panchanga"
				onChange={this.onChange}
				placeholder = "Panchanga"
					value={panchanga}
			className="wordText messageColor"
				/>
		  </div>
		 </div>
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
			</form>
    		)
    	
    }
}

export default AboutUsFormContainer;
