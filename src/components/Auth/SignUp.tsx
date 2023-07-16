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
import {
  SetNewUser,
  setError,
  registerTeacher,
  registerStudent,
  ChangeUserRole,
} from "./AuthAction";
import { useAppDispatch } from "../../app/hooks";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";


const SignUp = () => {
 const [teacher, setTeacher] = useState({
        email: "",
        name: "",
        surname: "",
        password: "",
    });
    const [student, setStudent] = useState({
          email: "",
          name: "",
          surname: "",
          password: "",
          customId: "",
      });
  
  const dispatch = useAppDispatch();
  const auth = useSelector((state: RootState) => state.auth);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        auth.userRole === 0
      ? setTeacher({
            ...teacher,
            [event.target.name]: event.target.value,
          },
        )
      : setStudent({
            ...student,
            [event.target.name]: event.target.value,
        });
  }
   
  const handleFormSubmit = (event: any) => {
    event.preventDefault();
    removeAllErrors();
    const isValid = validateForm();
    if (isValid) {
      auth.userRole === 0
      ?  dispatch(registerTeacher(teacher))
      :  dispatch(registerStudent(student));
    } else {
      alert("Form is invalid. Check all the fields and try again!")
    }
  }
  
  const validateForm = () => {
    const { email, name, surname, password } = auth.userRole === 0 ? teacher : student;
    if (!email || !name || !surname || !password) {
      return false;
    }
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      return false;
    }
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      return false;
    }
    return true;
  }

  const removeAllErrors = () => {
    dispatch(setError("email", ""));
    dispatch(setError("password", ""));
    dispatch(setError("repeatPassword", ""));
  }
  
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
              checked={auth.userRole === 0 ? true : false}
              onClick={(e) => dispatch(ChangeUserRole(0))}
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
              onClick={(e) => dispatch(ChangeUserRole( 1 ))}
            >
              Student
            </ToggleButton>
          </ButtonGroup>
          <Form className="form" onSubmit={handleFormSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Email"
                value={
                    auth.userRole === 0
                    ? teacher.email
                    : student.email
                }
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
            <Form.Group className="mb-3">
              <Form.Label>
                {auth.userRole === 0
                  ? "Teacher's Full Name"
                  : "Student's Full Name"}
              </Form.Label>
              <div className="d-inline-flex justify-content-between">
                <Form.Control
                  placeholder="Name"
                  name="name"
                  minLength={1}
                  maxLength={50}
                  value={
                    auth.userRole === 0
                    ? teacher.name
                    : student.name
                  }
                  onChange={handleInputChange}
                  style={{ width: "40%" }}
                  required
                />
                <Form.Control
                  placeholder="Surname"
                  name="surname"
                  minLength={1}
                  maxLength={50}
                  value={
                    auth.userRole === 0
                    ? teacher.surname
                    : student.surname
                  }
                  onChange={handleInputChange}
                  style={{ width: "59%" }}
                  required
                />
              </div>
            </Form.Group>
            {auth.userRole === 1 && (
              <Form.Group className="mb-3" controlId="formBasicStudentId">
                <Form.Label>Student Id</Form.Label>
                <Form.Control
                  placeholder="Student Id"
                  name="customId"
                  value={student.customId}
                  onChange={handleInputChange}
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
                    auth.userRole === 0
                    ? teacher.password
                    : student.password
                  }
                  onChange={handleInputChange}
                required
                minLength={8}
                maxLength={16}
                autoComplete="new-password"
                pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
                
                style={{ marginBottom: 5 }}
                isInvalid={auth.errors!.password !== ""}
                onInvalid={(e: any) => {
                  e.preventDefault();
                  dispatch(setError("password", e.target.validationMessage));
                }}
              />
              <Form.Control.Feedback type="invalid">
                {auth.errors?.password}
              </Form.Control.Feedback>
              <Form.Control
                type="password"
                placeholder="Repeat password"
                autoComplete="new-password"
                required
                isInvalid={auth.errors!.repeatPassword !== ""}
                onBlur={(e) => {
                  if (
                    e.target.value !==
                    ( auth.userRole === 0
                        ? teacher.password
                        : student.password)
                  ) {
                    dispatch(setError(
                      "repeatPassword",
                      "Passwords must match"
                    ));
                  } else {
                    dispatch(setError("repeatPassword", ""));
                  }
                }}
              />
              <Form.Control.Feedback type="invalid">
                {auth.errors?.repeatPassword}
              </Form.Control.Feedback>
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              style={{ width: "100%" }}
            >
              Sign up
            </Button>
          </Form>
          <p className="d-flex align-items-center justify-content-center">
            Already have an account?
            <Button variant="link" onClick={() => dispatch(SetNewUser(false))}>
              Login
            </Button>
          </p>
        </Card>
      </div>
    );
}

export default SignUp;