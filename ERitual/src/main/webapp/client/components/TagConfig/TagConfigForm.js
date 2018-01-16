import React,{Component} from 'react';
import TagConfigFormContainer from '../../containers/TagConfigContainer/TagConfigFormContainer';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import {userTagConfigFormsRequest} from '../../actions/tagConfigFormAction';
import {tagRequest} from '../../actions/tagConfigFormAction';
import {valueRequest} from '../../actions/tagConfigFormAction';
import {tagConfigRenderList} from '../../actions/tagConfigAction';
import {LargeLogo} from '../common/Logos';
import { bindActionCreators } from 'redux';
import {addToast, deleteToast} from '../../actions/Toasts';
import {tagByKeyRequest} from '../../actions/sevaFormAction';

class TagConfigForm extends Component {
	componentDidMount(){
		this.props.tagConfig;
		this.props.valueRequest();
		this.props.tagConfigRenderList();
		this.props.tagConfigData;
	}
    render() {
      const {userTagConfigFormsRequest,valueRequest,tag,tagValue,tagConfig,tagByKeyRequest,addToast,tagConfigRenderList} = this.props;
        return (
            <div className="row full-height">
              <div className="col-md-8 col-md-offset-2 full-height">
                <LargeLogo id="large_logo" className="large-logo"/>
                <TagConfigFormContainer userTagConfigFormsRequest={userTagConfigFormsRequest} tagByKeyRequest={tagByKeyRequest} valueRequest={valueRequest} tagConfig={tagConfig} tagConfigRenderList = {tagConfigRenderList} addToast={addToast} tag = {tag} tagValue={tagValue} deleteToast = {deleteToast}/> 
              </div>
            </div>
        );
    }
}

TagConfigForm.propTypes = {
		userTagConfigFormsRequest:React.PropTypes.func.isRequired,
		addToast:React.PropTypes.func.isRequired
}

function mapStateToProps(state) {
	  return {
		  tagConfig:state.tagConfigReducer,
		  tag:state.tagList,
		  value:state.valueList,
		  tagConfigData:state.tagConfigFormReducer
	  };
	}

function mapDispatchToProps(dispatch) {
	return {
		userTagConfigFormsRequest: bindActionCreators({userTagConfigFormsRequest }, dispatch),
		tagRequest: bindActionCreators({ tagRequest }, dispatch),
		valueRequest: bindActionCreators({ valueRequest }, dispatch),
		tagConfigRenderList:bindActionCreators({ tagConfigRenderList }, dispatch),
		tagByKeyRequest: bindActionCreators({ tagByKeyRequest }, dispatch),

	  };
	}

export default connect(mapStateToProps, {userTagConfigFormsRequest,tagRequest,valueRequest,tagByKeyRequest,addToast,tagConfigRenderList} )(TagConfigForm)
