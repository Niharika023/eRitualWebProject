import React,{Component} from 'react';
import EditSevaContainer from '../../containers//SevaContainer/EditSevaContainer';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import {userEditSevasRequest, userSevaUpdateFormsRequest, imageUploadRequest, clearSevaData} from '../../actions/sevaFormAction';
import {imageStreamRequest} from '../../actions/sevaFormAction';
import {LargeLogo} from '../common/Logos';
import { bindActionCreators } from 'redux';
import {addToast, deleteToast} from '../../actions/Toasts';
import {tagByKeyRequest} from '../../actions/sevaFormAction';
import {audVidDetailsFormrequest} from '../../actions/sevaFormAction';

class EditSevaForm extends Component {
	componentDidMount(){
		let key='ui.tab.e-Seva';
		this.props.seva;
		this.props.userEditSevasRequest(this.props.params.id);
		this.props.tagByKeyRequest(key);
		this.props.tagByKey;
		this.props.tagConfigData;
	}
    render() {
    	const {userSevaUpdateFormsRequest,userEditSevasRequest,imageUploadRequest, tagByKey,tagByKeyRequest,value,tagConfigData,audVidDetailsFormrequest,seva,editSeva,addToast,imageUrl,clearSevaData} = this.props;
        return (
            <div className="row full-height">
              <div className="col-md-8 col-md-offset-2 full-height">
                <LargeLogo id="large_logo" className="large-logo"/>
                {this.props.editSeva && this.props.editSeva.length != 0 && <EditSevaContainer clearSevaData = {clearSevaData}tagConfigData={tagConfigData} tagByKeyRequest={tagByKeyRequest} tagByKey={tagByKey} userSevaUpdateFormsRequest={userSevaUpdateFormsRequest} userEditSevasRequest={userEditSevasRequest}  seva = {seva} editSeva = {editSeva} id = {this.props.params.id}  imageUploadRequest={imageUploadRequest} addToast={addToast} deleteToast = {deleteToast} imageUrl = {imageUrl}/>} 
              </div>
            </div>
        );
    }
}

EditSevaForm.propTypes = {
		userEditSevasRequest:React.PropTypes.func.isRequired,
		userSevaUpdateFormsRequest:React.PropTypes.func.isRequired,
		imageUploadRequest:React.PropTypes.func.isRequired,
		imageStreamRequest:React.PropTypes.func.isRequired,
		addToast:React.PropTypes.func.isRequired
}

function mapStateToProps(state) { 
	  return {
		  seva:state.sevaFormReducer,
		  editSeva:state.sevaFormReducer.editSeva,
		  tagValue:state.valueList,
		  tagConfig:state.tagConfigReducer,
		  tagConfigData:state.tagConfigFormReducer
		};
	}
function mapDispatchToProps(dispatch) {
	return {
		userSevaUpdateFormsRequest: bindActionCreators({userSevaUpdateFormsRequest }, dispatch),
		userEditSevasRequest: bindActionCreators({userEditSevasRequest }, dispatch),
		imageUploadRequest: bindActionCreators({ imageUploadRequest }, dispatch),
		clearSevaData: bindActionCreators({ clearSevaData }, dispatch),
		tagByKeyRequest: bindActionCreators({ tagByKeyRequest }, dispatch),
		audVidDetailsFormrequest : bindActionCreators({ audVidDetailsFormrequest }, dispatch),
	  };
	}

export default connect(mapStateToProps, {userEditSevasRequest, userSevaUpdateFormsRequest,tagByKeyRequest,audVidDetailsFormrequest,imageUploadRequest,addToast,clearSevaData})(EditSevaForm)
