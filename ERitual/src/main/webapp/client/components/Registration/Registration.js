import React,{Component} from 'react';
import RegistrationForm from '../../containers/RegistrationForm';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import {userRegistrationRequest} from '../../actions/registrationAction';
import {LargeLogo} from '../common/Logos';
import { bindActionCreators } from 'redux';
import {addToast, deleteToast} from '../../actions/Toasts';

class Registration extends Component {
    render() {
      const {userRegistrationRequest,addToast} = this.props;
        return (
            <div className="row full-height">
              <div className="col-md-4 col-md-offset-4 full-height">
                <LargeLogo id="large_logo" className="large-logo"/>
                <RegistrationForm userRegistrationRequest={userRegistrationRequest}  addToast={addToast} deleteToast = {deleteToast}/>
              </div>
            </div>
        );
    }
}

Registration.propTypes = {
  userRegistrationRequest:React.PropTypes.func.isRequired,
}

function mapStateToProps(state) {
	  return {userRegistrationRequest};
	}
function mapDispatchToProps(dispatch) {
	  return bindActionCreators({ userRegistrationRequest } , dispatch);
	}

export default connect(mapStateToProps, { userRegistrationRequest,addToast })(Registration)
