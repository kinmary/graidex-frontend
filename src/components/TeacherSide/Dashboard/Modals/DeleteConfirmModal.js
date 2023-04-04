import React, { Component } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { connect } from "react-redux";
import { withRouter } from "../../../../utils/withRouter";
import {  SetOpen, Logout } from "../../../MainAction";

class DeleteConfirmModal extends Component {
  closeModal() {
    this.props.SetOpen("deleteConfirmModal", false);
  }
  onConfirm() {
    this.props.SetOpen("deleteConfirmModal", false);
    this.props.navigate("/");
    this.props.Logout();

  }
  render() {
    const {deleteConfirmModal} = this.props.main;
    return (
      <>
      <Modal show={deleteConfirmModal} onHide={this.closeModal.bind(this)}
      centered size="small">
        <Modal.Header closeButton>
            Delete Account
      </Modal.Header>
      <Modal.Body>
      Deleting your account will permanently remove all of your information. This can not be undone.
      </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.closeModal.bind(this)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={this.onConfirm.bind(this)}>
            Delete
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

export default withRouter(connect(mapStateToProps, {SetOpen, Logout})(DeleteConfirmModal));
