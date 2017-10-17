import React,{Component} from 'react';
import SevaFormContainer from '../../containers/SevaFormContainer';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import {userSevaFormsRequest} from '../../actions/sevaFormAction';
import {imageUploadRequest} from '../../actions/sevaFormAction';
import {rashiRequest} from '../../actions/sevaFormAction';
import {nakshatraRequest} from '../../actions/sevaFormAction';
import {LargeLogo} from '../common/Logos';
import { bindActionCreators } from 'redux';
import {addToast, deleteToast} from '../../actions/Toasts';

class SevaForm extends Component {
	componentDidMount(){
		this.props.seva;
	}
    render() {
      const {userSevaFormsRequest,imageUploadRequest, seva,addToast} = this.props;
        return (
            <div className="row full-height">
              <div className="col-md-8 col-md-offset-2 full-height">
                <LargeLogo id="large_logo" className="large-logo"/>
                <SevaFormContainer userSevaFormsRequest={userSevaFormsRequest}  imageUploadRequest={imageUploadRequest}  addToast={addToast} deleteToast = {deleteToast} /> 
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
		  nakshatra:state.nakshtraList
	  };
	}
function mapDispatchToProps(dispatch) {
	return {
		userSevaFormsRequest: bindActionCreators({userSevaFormsRequest }, dispatch),
		imageUploadRequest: bindActionCreators({ imageUploadRequest }, dispatch),
		rashiRequest: bindActionCreators({ rashiRequest }, dispatch),
		nakshatraRequest: bindActionCreators({ nakshatraRequest }, dispatch),
		addToast:bindActionCreators({ addToast }, dispatch),
	  };
	}

export default connect(mapStateToProps, {userSevaFormsRequest,imageUploadRequest,addToast} )(SevaForm)
