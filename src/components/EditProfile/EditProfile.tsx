import React, { Component, useState } from "react";
import { Button, Col, Form, Image, Row } from "react-bootstrap";
import { connect } from "react-redux";
import blankProf from "../../images/blank-profile-picture.jpg";
import { ChangeInputValues } from "../Auth/AuthAction";
import DeleteConfirmModal from "../Modals/DeleteConfirmModal";
import { SetOpen } from "../MainAction";
import {
  DeleteProfilePicStudent,
  UpdateProfilePicStudent,
  updateStudentProfile,
} from "./StudentProfileAction";
import {
  DeleteProfilePic,
  UpdateProfilePic,
  updateTeacherProfile,
} from "./TeacherProfileAction";
import { useAppDispatch } from "../../app/hooks";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import ChangePasswordModal from "../Modals/ChangePasswordModal";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state: RootState) => state.auth);
  const [state, setState] = useState({
    name: auth.name,
    email: auth.email || "",
    surname: auth.surname || "",
    studentId: auth.studentId || "",
  });
  const HandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const onCancelClick = () => {
    navigate("/");
  };

  const onSaveClick = (event: any) => {
    event.preventDefault();
    auth.userRole === 0
      ? dispatch(updateTeacherProfile(state.name!, state.surname!))
      : dispatch(
          updateStudentProfile(state.name!, state.surname!, state.studentId!)
        );
  };

  const handleProfilePicChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files !== null) {
      const file = event.target.files[0];
      auth.userRole === 0
        ? dispatch(UpdateProfilePic(file))
        : dispatch(UpdateProfilePicStudent(file));
    }
  };

  const handleDeleteProfilePic = () => {
    auth.userRole === 0
      ? dispatch(DeleteProfilePic())
      : dispatch(DeleteProfilePicStudent());
  };
  const { userRole } = auth;
  return (
    <>
      <ChangePasswordModal />
      <DeleteConfirmModal />
      <div style={{ marginTop: "10px" }}>
        <Form className="form" style={{ width: "35%" }}>
          <div style={{ display: "flex", alignItems: "flex-end" }}>
            <Image
              className="profile-image-edit mb-4"
              src={auth.profilePic || blankProf}
            />
            <Col className="mb-4 ms-2">
              <Form.Control
                type="file"
                size="sm"
                className="mb-1"
                onChange={handleProfilePicChange}
              />
              <Button variant="outline-danger" size="sm" onClick={handleDeleteProfilePic}>
                Delete picture
              </Button>
            </Col>
          </div>

          <h5 style={{ fontWeight: "bold" }}>
            {/* <Image src={blankProf} className="profile-image-edit" /> */}
            {auth.name} {auth!.surname}
            <Button
              onClick={() => {
                dispatch(SetOpen("deleteConfirmModal", true));
              }}
              variant="danger"
              size="sm"
              style={{ marginLeft: 10 }}
            >
              Delete profile
            </Button>
          </h5>
          <Form.Group className="mb-2" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" value={auth.email} required disabled />
          </Form.Group>
          <Form.Group className="mb-2" controlId="formBasicFullName">
            <Form.Label>
              {userRole === 0 ? "Teacher's Full Name" : "Student's Full name"}
            </Form.Label>
            <div
              className="d-inline-flex justify-content-between"
              style={{ width: "100%" }}
            >
              <Form.Control
                placeholder="Name"
                name="name"
                minLength={1}
                maxLength={50}
                value={state.name}
                onChange={HandleChange}
                style={{ width: "40%" }}
                min={1}
              />
              <Form.Control
                placeholder="Surname"
                name="surname"
                minLength={1}
                maxLength={50}
                value={state.surname}
                onChange={HandleChange}
                style={{ width: "59%" }}
                min={1}
              />
            </div>
          </Form.Group>
          {userRole === 1 && (
            <Form.Group className="mb-2">
              <Form.Label>Student Id</Form.Label>
              <Form.Control
                value={state.studentId}
                placeholder="Student Id"
                name="studentId"
                onChange={HandleChange}
              />
            </Form.Group>
          )}
          <Form.Group className="mb-2">
            <Button
              variant="link"
              style={{ marginRight: "auto", marginLeft: -12 }}
              onClick={() => {
                dispatch(SetOpen("changePassModal", true));
              }}
            >
              Change password
            </Button>
          </Form.Group>
          <Form.Group className="mb-2">
            <Button
              variant="primary"
              type="submit"
              style={{ width: "49%", marginRight: "2%" }}
              onClick={onSaveClick}
            >
              Save
            </Button>
            <Button
              variant="secondary"
              style={{ width: "49%" }}
              onClick={onCancelClick}
            >
              Cancel
            </Button>
          </Form.Group>
        </Form>
      </div>
    </>
  );
};

export default EditProfile;
