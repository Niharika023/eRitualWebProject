import React,{Component} from 'react';
import classnames from 'classnames';
import map from 'lodash';
import { Link } from 'react-router';
import jwt from 'jsonwebtoken';
import Dropdown from 'react-dropdown';

import validateInput from '../../validations/tagConfigValidation';
import TextFieldGroup from '../../components/common/TextFieldGroup';
import setAuthToken from '../../utils/setAuthToken';
import Autosuggest from 'react-autosuggest';

class TagConfigFormContainer extends Component {
	constructor(props){
		super(props);
		// We will be using the state to control the input. This will ensure
		// that the state will always hold the lastest
		this.state = {
				tagKey: '',
				value:'',
				errors:{},
				success:{},
				isLoading:false,
				firstTimeFormSubmit:false,
		        submitApplied:false,
		        scroll:''

		}

		this.onChange = this.onChange.bind(this);// bind(this) is needed here,
		this.onSubmit = this.onSubmit.bind(this);
		this.scrollPage=this.scrollPage.bind(this);
		this.onClick=this.onClick.bind(this);

	}


	onChange(event) {
	      this.state.submitApplied=false;
		this.setState({ [event.target.name]:event.target.value}, function() {
			if(this.state.firstTimeFormSubmit) {
				this.isValid();
			}
		});
	}

	 keyRenderOptions() {
	    	console.log("this.props",this.props);
	    	if(this.props.tag!=undefined){
	    	if(this.props.tag.length!=0){
	    		const tagList = this.props.tag.data.items.map((d) => 
	    		{
	    			return (<option key={d.key}>{d.key}</option>
	    			)
	    			});
	    		return tagList;
	    	}
	    	}
	    }
	 
	 valueRenderOptions() {
	    	console.log("this.props",this.props);
	    	if(this.props.tag!=undefined){
	    	if(this.props.tag.length!=0){
	    		const valueList = this.props.tag.data.items.map((d) => 
	    		{
	    			return (<option key={d.value}>{d.value}</option>
	    			)
	    			});
	    		return valueList;
	    	}
	    	}
	    }
	 
	onClick(event){
		this.context.router.push('/ERitual/tagConfig');
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
        let elmnt = document.getElementById('tagConfig-form');
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

	onSubmit(event) {
		event.preventDefault();
	     this.state.submitApplied=true;
		this.setState({ firstTimeFormSubmit : true })
		//condition for checking the validation
		if(this.isValid()) {
			this.setState({ errors: {}, isLoading:true });
			let tagConfig= {
					"key":this.state.tagKey,
					"value":this.state.description,
			}
			this.props.userTagConfigFormsRequest(tagConfig).then(
					(res) => {
						//condition for unauthorized admin
						if(!res.payload.response && res.payload.status==600) {
							this.props.addToast({  type:'error', 
								text:`Sorry,you are not authorized to create or update tagConfig, please contact to your  admin`, 
								toastType:'auto'  });
							this.context.router.push('/ERitual/tagConfig');
						}
						//conditon for duplicate tagConfig name
						 else if(res.payload.status==204){
		  	        			this.setState({ errors : { "form" : "TagConfig Name already exist" }, isLoading : false })
		  	        		}
						//conditon when response is not null
						else{
							res.payload.data=JSON.parse(decodeURIComponent(res.payload.data.replace(/\+/g,'%20')));
							let tagConfigFormData= res.payload.data;
							if(tagConfigFormData.message!= null) {
								this.setState({ errors : { "form" : tagConfigFormData.message }, isLoading : false })
							}
							else {
								this.props.addToast({  type:'success', 
									text:`TagConfig created successfully`, 
									toastType:'auto'  });
								this.context.router.push('/ERitual/tagConfig');
							}
						}
					},
			);
		}
	}


	render() {
		const {errors ,success,tagKey,value,isLoading,checked} = this.state;
		return (
				<form className="p20 user-entry-forms details-form" onSubmit={this.onSubmit} id="tagConfig-form">
				<h2 className="mt0 mb20 text-center">TagConfig Form</h2>
				<div className="row mb30">
				<div className="col-xs-12">
				<hr/>
				</div>
				</div>
				{ errors.form && <div className="alert alert-danger">{errors.form}</div> }
				<div className="row mb10">
				<div className="col-xs-6 col-md-6">
				<TextFieldGroup
				error={errors.key}
				label="Key"
					onChange={this.onChange}
				value={tagKey}
				field="tagKey"
					/>
					</div>
				<div className="col-xs-6 col-md-6">
				<TextFieldGroup
				error={errors.value}
				label="value"
					onChange={this.onChange}
				value={value}
				field="value"
					/>
					</div>
				<div className="col-xs-6 ">
            	<select
			        onChange={this.handleDropDownChange} 
            		name="tag"
			      >
            	<option value="">Select Tag</option>
            	{this.keyRenderOptions()}
			     </select>
			     </div>
				  <div className="col-xs-6 ">
		      	<select
				        onChange={this.handleDropDownChange} 
		      		name="tag"
				      >
		      	<option value="">Select Value</option>
		      	{this. valueRenderOptions()}
				     </select>
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
		);
	}
}



TagConfigFormContainer.contextTypes = {
		router:React.PropTypes.object.isRequired
}

export default TagConfigFormContainer;