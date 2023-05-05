import React, { Component } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { connect } from "react-redux";
import { withRouter } from "../../utils/withRouter";
import { SetOpen } from "../MainAction";
import { deleteStudentProfile } from "../EditProfile/StudentProfileAction";
import { deleteTeacherProfile } from "../EditProfile/TeacherProfileAction";
import { Logout, setError } from "../Login/AuthAction";

class ChangePasswordModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      oldPassword: "",
      newPassword: "",
    };
  }
  closeModal() {
    this.props.SetOpen("changePassModal", false);
  }
  async onConfirm(event) {
    event.preventDefault();
    let result =
      this.props.main.userRole === 0
        ? await this.props.deleteTeacherProfile(this.state.password)
        : await this.props.deleteStudentProfile(this.state.password);
    if (result) {
      this.props.SetOpen("editPage", false);
      this.props.SetOpen("changePassModal", false);
      this.props.navigate("/");
      this.props.Logout();
    }
  }

  handleInputChange(event, data) {
    this.setState({ password: event.target.value });
  }
  render() {
    const { changePassModal } = this.props.main;
    return (
      <>
        <Modal
          show={changePassModal}
          onHide={this.closeModal.bind(this)}
          centered
          size="small"
        >
          <Modal.Header closeButton>Delete Account</Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Enter your current password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Current password"
                name="password"
                autoComplete="off"
                value={
                    this.state.oldPassword.length > 0 ? this.state.oldPassword : ""
                }
                onChange={this.handleInputChange.bind(this)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Enter your new password</Form.Label>
              <Form.Control
                type="password"
                autoComplete="off"
                placeholder="New password"
                name="password"
                value={
                    this.state.newPassword.length > 0 ? this.state.newPassword : ""
                }
                onChange={this.handleInputChange.bind(this)}
                required
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.closeModal.bind(this)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={this.onConfirm.bind(this)}>
              Change
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
    setError
  })(ChangePasswordModal)
);

