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

class EditMessageContainer extends Component {
	constructor(props){
		super(props);
		// We will be using the state to control the input. This will ensure
		// that the state will always hold the lastest
		this.state = {
				image:'',
				errors:{},
				success:{},
				isLoading:false,
				firstTimeFormSubmit:false,
				imageDescription:"picture of the farm",
				tags: "general,farm",
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
				submitApplied:false,
		        scroll:''
		}
		this.onChange = this.onChange.bind(this);// bind(this) is needed here,
		this.onSubmit = this.onSubmit.bind(this);
		this.selectLogoClick = this.selectLogoClick.bind(this);
		this.closeModal = this.closeModal.bind(this);
		this.scrollPage=this.scrollPage.bind(this);
	}

	//this method will call on reload of page
	componentDidMount() {
		const {title} = this.props.editMessage;
		const {message} = this.props.editMessage;
		const {imageId} = this.props.editMessage;
		const {id}=this.props.editMessage;
		const {available}=this.props.editMessage;
		this.setState({
			title,
			message,
			imageId,
			id,
		});
	}

	componentWillUnmount() {
		this.props.clearMessageData();
	}

	closeModal() {
		this.setState({
			'triggerUpload':false,
			'logoImage':''
		});
	}

	//method for input data
	onChange(event) {
		event.preventDefault();
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
		// }
		 if(this.state.submitApplied)
		      this.scrollPage({errors});
		return isValid;
	}

	//method for scroll of page on some action
	scrollPage(error){

        for(var scroll in error.errors)
        {
            this.state.scroll= scroll;
            break;                                        
        } 
        let elmnt = document.getElementById('edit-message-form');
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
 	
	//method for submitting the data
	onSubmit(event) {
		event.preventDefault();
		this.state.submitApplied=true;
		this.setState({ firstTimeFormSubmit : true })
		if(this.isValid()) {
			this.setState({ errors: {}, isLoading:true });
			let message= {
					"title":this.state.title,
					"message":this.state.message,
					"imageId":this.state.imageId,
					"id":this.state.id
			}
			this.props.userMessageUpdateFormsRequest(message).then(
					(res) => {
						if(!res.payload.response && res.payload.status==600) {
							this.props.addToast({  type:'error', 
								text:`Sorry,you are not authorized to create or update message, please contact to your  admin`, 
								toastType:'auto'  });
							this.context.router.push('/ERitual/message');
						}
						else if(res.payload.status==204){
	  	        			this.setState({ errors : { "form" : "Message Name already exist" }, isLoading : false })
	  	        			this.context.router.push('/ERitual/editMessage');
						}
						else{
							res.payload.data=JSON.parse(decodeURIComponent(res.payload.config.data.replace(/\+/g,'%20')));
							let messageFormData= res.payload.data;
							this.props.addToast({  type:'success', 
								text:`Message updated successfully`, 
								toastType:'auto'  });
							this.context.router.push('/ERitual/message');
						}
					},
			);
		}
	}

	selectLogoClick(event) {
		this.setState({triggerUpload:true});
	}

	hexToBase64(str) { return btoa(String.fromCharCode.apply(null, str.replace(/\r|\n/g, "").replace(/([\da-fA-F]{2}) ?/g, "0x$1 ").replace(/ +$/, "").split(" "))); }

	render() {
		const {imageUrl} = this.props;
		let imageData;
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
		const {errors ,success,image,message,imageUploadSuccess,messageImage,isLoading,title,imageId} = this.state;
		let imgSrc = `http://ec2-54-70-18-17.us-west-2.compute.amazonaws.com:8080/eritual-web/rest/image/stream/${imageId}`;
		return (
				<div>
        		<form className="p20 user-entry-forms details-form" onSubmit={this.onSubmit}>
                <h1 className="mt0 mb20 text-center page-header page-hdrCstm">Message Form</h1>
                { errors.form && <div className="alert alert-danger">{errors.form}</div> }
                <label>Upload Image</label>
                <div className="row mb10">
                <div className="col-xs-12">
	                {imageUploadSuccess && <img src = {messageImage} width="100%"/>}
	                <div className="pull-right logo-container" onClick={this.selectLogoClick} onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}>
	                  {this.state.logoImageOnCard != '' && <img ref="logoOnCard" src={this.state.logoImageOnCard} style={uploadedImageStyles}/> }
	                  <button ref="logoUploadReveal" className="logo-upload-reveal coursor-pointer ">Click to upload</button>
	                </div>
	              </div>
                </div>
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
  				<label>Type</label>
  				<select name="type" className=" form-control  font-color " onChange={this.onSelect}>
  				<option value="">Select Type</option>
  				<option value="audio" >Audio</option>
  				<option value="video"  >Video</option>
  				<option value="pdf">Pdf</option>
  				<option value="text">Text</option>
  				</select>
  				</div>
              </div>
              <div className="row">
				<div className="col-xs-6">
				 <label>Description</label>
				<textarea 
				label="Message"
					cols="84"
						rows="6"
							onChange={this.onChange}
				name="message"
					placeholder = "Type something.."
						value={message}
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
            {this.state.triggerUpload && <div className="modal-bg"><div className="file-upload-container">
              {this.state.logoImage != '' && <img  className="full-width logo-upload-preview mb20" src={this.state.logoImage}/> }
              <button className = 'close-modal' onClick = {this.closeModal}>x</button>
              <FileUpload options={options} className="upload-btn-container">
                <button ref="chooseBtn" className="btn btn-primary mr20">Choose File</button>
                <button ref="uploadBtn" className="btn btn-primary pull-right">Upload</button>
              </FileUpload>
            </div></div>}
              {this.state.triggerUploadVideo && <div className="modal-bg"><div className="video-upload-container">
				<button className = 'close-modal' onClick = {this.closeModal}>x</button>
				{videoUrl}
				<div className="row">
				<div className="col-md-6">
				<label htmlFor="file-upload" className="">
				<i className="btn btn-lg btn-primary mr50" aria-hidden="true">Choose File
				</i>
				</label>
				<input
				name="file"
					type="file"
						id="file-upload"
							onChange={this.handleFile} 
				/>
				</div>
				<div className="col-md-6">
				<button ref="uploadBtn" className="btn btn-primary ">Upload</button>
				</div>
				</div>
				</div>
				</div>}
        </div>
		);
				}
	}



EditMessageContainer.contextTypes = {
		router:React.PropTypes.object.isRequired
}

export default EditMessageContainer;