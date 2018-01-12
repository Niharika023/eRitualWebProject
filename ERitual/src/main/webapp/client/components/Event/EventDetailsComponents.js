import React,{Component} from 'react';
import EventDetailsContainer from '../../containers/EventContainer/EventDetailsContainer';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import {userEditEventsRequest,clearEventData} from '../../actions/eventFormAction';
import {LargeLogo} from '../common/Logos';
import { bindActionCreators } from 'redux';
import {addToast, deleteToast} from '../../actions/Toasts';

class EventDetails extends Component {
	componentDidMount(){
		this.props.eventIdForEdit;
		this.props.userEditEventsRequest(this.props.params.id);
	}
    render() {
    	const {userEditEventsRequest, eventIdForEdit,editEvent,addToast} = this.props;
        return (
            <div className="row full-height">
              <div className="col-md-12  full-height">
                <LargeLogo id="large_logo" className="large-logo"/>
                {this.props.editEvent &&  this.props.editEvent.length != 0 && <EventDetailsContainer  userEditEventsRequest={userEditEventsRequest}  eventIdForEdit = {eventIdForEdit} clearEventData = {clearEventData} editEvent = {editEvent} id = {this.props.params.id}  addToast={addToast} deleteToast = {deleteToast}  />} 
              </div>
            </div>
        );
    }
}

EventDetails.propTypes = {
		userEditEventsRequest:React.PropTypes.func.isRequired,
		addToast:React.PropTypes.func.isRequired
}

function mapStateToProps(state) {
	
	  return {
		  eventIdForEdit:state.eventFormReducer,
		  editEvent:state.eventFormReducer.editEvent,
	  };
	}
function mapDispatchToProps(dispatch) {
	return {
	
		userEditEventsRequest: bindActionCreators({userEditEventsRequest }, dispatch),
		clearEventData: bindActionCreators({clearEventData }, dispatch),
	
	  };
	}

export default connect(mapStateToProps, {userEditEventsRequest,addToast,clearEventData} )(EventDetails)
