import React,{Component} from 'react';
import AboutUsFormContainer from '../../containers/AboutUsContainer/AboutUsFormContainer';
import { Link } from 'react-router';
import { userTagConfigFormsRequest } from '../../actions/tagConfigFormAction'
import { getAboutUsByKeyRequest } from '../../actions/tagConfigFormAction'
import { clearAboutUsData } from '../../actions/tagConfigFormAction';
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
      const {userTagConfigFormsRequest,getAboutUsByKeyRequest,editAboutUs,clearAboutUsData,addToast} = this.props;
       
      return (
            <div className="row full-height">
              <div className="col-md-8 col-md-offset-2 full-height">
                <LargeLogo id="large_logo" className="large-logo"/>
                {this.props.editAboutUs &&  this.props.editAboutUs.length != 0 && <AboutUsFormContainer clearAboutUsData={clearAboutUsData} addToast={addToast} userTagConfigFormsRequest={userTagConfigFormsRequest} editAboutUs={editAboutUs} getAboutUsByKeyRequest={getAboutUsByKeyRequest}/>} 
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
	return {
		  tagConfig:state.tagConfigReducer,
		  tag:state.tagList,
		  value:state.valueList,
		  editAboutUs:state.aboutUsReducer.editAboutUs,
		  
	  };
	}

function mapDispatchToProps(dispatch) {
	return {
		userTagConfigFormsRequest: bindActionCreators({userTagConfigFormsRequest }, dispatch),
		getAboutUsByKeyRequest: bindActionCreators({getAboutUsByKeyRequest }, dispatch),
		clearAboutUsData: bindActionCreators({ clearAboutUsData }, dispatch),
		addToast:bindActionCreators({ addToast }, dispatch),
		/*tagRequest: bindActionCreators({ tagRequest }, dispatch),
		valueRequest: bindActionCreators({ valueRequest }, dispatch),
		tagConfigRenderList:bindActionCreators({ tagConfigRenderList }, dispatch),*/

	  };
	}

export default connect(mapStateToProps, {userTagConfigFormsRequest,addToast,getAboutUsByKeyRequest,clearAboutUsData} )(AboutUsForm)


