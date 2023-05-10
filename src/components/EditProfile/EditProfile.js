import React, { Component } from "react";
import { Button, Form, Image } from "react-bootstrap";
import { connect } from "react-redux";
import blankProf from "../../images/blank-profile-picture.jpg";
import { ChangeInputValues } from "../Login/AuthAction";
import { withRouter } from "../../utils/withRouter";
import DeleteConfirmModal from "../Modals/DeleteConfirmModal";
import { SetOpen } from "../MainAction";
import { updateStudentProfile } from "./StudentProfileAction";
import { updateTeacherProfile } from "./TeacherProfileAction";
import ChangePasswordModal from "../Modals/ChangePasswordModal";

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.auth.name,
      email: this.props.auth.email,
      surname: this.props.auth.surname,
      studentId: this.props.auth.studentId,
    };
  }
  HandleChange(event, data) {
    //TODO: make changes only onSave button (create axios request to database)
    this.setState({ [event.target.name]: event.target.value });
    //this.props.ChangeInputValues(event.target.name, event.target.value);
  }
  onCancelClick() {
    this.props.navigate(-1);
    this.props.SetOpen("editPage", false);
  }

  onSaveClick(event) {
    event.preventDefault();
    this.props.main.userRole === 0
      ? this.props.updateTeacherProfile(this.state.name, this.state.surname)
      : this.props.updateStudentProfile(
          this.state.name,
          this.state.surname,
          this.state.studentId
        );
  }
  render() {
    const { userRole } = this.props.main;
    return (
      <div style = {{ height: "100vh" }}>
        <ChangePasswordModal />
        <DeleteConfirmModal />
        <Form
          className="form"
          style={{ width: "35%", marginLeft: "100px", position: "relative" }}
        >
          <Image className="profile-image-edit mb-4" src={blankProf} />

          <h2 style={{ fontWeight: "bold" }}>
            {/* <Image src={blankProf} className="profile-image-edit" /> */}
            {this.props.auth.name} {this.props.auth.surname}
            <Button
              onClick={() => {
                this.props.SetOpen("deleteConfirmModal", true);
              }}
              variant="danger"
              size="sm"
              style={{ marginLeft: 10 }}
            >
              Delete profile
            </Button>
          </h2>
          <Form.Group className="mb-2" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              value={this.props.auth.email}
              required
              disabled
            />
          </Form.Group>
          <Form.Group className="mb-2" controlId="formBasicFullName">
            <Form.Label>
              {userRole === 0 ? "Teacher's Full Name" : "Student's Full name"}
            </Form.Label>
            <div
              className="d-inline-flex justify-content-between"
              style={{ width: "100%" }}
            >
              <Form.Control
                placeholder="Name"
                name="name"
                minLength="1"
                maxLength="50"
                value={this.state.name}
                onChange={this.HandleChange.bind(this)}
                style={{ width: "40%" }}
                min={1}
              />
              <Form.Control
                placeholder="Surname"
                name="surname"
                minLength="1"
                maxLength="50"
                value={this.state.surname}
                onChange={this.HandleChange.bind(this)}
                style={{ width: "59%" }}
                min={1}
              />
            </div>
          </Form.Group>
          {userRole === 1 && (
            <Form.Group className="mb-2">
              <Form.Label>Student Id</Form.Label>
              <Form.Control
                value={this.state.studentId}
                placeholder="Student Id"
                name="studentId"
                onChange={this.HandleChange.bind(this)}
              />
            </Form.Group>
          )}
          <Form.Group className="mb-2">
            <Button
              variant="link"
              style={{ marginRight: "auto", marginLeft: -12 }}
              onClick={() => {
                this.props.SetOpen("changePassModal", true);
              }}
            >
              Change password
            </Button>
          </Form.Group>
          <Form.Group className="mb-2">
            <Button
              variant="primary"
              type="submit"
              style={{ width: "49%", marginRight: "2%" }}
              onClick={this.onSaveClick.bind(this)}
            >
              Save
            </Button>
            <Button
              variant="secondary"
              style={{ width: "49%" }}
              onClick={this.onCancelClick.bind(this)}
            >
              Cancel
            </Button>
          </Form.Group>
        </Form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
    main: state.main,
  };
}

export default withRouter(
  connect(mapStateToProps, {
    ChangeInputValues,
    SetOpen,
    updateStudentProfile,
    updateTeacherProfile,
  })(EditProfile)
);
