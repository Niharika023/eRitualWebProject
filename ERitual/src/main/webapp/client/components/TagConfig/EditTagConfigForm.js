import React,{Component} from 'react';
import EditTagConfigContainer from '../../containers/TagConfigContainer/EditTagConfigContainer';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import {userEditTagConfigsRequest, userTagConfigUpdateFormsRequest, clearTagConfigData} from '../../actions/tagConfigFormAction';
import {LargeLogo} from '../common/Logos';
import { bindActionCreators } from 'redux';
import {addToast, deleteToast} from '../../actions/Toasts';

class EditTagConfigForm extends Component {
	componentDidMount(){
		let key='ui.tab.tagConfig';
		this.props.tagConfig;
		this.props.userEditTagConfigsRequest(this.props.params.id);
		this.props.tagByKey;
		this.props.tagConfigData;
	}
    render() {
    	const {userTagConfigUpdateFormsRequest,userEditTagConfigsRequest, tagConfig,tagConfigData,editTagConfig,addToast,clearTagConfigData} = this.props;
        return (
            <div className="row full-height">
              <div className="col-md-8 col-md-offset-2 full-height">
                <LargeLogo id="large_logo" className="large-logo"/>
                {this.props.editTagConfig &&  this.props.editTagConfig.length != 0 && <EditTagConfigContainer  tagConfigData={tagConfigData}  clearTagConfigData = {clearTagConfigData} userTagConfigUpdateFormsRequest={userTagConfigUpdateFormsRequest} userEditTagConfigsRequest={userEditTagConfigsRequest}  tagConfig = {tagConfig} editTagConfig = {editTagConfig} id = {this.props.params.id}  addToast={addToast} deleteToast = {deleteToast}  />} 
              </div>
            </div>
        );
    }
}

EditTagConfigForm.propTypes = {
		userEditTagConfigsRequest:React.PropTypes.func.isRequired,
		userTagConfigUpdateFormsRequest:React.PropTypes.func.isRequired,
		addToast:React.PropTypes.func.isRequired
}

function mapStateToProps(state) {
	  return {
		  tagConfig:state.tagConfigFormReducer,
		  editTagConfig:state.tagConfigFormReducer.editTagConfig,
		  tagConfig:state.tagConfigReducer,
		  tagConfigData:state.tagConfigFormReducer
	  };
	}
function mapDispatchToProps(dispatch) {
	return {
		userTagConfigUpdateFormsRequest: bindActionCreators({userTagConfigUpdateFormsRequest }, dispatch),
		userEditTagConfigsRequest: bindActionCreators({userEditTagConfigsRequest }, dispatch),
		clearTagConfigData: bindActionCreators({ clearTagConfigData }, dispatch),
	  };
	}

export default connect(mapStateToProps, {userEditTagConfigsRequest,userTagConfigUpdateFormsRequest,addToast,clearTagConfigData} )(EditTagConfigForm)