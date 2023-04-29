import React, { Component } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { connect } from "react-redux";
import { SetOpen } from "../../../MainAction";

class AddTestModal extends Component {
  closeModal() {
    this.props.SetOpen("openTestModal", false);
  }
  render() {
    const {openTestModal} = this.props.main;
    //! (This modal probably is not needed)
    //! Add student to subject or to test, how to send the invitation to student or add him???
    return (
      <>
      <Modal show={openTestModal} onHide={this.closeModal.bind(this)}
      centered>
        <Modal.Header closeButton>
        <Modal.Title>
          Create new test
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                placeholder="Enter test title"
                required
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
            >
                {/* //TODO: understand what time limits etc we need to add, delete etc when creating */}
              <Form.Label>Date</Form.Label>
              <Form.Control placeholder="Date" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.closeModal.bind(this)}>
            Close
          </Button>
          {/* //TODO: Add post request to backend  */}
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

export default connect(mapStateToProps, {SetOpen})(AddTestModal);
