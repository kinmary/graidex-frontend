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
import {
  SetNewUser,
  setError,
  registerTeacher,
  registerStudent,
} from "./AuthAction";

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      student: {
        email: "",
        name: "",
        surname: "",
        password: "",
        customId: "",
      },
      teacher: {
        email: "",
        name: "",
        surname: "",
        password: "",
      },
      user: 0,
    };
  }

  HandleSubmit(event) {
    event.preventDefault();
    const password = event.target.formBasicPassword.value;
    const repeatPassword = event.target.formBasicRepeatPassword.value;
    if (password !== repeatPassword) {
      alert("Passwords do not match");
      return;
    }
    // continue with form submission
  }
  handleInputChange(event) {
    this.state.user === 0
      ? this.setState({
          teacher: {
            ...this.state.teacher,
            [event.target.name]: event.target.value,
          },
        })
      : this.setState({
          student: {
            ...this.state.student,
            [event.target.name]: event.target.value,
          },
        });
  }
  async handleFormSubmit(event) {
    event.preventDefault();
    this.state.user === 0
      ? await this.props.registerTeacher(this.state.teacher)
      : await this.props.registerStudent(this.state.student);
  }

  render() {
    return (
      //TODO: work on responsiveness of login and sign up form
      <div className="container mb-3">
        <Card body className="card-auth">
          <div className="logo-container">
            <Image src={logo} width="50%" />
          </div>
          <ButtonGroup className="d-flex" style={{ marginTop: 10 }}>
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
              <Form.Control
                type="email"
                name="email"
                placeholder="Email"
                value={
                  this.state.user === 0
                    ? this.state.teacher.email
                    : this.state.student.email
                }
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
            <Form.Group className="mb-3">
              <Form.Label>
                {this.state.user === 0
                  ? "Teacher's Full Name"
                  : "Student's Full Name"}
              </Form.Label>
              <div className="d-inline-flex justify-content-between">
                <Form.Control
                  placeholder="Name"
                  name="name"
                  value={
                    this.state.user === 0
                      ? this.state.teacher.name
                      : this.state.student.name
                  }
                  onChange={this.handleInputChange.bind(this)}
                  style={{ width: "40%" }}
                  required
                />
                <Form.Control
                  placeholder="Surname"
                  name="surname"
                  value={
                    this.state.user === 0
                      ? this.state.teacher.surname
                      : this.state.student.surname
                  }
                  onChange={this.handleInputChange.bind(this)}
                  style={{ width: "59%" }}
                  required
                />
              </div>
            </Form.Group>
            {this.state.user === 1 && (
              <Form.Group className="mb-3" controlId="formBasicStudentId">
                <Form.Label>Student Id</Form.Label>
                <Form.Control
                  placeholder="Student Id"
                  name="customId"
                  value={this.state.user === 1 && this.state.student.customId}
                  onChange={this.handleInputChange.bind(this)}
                />
              </Form.Group>
            )}
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                value={
                  this.state.user === 0
                    ? this.state.teacher.password
                    : this.state.student.password
                }
                onChange={this.handleInputChange.bind(this)}
                required
                minLength="8"
                autoComplete="new-password"
                pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
                //(?=.*[a-z]): Requires at least one lowercase letter.
                //(?=.*[A-Z]): Requires at least one uppercase letter.
                //(?=.*\d): Requires at least one digit.
                //(?=.*[@$!%*?&]): Requires at least one special character,
                //which can be any of the following: "@", "$", "!", "%", "*", "?", "&".
                //[A-Za-z\d@$!%*?&]{8,}: Requires at least 8 characters,
                //which can be any combination of letters (upper and lowercase), digits,
                //and the special characters mentioned above.
                style={{ marginBottom: 5 }}
                isInvalid={this.props.auth.errors.password !== ""}
                onInvalid={(e) => {
                  e.preventDefault();
                  this.props.setError("password", e.target.validationMessage);
                }}
              />
              <Form.Control.Feedback type="invalid">
                {this.props.auth.errors.password}
              </Form.Control.Feedback>
              <Form.Control
                type="password"
                placeholder="Repeat password"
                autoComplete="new-password"
                required
                isInvalid={this.props.auth.errors.repeatPassword !== ""}
                onBlur={(e) => {
                  if (
                    e.target.value !==
                    (this.state.user === 0
                      ? this.state.teacher.password
                      : this.state.student.password)
                  ) {
                    this.props.setError(
                      "repeatPassword",
                      "Passwords must match"
                    );
                  } else {
                    this.props.setError("repeatPassword", "");
                  }
                }}
              />
              <Form.Control.Feedback type="invalid">
                {this.props.auth.errors.repeatPassword}
              </Form.Control.Feedback>
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              style={{ width: "100%" }}
              onClick={this.handleFormSubmit.bind(this)}
            >
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
export default connect(mapStateToProps, {
  SetNewUser,
  setError,
  registerTeacher,
  registerStudent,
})(SignUp);
