import React,{Component} from 'react';
import EditMessageContainer from '../../containers/MessageContainer/EditMessageContainer';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import {userEditMessagesRequest, userMessageUpdateFormsRequest, clearMessageData,getHostedContentDataById} from '../../actions/messageFormAction';
import {LargeLogo} from '../common/Logos';
import { bindActionCreators } from 'redux';
import {addToast, deleteToast} from '../../actions/Toasts';
import {editAudVidDetailsFormrequest} from '../../actions/sevaFormAction';
import {tagByKeyRequest} from '../../actions/sevaFormAction';

class EditMessageForm extends Component {
	componentDidMount(){
		let key='ui.tab.sri_samsthanam';
		this.props.tagByKeyRequest(key);
		this.props.message;
		this.props.userEditMessagesRequest(this.props.params.id);
		this.props.tagConfigData;
	}
    render() {
    	const {userMessageUpdateFormsRequest,getHostedContentDataById,tagConfigData, userEditMessagesRequest, editAudVidDetailsFormrequest,message,hostedContentList,editMessage,addToast,clearMessageData} = this.props;
        console.log("edit msg props ", this.props.editMessage);
    	return (
            <div className="row full-height">
              <div className="col-md-8 col-md-offset-2 full-height">
                <LargeLogo id="large_logo" className="large-logo"/>
                {this.props.editMessage &&  this.props.editMessage.length != 0 && <EditMessageContainer tagConfigData={tagConfigData} hostedContentList={hostedContentList} editAudVidDetailsFormrequest= {editAudVidDetailsFormrequest} getHostedContentDataById={getHostedContentDataById} clearMessageData = {clearMessageData} userMessageUpdateFormsRequest={userMessageUpdateFormsRequest} userEditMessagesRequest={userEditMessagesRequest}  message = {message} editMessage = {editMessage} id = {this.props.params.id}  addToast={addToast} deleteToast = {deleteToast}  />} 
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
		  editMessage:state.messageFormReducer.editMessage ? state.messageFormReducer.editMessage : [],
		  hostedContentList:state.messageFormReducer.hostedContentList,
		  tagConfigData:state.tagConfigFormReducer
	  };
	}
function mapDispatchToProps(dispatch) {
	return {
		userMessageUpdateFormsRequest: bindActionCreators({userMessageUpdateFormsRequest }, dispatch),
		userEditMessagesRequest: bindActionCreators({userEditMessagesRequest }, dispatch),
		clearMessageData: bindActionCreators({ clearMessageData }, dispatch),
		getHostedContentDataById:bindActionCreators({ getHostedContentDataById }, dispatch),
		editAudVidDetailsFormrequest : bindActionCreators({ editAudVidDetailsFormrequest }, dispatch),
		tagByKeyRequest: bindActionCreators({ tagByKeyRequest }, dispatch),
	  };
	}

export default connect(mapStateToProps, {userEditMessagesRequest,getHostedContentDataById,tagByKeyRequest,editAudVidDetailsFormrequest,userMessageUpdateFormsRequest,addToast,clearMessageData} )(EditMessageForm)
