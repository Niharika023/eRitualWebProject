import React,{Component} from 'react';
import MessageFormContainer from '../../containers/MessageContainer/MessageFormContainer';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import {userMessageFormsRequest} from '../../actions/messageFormAction';
import {LargeLogo} from '../common/Logos';
import { bindActionCreators } from 'redux';
import {addToast, deleteToast} from '../../actions/Toasts';

class MessageForm extends Component {
	componentDidMount(){
		this.props.donation;
	}
    render() {
      const {userMessageFormsRequest, donation,addToast} = this.props;
        return (
            <div className="row full-height">
              <div className="col-md-8 col-md-offset-2 full-height">
                <LargeLogo id="large_logo" className="large-logo"/>
                <MessageFormContainer userMessageFormsRequest={userMessageFormsRequest}  addToast={addToast} deleteToast = {deleteToast}/> 
              </div>
            </div>
        );
    }
}

MessageForm.propTypes = {
		userMessageFormsRequest:React.PropTypes.func.isRequired,
		addToast:React.PropTypes.func.isRequired
}

function mapStateToProps(state) {
	  return {
		  message:state.messageFormReducer,
	  };
	}
function mapDispatchToProps(dispatch) {
	return {
		userMessageFormsRequest: bindActionCreators({userMessageFormsRequest }, dispatch),
	  };
	}

export default connect(mapStateToProps, {userMessageFormsRequest,addToast} )(MessageForm)
