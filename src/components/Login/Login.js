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
import { SetNewUser, loginStudent, loginTeacher } from "./AuthAction";
import { ChangeUserRole } from "../MainAction";


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: { email: "", password: "" },
    };
  }
  handleInputChange(event) {
    this.setState({
      user: {
        ...this.state.user,
        [event.target.name]: event.target.value,
      },
    });
  }
  async handleFormSubmit(event) {
    event.preventDefault();
    this.props.main.userRole === 0
      ? await this.props.loginTeacher(this.state.user)
      : await this.props.loginStudent(this.state.user);
  }

  render() {
    return (
      //TODO: work on responsiveness of login and sign up form
      <div className="container mb-3">
        <Card body className="card-auth">
          <div className="logo-container">
            <Image src={logo} width="50%" />
          </div>
          {/* <h4>Login</h4> */}
          <ButtonGroup className="d-flex" style={{ marginTop: 10 }}>
            <ToggleButton
              size="sm"
              type="radio"
              name="Teacher"
              variant="outline-dark"
              value={0}
              checked={this.props.main.userRole === 0 ? true : false}
              onClick={(e) => this.props.ChangeUserRole(0)}
            >
              Teacher
            </ToggleButton>
            <ToggleButton
              size="sm"
              type="radio"
              name="Student"
              variant="outline-dark"
              value={1}
              checked={this.props.main.userRole === 1 ? true : false}
              onClick={(e) => this.props.ChangeUserRole(1)}
            >
              Student
            </ToggleButton>
          </ButtonGroup>
          <Form className="form">
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter email"
                value={this.state.user.email}
                onChange={this.handleInputChange.bind(this)}
                isInvalid={this.props.auth.errors.email !== ""}
                onInvalid={(e) => {
                  e.preventDefault();
                  this.props.setError("email", e.target.validationMessage);
                }}
                required
              />
              <Form.Control.Feedback type="invalid">
                {this.props.auth.errors.email}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                name="password"
                value={this.state.user.password}
                onChange={this.handleInputChange.bind(this)}
                isInvalid={this.props.auth.errors.password !== ""}
                onInvalid={(e) => {
                  e.preventDefault();
                  this.props.setError("password", e.target.validationMessage);
                }}
                required
              />
              <Form.Control.Feedback type="invalid">
                {this.props.auth.errors.password}
              </Form.Control.Feedback>
            </Form.Group>
            <div className="d-flex align-items-center justify-content-between mb-3">
              <Form.Check type="checkbox" label="Remember me" />
              <Button variant="link" style={{ paddingRight: 0 }}>
                Forgot your password?
              </Button>
            </div>
            <Button
              variant="primary"
              type="submit"
              style={{ width: "100%" }}
              onClick={this.handleFormSubmit.bind(this)}
            >
              Login
            </Button>
          </Form>
          <p className="d-flex align-items-center justify-content-center">
            Don't have an account yet?
            <Button variant="link" onClick={() => this.props.SetNewUser(true)}>
              Register now
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
    main: state.main
  };
}
export default connect(mapStateToProps, { SetNewUser, loginStudent, loginTeacher, ChangeUserRole })(Login);
