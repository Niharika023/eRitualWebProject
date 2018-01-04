import React,{Component} from 'react';
import MessageFormContainer from '../../containers/MessageContainer/MessageFormContainer';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import {userMessageFormsRequest} from '../../actions/messageFormAction';
import {LargeLogo} from '../common/Logos';
import { bindActionCreators } from 'redux';
import {addToast, deleteToast} from '../../actions/Toasts';
import {tagByKeyRequest} from '../../actions/sevaFormAction';
import {audVidDetailsFormrequest} from '../../actions/sevaFormAction';

class MessageForm extends Component {
	componentDidMount(){
		let key='ui.tab.sri-samsthanam';
		this.props.message;
		this.props.tagByKeyRequest(key);
		this.props.tagByKey;
		this.props.tagConfigData;
	}
    render() {
      const {userMessageFormsRequest, message,tagByKey,tagByKeyRequest,value,tagConfigData,addToast,audVidDetailsFormrequest} = this.props;
        return (
            <div className="row full-height">
              <div className="col-md-8 col-md-offset-2 full-height">
                <LargeLogo id="large_logo" className="large-logo"/>
                <MessageFormContainer userMessageFormsRequest={userMessageFormsRequest} tagConfigData={tagConfigData} tagByKeyRequest={tagByKeyRequest} tagByKey={tagByKey} audVidDetailsFormrequest = {audVidDetailsFormrequest} addToast={addToast} deleteToast = {deleteToast}/> 
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
		  tagValue:state.valueList,
		  tagConfig:state.tagConfigReducer,
		  tagConfigData:state.tagConfigFormReducer
	  };
	}
function mapDispatchToProps(dispatch) {
	return {
		userMessageFormsRequest: bindActionCreators({userMessageFormsRequest }, dispatch),
		addToast:bindActionCreators({ addToast }, dispatch),
		tagByKeyRequest: bindActionCreators({ tagByKeyRequest }, dispatch),
		audVidDetailsFormrequest : bindActionCreators({ audVidDetailsFormrequest }, dispatch),
	  };
	}

export default connect(mapStateToProps, {userMessageFormsRequest,addToast,tagByKeyRequest,audVidDetailsFormrequest} )(MessageForm)
