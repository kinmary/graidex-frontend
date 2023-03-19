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

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      user: 0,
    };
  }
  render() {
    return (
      <div className="container mb-3">
        <Card body className="card-auth">
          <div className="logo-container">
            <Image src={logo} width="100%" height="155px"></Image>
          </div>
          {/* <h4>Login</h4> */}
          <ButtonGroup>
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
              <Form.Control type="email" placeholder="Enter email" required />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                required
              />
            </Form.Group>
            <div className="d-flex align-items-center justify-content-between mb-3">
              <Form.Check type="checkbox" label="Remember me" />
              <Button variant="link" style={{ paddingRight: 0 }}>
                Forgot your password?
              </Button>
            </div>
            <Button variant="primary" type="submit" style={{ width: "100%" }}>
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
  };
}
export default connect(mapStateToProps, { SetNewUser })(Login);
