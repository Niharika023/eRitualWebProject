import React,{Component} from 'react';
import SevaDetailsContainer from '../../containers/SevaContainer/sevaDetailsContainer';
import {clearSevaData} from '../../actions/sevaFormAction';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import {userEditSevasRequest} from '../../actions/sevaFormAction';
import {LargeLogo} from '../common/Logos';
import { bindActionCreators } from 'redux';
import {addToast, deleteToast} from '../../actions/Toasts';

class SevaDetails extends Component {
	componentDidMount(){
		this.props.sevaIdForEdit;
		this.props.userEditSevasRequest(this.props.params.id);
	}
    render() {
    	const {userEditSevasRequest, sevaIdForEdit,editSeva,addToast,clearSevaData} = this.props;
        return (
            <div className="row full-height">
              <div className="col-md-12  full-height">
                <LargeLogo id="large_logo" className="large-logo"/>
                {this.props.editSeva &&  this.props.editSeva.length != 0 && <SevaDetailsContainer  userEditSevasRequest={userEditSevasRequest}  sevaIdForEdit = {sevaIdForEdit} editSeva = {editSeva} id = {this.props.params.id}  addToast={addToast} deleteToast = {deleteToast} clearSevaData={clearSevaData} />} 
              </div>
            </div>
        );
    }
}

SevaDetails.propTypes = {
		userEditSevasRequest:React.PropTypes.func.isRequired,
		addToast:React.PropTypes.func.isRequired
}

function mapStateToProps(state) {
	
	  return {
		  sevaIdForEdit:state.messageFormReducer,
		  editSeva:state.sevaFormReducer.editSeva,
	  };
	}
function mapDispatchToProps(dispatch) {
	return {
		
		userEditSevasRequest: bindActionCreators({userEditSevasRequest }, dispatch),
		clearSevaData: bindActionCreators({ clearSevaData }, dispatch),
	
	  };
	}

export default connect(mapStateToProps, {userEditSevasRequest,addToast,clearSevaData} )(SevaDetails)
