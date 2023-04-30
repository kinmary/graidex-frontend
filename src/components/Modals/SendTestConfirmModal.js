import React, { Component } from "react";
import { Button,  Modal } from "react-bootstrap";
import { connect } from "react-redux";
import { withRouter } from "../../utils/withRouter";
import {  SetOpen, Logout } from "../MainAction";
import { ResetTakeTestState } from "../StudentSide/TakeTest/TakeTestActions";

class StartTestConfirmModal extends Component {
  closeModal() {
    this.props.SetOpen("sendTestModal", false);
  }
  onConfirm() {
    //TODO: send data to backend
    this.props.SetOpen("sendTestModal", false);
    this.props.navigate(-1);
    this.props.ResetTakeTestState();
  }
  render() {
    const {sendTestModal} = this.props.main;
    return (
      <>
      <Modal show={sendTestModal} onHide={this.closeModal.bind(this)}
      centered size="small">
        <Modal.Header closeButton>
            Submit exam
      </Modal.Header>
      <Modal.Body>
     Are you sure you want to submit the test?
      </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.closeModal.bind(this)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={this.onConfirm.bind(this)}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
  main: state.main,    
  takeTest: state.takeTest
  };
}

export default withRouter(connect(mapStateToProps, {SetOpen, Logout, ResetTakeTestState})(StartTestConfirmModal));

