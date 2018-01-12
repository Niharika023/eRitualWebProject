import React,{Component} from 'react';
import DonationDetailsContainer from '../../containers/DonationContainer/DonationDetailsContainer';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import {userEditDonationsRequest,clearDonationData} from '../../actions/donationFormAction';
import {LargeLogo} from '../common/Logos';
import { bindActionCreators } from 'redux';
import {addToast, deleteToast} from '../../actions/Toasts';

class DonationDetails extends Component {
	componentDidMount(){
		this.props.donationIdForEdit;
		this.props.userEditDonationsRequest(this.props.params.id);
	}
    render() {
    	const {userEditDonationsRequest, donationIdForEdit,editDonation,addToast,clearDonationData} = this.props;
        return (
            <div className="row full-height">
              <div className="col-md-12  full-height">
                <LargeLogo id="large_logo" className="large-logo"/>
                {this.props.editDonation &&  this.props.editDonation.length != 0 && < DonationDetailsContainer  userEditDonationsRequest={userEditDonationsRequest} clearDonationData= {clearDonationData}  donationIdForEdit = {donationIdForEdit} editDonation = {editDonation} id = {this.props.params.id}  addToast={addToast} deleteToast = {deleteToast}  />} 
              </div>
            </div>
        );
    }
}

 DonationDetails.propTypes = {
		userEditDonationsRequest:React.PropTypes.func.isRequired,
		addToast:React.PropTypes.func.isRequired
}

function mapStateToProps(state) {
	
	  return {
		  donationIdForEdit:state.messageFormReducer,
		  editDonation:state.donationFormReducer.editDonation,
	  };
	}
function mapDispatchToProps(dispatch) {
	return {
		
		userEditDonationsRequest: bindActionCreators({userEditDonationsRequest }, dispatch),
		clearDonationData: bindActionCreators({clearDonationData }, dispatch),
		
	
	  };
	}

export default connect(mapStateToProps, {userEditDonationsRequest,addToast,clearDonationData} )(DonationDetails)
