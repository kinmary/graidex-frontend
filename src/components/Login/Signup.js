import React, { Component } from "react";
import {
  Form,
  Button,
  Card,
  Image,
  ButtonGroup,
  ToggleButton,
} from "react-bootstrap";
import "../../styles/auth.css";
import logo from "../../images/GraidexLogoLightSVG.svg";
import { connect } from "react-redux";
import { SetNewUser } from "./AuthAction";

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      name: "",
      surname: "",
      password: "",
      user: 0,
      studentId: "",
    };
  }
  render() {
    return (
      //TODO: work on responsiveness of login and sign up form
      <div className="container mb-3">
        <Card body className="card-auth">
          <div className="logo-container">
            <Image src={logo} width="50%" />
          </div>
          <ButtonGroup className="d-flex" style={{marginTop: 10}}>
            <ToggleButton
              size="sm"
              type="radio"
              name="Teacher"
              variant="outline-dark"
              value={0}
              checked={this.state.user === 0 ? true : false}
              onClick={(e) => this.setState({ user: 0 })}
            >
              Teacher
            </ToggleButton>
            <ToggleButton
              size="sm"
              type="radio"
              name="Student"
              variant="outline-dark"
              value={1}
              checked={this.state.user === 1 ? true : false}
              onClick={(e) => this.setState({ user: 1 })}
            >
              Student
            </ToggleButton>
          </ButtonGroup>
          <Form className="form">
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Email" required />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicFullName">
              <Form.Label>
                {this.state.user === 0
                  ? "Teacher's Full Name"
                  : "Student's Full Name"}
              </Form.Label>
              <div className="d-inline-flex justify-content-between">
                <Form.Control
                  placeholder="Name"
                  style={{ width: "40%" }}
                  required
                />
                <Form.Control
                  placeholder="Surname"
                  style={{ width: "59%" }}
                  required
                />
              </div>
            </Form.Group>
            {this.state.user === 1 && (
              <Form.Group className="mb-3" controlId="formBasicStudentId">
                <Form.Label>Student Id</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Student Id"
                  required
                />
              </Form.Group>
            )}
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                required
                style={{ marginBottom: 5 }}
              />
              <Form.Control
                type="password"
                placeholder="Repeat password"
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit" style={{ width: "100%" }}>
              Sign up
            </Button>
          </Form>
          <p className="d-flex align-items-center justify-content-center">
            Already have an account?
            <Button variant="link" onClick={() => this.props.SetNewUser(false)}>
              Login
            </Button>
          </p>
        </Card>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}
export default connect(mapStateToProps, { SetNewUser })(SignUp);
