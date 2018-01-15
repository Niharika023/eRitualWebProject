import React,{Component} from 'react';
import classnames from 'classnames';
import map from 'lodash';
import { Link } from 'react-router';
import jwt from 'jsonwebtoken';
import Dropdown from 'react-dropdown';
import AboutUsForm from '../../components/AboutUs/aboutUsForm';
import TextFieldGroup from '../../components/common/TextFieldGroup';
import validateInput from '../../validations/aboutUsValidation';
import setAuthToken from '../../utils/setAuthToken';
import FileUpload from 'react-fileupload';
import axios from 'axios';


class AboutUsFormContainer extends Component {
    constructor(props){
      super(props);
      // We will be using the state to control the input. This will ensure
		// that the state will always hold the lastest
      this.state = {
        title: '',
        image:'',
        firstTimeFormSubmit:false,
        overview :'',
        panchanga:'',
        imageOrPdf:'',
        errors:{},
		success:{},
		isLoading:false,
		firstTimeFormSubmit:false,
        submitApplied:false,
    	triggerUpload:false,
        scroll:'',
        tagValue:'',
        tags:'',
        imageUploadSuccess:false,
        pdfUploadSuccess:false,
        fileName:'',
        isPdfUpload:'',
        showDownloadLink:false
        
      }

        this.onChange = this.onChange.bind(this);// bind(this) is needed here,
		this.onSubmit = this.onSubmit.bind(this);
		this.scrollPage=this.scrollPage.bind(this);
		this.onClick=this.onClick.bind(this);
		this.selectLogoClick = this.selectLogoClick.bind(this);
		this.closeModal = this.closeModal.bind(this);
    }
    onClick(event){
		this.context.router.push('/ERitual/aboutUs');
	}
    
   
    
    onChange(event) {
	      this.state.submitApplied=false;
		this.setState({ [event.target.name]:event.target.value}, function() {
			if(this.state.firstTimeFormSubmit) {
				this.isValid();
			}
		});
	}

    componentDidMount() {
		const {overview} = this.props.editAboutUs.editAboutUs.value;
		const {panchangaId} = this.props.editAboutUs.editAboutUs.value;
		const {imageId} = this.props.editAboutUs.editAboutUs.value;
		const {id} = this.props.editAboutUs.editAboutUs;
		this.setState({
			overview,
			panchangaId,
			imageId,
			id,
		});
		if(this.props.editAboutUs.editAboutUs.value.panchangaId!=null){
			this.state.showDownloadLink=false;
		}

	}


	componentWillUnmount() {
		this.props.clearTagConfigData();
	}
	
    closeModal() {
		this.setState({
			'triggerUpload':false,
			'logoImage':'',
			'triggerUploadVideo':false,
		});
	}
	
