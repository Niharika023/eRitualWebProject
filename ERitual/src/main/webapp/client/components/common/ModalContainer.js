import React,{Component} from 'react';
import Modal from 'react-modal';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const customStyles = {
  content : {
    top                   : '0',
    left                  : '0',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '0',
    transform             : 'translate(0%,0%)',
    padding               : '0',
    border                : 'none',
    position              : 'relative',
    height                : '100%',
    width                 : '100%',
    backgroundColor       : 'transparent',
    zIndex                : '30',
    outline               : 'none'
  }
};

class ModalContainer extends Component {
  constructor(props) {
    super(props);
    const {navigationModal , backToLink, modalTitle, onClose , miniModal, width, height } = this.props;
    if(miniModal) {
      customStyles.content.width = width;
      customStyles.content.height = height;
      customStyles.content.margin = 'auto';
      customStyles.content.border = '1px solid #EEE';
      customStyles.content.backgroundColor = '#FFF';

    }

    if(navigationModal) {
      //this.setState({modalIsOpen: true});
      this.state = {
        modalIsOpen:navigationModal,
        navigationModal:navigationModal,
        backToLink:backToLink,
        modalTitle
      }
    }

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);

  }
  componentWillMount() {
    this.openModal();
  }
  openModal() {
    this.setState({modalIsOpen: true});
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    //this.refs.subtitle.style.color = '#f00';
}

  closeModal() {
    console.log("modal props are " , this.state.backToLink);
    if(this.state.backToLink) {
      this.context.router.push(this.state.backToLink);
    }
    else {
      this.setState({modalIsOpen: false});
      this.props.onClose();
    }
  }

  render() {
    return (
      <ReactCSSTransitionGroup
        transitionName={this.props.transitionName}
        transitionAppear={true}
        transitionAppearTimeout={100}
        transitionEnterTimeout={100}
        transitionLeaveTimeout={100}
      >
        <div>
          <Modal
            isOpen={this.state.modalIsOpen}
            onAfterOpen={this.afterOpenModal}
            onRequestClose={this.closeModal}
            style={customStyles}
            contentLabel="Example Modal"
            className="mini-modal"
          >
            <div className="pull-left full-width modal-header">
              <h3 className = "no-margin mt10" ref="subtitle">{this.state.modalTitle}</h3>
              <button className="pull-right close" onClick={this.closeModal}></button>
            </div>
            <div className="pull-left full-width modal-body">
              {this.props.children}
            </div>
            <div className="modal-footer">
            <h3 className = "no-margin mt10" ref="subtitle">{this.state.modalTitle}</h3>
            <button className="pull-right close" onClick={this.closeModal}></button>
            </div>

          </Modal>
        </div>
      </ReactCSSTransitionGroup>
    );
  }
}

ModalContainer.propTypes = {
  modalTitle:React.PropTypes.string.isRequired,
  backToLink:React.PropTypes.string.isRequired,
  onClose:React.PropTypes.func.isRequired
}

ModalContainer.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default ModalContainer;
