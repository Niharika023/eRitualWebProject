import React,{Component} from 'react';
import EventFormContainer from '../../containers/EventFormContainer';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import {userEventFormsRequest} from '../../actions/eventFormAction';
import {imageUploadRequest} from '../../actions/eventFormAction';
import {LargeLogo} from '../common/Logos';
import { bindActionCreators } from 'redux';
import {addToast, deleteToast} from '../../actions/Toasts';

class EventForm extends Component {
	componentDidMount(){
		this.props.event;
	}
    render() {
      const {userEventFormsRequest,imageUploadRequest, event,addToast} = this.props;
        return (
            <div className="row full-height">
              <div className="col-md-8 col-md-offset-2 full-height">
                <LargeLogo id="large_logo" className="large-logo"/>
                <EventFormContainer userEventFormsRequest={userEventFormsRequest}  imageUploadRequest={imageUploadRequest}  addToast={addToast} deleteToast = {deleteToast} /> 
              </div>
            </div>
        );
    }
}

EventForm.propTypes = {
		userEventFormsRequest:React.PropTypes.func.isRequired,
		imageUploadRequest:React.PropTypes.func.isRequired,
		addToast:React.PropTypes.func.isRequired,
}

function mapStateToProps(state) {
	  return {
		  event:state.eventFormReducer,
	  };
	}
function mapDispatchToProps(dispatch) {
	return {
		userEventFormsRequest: bindActionCreators({userEventFormsRequest }, dispatch),
		imageUploadRequest: bindActionCreators({ imageUploadRequest }, dispatch),
	  };
	}

export default connect(mapStateToProps, {userEventFormsRequest, imageUploadRequest,addToast})(EventForm)
