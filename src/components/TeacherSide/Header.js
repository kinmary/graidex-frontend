import React, { Component } from "react";
import {
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

class Header extends Component {
  handleEditProfile() {
    this.props.SetOpen("editPage", true)
    this.props.navigate("/edit-profile");
  }
  handleLogoClick() {
    this.props.SetOpen("editPage", false)
    this.props.navigate("/");
  }
  render() {
    // TODO: work on responsiveness of header
    const {editPage} = this.props.main;
    return (
      <div>
        <Navbar fixed="top" bg="white">
          <Container fluid>
            <Navbar.Brand>
              <div style={{ display: "flex", alignItems: "center" }}>
                <div className="logo-container" onClick={this.handleLogoClick.bind(this)}>
                  {/* //TODO: reduce size of img logo, height */}
                  <Image
                    src={logo}
                    width="100%"
                    height="245px"
                    style={{ marginLeft: -60 }}
                  />
                </div>
                <InputGroup style={{ marginLeft: -80 }}>
                    <>
                      <InputGroup.Text id="basic-addon1" aria-label="Search" style={{visibility: editPage ? "hidden" : "visible"}}>
                        <i
                          className="bi bi-search"
                          style={{ fontSize: "1rem", cursor: "pointer", visibility: editPage ? "hidden" : "visible" }}
                        ></i>
                      </InputGroup.Text>
                      <Form.Control
                        type="search"
                        placeholder="Search"
                        aria-label="Search"
                        style={{ width: 100, visibility: editPage ? "hidden" : "visible" }}
                      />
                    </>
                </InputGroup>
              </div>
            </Navbar.Brand>
              <div className="user-profile" style={{ visibility: editPage ? "hidden" : "visible"}}>
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
          </Container>
        </Navbar>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    auth: state.auth,
    main: state.main
  };
}

export default withRouter(connect(mapStateToProps, {SetOpen})(Header));
