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

class AboutUsFormDetailsContainer extends Component {
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
        pdfUploadSuccess:false
        
      }

        this.onChange = this.onChange.bind(this);// bind(this) is needed here,
		this.onSubmit = this.onSubmit.bind(this);
		this.scrollPage=this.scrollPage.bind(this);
		this.onClick=this.onClick.bind(this);
		this.selectLogoClick = this.selectLogoClick.bind(this);
		this.closeModal = this.closeModal.bind(this);
    }
    
    export default AboutUsFormContainer;