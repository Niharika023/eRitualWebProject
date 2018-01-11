import React,{Component} from 'react';
import classnames from 'classnames';
import map from 'lodash';
import { Link } from 'react-router';
import jwt from 'jsonwebtoken';
import Dropdown from 'react-dropdown';

import validateInput from '../../validations/donationValidation';
import TextFieldGroup from '../../components/common/TextFieldGroup';
import setAuthToken from '../../utils/setAuthToken';
import FileUpload from 'react-fileupload';
import axios from 'axios';

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
		        scroll:'',

		}

		this.onChange = this.onChange.bind(this);// bind(this) is needed here,
		this.onSubmit = this.onSubmit.bind(this);
		this.scrollPage=this.scrollPage.bind(this);
		this.onClick=this.onClick.bind(this);
		this.SelectTag=this.SelectTag.bind(this);
		this.handleFile=this.handleFile.bind(this);
	}

	closeModal() {
		this.setState({
			'triggerUpload':false,
			'logoImage':'',
			'triggerUploadVideo':false,
		});
	}
	
	handleFile(event){
		event.preventDefault();
		this.state.videoUrl=event.target.value;
		this.setState({ [event.target.name]:event.target.value}, function() {
			if(this.state.firstTimeFormSubmit) {
				this.isValid();
			}
		});
	}
	
	
	onClick(event){
		this.context.router.push('/ERitual/donation');
	this.setState({
			'triggerUpload':false,
			'logoImage':'',
			'triggerUploadVideo':false,
		});
	}
	onChange(event) {
	      this.state.submitApplied=false;
		this.setState({ [event.target.name]:event.target.value}, function() {
			if(this.state.firstTimeFormSubmit) {
				this.isValid();
			}
		});
	}


	//on select tag
	SelectTag(event){
		this.state.tag=event.target.value;
		//this.setState({triggerUploadVideo:true});
			this.setState({showTextBox:true});
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
	
	//For fetching tag list
	donationTagRenderOptions() {
    	if(this.props.tagConfigData!=undefined){
    	if(this.props.tagConfigData.length!=0){
    		let tagArr=[];
    	tagArr=(this.props.tagConfigData.tagByKeyConfig.value.tags).split(",");
    		const tagList = tagArr.map((d) => 
    		{
    			return (<option key={d}>{d}</option>
    			)
    			});
    		return tagList;
    	}
    	}
    }
	
	//method to scroll the page on reload
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
	
	selectLogoClick(event) {
		this.setState({triggerUpload:true});
	}
	

	onSubmit(event) {
		event.preventDefault();
	     this.state.submitApplied=true;
		this.setState({ firstTimeFormSubmit : true })
		//condition for checking the validation
		if(this.isValid()) {
			this.setState({ errors: {}, isLoading:true });
			let donation= {
					"name":this.state.name,
					"description":this.state.description,
					"amount":this.state.amount,
			}
			this.props.userDonationFormsRequest(donation).then(
					(res) => {
						//condition for unauthorized admin
						if(!res.payload.response && res.payload.status==600) {
							this.props.addToast({  type:'error', 
								text:`Sorry,you are not authorized to create or update donation, please contact to your  admin`, 
								toastType:'auto'  });
							this.context.router.push('/ERitual/donation');
						}
						//conditon for duplicate donation name
						 else if(res.payload.status==204){
		  	        			this.setState({ errors : { "form" : "Donation Name already exist" }, isLoading : false })
		  	        		}
						//conditon when response is not null
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
		var uploadedImageSrc;
		let options={
				baseUrl:'http://localhost:8080/ERitual/#',
				requestHeaders: {
					'Authorization':`Basic ${JSON.parse(localStorage.getItem('user')).token}`,
					'Content-Type':'multipart/form-data'
				},

				chooseFile : (files) => {
					const reader = new FileReader();
					reader.onload = (e2) => {
						if(files[0].size > 2*1024*1024) {
							alert("The maximum supported file size is 2MB");
							return false;
						}
						else {
							let _URL = window.URL || window.webkitURL;
							let img = new Image();
							img.onload = () => {
								if(img.width < 300 || img.height < 300) {
									alert("Minimum dimensions of file should be 300x300");
									return false;
								}
								else {
									this.setState({logoImage:e2.target.result,messageImage:e2.target.result,isUploadLoading:false});
									if(img.width < img.height) {
										uploadedImageStyles.content.width = "auto";
										uploadedImageStyles.content.height = "100%";
									}

								}
							};
							img.src = _URL.createObjectURL(files[0]);
						}
						return;
					};
					reader.readAsDataURL(files[0]);
				},
				doUpload:(files) => {
					event.preventDefault();
					this.closeModal();
					let form = new FormData();
					form.append("description", "asdasd");
					form.append("tags", "message");
					form.append("image",files[0]);
					axios({
						url:'http://ec2-54-70-18-17.us-west-2.compute.amazonaws.com:8080/eritual-web/rest/image/upload',
						method: 'POST',
						data: form
					}).then((response) => {
						this.setState({
							imageId:response.data.id
						})

						this.setState({
							imageUploadSuccess:true
						},()=>{
						})
					})
					.catch((error) => {
						this.setState({
							imageUploadSuccess:false
						})
					});
				},
				uploading : (progress) => {
					this.setState({isUploadLoading:true});
				},
				uploadSuccess : (response) => {
					this.setState({logoImageOnCard:this.state.logoImage});
					this.setState({isUploadLoading:false});
				}
		};

		const {errors ,success, name,amount,checked,showTextBox,videoDescription,image,bannerTags,triggerUploadBanner,message,videoUrl,triggerUploadImg,triggerUploadVidAudPdf,typename,url,metadata,tags,description,imageUploadSuccess,showMessage,messageImage,isLoading,title} = this.state;
		return (
				<div>
        		<form className="p20 user-entry-forms details-form" onSubmit={this.onSubmit} id="donation-form">
                <h1 className="mt0 mb20 text-center page-header page-hdrCstm">Donation Form</h1>
                { errors.form && <div className="alert alert-danger">{errors.form}</div> }
                <div className="row mb10">
                <div className="col-xs-6 col-md-6">
				<TextFieldGroup
				error={errors.name}
				label="Donation Name"
					onChange={this.onChange}
				value={name}
				field="name"
					/>
					</div>
				<div className="col-xs-6 col-md-6">
				<TextFieldGroup
				error={errors.amount}
				label="Donation Amount"
					onChange={this.onChange}
				value={amount}
				field="amount"
					/>
					</div>
                  
				
              </div>
              
              <div className="row">
              <div className="col-xs-6">
			  <label>Tags</label>
			<select name="type" className=" form-control  font-color" onChange={this.SelectTag}>
			<option value=""> Select Tags</option>
			{this.donationTagRenderOptions()}
			</select>
			
			</div>
				    <div className="col-md-6">
				<textarea 
					cols="38"
						rows="6"
							onChange={this.onChange}
				name="description"
					placeholder = "Description"
						value={description}
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
				 </div>
				 
		);
				}
	}



DonationFormContainer.contextTypes = {
		router:React.PropTypes.object.isRequired
}

export default DonationFormContainer;