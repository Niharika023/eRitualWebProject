import React,{Component} from 'react';
import classnames from 'classnames';
import map from 'lodash';
import { Link } from 'react-router';
import jwt from 'jsonwebtoken';
import Dropdown from 'react-dropdown';
import Datetime from 'react-datetime';
import validateInput from '../../validations/messageValidation';
import TextFieldGroup from '../../components/common/TextFieldGroup';
import setAuthToken from '../../utils/setAuthToken';
import FileUpload from 'react-fileupload';
import axios from 'axios';
class MessageFormContainer extends Component {
	constructor(props){
		super(props);
		// We will be using the state to control the input. This will ensure
		// that the state will always hold the lastest
		this.state = {
				url:'',
				tags : '',
				metadata:'',
				image:'',
				errors:{},
				success:{},
				isLoading:false,
				firstTimeFormSubmit:false,
				imageId:"",
				logoImage:"",
				logoImageOnCard:"",
				triggerUpload:false,
				isUploadLoading:true,
				isLoading:false,
				imageUploadSuccess:false,
				messageImage:"",
				title:'',
				message:'',
				showMessage:true,
				videoUrl:'',
				triggerUploadVidAudPdf: false,
				bannerTags:'',
				triggerUploadImg:false,
				triggerUploadBanner:false,
				videoDescription:'',
				selectedUrl :'',
				triggerSelectedUrl: false,
				showTextBox:false
				
		}

		this.onChange = this.onChange.bind(this);// bind(this) is needed here,
		this.onSubmitSamastahnamForm = this.onSubmitSamastahnamForm.bind(this);
		this.selectLogoClick = this.selectLogoClick.bind(this);
		this.closeModal = this.closeModal.bind(this);
		this.handleFile=this.handleFile.bind(this);
		this.onSelect=this.onSelect.bind(this);
		this.onClick=this.onClick.bind(this);
		this.SelectTag=this.SelectTag.bind(this);
		this.selectAudVid=this.selectAudVid.bind(this);
		this.onSubmitAudVidUrl = this.onSubmitAudVidUrl.bind(this);
	}

	closeModal() {
		this.setState({
			'triggerUpload':false,
			'logoImage':'',
			'triggerUploadVideo':false,
		});
	}
	
	onClick(event){
		this.context.router.push('/ERitual/message');
	this.setState({
			'triggerUpload':false,
			'logoImage':'',
			'triggerUploadVideo':false,
		});
	}
	//on select tag
	SelectTag(event){
		this.state.tag=event.target.value;
		if(this.state.tag=='Banner'){
			this.setState({triggerUploadBanner:true});
			this.setState({triggerUploadImg:false});
			this.setState({triggerUploadVidAudPdf:false});
			this.setState({showTextBox:true});
			this.setState({triggerSelectedUrl:false});
			
		}
		else if(this.state.tag=='My Latest Articles') {
		//this.setState({triggerUploadVideo:true});
			this.setState({triggerUploadImg:false});
			this.setState({triggerUploadBanner:false});
			this.setState({triggerUploadVideo:false});
			this.setState({showTextBox:true});
			this.setState({triggerUploadVidAudPdf:false});
			this.setState({triggerSelectedUrl:false});
		}else {
			this.setState({triggerUploadImg:false});
			this.setState({triggerUploadBanner:false});
			this.setState({triggerUploadVideo:true});
			this.setState({showTextBox:false});
			this.setState({triggerSelectedUrl:true});
		}
	}
	onChange(event) {
		event.preventDefault();
		this.setState({ [event.target.name]:event.target.value}, function() {
			if(this.state.firstTimeFormSubmit) {
				this.isValid();
			}
		});
	}

	//For fetching tag list
	sriTagRenderOptions() {
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

	
	handleFile(event){
		event.preventDefault();
		this.state.videoUrl=event.target.value;
		this.setState({ [event.target.name]:event.target.value}, function() {
			if(this.state.firstTimeFormSubmit) {
				this.isValid();
			}
		});
	}
	
	onSelect(event){
		if(event.target.value=='text'){
			this.setState({triggerUploadVideo:false});
			this.setState({showMessage:true});
		}
		else{
		this.setState({triggerUploadVideo:true});
		this.setState({showMessage:false});
		}
	}
	

	// method to check the validity of the form
	isValid() {
		// deconstruct the props
		const {errors, isValid } = validateInput(this.state);
		this.setState({ errors });
		return isValid;
	}


	onSubmitSamastahnamForm(event) {
		event.preventDefault();
		this.setState({ firstTimeFormSubmit : true })
		if(this.isValid()) {
			this.setState({ errors: {}, isLoading:true });
			let message= {
					"title":this.state.title,
					"message":this.state.message,
					"imageId":this.state.imageId,
					"hostedContentId":this.state.contentId,
					"tags":this.state.tag,
			}
			this.props.userMessageFormsRequest(message).then(
					(res) => {
						if(!res.payload.response && res.payload.status==600) {
							this.setState({ errors : { "form" : "Sorry,you are not authorized to create or update message, please contact to your  admin" }, isLoading : false })
						}
						else if(res.payload.status==204){
							this.setState({ errors : { "form" : "Message already exist" }, isLoading : false })
						}
						else{
							res.payload.data=JSON.parse(decodeURIComponent(res.payload.data.replace(/\+/g,'%20')));
							let messageFormData= res.payload.data;
							this.props.addToast({  type:'success', 
								text:`Message created successfully`, 
								toastType:'auto'  });
							this.context.router.push('/ERitual/message');
						}
					},
				);
			}
		}
	
	//method to display date from current
	valid(current)
	{
		let yesterday = Datetime.moment().subtract( 1, 'day' );
		return current.isAfter( yesterday );
	}

	selectLogoClick(event) {
		event.preventDefault();
		this.setState({triggerUpload:true});
	}
	
	//For uploading video/audio/pdf
	onSubmitAudVidUrl(event){
		event.preventDefault();
		
		let audVidDetails= {
				"name":this.state.title,
				"description":this.state.videoDescription,
				"tags":this.state.tag,
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
						this.setState({selectedUrl:this.state.url});
						if(contentFormData.message!= null) {
							this.setState({ errors : { "form" : sevaFormData.message }, isLoading : false })
						}
						else {
							this.props.addToast({  type:'success', 
								text:`Data uploaded successfully`, 
								toastType:'auto'  });
							this.context.router.push('/ERitual/messageForm');
						}
					}
				},
			);
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

