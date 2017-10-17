import React,{Component} from 'react';
import OtpVerificationFormContainer from '../../containers/OtpVerificationContainer';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import {userOtpVerificationFormsRequest} from '../../actions/resetPasswordAction';
import {LargeLogo} from '../common/Logos';
import { bindActionCreators } from 'redux';
import {addToast, deleteToast} from '../../actions/Toasts';

class OtpVerificationForm extends Component {
	componentDidMount(){
		this.props.otpVerification;
	}
    render() {
      const {userOtpVerificationFormsRequest, otpVerification,addToast} = this.props;
        return (
            <div className="row full-height">
              <div className="col-md-4 col-md-offset-4 full-height">
                <LargeLogo id="large_logo" className="large-logo"/>
                <OtpVerificationFormContainer userOtpVerificationFormsRequest={userOtpVerificationFormsRequest} addToast={addToast} deleteToast = {deleteToast} /> 
              </div>
            </div>
        );
    }
}

OtpVerificationForm.propTypes = {
		userOtpVerificationFormsRequest:React.PropTypes.func.isRequired,
		ddToast:React.PropTypes.func.isRequired
}

function mapStateToProps(state) {
	  return {
		  otpVerification:state.otpVerificationFormReducer,
	  };
	}
function mapDispatchToProps(dispatch) {
	return {
		userOtpVerificationFormsRequest: bindActionCreators({userOtpVerificationFormsRequest }, dispatch),
		addToast:bindActionCreators({ addToast }, dispatch),
	  };
	}

export default connect(mapStateToProps, {userOtpVerificationFormsRequest,addToast} )(OtpVerificationForm)
