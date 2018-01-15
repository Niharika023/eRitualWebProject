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

class DonationDetailsContainer extends Component {
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
    	        //tags: "general,farm",
    	        imageId:"",
    	        logoImage:"",
    	        logoImageOnCard:"",
    	        triggerUpload:false,
    	        isUploadLoading:true,
    	        isLoading:false,
    	        imageUploadSuccess:false,
    	        messageImage:"",
    	        name:'',
    	        message:'',
    	        tags:'',
    	        description:'',
    	        amount:'',
    	        createdTS:null,
    	        hour:null,
    	        triggredNoData:false
      }

      this.onChange = this.onChange.bind(this);// bind(this) is needed here,
      this.selectLogoClick = this.selectLogoClick.bind(this);
      this.closeModal = this.closeModal.bind(this);
      this.onClick=this.onClick.bind(this);
      this.showNodata=this.showNodata.bind(this);
    }
    
    imageStreamRequest(imageId){
        	 this.props.imageStreamRequest(imageId);
        }
    
    
    componentDidMount() { 
    	
       // console.log("Details"+JSON.stringify(this.props))
    	const {name} = this.props.editDonation;
    	const {tags} = this.props.editDonation;
    	const {imageId} = this.props.editDonation;
    	const {description} = this.props.editDonation;
    	const {amount}=this.props.editDonation;
    	const {time}=this.props.editDonation;
    	const {id}=this.props.editDonation;
    	const {createdTS}=this.props.editDonation;
    	if(this.props.editDonation.imageId == null ||this.props.editDonation.imageId == "" || this.props.editDonation.imageId == undefined ){
    		this.state.triggredNoData = true;
    	}else {
    		this.state.triggredNoData= false;
    	}
    	let messageDate=new Date(this.props.editDonation.createdTS);
		let formattedDate=messageDate.getFullYear() + '-' + (messageDate.getMonth()+1) + '-' + messageDate.getDate();
		this.state.createdTS=formattedDate;
		this.state.time=`${(messageDate.getHours() < 10) ? "0" + messageDate.getHours() : messageDate.getHours()}:${(messageDate.getMinutes() < 10)? "0"+messageDate.getMinutes() : messageDate.getMinutes()} ${((messageDate.getHours()) < 12)?'AM':'PM'}`
		let formattedTime= messageDate.getHours() +':'+ messageDate.getMinutes();
    	this.setState({
    		description,
    		imageId,
    		id,
    		name,
    		tags,
    		amount,
    		time
    	},
    	  ()=>{
    		 this.showNodata(event); 
    	  }
    	);
    }
    
    componentWillUnmount() {
    	this.props.clearDonationData();
    }

    closeModal() {
    	this.setState({
    		'triggerUpload':false,
    		'logoImage':''
    	});
    }
    showNodata(event) {
    	if(this.state.imageId == null || this.state.imageId == "" || this.state.imageId == undefined ){
    		this.state.triggredNoData = true
    	}else {
    		this.state.triggredNoData= false;
    	}
    	console.log(this.state.triggredNoData);
     
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
    
    onClick(event){
		this.context.router.push('/ERitual/donation');
	this.setState({
			'triggerUpload':false,
			'logoImage':'',
			'triggerUploadVideo':false,
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
    	const {imageUrl} = this.props;
    	let imageData;
    	
        const {errors ,description,success,tags,name,image,amount,triggredNoData,imageUploadSuccess,messageImage,isLoading,time,imageId,createdTS} = this.state;
        let imgSrc = `http://ec2-54-70-18-17.us-west-2.compute.amazonaws.com:8080/eritual-web/rest/image/stream/${imageId}`;
        return (
        		<div className="mt50">
        		<div className="p20 user-entry-forms details-form">
                <h1 className="mt0 mb20 text-center page-header page-hdrCstm"> Donation Details</h1>
               {/* <div className="btn-toolbar">
				  <Link onClick={this.onClick} className="link-secondary  active coursor-pointer">
					Back
					</Link>
					</div>*/}
                <table className="table table-bordered table-striped mt30 ">
				<tbody>
				<tr className="row">
					<th className="col-md-2">
					<tr ><h3>Image</h3></tr>
					</th>
					<tr className="col-md-10 p-ver-20">
					{ triggredNoData && <tr>No Image Available</tr>}
					{!triggredNoData && <tr >{imageUploadSuccess && <img src = {messageImage} width="100%"/>}
	                {!imageUploadSuccess && <img src={imgSrc} width="100%"/>}</tr>}
					</tr>
				</tr>
				<tr className="row">
				<th className="col-md-2">
				<tr ><h3>Name</h3></tr>
				</th>
				<tr className="col-md-10 p-ver-20">
				<tr >{name}</tr>
				</tr>
			</tr>
				<tr className="row">
					<th className="col-md-2">
					<tr ><h3>Tags</h3></tr>
					</th>
					<tr className="col-md-10 p-ver-20  ">
					<tr className="message-height">{tags}</tr>
					</tr>
				</tr>
				<tr className="row">
				<th className="col-md-2">
				<tr ><h3>Description</h3></tr>
				</th>
				<tr className="col-md-10 p-ver-20  ">
				<tr className="message-height">{description}</tr>
				</tr>
			</tr>
			<tr className="row">
			<th className="col-md-2">
			<tr ><h3>Amount</h3></tr>
			</th>
			<tr className="col-md-10 p-ver-20  ">
			<tr className="message-height">{amount}</tr>
			</tr>
		</tr>
		
				</tbody>
			</table>

              </div>
          </div> 
        );
    }
}



DonationDetailsContainer.contextTypes = {
  router:React.PropTypes.object.isRequired
}

export default DonationDetailsContainer;