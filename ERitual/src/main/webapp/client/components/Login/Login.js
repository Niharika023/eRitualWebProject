import React,{Component} from 'react';
import LoginForm from './LoginForm';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import {userLoginRequest} from '../../actions/authActions';
import {LargeLogo} from '../common/Logos';

class Login extends Component {
    render() {
      const {userLoginRequest} = this.props;
        return (
            <div className="row full-height">
            
              <div className="col-md-8 col-md-offset-2 full-height">
                <LargeLogo id="large_logo" className="large-logo"/>
                <LoginForm userLoginRequest={userLoginRequest}/>
              </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
	  return {userLoginRequest};
	}
function mapDispatchToProps(dispatch) {
	  return bindActionCreators({ userLoginRequest } , dispatch);
	}

Login.propTypes = {
  userLoginRequest:React.PropTypes.func.isRequired,
}

export default connect(mapStateToProps, { userLoginRequest })(Login)
