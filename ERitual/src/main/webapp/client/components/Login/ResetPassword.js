import React,{Component} from 'react';
import ResetPasswordFormContainer from '../../containers/ResetPasswordContainer';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import {userResetPasswordFormsRequest} from '../../actions/resetPasswordAction';
import {LargeLogo} from '../common/Logos';
import { bindActionCreators } from 'redux';
import {addToast, deleteToast} from '../../actions/Toasts';

class ResetPasswordForm extends Component {
	componentDidMount(){
		this.props.resetPassword;
	}
    render() {
      const {userResetPasswordFormsRequest, resetPassword,addToast} = this.props;
        return (
            <div className="row full-height">
              <div className="col-md-4 col-md-offset-4 full-height">
                <LargeLogo id="large_logo" className="large-logo"/>
                <ResetPasswordFormContainer userResetPasswordFormsRequest={userResetPasswordFormsRequest} addToast={addToast} deleteToast = {deleteToast} /> 
              </div>
            </div>
        );
    }
}

ResetPasswordForm.propTypes = {
		userResetPasswordFormsRequest:React.PropTypes.func.isRequired,
		addToast:React.PropTypes.func.isRequired
}

function mapStateToProps(state) {
	  return {
		  resetPassword:state.resetPasswordFormReducer,
	  };
	}
function mapDispatchToProps(dispatch) {
	return {
		userResetPasswordFormsRequest: bindActionCreators({userResetPasswordFormsRequest }, dispatch),
		addToast:bindActionCreators({ addToast }, dispatch),
	  };
	}

export default connect(mapStateToProps, {userResetPasswordFormsRequest,addToast} )(ResetPasswordForm)
