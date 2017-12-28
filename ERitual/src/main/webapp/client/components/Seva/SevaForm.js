import React,{Component} from 'react';
import SevaFormContainer from '../../containers/SevaContainer/SevaFormContainer';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import {userSevaFormsRequest} from '../../actions/sevaFormAction';
import {imageUploadRequest} from '../../actions/sevaFormAction';
import {rashiRequest} from '../../actions/sevaFormAction';
import {nakshatraRequest} from '../../actions/sevaFormAction';
import {valueRequest} from '../../actions/tagConfigFormAction';
import {LargeLogo} from '../common/Logos';
import { bindActionCreators } from 'redux';
import {addToast, deleteToast} from '../../actions/Toasts';

class SevaForm extends Component {
	componentDidMount(){
		this.props.seva;
		this.props.valueRequest();
	}
    render() {
      const {userSevaFormsRequest,imageUploadRequest,tagValue,valueRequest,value, seva,addToast} = this.props;
        return (
            <div className="row full-height">
              <div className="col-md-10 col-md-offset-1 full-height">
                <LargeLogo id="large_logo" className="large-logo"/>
                <SevaFormContainer userSevaFormsRequest={userSevaFormsRequest} valueRequest={valueRequest} tagValue={tagValue} imageUploadRequest={imageUploadRequest}  addToast={addToast} deleteToast = {deleteToast} /> 
              </div>
            </div>
        );
    }
}

SevaForm.propTypes = {
		userSevaFormsRequest:React.PropTypes.func.isRequired,
		imageUploadRequest:React.PropTypes.func.isRequired,
		addToast:React.PropTypes.func.isRequired
}

function mapStateToProps(state) {
	  return {
		  seva:state.sevaFormReducer,
		  rashi:state.rashiList,
		  nakshatra:state.nakshtraList,
		  tagValue:state.valueList,
		  tagConfig:state.tagConfigReducer,
	  };
	}
function mapDispatchToProps(dispatch) {
	return {
		userSevaFormsRequest: bindActionCreators({userSevaFormsRequest }, dispatch),
		imageUploadRequest: bindActionCreators({ imageUploadRequest }, dispatch),
		rashiRequest: bindActionCreators({ rashiRequest }, dispatch),
		nakshatraRequest: bindActionCreators({ nakshatraRequest }, dispatch),
		addToast:bindActionCreators({ addToast }, dispatch),
		valueRequest: bindActionCreators({ valueRequest }, dispatch),
	  };
	}

export default connect(mapStateToProps, {userSevaFormsRequest,imageUploadRequest,addToast,valueRequest} )(SevaForm)
