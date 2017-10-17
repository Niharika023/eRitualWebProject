import React,{Component} from 'react';
import ToastsList from './components/toasts/ToastsList';
import NavigationBar from './components/NavigationBar';
import ModalContainer from './components/common/ModalContainer';
import FooterBar from './components/footer';
import axios from 'axios';
import {addToast,deleteToast} from './actions/Toasts';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
//import images from '../assets/images';

class App extends Component {
  // componentWillReceiveProps() {
  //   window.previousLocation = this.props.location;
  //   console.log("previous location is " + window.previousLocation.pathname);
  // }
  constructor() {
	  super();
	  this.state = {
		        errors:{},
		        isLoading:false,
		      }
	 axios.interceptors.response.use(undefined, err => {
		  let res = err.response;
		  if (res.status === 10006) {
			  this.props.addToast.addToast({  type:'error', 
					text:`Your session has timed out. Please login again.`, 
					toastType:'auto'  });
				this.context.router.push('/ERitual/');
		  }
      console.log(res);
		  return res;
		});
  }
  componentWillReceiveProps(nextProps) {
    // if we changed routes...
    if ((
      nextProps.location.key !== this.props.location.key &&
      nextProps.location.state &&
      nextProps.location.state.modal
    )) {
      // save the old children
      this.previousChildren = this.props.children
    }
  }
  

  render() {
	  const {errors ,isLoading} = this.state;
    let { location,addToast,deletToast } = this.props
    let isModal = (
      location.state &&
      location.state.modal &&
      this.previousChildren
    )

    return (
      <div className = "wrapper">
        <div className="container site-container full-height">
          <NavigationBar pathname={this.props.location.pathname} profileImg = "../assets/images"/>
         
          <div className = "bodyParam">
          <ToastsList/>
            {isModal ?
              this.previousChildren :
              this.props.children
            }
            {isModal && (
                <ModalContainer navigationModal={true} backToLink={this.previousChildren.props.location.pathname} modalTitle = {location.state.title} transitionName="modal-anim">
                  {this.props.children}
                </ModalContainer>
            )}
            </div>
          <FooterBar pathname={this.props.location.pathname}/>

        </div>
        </div>
    );
  }
}


function mapDispatchToProps(dispatch) {
	return {
		addToast:bindActionCreators({ addToast }, dispatch),
		deleteToast:bindActionCreators({ deleteToast }, dispatch)
	  };
	}

export default connect(null,mapDispatchToProps)(App)
App.contextTypes = {
  router:React.PropTypes.object.isRequired
}
/*
export default App;*/

