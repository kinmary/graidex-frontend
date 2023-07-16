import React, { Component, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { connect } from "react-redux";
import { SetOpen } from "../MainAction";
import { deleteStudentProfile } from "../EditProfile/StudentProfileAction";
import { deleteTeacherProfile } from "../EditProfile/TeacherProfileAction";
import { Logout, setError } from "../Auth/AuthAction";
import { useAppDispatch } from "../../app/hooks";
import { RootState } from "../../app/store";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ChangePasswordModal = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state: RootState) => state.auth);
  const main = useSelector((state: RootState) => state.main);
  const [state, setState] = useState({oldPassword: "", newPassword: ""});
  
  const closeModal = () => {
    dispatch(SetOpen("changePassModal", false));
  }
  const onConfirm = async (event: any) => {
    event.preventDefault();
    let result =
      auth.userRole === 0
        ? await dispatch(deleteTeacherProfile(state.oldPassword))
        : await dispatch(deleteStudentProfile(state.oldPassword));

    if (result) {
      dispatch(SetOpen("editPage", false));
      dispatch(SetOpen("changePassModal", false));
      navigate("/");
      dispatch(Logout());
    }
  }

  const handleInputChange = (event:any, data: any) =>{
    setState({...state, [event.target.name]: event.target.value });
  }

    const { changePassModal } = main;
    return (
      <>
        <Modal
          show={changePassModal}
          onHide={closeModal}
          centered
          size="sm"
        >
          <Modal.Header closeButton>Delete Account</Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Enter your current password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Current password"
                name="oldPassword"
                autoComplete="off"
                value={
                    state.oldPassword.length > 0 ? state.oldPassword : ""
                }
                onChange={() =>handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Enter your new password</Form.Label>
              <Form.Control
                type="password"
                autoComplete="off"
                placeholder="New password"
                name="newPassword"
                value={
                    state.newPassword.length > 0 ? state.newPassword : ""
                }
                onChange={() =>handleInputChange}
                required
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeModal}>
              Cancel
            </Button>
            <Button variant="primary" onClick={onConfirm}>
              Change
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }

export default ChangePasswordModal;

