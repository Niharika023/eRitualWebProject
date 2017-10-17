import React,{Component} from 'react';
import classnames from 'classnames';
import map from 'lodash';
import { Link } from 'react-router';
import jwt from 'jsonwebtoken';
import Dropdown from 'react-dropdown';
import Datetime from 'react-datetime';
import validateInput from '../validations/sevaValidation';
import TextFieldGroup from '../components/common/TextFieldGroup';
import setAuthToken from '../utils/setAuthToken';
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
        scroll:''


      }

      this.onChange = this.onChange.bind(this);// bind(this) is needed here,
      this.onSubmit = this.onSubmit.bind(this);
      this.handleRadioChange = this.handleRadioChange.bind(this);
      this.handleInputChange = this.handleInputChange.bind(this);
      this.handleNakshtraInputChange=this.handleNakshtraInputChange.bind(this);
      this.handleRashiInputChange=this.handleRashiInputChange.bind(this);
      this.handleGotraInputChange=this.handleGotraInputChange.bind(this);
      this.handleNameInputChange=this.handleNameInputChange.bind(this);
      this.onImageUpload = this.onImageUpload.bind(this);
      this.valid=this.valid.bind(this);
      this.handleDateTimeSelect=this.handleDateTimeSelect.bind(this);
      this.selectLogoClick = this.selectLogoClick.bind(this);
      this.closeModal = this.closeModal.bind(this);
      this.scrollPage=this.scrollPage.bind(this);

    }
    
    closeModal() {
    	this.setState({
    		'triggerUpload':false,
    		'logoImage':''
    	});
    }
    onChange(event) {
    	event.preventDefault();
      this.state.submitApplied=false;

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

    handleRadioChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.state.available=value;
        this.setState({
            [name]: value
          });
      }
    
    //For Image Upload 
    onImageUpload(event)
    {
    	
    	 let reader = new FileReader();
    	 let file = event.target.files[0];
    	console.log("image name",file);
    	console.log("this.state.image",event.target.value);
    		let filename = event.target.value;
    		let filenameArr = (filename).split("\\");
    		let fullFileName= filenameArr[2].split(".");
    		let imageName=fullFileName[0];
    	if(this.state.image !=""){
    		this.state.image
    	this.state.imageDescription = imageName + "_Picture";
    	this.state.tags= imageName + "," + this.state.templeName;
    	}
    	let imageValue = {
    		'description': this.state.imageDescription ,
    		'tags': this.state.tags,
    		'image':file
    	}
    	 this.props.imageUploadRequest(imageValue).then(
        		 (res) => {
        		res.payload.data=JSON.parse(decodeURIComponent(res.payload.data.replace(/\+/g,'%20')));
        	        		let sevaFormData= res.payload.data;
        	        		this.setState({imageId:sevaFormData.id})
        	               	if(sevaFormData.message!= null) {
        	               		this.setState({ errors : { "form" : sevaFormData.message }, isLoading : false })
        	               		}
        	               	else {
        	               		
        	               		this.setState({ success : { "form" : "uploaded successfully" }, isLoading : false })
        	               	}
        	         },
        	         );
    }
    
    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.state.checked=value;
        this.setState({
            [name]: value
          });
      }
    
    handleNameInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.state.sevaUserName=value;
        this.setState({
            [name]: value
          });
      }
    
    handleRashiInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.state.rashi=value;
        this.setState({
            [name]: value
          });
      }
    
    handleNakshtraInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.state.nakshatra=value;
        this.setState({
            [name]: value
          });
      }
    handleGotraInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.state.gotra=value;
        this.setState({
            [name]: value
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
    	console.log("timme",this.state.time);
    	  if(this.state.firstTimeFormSubmit) {
              this.isValid();
            }
    	

    }
    
    onSubmit(event) {
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
        //  this.state.formFields=concatString;
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
         /* this.state.hours=(this.state.hours < 10) ? "0" + this.state.hours : this.state.hours;
     		this.state.minutes=(this.state.minutes < 10)? "0"+this.state.minutes : this.state.minutes;*/
         let sevaData=this.state;
        // this.state.time = this.state.hours+":"+this.state.minutes;
           this.props.userSevaFormsRequest(sevaData).then(
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
    valid(current)
    {
    	let yesterday = Datetime.moment().subtract( 1, 'day' );
    	return current.isAfter( yesterday );
    }
    

    nakshatraRenderOptions() {
    	if(this.props.nakshatra!=undefined){
    	if(this.props.nakshatra.length!=0){
    	const nakshatraList = this.props.nakshatra.data.map((nakshatra) => {
    		return (
    			<option key={nakshatra}>{nakshatra}</option>
    		)
    	});
    	return nakshatraList;
    	}
    	}	
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
    	
    	const {errors ,success,image,sevaUserName, name,selectedTime,preRequisite,imageUploadSuccess,gotra,rashi,sevaImage, nakshatra, description,amount,active,inActive,isLoading,checked} = this.state;
        return (
        	<div>
        		<form className="p20 user-entry-forms details-form" onSubmit={this.onSubmit} id="seva-form">
                <h2 className="mt0 mb20 text-center">Seva Form</h2>
                <div className="row mb30">
                  <div className="col-xs-12">
                    <hr/>
                  </div>
                </div>
                { errors.form && <div className="alert alert-danger ">{errors.form}</div> }
                <label>Upload Image</label>
                <div className="row mb10">
                <div className="col-xs-12">
	                {imageUploadSuccess && <img src = {sevaImage} width="100%"/>}
	                <div className="pull-right logo-container" onClick={this.selectLogoClick} onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}>
	                  {this.state.logoImageOnCard != '' && <img ref="logoOnCard" src={this.state.logoImageOnCard} style={uploadedImageStyles}/> }
	                  <Link ref="logoUploadReveal" className="logo-upload-reveal coursor-pointer ">Click to upload</Link>
	                </div>
	              </div>
                </div>
                <div className="row mb10">
                <div className="col-xs-12">
                  <TextFieldGroup
                    error={errors.name}
                    onChange={this.onChange}
                    value={name}
                    field="name"
                    label="Name"
                  />
                </div>
              </div>
              <div className="row mb10">
                <div className="col-xs-12">
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
               <div className="col-xs-12">
               <label className="mr10">Pre-Requisite</label>
               <input
               name="checked"
                   type="checkbox"
                   checked={this.state.checked}
                   onChange={this.handleInputChange} 
               />
               {this.state.checked && <div>  <div className="row mb10">
               <div className="col-md-12">
               <div className="row mb10">
   	            <div className="col-md-3">
   	            <label>Name</label>
   	            <input
   	               name="eventUserName"
   	                   type="checkbox"
   	                   checked={this.state.eventUserName}
   	                   onChange={this.handleNameInputChange} 
   	               />
   	             </div>
   		            <div className="col-md-3">
   		            <label>Gotra</label>
   		            <input
   		               name="gotra"
   		                   type="checkbox"
   		                   checked={this.state.gotra}
   		                   onChange={this.handleGotraInputChange} 
   		               />
   		             </div>
                  	<div className="col-md-3">
                   <label>Rashi</label>
                  	<input
                   name="rashi"
                       type="checkbox"
                       checked={this.state.rashi}
                       onChange={this.handleRashiInputChange} 
                   />
   				  </div>
   				  	<div className="col-md-3">
   				  	 <label>Nakshatra</label>
   				  	<input
   		               name="nakshatra"
   		                   type="checkbox"
   		                   checked={this.state.nakshatra}
   		                   onChange={this.handleNakshtraInputChange} 
   		               />
   				  	</div>
   				 </div>
   			</div>
   			</div>
              </div>}
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
	                  label="Seva Amount"
	                  onChange={this.onChange}
	                  value={amount}
	                  field="amount"
	                />
                </div>
              </div>
               <div className="row mb10">
               <div className="col-xs-12">
               <label>Available</label>
			  	<input
	               name="available"
	                   type="checkbox"
	                   checked={this.state.available}
	                   onChange={this.handleRadioChange} 
	               />
               </div>
             </div>
                <div className="row mt30">
                	<div className="col-md-6 text-center ">
                		<Link to="/ERitual/seva" className=" block mb20 link-secondary">Cancel</Link> 
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



SevaFormContainer.contextTypes = {
  router:React.PropTypes.object.isRequired
}

export default SevaFormContainer;
