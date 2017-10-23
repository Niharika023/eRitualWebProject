import React,{Component} from 'react';
import EditMessageContainer from '../../containers/MessageContainer/EditMessageContainer';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import {userEditMessagesRequest, userMessageUpdateFormsRequest, clearMessageData} from '../../actions/messageFormAction';
import {LargeLogo} from '../common/Logos';
import { bindActionCreators } from 'redux';
import {addToast, deleteToast} from '../../actions/Toasts';

class EditMessageForm extends Component {
	componentDidMount(){
		this.props.message;
		this.props.userEditMessagesRequest(this.props.params.id);
	}
    render() {
    	const {userMessageUpdateFormsRequest,userEditMessagesRequest, message,editMessage,addToast,clearMessageData} = this.props;
        return (
            <div className="row full-height">
              <div className="col-md-8 col-md-offset-2 full-height">
                <LargeLogo id="large_logo" className="large-logo"/>
                {this.props.editMessage &&  this.props.editMessage.length != 0 && <EditMessageContainer clearMessageData = {clearMessageData} userMessageUpdateFormsRequest={userMessageUpdateFormsRequest} userEditMessagesRequest={userEditMessagesRequest}  message = {message} editMessage = {editMessage} id = {this.props.params.id}  addToast={addToast} deleteToast = {deleteToast}  />} 
              </div>
            </div>
        );
    }
}

EditMessageForm.propTypes = {
		userEditMessagesRequest:React.PropTypes.func.isRequired,
		userMessageUpdateFormsRequest:React.PropTypes.func.isRequired,
		addToast:React.PropTypes.func.isRequired
}

function mapStateToProps(state) {
	  return {
		  message:state.messageFormReducer,
		  editMessage:state.messageFormReducer.editMessage,
	  };
	}
function mapDispatchToProps(dispatch) {
	return {
		userMessageUpdateFormsRequest: bindActionCreators({userMessageUpdateFormsRequest }, dispatch),
		userEditMessagesRequest: bindActionCreators({userEditMessagesRequest }, dispatch),
		clearMessageData: bindActionCreators({ clearMessageData }, dispatch),
	  };
	}

export default connect(mapStateToProps, {userEditMessagesRequest,userMessageUpdateFormsRequest,addToast,clearMessageData} )(EditMessageForm)
