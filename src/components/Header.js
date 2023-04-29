import React, { Component } from "react";
import {
  Badge,
  Button,
  Form,
  Image,
  InputGroup,
  Navbar,
  NavDropdown,
} from "react-bootstrap";
import { connect } from "react-redux";
import logo from "../images/GraidexLogoLightSVG.svg";
import profilePic from "../images/blank-profile-picture.jpg";
import "../styles/header.css";
import { withRouter } from "../utils/withRouter";
import { SetOpen, Logout } from "./MainAction";
import {
  ChangeTitle,
  ResetCreateTestState,
} from "./TeacherSide/CreateTest/CreateTestActions";
import { ResetTestOfStudentState } from "./ReviewTest/TestOfStudentActions";

class Header extends Component {
  handleEditProfile() {
    this.props.SetOpen("editPage", true);
    this.props.navigate("/edit-profile");
  }
  handleLogoClick() {
    this.props.navigate("/");
    this.props.ResetCreateTestState();
    this.props.ResetTestOfStudentState();
    this.props.SetOpen("editPage", false);
    this.props.SetOpen("createTestPage", false);
    this.props.SetOpen("testOfStudentPage", false);
    this.props.SetOpen("studentName", "");
    this.props.SetOpen("selectedTest", null);
  }
  handleChangeTestTitle(event, data) {
    this.props.ChangeTitle(event.target.value);
  }
  handleSaveClick() {
    this.props.navigate(-1);
    this.props.SetOpen("createTestPage", false);
    //TODO: add send to backend functionality
    this.props.ResetCreateTestState();
  }

  handleSaveTestOfStudentClick() {
    this.props.navigate(-1);
    this.props.SetOpen("testOfStudentPage", false);
    //TODO: add send to backend functionality
    this.props.ResetTestOfStudentState();
  }

  handleLogOut() {
    this.props.ResetCreateTestState();
    this.props.ResetTestOfStudentState();
    this.props.Logout();
  }
  render() {
    // TODO: work on responsiveness of header
    const { editPage, createTestPage, testOfStudentPage } = this.props.main;
    const { testTitle } = this.props.createTest;
    let mark = 0;
    if (this.props.main.studentName !== "") {
      mark = this.props.test.studentAnswers.find(
        (student) => student.studentName === this.props.main.studentName
      ).mark;
    }
    return (
      <div>
        <Navbar
          fixed="top"
          bg="white"
          style={{ paddingLeft: 20, paddingRight: 20 }}
        >
          <Image
            src={logo}
            width="155"
            style={{ marginRight: 10 }}
            onClick={this.handleLogoClick.bind(this)}
          />

          <Navbar.Brand>
            {!createTestPage ? (
              !testOfStudentPage ? (
                <InputGroup>
                  <InputGroup.Text
                    id="basic-addon1"
                    aria-label="Search"
                    style={{ visibility: editPage ? "hidden" : "visible" }}
                  >
                    <i
                      className="bi bi-search"
                      style={{
                        fontSize: "1rem",
                        cursor: "pointer",
                        visibility: editPage ? "hidden" : "visible",
                      }}
                    ></i>
                  </InputGroup.Text>
                  <Form.Control
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    style={{
                      visibility: editPage ? "hidden" : "visible",
                    }}
                  />
                </InputGroup>
              ) : (
                <h4
                  style={{
                    marginBottom: 0,
                    marginLeft: 10,
                    fontWeight: "bold",
                  }}
                >
                  {this.props.main.studentName}:{" "}
                  {this.props.main.studentName !== "" && mark}
                </h4>
              )
            ) : (
              <InputGroup>
                <Form.Control
                  placeholder="Test Title"
                  value={testTitle}
                  onChange={this.handleChangeTestTitle.bind(this)}
                  style={{
                    visibility: editPage ? "hidden" : "visible",
                    fontWeight: "bold",
                  }}
                />
              </InputGroup>
            )}
          </Navbar.Brand>
          <div
            className="user-profile"
            style={{
              visibility: editPage ? "hidden" : "visible",
              marginLeft: "auto",
              marginRight: "0",
            }}
          >
            {(createTestPage || testOfStudentPage) && (
              <Button
                style={{
                  marginRight: 10,
                  backgroundColor: "#000a55",
                  fontWeight: "bold",
                }}
                onClick={
                  createTestPage
                    ? this.handleSaveClick.bind(this)
                    : this.handleSaveTestOfStudentClick.bind(this)
                }
              >
                <i
                  className="bi bi-check2-circle"
                  style={{ marginRight: 4 }}
                ></i>
                Save
              </Button>
            )}
            <span style={{marginTop: 5}}>
              {this.props.auth.name} {this.props.auth.surname}
              <div style={{ display: "block", marginTop: -5 }}>
                <Badge pill bg="info" style={{fontSize: 10}}>
                  {this.props.main.userRole === 0 ? "Teacher" : "Student"}
                </Badge>
              </div>
            </span>
            <NavDropdown
              align="end"
              id="basic-nav-dropdown"
              title={<Image className="profile-image" src={profilePic} />}
            >
              <NavDropdown.Item onClick={this.handleEditProfile.bind(this)}>
                <i
                  className="bi bi-pencil-square"
                  style={{ marginRight: 5 }}
                ></i>
                Edit profile
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={this.handleLogOut.bind(this)}>
                <i
                  className="bi bi-box-arrow-right"
                  style={{ marginRight: 5 }}
                ></i>
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          </div>
        </Navbar>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    auth: state.auth,
    main: state.main,
    createTest: state.createTest,
    test: state.testOfStudent,
  };
}

export default withRouter(
  connect(mapStateToProps, {
    SetOpen,
    ChangeTitle,
    ResetCreateTestState,
    Logout,
    ResetTestOfStudentState,
  })(Header)
);
