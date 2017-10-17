import React,{Component} from 'react';
import DonationFormContainer from '../../containers/DonationFormContainer';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import {userDonationFormsRequest} from '../../actions/donationFormAction';
import {LargeLogo} from '../common/Logos';
import { bindActionCreators } from 'redux';
import {addToast, deleteToast} from '../../actions/Toasts';

class DonationForm extends Component {
	componentDidMount(){
		this.props.donation;
	}
    render() {
      const {userDonationFormsRequest, donation,addToast} = this.props;
        return (
            <div className="row full-height">
              <div className="col-md-8 col-md-offset-2 full-height">
                <LargeLogo id="large_logo" className="large-logo"/>
                <DonationFormContainer userDonationFormsRequest={userDonationFormsRequest}  addToast={addToast} deleteToast = {deleteToast}/> 
              </div>
            </div>
        );
    }
}

DonationForm.propTypes = {
		userDonationFormsRequest:React.PropTypes.func.isRequired,
		addToast:React.PropTypes.func.isRequired
}

function mapStateToProps(state) {
	  return {
		  donation:state.donationFormReducer,
	  };
	}
function mapDispatchToProps(dispatch) {
	return {
		userDonationFormsRequest: bindActionCreators({userDonationFormsRequest }, dispatch),
	  };
	}

export default connect(mapStateToProps, {userDonationFormsRequest,addToast} )(DonationForm)
