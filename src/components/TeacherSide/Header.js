import React, { Component } from "react";
import {
  Button,
  Container,
  Form,
  Image,
  InputGroup,
  Navbar,
  NavDropdown,
} from "react-bootstrap";
import { connect } from "react-redux";
import logo from "../../images/GraidexLogoLightSVG.svg";
import profilePic from "../../images/blank-profile-picture.jpg";
import "../../styles/header.css";
import { withRouter } from "../../utils/withRouter";
import { SetOpen } from "../MainAction";
import { ChangeTitle, ResetCreateTestState } from "./CreateTest/CreateTestActions";
class Header extends Component {
  handleEditProfile() {
    this.props.SetOpen("editPage", true);
    this.props.navigate("/edit-profile");
  }
  handleLogoClick() {
    this.props.SetOpen("editPage", false);
    this.props.SetOpen("createTestPage", false);
    this.props.navigate("/");
    this.props.ResetCreateTestState();

  }
  handleChangeTestTitle(event, data) {
    this.props.ChangeTitle(event.target.value);
  }
  render() {
    // TODO: work on responsiveness of header
    const { editPage, createTestPage } = this.props.main;
    const {testTitle} = this.props.createTest;
    return (
      <div>
        <Navbar fixed="top" bg="white" style = {{paddingLeft: 20, paddingRight: 20}}>
                
                  {/* //TODO: reduce size of img logo, height */}
                  <Image
                    src={logo}
                    width="155"  
                    style={{ marginRight: 10}}   
                    onClick={this.handleLogoClick.bind(this)}
                  />
                
              <Navbar.Brand >
              {!createTestPage ? (
                  <InputGroup >
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
                  <InputGroup >
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
              style={{ visibility: editPage ? "hidden" : "visible", marginLeft: "auto", marginRight: "0" }}
            >
              {createTestPage && <Button style = {{marginRight: 10, backgroundColor: "#000a55", fontWeight: "bold"}}  >
                <i class="bi bi-check2-circle" style = {{marginRight: 4}}></i>
                  Save
              </Button> }
              <span>
                {this.props.auth.name} {this.props.auth.surname}
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
                <NavDropdown.Item>
                  {/*//TODO: add logout function */}
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
    createTest: state.createTest
  };
}

export default withRouter(connect(mapStateToProps, { SetOpen, ChangeTitle, ResetCreateTestState })(Header));
