import React,{Component} from 'react';
import classnames from 'classnames';

export default class Toast extends Component {
    constructor(props) {
      super(props);
      this.onClick = this.onClick.bind(this);
    }
    onClick() {
      this.props.deleteToast(this.props.message.id);
    }
    render() {
        const {id, type, text, toastType} = this.props.message;
        if(toastType == "auto") {
          let toastTimeout = window.setTimeout( ()=> {
            clearTimeout(toastTimeout);
            this.props.deleteToast(this.props.message.id);
          },2000);
        }
        return (
        		<div className="row">
        		<div className="col-md-4 col-md-offset-4">
            <div className={classnames('alert', {
                'alert-success': type === 'success',
                'alert-danger':type === 'error'
            })}>
              <button onClick={this.onClick} className="close"><span>&times;</span></button>
              {text}
            </div>
            </div>
            </div>
        );
    }
}

Toast.propTypes = {
  deleteToast:React.PropTypes.func.isRequired,
  message:React.PropTypes.object.isRequired
}
