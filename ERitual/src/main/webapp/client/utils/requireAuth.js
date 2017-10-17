import React,{Component} from 'react';
import { connect } from 'react-redux';

import { addToast } from '../actions/Toasts';

export default (ComposedComponent) => {
  class Authenticate extends Component {
      componentWillMount() {
        if(!this.props.isAuthenticated && this.props.location.pathname != '/ERitual/') {
        		this.props.addToast({
        		type:'error',
        		text:'You need to log in to access this page'
        	});
          this.context.router.push('/ERitual/');
        }
        if(this.props.isAuthenticated) {
          if(this.props.location.pathname == '/ERitual/' || this.props.location.pathname == '/ERitual/') {
            this.context.router.push('/ERitual/home');
          }
        }
      }

      render() {
        // This will return the component inside a higher order function
        return (
          <ComposedComponent {...this.props} />
        );
      }
  }

  Authenticate.propTypes = {
      isAuthenticated : React.PropTypes.bool.isRequired,
      addToast : React.PropTypes.func.isRequired,
  }

  Authenticate.contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  function mapStateToProps(state) {
    return {
      isAuthenticated:state.auth.isAuthenticated,
      auth:state.auth
    };
  }
  return connect(mapStateToProps, { addToast })(Authenticate);
}
