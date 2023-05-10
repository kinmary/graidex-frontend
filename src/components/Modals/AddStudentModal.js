import React, { Component } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { connect } from "react-redux";
import { SetOpen } from "../MainAction";
import { addStudent, createNewSubject } from "../Dashboard/SubjectActions";
import logoDark from "../../images/GraidexLogoDarkJPG.jpg";

class AddStudentModal extends Component {
  constructor(props){
    super(props);
    this.state = {
      email: "",
    } 
  }
  closeModal() {
    this.setState({email: "" });
    this.props.SetOpen("addStudentModal", false);
  }
  addStudent(){
    this.props.addStudent(this.props.main.selectedSubjectId, this.state.email);
    this.setState({email: "" });
    this.props.SetOpen("addStudentModal", false);
  }
  handleInputChange(event){
    this.setState({[event.target.name]: event.target.value })
  }
  render() {

    const {addStudentModal} = this.props.main;
    return (
      <>
      <Modal show={addStudentModal} onHide={this.closeModal.bind(this)}
      centered  >
        <Modal.Header closeButton>
        <Modal.Title>
          Add student
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
            <Form.Group className="mb-3">
              <Form.Label>Student Email</Form.Label>
              <Form.Control
                placeholder="Enter student email"
                required
                value={this.state.email}
                name="email"
                onChange={this.handleInputChange.bind(this)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.closeModal.bind(this)}>
            Close
          </Button>
          <Button variant="primary" onClick={this.addStudent.bind(this)}>
            Add student
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

export default connect(mapStateToProps, {SetOpen, addStudent})(AddStudentModal);
