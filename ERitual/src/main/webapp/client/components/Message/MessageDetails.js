import React,{Component} from 'react';
import MessageDetailsContainer from '../../containers/MessageContainer/MessageDetailsContainer';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import {userEditMessagesRequest, userMessageFormsRequest, clearMessageData,getHostedContentDataById} from '../../actions/messageFormAction';
import {LargeLogo} from '../common/Logos';
import { bindActionCreators } from 'redux';
import {addToast, deleteToast} from '../../actions/Toasts';
import {tagByKeyRequest} from '../../actions/sevaFormAction';

class MessageDetails extends Component {
	componentDidMount(){
		this.props.message;
		this.props.userEditMessagesRequest(this.props.params.id);
		let key='ui.tab.sri_samsthanam';
		this.props.tagByKeyRequest(key);
	}
    render() {
    	const {userMessageFormsRequest,userEditMessagesRequest,getHostedContentDataById,hostedContentList, message,editMessage,addToast,clearMessageData} = this.props;
        return (
            <div className="row full-height">
              <div className="col-md-12  full-height">
                <LargeLogo id="large_logo" className="large-logo"/>
                {this.props.editMessage &&  this.props.editMessage.length != 0 && <MessageDetailsContainer hostedContentList={hostedContentList} getHostedContentDataById={getHostedContentDataById} clearMessageData = {clearMessageData} userMessageFormsRequest={userMessageFormsRequest} userEditMessagesRequest={userEditMessagesRequest}  message = {message} editMessage = {editMessage} id = {this.props.params.id}  addToast={addToast} deleteToast = {deleteToast}  />} 
              </div>
            </div>
        );
    }
}

MessageDetails.propTypes = {
		userEditMessagesRequest:React.PropTypes.func.isRequired,
		userMessageFormsRequest:React.PropTypes.func.isRequired,
		addToast:React.PropTypes.func.isRequired
}

function mapStateToProps(state) {
	  return {
		  message:state.messageFormReducer,
		  editMessage:state.messageFormReducer.editMessage,
		  hostedContentList:state.messageFormReducer.hostedContentList,
	  };
	}
function mapDispatchToProps(dispatch) {
	return {
		userMessageFormsRequest: bindActionCreators({userMessageFormsRequest }, dispatch),
		userEditMessagesRequest: bindActionCreators({userEditMessagesRequest }, dispatch),
		clearMessageData: bindActionCreators({ clearMessageData }, dispatch),
		getHostedContentDataById:bindActionCreators({ getHostedContentDataById }, dispatch),
		tagByKeyRequest: bindActionCreators({ tagByKeyRequest }, dispatch),
	  };
	}

export default connect(mapStateToProps, {userEditMessagesRequest,userMessageFormsRequest,tagByKeyRequest,getHostedContentDataById,addToast,clearMessageData} )(MessageDetails)
