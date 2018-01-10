import React,{Component} from 'react';
import AboutUsFormContainer from '../../containers/AboutUsContainer/AboutUsFormContainer';
import { Link } from 'react-router';
import { userTagConfigFormsRequest } from '../../actions/tagConfigFormAction'
import { getAboutUsByKeyRequest } from '../../actions/tagConfigFormAction'
import { clearDonationData } from '../../actions/donationFormAction';
import {LargeLogo} from '../common/Logos';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {addToast, deleteToast} from '../../actions/Toasts';
import TextFieldGroup from '../../components/common/TextFieldGroup';

class AboutUsForm extends Component {
	componentDidMount(){
		let key='ui.tab.about-us';
		this.props.tagConfig;
		this.props.editAboutUs;
		this.props.getAboutUsByKeyRequest(key);
	}
    render() {
      const {userTagConfigFormsRequest,getAboutUsByKeyRequest,editAboutUs,clearDonationData} = this.props;
        return (
            <div className="row full-height">
              <div className="col-md-8 col-md-offset-2 full-height">
                <LargeLogo id="large_logo" className="large-logo"/>
                {this.props.editAboutUs &&  this.props.editAboutUs.length != 0 && <AboutUsFormContainer clearDonationData={clearDonationData}  userTagConfigFormsRequest={userTagConfigFormsRequest} editAboutUs={editAboutUs} getAboutUsByKeyRequest={getAboutUsByKeyRequest}/>} 
              </div>
            </div>
        );
    }
}

AboutUsForm.propTypes = {
		userTagConfigFormsRequest:React.PropTypes.func.isRequired,
		addToast:React.PropTypes.func.isRequired
}

function mapStateToProps(state) {
	console.log("map",state.AboutUsReducer);
	  return {
		  tagConfig:state.tagConfigReducer,
		  tag:state.tagList,
		  value:state.valueList,
		  editAboutUs:state.aboutUsReducer,
		  
	  };
	}

function mapDispatchToProps(dispatch) {
	return {
		userTagConfigFormsRequest: bindActionCreators({userTagConfigFormsRequest }, dispatch),
		getAboutUsByKeyRequest: bindActionCreators({getAboutUsByKeyRequest }, dispatch),
		clearDonationData: bindActionCreators({ clearDonationData }, dispatch),
		/*tagRequest: bindActionCreators({ tagRequest }, dispatch),
		valueRequest: bindActionCreators({ valueRequest }, dispatch),
		tagConfigRenderList:bindActionCreators({ tagConfigRenderList }, dispatch),*/

	  };
	}

export default connect(mapStateToProps, {userTagConfigFormsRequest,addToast,getAboutUsByKeyRequest,clearDonationData} )(AboutUsForm)


