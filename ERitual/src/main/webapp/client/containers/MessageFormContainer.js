import React,{Component} from 'react';
import classnames from 'classnames';
import map from 'lodash';
import { Link } from 'react-router';
import jwt from 'jsonwebtoken';
import Dropdown from 'react-dropdown';
import Datetime from 'react-datetime';
import validateInput from '../validations/messageValidation';
import TextFieldGroup from '../components/common/TextFieldGroup';
import setAuthToken from '../utils/setAuthToken';
import FileUpload from 'react-fileupload';
import axios from 'axios';
class MessageFormContainer extends Component {
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
        message:''
      }

      this.onChange = this.onChange.bind(this);// bind(this) is needed here,
      this.onSubmit = this.onSubmit.bind(this);
      this.selectLogoClick = this.selectLogoClick.bind(this);
      this.closeModal = this.closeModal.bind(this);
    }
    
    closeModal() {
    	this.setState({
    		'triggerUpload':false,
    		'logoImage':''
    	});
    }
    onChange(event) {
      console.log("onchanging")
    	event.preventDefault();
    	this.setState({ [event.target.name]:event.target.value}, function() {
    	  if(this.state.image!="" && this.state.firstTimeFormSubmit ==false)
    		  {
    		  this.onImageUpload();
    		  }
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
      return isValid;
    }
    
    
    onSubmit(event) {
        event.preventDefault();
        this.setState({ firstTimeFormSubmit : true })
        if(this.isValid()) {
          this.setState({ errors: {}, isLoading:true });
         let messageData=this.state;
           this.props.userMessageFormsRequest(messageData).then(
          		 (res) => {
          			 if(res.payload.response && res.payload.response.status==600) {
 	               		this.setState({ errors : { "form" : "Sorry,you are not authorized to create or update seva, please contact to your  admin" }, isLoading : false })
 	               		}
           			 else{
          			 res.payload.data=JSON.parse(decodeURIComponent(res.payload.data.replace(/\+/g,'%20')));
          	        		let messageFormData= res.payload.data;
          	               /*	if(messageFormData.message!= null) {
          	               		this.setState({ errors : { "form" : messageFormData.message }, isLoading : false })
          	               		}
          	            	else {*/
          	               		this.props.addToast({  type:'success', 
          	               			text:`Message created successfully`, 
          	               			toastType:'auto'  });
          	               		this.context.router.push('/ERitual/message');
          	               //	}
           			 }
          	         },
          	         );
          	      }
      }
    valid(current)
    {
    	let yesterday = Datetime.moment().subtract( 1, 'day' );
    	return current.isAfter( yesterday );
    }
    

    
    selectLogoClick(event) {
        this.setState({triggerUpload:true});
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
	                    //console.log("binary is ", e2.target.result);
	                	  
	                	  
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
                    	console.log("state ", this.state);
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
	          console.log('loading...',progress.loaded/progress.total+'%');
	        },
	        uploadSuccess : (response) => {
	          this.setState({logoImageOnCard:this.state.logoImage});
	          this.setState({isUploadLoading:false});
	        }
	      };
    	
    	const {errors ,success,image,message,imageUploadSuccess,messageImage,isLoading,title} = this.state;
        return (
        	<div>
        		<form className="p20 user-entry-forms details-form" onSubmit={this.onSubmit}>
                <h2 className="mt0 mb20 text-center">Message Form</h2>
                <div className="row mb30">
                  <div className="col-xs-12">
                    <hr/>
                  </div>
                </div>
                { errors.form && <div className="alert alert-danger">{errors.form}</div> }
                <label>Upload Image</label>
                <div className="row mb10">
                <div className="col-xs-12">
	                {imageUploadSuccess && <img src = {messageImage} width="100%"/>}
	                <div className="pull-right logo-container" onClick={this.selectLogoClick} onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}>
	                  {this.state.logoImageOnCard != '' && <img ref="logoOnCard" src={this.state.logoImageOnCard} style={uploadedImageStyles}/> }
	                  <Link ref="logoUploadReveal" className="logo-upload-reveal coursor-pointer ">Click to upload</Link>
	                </div>
	              </div>
                </div>
                <div className="row mb10">
                <div className="col-xs-12">
                  <TextFieldGroup
                    error={errors.title}
                    label="Title"
                    onChange={this.onChange}
                    value={title}
                    field="title"
                  />
                </div>
              </div>
            <div className="row mb10">
                <div className="col-xs-12 message">
                <label>Message</label><span className = "required"></span>
                	<textarea 
	                  label="Message"
                    cols="55"
                    rows="7"
	                  onChange={this.onChange}
                   name="message"
                   placeholder = "Message"
	                  value={message}
	                	className="wordText messageColor"
                  />
             {errors.message && <span className="help-block has-error material-label error-form "> {errors.message}</span>}

                 </div>
               </div>
                <div className="row mt30">
                	<div className="col-md-6 text-center ">
                		<Link to="/ERitual/message" className=" block mb20 link-secondary">Cancel</Link> 
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
            {this.state.triggerUpload && <div className="modal-bg"><div className="file-upload-container">
              {this.state.logoImage != '' && <img  className="full-width logo-upload-preview mb20" src={this.state.logoImage}/> }
              <button className = 'close-modal' onClick = {this.closeModal}>x</button>
              <FileUpload options={options} className="upload-btn-container">
                <button ref="chooseBtn" className="btn btn-primary mr20">Choose File</button>
                <button ref="uploadBtn" className="btn btn-primary pull-right">Upload</button>
              </FileUpload>
            </div></div>}
        </div>
        );
    }
}



MessageFormContainer.contextTypes = {
  router:React.PropTypes.object.isRequired
}

export default MessageFormContainer;