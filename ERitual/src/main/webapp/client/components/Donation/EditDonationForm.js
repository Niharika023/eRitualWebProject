import React,{Component} from 'react';
import EditDonationContainer from '../../containers/DonationContainer/EditDonationContainer';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import {userEditDonationsRequest, userDonationUpdateFormsRequest, clearDonationData} from '../../actions/donationFormAction';
import {LargeLogo} from '../common/Logos';
import { bindActionCreators } from 'redux';
import {addToast, deleteToast} from '../../actions/Toasts';

class EditDonationForm extends Component {
	componentDidMount(){
		this.props.donation;
		this.props.userEditDonationsRequest(this.props.params.id);
	}
    render() {
    	const {userDonationUpdateFormsRequest,userEditDonationsRequest, donation,editDonation,addToast,clearDonationData} = this.props;
        return (
            <div className="row full-height">
              <div className="col-md-8 col-md-offset-2 full-height">
                <LargeLogo id="large_logo" className="large-logo"/>
                {this.props.editDonation &&  this.props.editDonation.length != 0 && <EditDonationContainer clearDonationData = {clearDonationData} userDonationUpdateFormsRequest={userDonationUpdateFormsRequest} userEditDonationsRequest={userEditDonationsRequest}  donation = {donation} editDonation = {editDonation} id = {this.props.params.id}  addToast={addToast} deleteToast = {deleteToast}  />} 
              </div>
            </div>
        );
    }
}

EditDonationForm.propTypes = {
		userEditDonationsRequest:React.PropTypes.func.isRequired,
		userDonationUpdateFormsRequest:React.PropTypes.func.isRequired,
		addToast:React.PropTypes.func.isRequired
}

function mapStateToProps(state) {
	  return {
		  donation:state.donationFormReducer,
		  editDonation:state.donationFormReducer.editDonation,
	  };
	}
function mapDispatchToProps(dispatch) {
	return {
		userDonationUpdateFormsRequest: bindActionCreators({userDonationUpdateFormsRequest }, dispatch),
		userEditDonationsRequest: bindActionCreators({userEditDonationsRequest }, dispatch),
		clearDonationData: bindActionCreators({ clearDonationData }, dispatch),
	  };
	}

export default connect(mapStateToProps, {userEditDonationsRequest,userDonationUpdateFormsRequest,addToast,clearDonationData} )(EditDonationForm)