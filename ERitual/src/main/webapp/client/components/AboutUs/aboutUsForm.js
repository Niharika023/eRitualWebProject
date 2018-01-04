import React,{Component} from 'react';
import AboutUsFormContainer from '../../containers/AboutUsContainer/AboutUsFormContainer';
import { Link } from 'react-router';
import { setAboutUs } from '../../actions/AboutUsAction'
import {LargeLogo} from '../common/Logos';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {addToast, deleteToast} from '../../actions/Toasts';

class AboutUsForm extends Component {
	componentDidMount(){
		this.props.aboutus;
	}
    render() {
      const {setAboutUs} = this.props;
        return (
            <div className="row full-height">
              <div className="col-md-8 col-md-offset-2 full-height">
                <LargeLogo id="large_logo" className="large-logo"/>
                <AboutUsFormContainer /> 
              </div>
            </div>
        );
    }
}



export default connect()(AboutUsForm)