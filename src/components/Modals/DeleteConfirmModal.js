import React, { Component } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { connect } from "react-redux";
import { withRouter } from "../../utils/withRouter";
import { SetOpen } from "../MainAction";
import { deleteStudentProfile } from "../EditProfile/StudentProfileAction";
import { deleteTeacherProfile } from "../EditProfile/TeacherProfileAction";
import { Logout } from "../Login/AuthAction";

class DeleteConfirmModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
    };
  }
  closeModal() {
    this.props.SetOpen("deleteConfirmModal", false);
  }
  async onConfirm(event) {
    event.preventDefault();
    let result =
      this.props.main.userRole === 0
        ? await this.props.deleteTeacherProfile(this.state.password)
        : await this.props.deleteStudentProfile(this.state.password);
    if (result) {
      this.props.SetOpen("editPage", false);
      this.props.SetOpen("deleteConfirmModal", false);
      this.props.navigate("/");
      this.props.Logout();
    }
  }

  handleInputChange(event, data) {
    this.setState({ password: event.target.value });
  }
  render() {
    const { deleteConfirmModal } = this.props.main;
    return (
      <>
        <Modal
          show={deleteConfirmModal}
          onHide={this.closeModal.bind(this)}
          centered
          size="small"
        >
          <Modal.Header closeButton>Delete Account</Modal.Header>
          <Modal.Body>
            Deleting your account will permanently remove all of your
            information. This can not be undone.
            <Form.Group>
              <Form.Label>Enter your password to delete account</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Enter your password"
                value={
                  this.state.password.length > 0 ? this.state.password : ""
                }
                onChange={this.handleInputChange.bind(this)}
                required
                autoComplete="off"
              />
            </Form.Group>
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
    main: state.main,
    auth: state.auth,
  };
}

export default withRouter(
  connect(mapStateToProps, {
    SetOpen,
    deleteStudentProfile,
    deleteTeacherProfile,
    Logout,
  })(DeleteConfirmModal)
);