		const {errors ,success,showTextBox,videoDescription,image,bannerTags,triggerUploadBanner,triggerSelectedUrl,message,videoUrl,triggerUploadImg,triggerUploadVidAudPdf,typename,url,metadata,tags,description,imageUploadSuccess,showMessage,messageImage,isLoading,title} = this.state;
		return (
				<div>
        		<form className="p20 user-entry-forms details-form" onSubmit={this.onSubmitSamastahnamForm}>
                <h1 className="mt0 mb20 text-center page-header page-hdrCstm">Sri Samasthanam Form</h1>
                { errors.form && <div className="alert alert-danger">{errors.form}</div> }
                <div className="row mb10">
                <div className="col-xs-6 col-md-6">
                  <TextFieldGroup
                    error={errors.title}
                    label="Title"
                    onChange={this.onChange}
                    value={title}
                    field="title"
                  />
                </div>
                  <div className="col-xs-6">
				  <label>Tags</label>
				<select name="type" className=" form-control  font-color" onChange={this.SelectTag}>
				<option value=""> Select Tags</option>
				{this.sriTagRenderOptions()}
				</select>
				{triggerSelectedUrl && <span>Url is : {this.state.selectedUrl}</span>}
				</div>
               
              </div>
              
              <div className="row">
              
              {triggerUploadImg && <div className="col-xs-6 mt20">
              <label>Upload Image</label>
	                {imageUploadSuccess && <img src = {messageImage} width="100%"/>}
	                <div className="pull-right logo-container" onClick={this.selectLogoClick} onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}>
	                  {this.state.logoImageOnCard != '' && <img ref="logoOnCard" src={this.state.logoImageOnCard} style={uploadedImageStyles}/> }
	                  <button ref="logoUploadReveal" className="logo-upload-reveal coursor-pointer ">Click to upload</button>
	                </div>
				</div>}
				
				
				 {triggerUploadBanner && <div className="col-xs-6 mt20">
	              <label>Upload Banner</label>
		                {imageUploadSuccess && <img src = {messageImage} width="100%"/>}
		                <div className="pull-right logo-container" onClick={this.selectLogoClick} onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}>
		                  {this.state.logoImageOnCard != '' && <img ref="logoOnCard" src={this.state.logoImageOnCard} style={uploadedImageStyles}/> }
		                  <button ref="logoUploadReveal" className="logo-upload-reveal coursor-pointer ">Click to upload</button>
		                </div>
					</div>}
		                  {showTextBox && <div>
		  				<div className="col-md-6">
		  			    <label>Description</label>
		  			<textarea 
		  				cols="38"
		  					rows="6"
		  						onChange={this.onChange}
		  			name="message"
		  				placeholder = "Description"
		  					value={message}
		  			className="wordText messageColor"
		  				/>
		  			  </div>
		  			</div>}
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
				 {/*{this.state.triggerUpload && <div className="modal-bg"><div className="file-upload-container">
	              {this.state.logoImage != '' && <img  className="full-width logo-upload-preview mb20" src={this.state.logoImage}/> }
	              <button className = 'close-modal' onClick = {this.closeModal}>x</button>
	              <form>
	              <FileUpload options={options} >
	              <div className = "row">
	               <div className="col-xs-12">
	               <button ref="chooseBtn" className="btn btn-primary mr20">Choose Image</button>
	               </div>
	              
	              </div>
	              <div className= "row">
	              <div className="col-xs-12">
	              <label>Image Description</label>
					<textarea 
					label="Message"
						cols="38"
							rows="6"
								onChange={this.onChange}
					name="message"
						placeholder = "Type something.."
							value={message}
					className="wordText messageColor"
						/>
	              </div>
	              </div>
	              <div className="row">
		    		 <div className="col-md-12">
		   	  <TextFieldGroup
		       error={errors.name}
		     onChange={this.onChange}
		   value={bannerTags}
		field="tags"
			label="Tags"
				/>
		    </div> 
		    </div>
	              <div className = "row">
	                <div className="col-md-12 text-center">
	                <button ref="uploadBtn" className="btn btn-primary">Upload</button>
	                </div>
	              </div>
	              </FileUpload>
	              </form>
	            </div></div>}*/}
				 
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
				<form onSubmit={this.onSubmitAudVidUrl} id=" vid-aud-url-form">
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



	MessageFormContainer.contextTypes = {
			router:React.PropTypes.object.isRequired
	}

	export default MessageFormContainer;