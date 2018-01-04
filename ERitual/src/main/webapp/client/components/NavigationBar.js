import React,{Component} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import { logout } from '../actions/authActions';
import { login } from '../actions/authActions';

class NavigationBar extends Component {
	constructor(props)
	{
		super(props);
		this.state = {
				renderFirstTime:true
		}
		this.logout = this.logout.bind(this);
		this.onClick = this.onClick.bind(this);
	}
	logout(event) {
		event.preventDefault();
		this.props.logout().then(
				(res) => {
					let authData= res.payload.data;
					if(authData.message!= null) {
						this.setState({ errors : { "form" : authData.message }, isLoading : false })
					}
					else {
						this.context.router.push('/ERitual/');
					}
				}
		)
	}

	onClick(event){
		this.state.renderFirstTime = false;
		if(event.target.selected == 'Seva')
			this.context.router.push('/ERitual/seva');
		if(event.target.selected == 'Event')
			this.context.router.push('/ERitual/event');
		if(event.target.selected == 'Donation')
			this.context.router.push('/ERitual/donation');
		if(event.target.selected == 'Orders')
			this.context.router.push('/ERitual/orders');
		if(event.target.selected == 'Dashboard')
			this.context.router.push( '/ERitual/home');
		if(event.target.selected == 'Message')
			this.context.router.push('/ERitual/message');
		if(event.target.selected == 'TagConfig')
			this.context.router.push('/ERitual/tagConfig');
		if(event.target.selected == 'aboutUs')
			this.context.router.push('/ERitual/aboutUs');
	}

	render() {
		const {isAuthenticated} = this.props.auth;
		const user = this.props.auth.user;
		const userLinks = (
				<nav className="navbar navbar-default">
				<div className="container-fluid">
				<div className="navbar-header">
				<Link to="/ERitual/home" className="navbar-brand">ERitual</Link>
				</div>
				<div className="collapse navbar-collapse heading-color">
				<ul className="nav navbar-nav navbar-right "> 
				{this.state.renderFirstTime}
				{ !this.state.renderFirstTime &&<li>  <a   className=" link-secondary mr15 active coursor-pointer " selected = "Dashboard" data-toggle = "tab" onClick = {this.onClick}>Dashboard</a> </li>}
				{this.state.renderFirstTime && <li>  <a   className=" link-secondary mr15 active coursor-pointer dashboard-tab " selected = "Dashboard" data-toggle = "tab" onClick = {this.onClick}>Dashboard</a> </li>}

				<li><a  className=" link-secondary mr15 active coursor-pointer"  selected = "Seva" data-toggle = "tab" onClick = {this.onClick}>Seva</a> </li>
				<li><a   selected = "Event" className=" link-secondary mr15 coursor-pointer" data-toggle = "tab" onClick = {this.onClick}>Event</a> </li>
				<li><a    selected = "Donation" className=" link-secondary mr15 coursor-pointer" data-toggle = "tab" onClick = {this.onClick}>Donation</a></li>
				<li><a    selected = "Orders" className=" link-secondary mr15 coursor-pointer" data-toggle = "tab" onClick = {this.onClick}>Orders</a></li>
				<li><a    selected = "Message" className=" link-secondary mr15 coursor-pointer" data-toggle = "tab" onClick = {this.onClick}>Sri Samasthanam</a></li>
				<li><a    selected = "TagConfig" className=" link-secondary mr15 coursor-pointer" data-toggle = "tab" onClick = {this.onClick}>Tag</a></li>
				<li><a    selected = "aboutUs" className=" link-secondary mr15 coursor-pointer" data-toggle = "tab" onClick = {this.onClick}>About Us</a></li>
				<li className="pull-right dropdown">
				<a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><span className="caret"></span></a>
				<ul className="dropdown-menu">
				<li><a href="#" className=" link-secondary mr15" onClick = {this.logout}>Logout</a></li>
				<li><Link to="/ERitual/changePassword" className=" link-secondary mr15">Change Passwword</Link></li>
				</ul>
				</li>
				</ul>
				</div>
				</div>
				</nav>
		);

		const guestLinks = (
				<nav className="navbar navbar-default">
				<div className="container-fluid">
				<div className="navbar-header">
				<label className="navbar-brand">ERitual</label>
				</div>
				</div>
				</nav>
		);

		return (
				<div>
				{ ((this.props.pathname != '/ERitual/') && (this.props.pathname != '/ERitual/registration')&& (this.props.pathname != '/ERitual/resetPassword')&& (this.props.pathname != '/ERitual/otpVerification')) ? userLinks : guestLinks }
				</div>
		);
	}
}

NavigationBar.propTypes = {
		auth:React.PropTypes.object.isRequired,
		logout:React.PropTypes.func.isRequired
}

NavigationBar.contextTypes = {
		router:React.PropTypes.object.isRequired
}

function mapStateToProps(state) {
	return {
		auth:state.auth,
	}
}
export default connect(mapStateToProps, {logout })(NavigationBar);