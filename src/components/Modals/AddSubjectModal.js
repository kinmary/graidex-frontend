import React, { Component } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { connect } from "react-redux";
import { SetOpen } from "../MainAction";
class AddSubjectModal extends Component {
  closeModal() {
    this.props.SetOpen("openSubjectModal", false);
  }
  createSubject(){
    this.props.SetOpen("openSubjectModal", false);
    //TODO: add subject redirect to new subject
    this.props.navigate("/");
  }
  render() {

    const {openSubjectModal} = this.props.main;
    //! Add student to subject or to test, how to send the invitation to student or add him???
    return (
      <>
      <Modal show={openSubjectModal} onHide={this.closeModal.bind(this)}
      centered>
        <Modal.Header closeButton>
        <Modal.Title>
          Add new subject
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
            <Form.Group className="mb-3">
              <Form.Label>Subject Title</Form.Label>
              <Form.Control
                placeholder="Enter subject title"
                required
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
            >
              <Form.Label>Subject Id</Form.Label>
              <Form.Control placeholder="Enter subject Id" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.closeModal.bind(this)}>
            Close
          </Button>
          <Button variant="primary" onClick={this.closeModal.bind(this)}>
            Create
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

export default connect(mapStateToProps, {SetOpen})(AddSubjectModal);
