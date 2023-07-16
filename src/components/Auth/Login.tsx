import React, { useState } from "react";
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
import { ChangeUserRole, SetNewUser, loginStudent, loginTeacher, setError } from "./AuthAction";
import { useAppDispatch } from "../../app/hooks";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";

const Login = () => {
  const [state, setState] =  useState({user: { email: "", password: "" }});
  const dispatch = useAppDispatch();
  const auth = useSelector((state: RootState) => state.auth);
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      user: {
        ...state!.user,
        [event.target.name]: event.target.value,
      },
    });
  }
  const handleFormSubmit = async (event: any) => {
    event.preventDefault();
    auth.userRole === 0 ?
      dispatch(loginTeacher(state.user))
      : dispatch(loginStudent(state.user));
  }

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
              checked={auth.userRole === 0 ? true : false}
              onClick={() => dispatch(ChangeUserRole(0))}
            >
              Teacher
            </ToggleButton>
            <ToggleButton
              size="sm"
              type="radio"
              name="Student"
              variant="outline-dark"
              value={1}
              checked={auth.userRole === 1 ? true : false}
              onClick={() => dispatch(ChangeUserRole(1))}
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
                value={state.user.email}
                onChange={handleInputChange}
                isInvalid={auth.errors!.email !== ""}
                onInvalid={(e: any) => {
                  e.preventDefault();
                  dispatch(setError("email", e.target.validationMessage));
                }}
                required
              />
              <Form.Control.Feedback type="invalid">
                {auth.errors!.email || ""}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                name="password"
                value={state.user.password}
                onChange={handleInputChange}
                isInvalid={auth.errors!.password !== ""}
                onInvalid={(e: any) => {
                    e.preventDefault();
                    dispatch(setError("email", e.target.validationMessage));
                  }}
                required
              />
              <Form.Control.Feedback type="invalid">
                {auth.errors!.password || ""}
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
              onClick={handleFormSubmit}
            >
              Login
            </Button>
          </Form>
          <p className="d-flex align-items-center justify-content-center">
            Don't have an account yet?
            <Button variant="link" onClick={() => dispatch(SetNewUser(true))}>
              Register now
            </Button>
          </p>
        </Card>
      </div>
    );
}

export default Login;