import React,{Component} from 'react';
import classnames from 'classnames';
import map from 'lodash';
import { Link } from 'react-router';
import jwt from 'jsonwebtoken';
import Dropdown from 'react-dropdown';
import Datetime from 'react-datetime';
import validateInput from '../../validations/sevaValidation';
import TextFieldGroup from '../../components/common/TextFieldGroup';
import setAuthToken from '../../utils/setAuthToken';
import FileUpload from 'react-fileupload';
import axios from 'axios';
class SevaFormContainer extends Component {
	constructor(props){
		super(props);
		// We will be using the state to control the input. This will ensure
		// that the state will always hold the lastest
		this.state = {
				image:'',
				sevaUserName:false,
				name: '',
				url:'',
				tags : '',
				metadata:'',
				hours:null,
				minutes:null,
				selectedTime:null,
				time:null,
				gotra:false,
				rashi:false,
				nakshatra:false,
				description:'',
				amount:'',
				active:'',
				inActive:'',
				formField:[],
				errors:{},
				success:{},
				isLoading:false,
				firstTimeFormSubmit:false,
				checked:'',
				available:true,
				formFields:'',
				imageDescription:"picture of the farm",
				tags: "general,farm",
				imageId:"",
				isTime:true,
				logoImage:"",
				logoImageOnCard:"",
				triggerUpload:false,
				isUploadLoading:true,
				isLoading:false,
				imageUploadSuccess:false,
				sevaImage:"",
				submitApplied:false,
				scroll:'',
				triggerUploadVideo:false,
				videoUrl:'',
				showMessage:false,
				message:'',
				tags:'',
				url:'',
				showUrl:false,
				metadata:'',
				triggerUploadVidAudPdf: false,
				triggerUploadImg: true,
				contentId:'',
				tag:'',
				type:'',
				showTextBox:false,
				videoDescription:''
		}

		this.onChange = this.onChange.bind(this);// bind(this) is needed here,
		this.onSubmit = this.onSubmit.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
		this.valid=this.valid.bind(this);
		this.handleDateTimeSelect=this.handleDateTimeSelect.bind(this);
		this.selectLogoClick = this.selectLogoClick.bind(this);
		this.closeModal = this.closeModal.bind(this);
		this.scrollPage=this.scrollPage.bind(this);
		this.onSelect=this.onSelect.bind(this);
		this.handleFile=this.handleFile.bind(this);
		this.onClick=this.onClick.bind(this);
		this.selectAudVid = this.selectAudVid.bind(this);
		this.SelectTag = this.SelectTag.bind(this);
		this.onSubmitAudVidUrl = this.onSubmitAudVidUrl.bind(this);
	}

	//method used to close the dialogue box for image upload
	closeModal() {
		this.setState({
			'triggerUpload':false,
			'logoImage':'',
			'triggerUploadVideo':false,
		});
	}
	
	
	//on select tag
	SelectTag(event){
		this.state.tag=event.target.value;
		if(this.state.tag=='Special Packages'){
			this.setState({triggerUploadImg:true});
			this.setState({triggerUploadVidAudPdf:false});
			
		}
		else{
		//this.setState({triggerUploadVideo:true});
			this.setState({triggerUploadImg:true});
			this.setState({triggerUploadVidAudPdf:true});
		}
	}
	onSelect(event){
		if(event.target.value=='pdf'){
			this.setState({triggerUploadVideo:false});
			this.setState({showMessage:true});
		}
		else{
		//this.setState({triggerUploadVideo:true});
		this.setState({showUrl:true});
		}
	}
	
	onClick(event){
		this.context.router.push('/ERitual/seva');
	this.setState({
			'triggerUpload':false,
			'logoImage':'',
			'triggerUploadVideo':false,
		});
	}

