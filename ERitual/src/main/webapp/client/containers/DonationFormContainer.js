import React,{Component} from 'react';
import classnames from 'classnames';
import map from 'lodash';
import { Link } from 'react-router';
import jwt from 'jsonwebtoken';
import Dropdown from 'react-dropdown';

import validateInput from '../validations/donationValidation';
import TextFieldGroup from '../components/common/TextFieldGroup';
import setAuthToken from '../utils/setAuthToken';

class DonationFormContainer extends Component {
	constructor(props){
		super(props);
		// We will be using the state to control the input. This will ensure
		// that the state will always hold the lastest
		this.state = {
				name: '',
				description:'',
				amount:'',
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
	
	scrollPage(error){

        for(var scroll in error.errors)
        {
            this.state.scroll= scroll;
            break;                                        
        } 
        let elmnt = document.getElementById('donation-form');
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
		if(this.isValid()) {
			this.setState({ errors: {}, isLoading:true });
			let donationData=this.state;
			this.props.userDonationFormsRequest(donationData).then(
					(res) => {
						if(!res.payload.response && res.payload.status==600) {
							this.props.addToast({  type:'error', 
								text:`Sorry,you are not authorized to create or update donation, please contact to your  admin`, 
								toastType:'auto'  });
							this.context.router.push('/ERitual/donation');
						}
						 else if(res.payload.status==204){
		  	        			this.setState({ errors : { "form" : "Donation Name already exist" }, isLoading : false })
		  	        		}
						else{
							res.payload.data=JSON.parse(decodeURIComponent(res.payload.data.replace(/\+/g,'%20')));
							let donationFormData= res.payload.data;
							if(donationFormData.message!= null) {
								this.setState({ errors : { "form" : donationFormData.message }, isLoading : false })
							}
							else {
								this.props.addToast({  type:'success', 
									text:`Donation created successfully`, 
									toastType:'auto'  });
								this.context.router.push('/ERitual/donation');
							}
						}
					},
			);
		}
	}


	render() {
		const {errors ,success, name,description,amount,isLoading,checked} = this.state;
		return (
				<form className="p20 user-entry-forms details-form" onSubmit={this.onSubmit} id="donation-form">
				<h2 className="mt0 mb20 text-center">Donation Form</h2>
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
				label="Donation Name"
					onChange={this.onChange}
				value={name}
				field="name"
					/>
					</div>
				</div>
				<div className="row mb10">
				<div className="col-xs-12">
				<TextFieldGroup
				error={errors.description}
				label="Description"
					onChange={this.onChange}
				value={description}
				field="description"
					/>
					</div>
				</div>
				<div className="row mb10">
				<div className="col-xs-12">
				<TextFieldGroup
				error={errors.amount}
				label="Donation Amount"
					onChange={this.onChange}
				value={amount}
				field="amount"
					/>
					</div>
				</div>
				<div className="row mt30">
				<div className="col-md-6 text-center ">
				<Link to="/ERitual/donation" className=" block mb20 link-secondary">Cancel</Link> 
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



DonationFormContainer.contextTypes = {
		router:React.PropTypes.object.isRequired
}

export default DonationFormContainer;