import React,{Component} from 'react';
import ChangePasswordFormContainer from '../../containers/ChangePasswordContainer';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import {userChangePasswordFormsRequest} from '../../actions/changePasswordAction';
import {LargeLogo} from '../common/Logos';
import { bindActionCreators } from 'redux';

class ChangePasswordForm extends Component {
	componentDidMount(){
		this.props.changePassword;
	}
    render() {
      const {userChangePasswordFormsRequest, changePassword} = this.props;
        return (
            <div className="row full-height">
              <div className="col-md-4 col-md-offset-4 full-height">
                <LargeLogo id="large_logo" className="large-logo"/>
                <ChangePasswordFormContainer userChangePasswordFormsRequest={userChangePasswordFormsRequest}  />
              </div>
            </div>
        );
    }
}

ChangePasswordForm.propTypes = {
		userChangePasswordFormsRequest:React.PropTypes.func.isRequired,
}

function mapStateToProps(state) {
	  return {
		  changePassword:state.changePasswordFormReducer,
	  };
	}
function mapDispatchToProps(dispatch) {
	return {
		userChangePasswordFormsRequest: bindActionCreators({userChangePasswordFormsRequest }, dispatch),
	  };
	}

export default connect(mapStateToProps, mapDispatchToProps )(ChangePasswordForm)