	onChange(event) {
		event.preventDefault();
		this.state.submitApplied=false;

		this.setState({ [event.target.name]:event.target.value}, function() {
			if(this.state.firstTimeFormSubmit) {
				this.isValid();
			}
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
// method for checkbox and radio buttons
	handleInputChange(event) {
		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;
		if(name=="available"){
			this.state.available=value;
		}
		else if(name=="checked"){
			this.state.checked=value;
		}
		else if(name=="name"){
			this.state.sevaUserName=value;
		}
		else if(name=="rashi"){
			this.state.rashi=value;
		}
		else if(name=="nakshatra"){
			this.state.nakshatra=value;
		}
		else if(name=="gotra"){
			this.state.gotra=value;
		}
		this.setState({
			[name]: value
		});
	}

	isValid() {
		const {errors, isValid } = validateInput(this.state);
		this.setState({ errors });
		if(this.state.submitApplied)
			this.scrollPage({errors});
		return isValid;
	}

	scrollPage(error){
		for(var scroll in error.errors)
		{
			this.state.scroll= scroll;
			/*            this.setState({scroll:scroll});
			 */            break;                                        
		} 
		let elmnt = document.getElementById('seva-form');
		for(var i=0; i<elmnt.length; i++){
			if(elmnt[i].placeholder){
				if(elmnt[i].placeholder.toLowerCase()==this.state.scroll){
					elmnt[i].focus();
					break;
				}}
			else if(elmnt[i].name==this.state.scroll)
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

// method for select time
	handleDateTimeSelect(selectedDate){
		let hoursFormat=null;
		let minutesFormat=null;
		this.state.hours=new Date(selectedDate._d).getHours();
		this.state.minutes=new Date(selectedDate._d).getMinutes();
		hoursFormat=new Date(selectedDate._d).getHours();
		minutesFormat=new Date(selectedDate._d).getMinutes();
		let selectedHour = hoursFormat%12;
		if(selectedHour==0){
			selectedHour=12;
		}
		this.setState({
			time:`${(selectedHour < 10) ? "0" + selectedHour : selectedHour}:${(minutesFormat < 10)? "0"+minutesFormat : minutesFormat}`,
			selectedTime:`${(selectedHour < 10) ? "0" + selectedHour : selectedHour}:${(minutesFormat < 10)? "0"+minutesFormat : minutesFormat} ${(hoursFormat < 12)?'AM':'PM'}`
		})
		if(this.state.firstTimeFormSubmit) {
			this.isValid();
		}
	}
     
	onSubmitAudVidUrl(event){
		event.preventDefault();
		
		let audVidDetails= {
				"name":this.state.typename,
				"description":this.state.videoDescription,
				"tags":this.state.tags,
				"items":[{
					"url":this.state.url,
					"type":this.state.type,
					"metadata":{
						"onclick":this.state.metadata
						} 
					
							}]
		}
		this.props.audVidDetailsFormrequest(audVidDetails).then(
				(res) => {
					console.log("res.payload.data",res.payload.data)
					if(!res.payload.data && res.payload.status==600) {
						this.props.addToast({  type:'error', 
							text:`Sorry,you are not authorized to create or update seva, please contact to your  admin`, 
							toastType:'auto'  });
						this.context.router.push('/ERitual/seva');	
					}
					else if(res.payload.status==204){
						this.setState({ errors : { "form" : "NameselectAudVid already exist" }, isLoading : false })
					}
					else{
						res.payload.data=JSON.parse(decodeURIComponent(res.payload.data.replace(/\+/g,'%20')));
						let contentFormData= res.payload.data;
						this.state.contentId=contentFormData.id;
						this.closeModal();
						if(contentFormData.message!= null) {
							this.setState({ errors : { "form" : sevaFormData.message }, isLoading : false })
						}
						else {
							this.props.addToast({  type:'success', 
								text:`Data uploaded successfully`, 
								toastType:'auto'  });
							this.context.router.push('/ERitual/sevaForm');
						}
					}
				},
			);
	}
	
	onSubmit(event) {
		console.log("hello");
		event.preventDefault();
		this.state.submitApplied=true;

		this.setState({ firstTimeFormSubmit : true })
		if(this.isValid()) {
			this.setState({ errors: {}, isLoading:true });
			let concatString="";
			let sevaUser=null;
			let userGotra=null;
			let userRashi=null;
			let userNakshatra=null;
			if(this.state.checked==true){
				this.state.formFields={
						sevaUser:this.state.sevaUserName,
						userGotra:this.state.gotra,
						userRashi:this.state.rashi,
						userNakshatra:this.state.nakshatra
				}
			}
			else{
				this.state.formFields={
						sevaUser:this.state.sevaUserName,
						userGotra:this.state.gotra,
						userRashi:this.state.rashi,
						userNakshatra:this.state.nakshatra
				}
			}
			let formFields=this.state.formFields;
			this.state.formFields=JSON.stringify(formFields);
			let seva= {
					"name":this.state.name,
					"description":this.state.description,
					"formFields":this.state.formFields,
					"available":this.state.available,
					"amount":this.state.amount,
					"imageId":this.state.imageId,
					"time":this.state.time,
					"hostedContentId":this.state.contentId,
					"tags":this.state.tag,
			}
			console.log("sevaaa",seva);
			this.props.userSevaFormsRequest(seva).then(
					(res) => {
						if(!res.payload.response && res.payload.status==600) {
							this.props.addToast({  type:'error', 
								text:`Sorry,you are not authorized to create or update seva, please contact to your  admin`, 
								toastType:'auto'  });
							this.context.router.push('/ERitual/seva');	
						}
						else if(res.payload.status==204){
							this.setState({ errors : { "form" : "Seva Name already exist" }, isLoading : false })
						}
						else{
							res.payload.data=JSON.parse(decodeURIComponent(res.payload.data.replace(/\+/g,'%20')));
							let sevaFormData= res.payload.data;
							if(sevaFormData.message!= null) {
								this.setState({ errors : { "form" : sevaFormData.message }, isLoading : false })
							}
							else {
								this.props.addToast({  type:'success', 
									text:`Seva created successfully`, 
									toastType:'auto'  });
								this.context.router.push('/ERitual/seva');
							}
						}
					},
				);
			}
		}

	//method for calendar from current date
	valid(current)
	{
		let yesterday = Datetime.moment().subtract( 1, 'day' );
		return current.isAfter( yesterday );
	}

	selectLogoClick(event) {
		this.setState({triggerUpload:true});
	}
	selectAudVid(event) {
		this.state.type=event.target.value;
		if(this.state.type=='text'){
			this.state.showTextBox=true;	
			this.setState({triggerUploadVideo:false});
			}
		else{
		this.setState({triggerUploadVideo:true});
		this.state.showTextBox=false;	
		}
	}
	
	 sevaTagRenderOptions() {
	    	console.log("this.props",this.props);
	    	if(this.props.tagConfigData!=undefined){
	    	if(this.props.tagConfigData.length!=0){
	    		let tagArr=[];
	    	tagArr=(this.props.tagConfigData.tagByKeyConfig.value.tags).split(",");
	    	console.log("tags",tagArr);
	    		const tagList = tagArr.map((d) => 
	    		{
	    			return (<option key={d}>{d}</option>
	    			)
	    			});
	    		return tagList;
	    	}
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
									this.setState({logoImage:e2.target.result,sevaImage:e2.target.result,isUploadLoading:false});
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
					form.append("tags", "seva");
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
		

		const {errors ,success,metadata,videoUrl,videoDescription,showTextBox,tags,image,url,showUrl,typename,sevaUserName,message,showMessage, name,selectedTime,preRequisite,imageUploadSuccess,gotra,rashi,sevaImage, nakshatra, description,amount,active,inActive,isLoading,checked,triggerUploadVidAudPdf,triggerUploadImg} = this.state;
		return (
				<div>
				<form className="p20 user-entry-forms details-form" onSubmit={this.onSubmit} id="seva-form">
				<h2 className="mt0 mb20 text-center page-header page-hdrCstm">Seva Form</h2>
				{ errors.form && <div className="alert alert-danger ">{errors.form}</div> }
				
				<div className="row mb10">
				<div className="col-xs-6">
				<TextFieldGroup
				error={errors.name}
				onChange={this.onChange}
				value={name}
				field="name"
					label="Name"
						/>
						</div>
				<div className="col-xs-6">
				<label>Time</label><span className = "required"></span>
				<Datetime 
				onChange ={this.handleDateTimeSelect}
				dateFormat={false}
				isValidDate={this.valid}
				timeFormat={this.state.isTime}
				value={selectedTime}
				inputProps={{ placeholder: "Time" }}
				/>
				{errors.time && <span className="help-block has-error material-label error-form "> {errors.time}</span>}

				</div>
				</div>
				<div className="row mb10">
				<div className="col-xs-6">
				  <label>Tags</label>
				<select name="type" className=" form-control  font-color" onChange={this.SelectTag}>
				<option value=""> Select Tags</option>
				{this.sevaTagRenderOptions()}
				</select>
				{/*<TextFieldGroup
								error={errors.tags}
								onChange={this.onChange}
								value={tags}
								field="tags"
									label="Tags"
										/>*/}
				</div>
				{triggerUploadVidAudPdf && <div className="col-xs-6">
				<label>Type</label>
				<select name="type" className=" form-control  font-color " onChange={this.selectAudVid}>
				<option value="">Select Type</option>
				<option value="audio" >Audio</option>
				<option value="video"  >Video</option>
				<option value="pdf">Pdf</option>
				<option value="text">Text</option>
				</select>
				</div>}
				{triggerUploadImg && <div className="col-xs-6 mt20">
				<label>Upload Image</label>
				{imageUploadSuccess && <img src = {sevaImage} width="100%"/>}
				<div className="pull-right logo-container" onClick={this.selectLogoClick} onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}>
				{this.state.logoImageOnCard != '' && <img ref="logoOnCard" src={this.state.logoImageOnCard} style={uploadedImageStyles}/> }
				 <button ref="logoUploadReveal" className="logo-upload-reveal coursor-pointer ">Click to upload</button>
				</div>
				</div>}
				{showTextBox && <div>
				    <div className="col-md-6">
				<textarea 
					cols="43"
						rows="6"
							onChange={this.onChange}
				name="description"
					placeholder = "Type something.."
						value={description}
				className="wordText messageColor"
					/>
				  </div></div>}
				</div>
				{/*<div className="row mb10">
				<div className="col-xs-12">
				<label className="mr10">Pre-Requisite</label>
				 <div className="row mb10">
				<div className="col-md-12">
				<div className="row mb10">
				<div className="col-md-3">
				<label>Name</label>
				<input
				name="sevaUserName"
					type="checkbox"
						checked={this.state.sevaUserName}
				onChange={this.handleInputChange} 
				/>
				</div>
				<div className="col-md-3">
				<label>Gotra</label>
				<input
				name="gotra"
					type="checkbox"
						checked={this.state.gotra}
				onChange={this.handleInputChange} 
				/>
				</div>
				<div className="col-md-3">
				<label>Rashi</label>
				<input
				name="rashi"
					type="checkbox"
						checked={this.state.rashi}
				onChange={this.handleInputChange} 
				/>
				</div>
				<div className="col-md-3">
				<label>Nakshatra</label>
				<input
				name="nakshatra"
					type="checkbox"
						checked={this.state.nakshatra}
				onChange={this.handleInputChange} 
				/>
				</div>
				</div>
				</div>
				</div>
				</div>
				</div>*/}
				<div className="row mb10">
			     <div className="col-xs-6">
				<TextFieldGroup
				error={errors.amount}
				label="Seva Amount"
					onChange={this.onChange}
				value={amount}
				field="amount"
					/>
					</div>
				{/*<div className="col-xs-6">
								<label>Description</label>
								<textarea 
								label="Description"
									cols="43"
										rows="6"
											onChange={this.onChange}
								name="description"
									placeholder = "Description"
										value={description}
								className="wordText messageColor"
									/>
								</div>*/}
				</div>
				{/*<div className="row ">
								<div className="col-xs-6">
								<label>Module</label>
								<select name="module" className=" form-control  font-color " onChange={this.onModule}>
								<option value="">Select Module</option>
								<option value="spc" >Special Package Categories</option>
								<option value="rmt"  >Ramachandra Math Temple</option>
								<option value="rmt"  >Gowardhan Temple</option>
								<option value="camp">Camp</option>
								</select>
								</div>
								
								</div>*/}
				<div className="row mb10">
				<div className="col-xs-12">
				<label>Available</label>
				<input
				name="available"
					type="checkbox"
						checked={this.state.available}
				onChange={this.handleInputChange} 
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
				{this.state.triggerUpload && <div className="modal-bg"><div className="file-upload-container">
				{this.state.logoImage != '' && <img  className="full-width logo-upload-preview mb20" src={this.state.logoImage}/> }
				<button className = 'close-modal' onClick = {this.closeModal}>x</button>
				<FileUpload options={options} clascloseModalsName="upload-btn-container">
				<button ref="chooseBtn" className="btn btn-primary mr20">Choose File</button>
				<button ref="uploadBtn" className="btn btn-primary pull-right">Upload</button>
				</FileUpload>
				</div></div>}
				{this.state.triggerUploadVideo && <div className="modal-bg"><div className="video-upload-container">
				<button className = 'close-modal' onClick = {this.closeModal}>x</button>
				{videoUrl}
			<form onSubmit={this.onSubmitAudVidUrl} id="vid-aud-url-form">
			<div className="row">
			 <div className="col-md-12">
		      <TextFieldGroup
		       error={errors.name}
	       	   onChange={this.onChange}
		       value={typename}
		       field="typename"
			    label="Type Name"
				/>
		    </div>
		    </div>
				<div className="row">
				 <div className="col-md-12">
				  <TextFieldGroup
				  error={errors.name}
				  onChange={this.onChange}
				  value={url}
				  field="url"
				  label="url"
						/>
				    </div>
				    </div>
				    <div className="row">
					
					 <div className="col-md-12">
				   <TextFieldGroup
				error={errors.name}
				onChange={this.onChange}
				value={metadata}
				field="metadata"
					label="Metadata"
						/>
				    </div>
				    </div>
				    <div className="row">
				    		 <div className="col-md-12">
				   	  <TextFieldGroup
				       error={errors.name} 
				     onChange={this.onChange}
				   value={tags}
				field="tags"
					label="Tags"
						/>
				    </div> 
				    </div>
                  <div className="row">
				    <div className="col-md-12">
				   	  <label>Description</label>
				<textarea 
				label="Description"
					cols="35"
						rows="6"
							onChange={this.onChange}
				name="videoDescription"
					placeholder = "Description"
						value={videoDescription}
				className="wordText messageColor"
					/>
				  </div>
				</div>
                <div className="row mr15">
                  <div className="text-center">
                   <button className="btn btn-lg btn-primary">
					Submit
				   </button>
                  </div>                	
                </div>

					</form>
				</div>
				</div>}
				</div>
		);
				}
	}



	SevaFormContainer.contextTypes = {
			router:React.PropTypes.object.isRequired
	}

	export default SevaFormContainer;