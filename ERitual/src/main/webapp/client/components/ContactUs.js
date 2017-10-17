import React,{Component} from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import {LargeLogo} from './common/Logos';
import { bindActionCreators } from 'redux';


const ContactUs = ({ContactUsRenderList}) => {
return ( 
 <div className="collapse navbar-collapse heading-color">
 <h1 className="mt70 mb20 text-center headerColor">Temple Postal Address:</h1>
 	<div className="fontDesign text-center mb20"> Shree Subrahmanya Temple,</div>
 	<div className="fontDesign text-center mb20">Subrahamanya Post, BSK Taluk,</div>
 	<div className="fontDesign text-center mb20"> Kannada District, Karnataka - 560070   </div>
 </div>
        );
}


export default ContactUs;

