import React,{Component} from 'react';
import DonationFormContainer from '../../containers/DonationContainer/DonationFormContainer';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import {userDonationFormsRequest} from '../../actions/donationFormAction';
import {LargeLogo} from '../common/Logos';
import { bindActionCreators } from 'redux';
import {addToast, deleteToast} from '../../actions/Toasts';
import {tagByKeyRequest} from '../../actions/sevaFormAction';
import {audVidDetailsFormrequest} from '../../actions/sevaFormAction';

class DonationForm extends Component {
	componentDidMount(){
		let key='ui.tab.donation';
		this.props.donation;
		this.props.tagByKeyRequest(key);
		this.props.tagByKey;
		this.props.tagConfigData;
	}
    render() {
      const {userDonationFormsRequest, donation,tagByKey,tagByKeyRequest,value,tagConfigData,addToast,audVidDetailsFormrequest} = this.props;
        return (
            <div className="row full-height">
              <div className="col-md-8 col-md-offset-2 full-height">
                <LargeLogo id="large_logo" className="large-logo"/>
                <DonationFormContainer userDonationFormsRequest={userDonationFormsRequest} tagConfigData={tagConfigData} tagByKeyRequest={tagByKeyRequest} tagByKey={tagByKey} audVidDetailsFormrequest = {audVidDetailsFormrequest} addToast={addToast} deleteToast = {deleteToast}/> 
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
		  tagValue:state.valueList,
		  tagConfig:state.tagConfigReducer,
		  tagConfigData:state.tagConfigFormReducer
	  };
	}
function mapDispatchToProps(dispatch) {
	return {
		userDonationFormsRequest: bindActionCreators({userDonationFormsRequest }, dispatch),
		tagByKeyRequest: bindActionCreators({ tagByKeyRequest }, dispatch),
		audVidDetailsFormrequest : bindActionCreators({ audVidDetailsFormrequest }, dispatch),
	  };
	}

export default connect(mapStateToProps, {userDonationFormsRequest,addToast,tagByKeyRequest,audVidDetailsFormrequest} )(DonationForm)
