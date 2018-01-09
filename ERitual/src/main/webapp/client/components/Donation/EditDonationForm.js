import React,{Component} from 'react';
import EditDonationContainer from '../../containers/DonationContainer/EditDonationContainer';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import {userEditDonationsRequest, userDonationUpdateFormsRequest, clearDonationData} from '../../actions/donationFormAction';
import {LargeLogo} from '../common/Logos';
import { bindActionCreators } from 'redux';
import {addToast, deleteToast} from '../../actions/Toasts';
import {tagByKeyRequest} from '../../actions/sevaFormAction';

class EditDonationForm extends Component {
	componentDidMount(){
		let key='ui.tab.donation';
		this.props.donation;
		this.props.userEditDonationsRequest(this.props.params.id);
		this.props.tagByKeyRequest(key);
		this.props.tagByKey;
		this.props.tagConfigData;
	}
    render() {
    	const {userDonationUpdateFormsRequest,userEditDonationsRequest,tagByKeyRequest, donation,tagConfigData,editDonation,addToast,clearDonationData} = this.props;
        return (
            <div className="row full-height">
              <div className="col-md-8 col-md-offset-2 full-height">
                <LargeLogo id="large_logo" className="large-logo"/>
                {this.props.editDonation &&  this.props.editDonation.length != 0 && <EditDonationContainer  tagConfigData={tagConfigData} tagByKeyRequest={tagByKeyRequest} clearDonationData = {clearDonationData} userDonationUpdateFormsRequest={userDonationUpdateFormsRequest} userEditDonationsRequest={userEditDonationsRequest}  donation = {donation} editDonation = {editDonation} id = {this.props.params.id}  addToast={addToast} deleteToast = {deleteToast}  />} 
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
		  tagConfig:state.tagConfigReducer,
		  tagConfigData:state.tagConfigFormReducer
	  };
	}
function mapDispatchToProps(dispatch) {
	return {
		userDonationUpdateFormsRequest: bindActionCreators({userDonationUpdateFormsRequest }, dispatch),
		userEditDonationsRequest: bindActionCreators({userEditDonationsRequest }, dispatch),
		clearDonationData: bindActionCreators({ clearDonationData }, dispatch),
		tagByKeyRequest: bindActionCreators({ tagByKeyRequest }, dispatch),
	  };
	}

export default connect(mapStateToProps, {userEditDonationsRequest,userDonationUpdateFormsRequest,tagByKeyRequest,addToast,clearDonationData} )(EditDonationForm)