import React,{Component} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import { logout } from '../actions/authActions';

class FooterBar extends Component {
  constructor(props)
  {
    super(props);
    this.logout = this.logout.bind(this);
  }
  logout(e) {
    e.preventDefault();
    let user_id = {
      id:this.props.auth.user.user_id
    }
    this.props.logout(user_id).then(
      () => {
        this.context.router.push('/');
      },
      ({ data }) => this.setState({ errors : data, isLoading : false })
    );
  }
  render() {
    const {isAuthenticated} = this.props.auth;
    const user = this.props.auth.user;
    const userLinks = ( 
     // <nav className="navbar navbar-default">
       
        /*
<div className = "footer-bar">
      <footer> Footer</footer>
      </div>*/

      <div className = "footer-bar ">
        <div className = "row-fluid">
          footer
        </div>
      </div>
    );
    
    return userLinks;
    
  }
}

FooterBar.propTypes = {
  auth:React.PropTypes.object.isRequired,
  logout:React.PropTypes.func.isRequired
}

FooterBar.contextTypes = {
  router:React.PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
    auth:state.auth,
  }
}
export default connect(mapStateToProps, { logout })(FooterBar);
