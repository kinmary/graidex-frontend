import React, { Component } from "react";
import { Button,  Modal } from "react-bootstrap";
import { connect } from "react-redux";
import { withRouter } from "../../utils/withRouter";
import {  SetOpen, Logout } from "../MainAction";

class StartTestConfirmModal extends Component {
  closeModal() {
    this.props.SetOpen("startConfirmModal", false);
  }
  onConfirm() {
    this.props.SetOpen("startConfirmModal", false);
    this.props.navigate("/" + this.props.main.selectedSubjectId + "/test/take-test");
  }
  render() {
    const {startConfirmModal} = this.props.main;
    return (
      <>
      <Modal show={startConfirmModal} onHide={this.closeModal.bind(this)}
      centered size="small">
        <Modal.Header closeButton>
            Take exam
      </Modal.Header>
      <Modal.Body>
     Start this testing?
      </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.closeModal.bind(this)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={this.onConfirm.bind(this)}>
            Start
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

export default withRouter(connect(mapStateToProps, {SetOpen, Logout})(StartTestConfirmModal));
