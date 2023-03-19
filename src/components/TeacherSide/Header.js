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

class Header extends Component {
  render() {
    return (
      <div>
        <Navbar fixed="top" bg="white">
          <Container fluid>
           {/*//?! Add add subject button? */}
            <Navbar.Brand>
              <div style={{ display: "flex", alignItems: "center" }}>
              <div className="logo-container">
                <Image
                  src={logo}
                  width="100%"
                  height="245px"
                  style={{ marginLeft: -60 }}
                />
                </div>
                 <InputGroup style={{ marginLeft: -80 }}>
                 {!this.props.editPage && 
                 <>
                  <InputGroup.Text id="basic-addon1" aria-label="Search">
                    <i
                      className="bi bi-search"
                      style={{ fontSize: "1rem", cursor: "pointer" }}
                    ></i>
                  </InputGroup.Text>
                  <Form.Control
                    type="search"
                    placeholder="Search by CourseId"
                    aria-label="Search"
                    style={{ width: 100 }}
                  /> 
                 </>
                }
                </InputGroup>
              </div>
            </Navbar.Brand>
            {!this.props.editPage && <div className="user-profile">
              <span>
                {this.props.auth.name} {this.props.auth.surname}
              </span>
              <NavDropdown
              align = "end"
                id="basic-nav-dropdown"
                title={<Image className="profile-image" src={profilePic} />}
              >
                 <NavDropdown.Item >
                 <i className="bi bi-pencil-square" style={{marginRight: 5}}></i>
                  Edit profile
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item >
                  {/*//TODO: add logout function */}
                <i class="bi bi-box-arrow-right" style={{marginRight: 5}}></i>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            </div>}
          </Container>
        </Navbar>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps, {})(Header);
