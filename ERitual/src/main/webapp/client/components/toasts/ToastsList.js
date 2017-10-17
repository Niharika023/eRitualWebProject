import React,{Component} from 'react';
import Toast from './Toast';
import { connect } from 'react-redux';
import { deleteToast } from '../../actions/Toasts';

class ToastsList extends Component {

    render() {
        const { deleteToast } = this.props;
        const toasts = this.props.messages.map(message =>
          <Toast key={message.id} message={message} deleteToast = {deleteToast}/>
        )
        return (
            <div className="toasts-container">{toasts}</div>
        );
    }
}

ToastsList.propTypes = {
  messages:React.PropTypes.array.isRequired,
  deleteToast:React.PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {
    messages:state.toasts
  }
}

export default connect(mapStateToProps, { deleteToast } )(ToastsList)