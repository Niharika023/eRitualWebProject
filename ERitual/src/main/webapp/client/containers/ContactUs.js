import React, { Component } from 'react';
import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';
import ContactUs from '../components/ContactUs';
const AnyReactComponent = ({ text }) => <div>{text}</div>;
class ContactUs extends Component {
	constructor(){
		super();
		this.state = {
				center: {lat: 59.95, lng: 30.33},
			    zoom: 11
		}}
		  render() {
		    return (
		      <GoogleMapReact
		        defaultCenter={this.props.center}
		        defaultZoom={this.props.zoom}
		      >
		        <AnyReactComponent
		          lat={59.955413}
		          lng={30.337844}
		          text={'Kreyser Avrora'}
		        />
		      </GoogleMapReact>
		    );
		  }
		}


function mapStateToProps(state) {
console.log("inside map of temple",state);
  return {
    items:state.ContactDetails
  }
}

/*//It's a good practice to have propTypes for components. It becomes easy to track bugs where the developer
//doesn't pass all the required props.
//ContactUs.propTypes = {
 // userDonationRequest:React.PropTypes.func.isRequired,
//}

ContactUs.contextTypes = {
  router:React.PropTypes.object.isRequired
}*/



//export default ContactUs;
export default connect(mapStateToProps)(ContactUs);
