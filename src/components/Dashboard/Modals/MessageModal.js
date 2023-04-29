import React, { Component } from "react";
import { Button,  Modal } from "react-bootstrap";
import { connect } from "react-redux";
import { SetMessageOpen } from "../../MainAction";

class MessageModal extends Component {
  closeModal() {
    this.props.SetMessageOpen(false, "");
  }
  render() {
    const {messageModal, message} = this.props.main;
    return (
      <>
      <Modal show={messageModal} onHide={this.closeModal.bind(this)}
      centered size="small">
        <Modal.Header closeButton>
            Message
      </Modal.Header>
      <Modal.Body>
      {message}
      </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={this.closeModal.bind(this)}>
            Got it
          </Button>
        </Modal.Footer>
      </Modal>
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
  main: state.main    
  };
}

export default connect(mapStateToProps, {SetMessageOpen})(MessageModal);