	onClick(event){
		this.context.router.push('/ERitual/aboutUs');
	this.setState({
			'triggerUpload':false,
			'logoImage':'',
			'triggerUploadVideo':false,
		});
	}
	 selectLogoClick(event) {
	
		 event.preventDefault();
		 this.state.imageOrPdf='';
		 this.state.isPdfUpload=false;
		 this.setState({triggerUpload:true});
		 this.state.imageOrPdf=event.target.name;
		 if( this.state.imageOrPdf=="aboutUsPdf"){

		 this.setState({ panchangaPdf:event.target.name })

		 }if( this.state.imageOrPdf=="aboutUsImg"){
		 this.setState({ panchangaImg:event.target.name})	
		 }
			
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
        let elmnt = document.getElementById('aboutUs-form');
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

    //Submit aboutus Form
    onSubmit(event) {
		event.preventDefault();
	     this.state.submitApplied=true;
		this.setState({ firstTimeFormSubmit : true })
		//condition for checking the validation
		if(this.isValid()) {
			this.setState({ errors: {}, isLoading:true });
			let tagConfig= {
					"ui.tab.about-us":{
						"overview":this.state.overview,
						"panchangaId":this.state.panchangaId,
						"imageId":this.state.imageId
					}
			}
			
			this.props.userTagConfigFormsRequest(tagConfig).then(
					(res) => {
						//condition for unauthorized Admin
						if(!res.payload.response && res.payload.status==600) {
							this.props.addToast({  type:'error', 
								text:`Sorry,you are not authorized to create or update aboutUs, please contact to your  admin`, 
								toastType:'auto'  });
							this.context.router.push('/ERitual/aboutUs');
						}
						//condition for duplicate aboutUs name
						 else if(res.payload.status==204){
		  	        			this.setState({ errors : { "form" : "Something went wrong.." }, isLoading : false })
		  	        		}
						//condition when response is not null
						if(res.payload.status==200 && res.payload.data==true)
							{
							this.props.addToast({  type:'success', 
								text:`AboutUs updated successfully`, 
								toastType:'auto'  });
							this.context.router.push('/ERitual/home');
							}
						else{
							res.payload.data=JSON.parse(decodeURIComponent(res.payload.data.replace(/\+/g,'%20')));
							let aboutUsFormData= res.payload.data;
							if(aboutUsFormData.message!= null) {
								this.setState({ errors : { "form" : aboutUsFormData.message }, isLoading : false })
							}
							else {
								this.props.addToast({  type:'success', 
									text:`AboutUs created successfully`, 
									toastType:'auto'  });
								this.context.router.push('/ERitual/home');
							}
						}
					},
			);
		}
	}
    
    render(){
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
						if( this.state.imageOrPdf=='aboutUsPdf'){
							if(!(files[0].type == "application/pdf")) {
								alert("Select only Pdf file");
								return false;
							}
							else {
								let _URL = window.URL || window.webkitURL;
								let img = new Image();
								/*img.onload = () => {
									if(img.width < 300 || img.height < 300) {
										alert("Minimum dimensions of file should be 300x300");
										return false;
									}
									else {*/
										this.setState({logoImage:e2.target.result,aboutPdf:e2.target.result,fileName:files[0].name,isPdfUpload:true,showDownloadLink:false,isUploadLoading:false});
										/*if(img.width < img.height) {
											uploadedImageStyles.content.width = "auto";
											uploadedImageStyles.content.height = "100%";
										}

									}
								};*/
								//img.src = _URL.createObjectURL(files[0]);
							}
						}else if ( this.state.imageOrPdf=="aboutUsImg"){
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
						if( this.state.panchangaPdf=='aboutUsPdf'){
							this.setState({
								panchangaId:response.data.id,
								panchangaPdf:'',
								pdfUploadSuccess:true
							})
							
						}if(this.state.panchangaImg=='aboutUsImg'){
							console.log("response.data.id",response.data.id);
							this.setState({
								imageId:response.data.id,
								panchangaImg:'',
								imageUploadSuccess:true
							})
						}	
						this.setState({
							//imageUploadSuccess:true
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
    	 const {errors ,success,imageId,panchangaId,pdfUploadSuccess,showDownloadLink,isPdfUpload,fileName,overview,panchanga,aboutPdf,isLoading,messageImage,imageUploadSuccess,uploadedImageStyles} = this.state;
    	 let pdfSrc = `http://ec2-54-70-18-17.us-west-2.compute.amazonaws.com:8080/eritual-web/rest/image/stream/${panchangaId}`;
    	 let imgSrc = `http://ec2-54-70-18-17.us-west-2.compute.amazonaws.com:8080/eritual-web/rest/image/stream/${imageId}`;
    	 console.log("imgSrc",imgSrc);
    	 return (
    		<div>
    		<form className="p20 user-entry-forms details-form" onSubmit={this.onSubmit} id="aboutUs-form">
			<h2 className="mt0 mb20 text-center">About Us Form</h2>
			<div className="row mb30">
			<div className="col-xs-12">
			<hr/>
			</div>
			</div>
			{ errors.form && <div className="alert alert-danger">{errors.form}</div> }

			<div className="row">
  		  <div className="col-md-12">
  		  <label>OverView</label>
				<textarea 
				label="Overview"
					cols="83"
						rows="8"
				name="overview"
					onChange={this.onChange}
					placeholder = "Overview"
						value={overview}
				className="wordText messageColor"
					/>
  		  </div>
  		 </div>
  		{/*<div className="row">
		  <div className="col-md-12">
		  <label>Panchanga</label>
			<textarea 
			label="Panchanga"
				cols="83"
					rows="8"
			name="panchanga"
				onChange={this.onChange}
				placeholder = "Panchanga"
					value={panchanga}
			className="wordText messageColor"
				/>
		  </div>
		 </div>*/}
  		
			<div className="row mt10">
			
			<div className="col-xs-12 mt20">
            <label>Panchanga</label>
	               {showDownloadLink && <div> Please upload file</div>}
	                {pdfUploadSuccess && !showDownloadLink && <a href={aboutPdf} target="_blank"><span className="ml10"> Click to view</span></a>}
	                {!pdfUploadSuccess && !showDownloadLink && <a href={pdfSrc} target="_blank"><span className="ml10">Click to view</span></a>}
	                <div className="pull-right logo-container" onClick={this.selectLogoClick} onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}>
	                  {this.state.logoImageOnCard != '' && <img ref="logoOnCard" src={this.state.logoImageOnCard} style={uploadedImageStyles}/> }
	                  <button name="aboutUsPdf" ref="logoUploadReveal" className="logo-upload-reveal coursor-pointer "> Upload Pdf </button>
	                </div>
			</div>
			</div>
            <div className="row mt10">
			<div className="col-xs-12 mt20">
            <label>Upload Image</label>
	                {imageUploadSuccess && <img src = {messageImage} width="100%"/>}
	                {!imageUploadSuccess && <img src = {imgSrc} width="100%"/>}
	                <div className="pull-right logo-container" onClick={this.selectLogoClick} onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}>
	                  {this.state.logoImageOnCard != '' && <img ref="logoOnCard" src={this.state.logoImageOnCard} style={uploadedImageStyles}/> }
	                  <button name="aboutUsImg" ref="logoUploadReveal" className="logo-upload-reveal coursor-pointer "> Upload Image</button>

	                </div>
			</div>
			</div>
			<div className="row">
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
			{isPdfUpload && <div> {fileName}</div>}	
			 {this.state.logoImage != '' && !isPdfUpload && <img  className="full-width logo-upload-preview mb20" src={this.state.logoImage}/> }
				<button className = 'close-modal' onClick = {this.closeModal}>x</button>
				<FileUpload options={options} clascloseModalsName="upload-btn-container">
				<button ref="chooseBtn" className="btn btn-primary mr20">Choose File</button>
				<button ref="uploadBtn" className="btn btn-primary pull-right">Upload</button>
				</FileUpload>
				</div></div>}
				</div>
    		)
    	
    }
}
 AboutUsFormContainer.contextTypes = {
	router:React.PropTypes.object.isRequired
	                	}
export default AboutUsFormContainer;
