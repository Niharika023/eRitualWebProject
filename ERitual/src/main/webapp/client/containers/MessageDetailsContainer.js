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

class MessageDetailsContainer extends Component {
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
    	        createdTS:null,
    	        hour:null
      }

      this.onChange = this.onChange.bind(this);// bind(this) is needed here,
      this.selectLogoClick = this.selectLogoClick.bind(this);
      this.closeModal = this.closeModal.bind(this);
    }
    
    imageStreamRequest(imageId){
        	 this.props.imageStreamRequest(imageId);
        }
    
    
    componentDidMount() {
    	console.log("inside mount",this.props.editMessage);
    	const {title} = this.props.editMessage;
    	const {message} = this.props.editMessage;
    	const {imageId} = this.props.editMessage;
    	const {id}=this.props.editMessage;
    	const {createdTS}=this.props.editMessage;
    	let messageDate=new Date(this.props.editMessage.createdTS);
		let formattedDate=messageDate.getFullYear() + '-' + (messageDate.getMonth()+1) + '-' + messageDate.getDate();
		this.state.createdTS=formattedDate;
		this.state.time=`${(messageDate.getHours() < 10) ? "0" + messageDate.getHours() : messageDate.getHours()}:${(messageDate.getMinutes() < 10)? "0"+messageDate.getMinutes() : messageDate.getMinutes()} ${((messageDate.getHours()) < 12)?'AM':'PM'}`
		let formattedTime= messageDate.getHours() +':'+ messageDate.getMinutes();
    	this.setState({
    		title,
    		imageId,
    		message,
    		id
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
    
    onChange(event) {
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

    selectLogoClick(event) {
        this.setState({triggerUpload:true});
    }
    
    hexToBase64(str) { return btoa(String.fromCharCode.apply(null, str.replace(/\r|\n/g, "").replace(/([\da-fA-F]{2}) ?/g, "0x$1 ").replace(/ +$/, "").split(" "))); }
    
    render() {
    	console.log("rendered");
    	const {imageUrl} = this.props;
    	let imageData;
    	/*
		 * if(imageUrl) { const urlCreator = window.URL || window.webkitURL;
		 * imageData = urlCreator.createObjectURL(imageUrl) console.log("image
		 * data " , imageData); }
		 */
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
	                    // console.log("binary is ", e2.target.result);
	                	  
	                	  
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
        const {errors ,success,image,message,imageUploadSuccess,messageImage,isLoading,title,time,imageId,createdTS} = this.state;
        let imgSrc = `http://ec2-54-70-18-17.us-west-2.compute.amazonaws.com:8080/eritual-web/rest/image/stream/${imageId}`;
       console.log("message.length",message.length);
        return (
        		<div>
        		<form className="p20 user-entry-forms details-form ">
                <h2 className="mt0 mb20 text-center"> Message Details</h2>
                <table className="table table-bordered table-striped mt30 ">
				<tbody>
				<tr className="row">
					<th className="col-md-2">
					<tr ><h3>Image</h3></tr>
					</th>
					<tr className="col-md-10 p-ver-20">
					<tr >{imageUploadSuccess && <img src = {messageImage} width="100%"/>}
	                {!imageUploadSuccess && <img src={imgSrc} width="100%"/>}</tr>
					</tr>
				</tr>
				<tr className="row">
				<th className="col-md-2">
				<tr ><h3>Title</h3></tr>
				</th>
				<tr className="col-md-10 p-ver-20">
				<tr >{title}</tr>
				</tr>
			</tr>
				<tr className="row">
					<th className="col-md-2">
					<tr ><h3>Message</h3></tr>
					</th>
					<tr className="col-md-10 p-ver-20  ">
					<tr className="message-height">{message}</tr>
					</tr>
				</tr>

				</tbody>
			</table>

              </form>
          </div> 
        );
    }
}



MessageDetailsContainer.contextTypes = {
  router:React.PropTypes.object.isRequired
}

export default MessageDetailsContainer;