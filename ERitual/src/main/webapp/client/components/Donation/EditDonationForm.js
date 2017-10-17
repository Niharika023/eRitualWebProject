import React,{Component} from 'react';
import EditDonationContainer from '../../containers/EditDonationContainer';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import {userEditDonationsRequest, userDonationFormsRequest, clearDonationData} from '../../actions/editDonationAction';
import {LargeLogo} from '../common/Logos';
import { bindActionCreators } from 'redux';
import {addToast, deleteToast} from '../../actions/Toasts';

class EditDonationForm extends Component {
	componentDidMount(){
		this.props.donation;
		this.props.userEditDonationsRequest(this.props.params.id);
	}
    render() {
    	const {userDonationFormsRequest,userEditDonationsRequest, donation,editDonation,addToast,clearDonationData} = this.props;
        return (
            <div className="row full-height">
              <div className="col-md-8 col-md-offset-2 full-height">
                <LargeLogo id="large_logo" className="large-logo"/>
                {this.props.editDonation &&  this.props.editDonation.length != 0 && <EditDonationContainer clearDonationData = {clearDonationData} userDonationFormsRequest={userDonationFormsRequest} userEditDonationsRequest={userEditDonationsRequest}  donation = {donation} editDonation = {editDonation} id = {this.props.params.id}  addToast={addToast} deleteToast = {deleteToast}  />} 
              </div>
            </div>
        );
    }
}

EditDonationForm.propTypes = {
		userEditDonationsRequest:React.PropTypes.func.isRequired,
		userDonationFormsRequest:React.PropTypes.func.isRequired,
		addToast:React.PropTypes.func.isRequired
}

function mapStateToProps(state) {
	  return {
		  donation:state.donationFormReducer,
		  editDonation:state.editDonationReducer.editDonation,
	  };
	}
function mapDispatchToProps(dispatch) {
	return {
		userDonationFormsRequest: bindActionCreators({userDonationFormsRequest }, dispatch),
		userEditDonationsRequest: bindActionCreators({userEditDonationsRequest }, dispatch),
		clearDonationData: bindActionCreators({ clearDonationData }, dispatch),
	  };
	}

export default connect(mapStateToProps, {userEditDonationsRequest,userDonationFormsRequest,addToast,clearDonationData} )(EditDonationForm)