import React, { Component } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { connect } from "react-redux";
import { SetOpen } from "../MainAction";
import { createNewSubject } from "../Dashboard/SubjectActions";
import logoDark from "../../images/GraidexLogoDarkJPG.jpg";

class AddSubjectModal extends Component {
  constructor(props){
    super(props);
    this.state = {
      title: "",
      subjectId: "",
      imageUrl: logoDark
    } 
  }
  closeModal() {
    this.setState({title: "", subjectId: "" });
    this.props.SetOpen("openSubjectModal", false);
  }
  createSubject(){
    this.props.createNewSubject( this.state.subjectId, this.state.title, this.state.imageUrl);
    this.setState({title: "", subjectId: "" });
    //this.props.SetOpen("openSubjectModal", false);
    //TODO: add subject redirect to new subject
    //this.props.navigate("/");
  }
  handleInputChange(event){
    this.setState({[event.target.name]: event.target.value })
  }
  render() {

    const {openSubjectModal} = this.props.main;
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
                value={this.state.title}
                name="title"
                onChange={this.handleInputChange.bind(this)}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
            >
              <Form.Label>Subject Id</Form.Label>
              <Form.Control placeholder="Enter subject Id"
              value={this.state.subjectId}
              name="subjectId"
              onChange={this.handleInputChange.bind(this)} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.closeModal.bind(this)}>
            Close
          </Button>
          <Button variant="primary" onClick={this.createSubject.bind(this)}>
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

export default connect(mapStateToProps, {SetOpen, createNewSubject})(AddSubjectModal);
