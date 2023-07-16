import React, { Component, useState, useSyncExternalStore } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { SetOpen } from "../MainAction";
import { deleteStudentProfile } from "../EditProfile/StudentProfileAction";
import { deleteTeacherProfile } from "../EditProfile/TeacherProfileAction";
import { Logout } from "../Auth/AuthAction";
import { useAppDispatch } from "../../app/hooks";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { useNavigate } from "react-router-dom";

const DeleteConfirmModal = () => {
  const dispatch = useAppDispatch();
  const auth = useSelector((state: RootState) => state.auth);
  const main = useSelector((state: RootState) => state.main);
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
 
  const closeModal=() =>{
    dispatch(SetOpen("deleteConfirmModal", false));
  }
  const  onConfirm = async (event: any) => {
    event.preventDefault();
    let result =
      auth.userRole === 0
        ? await dispatch(deleteTeacherProfile(password))
        : await dispatch(deleteStudentProfile(password));
    if (result) {
      dispatch(SetOpen("editPage", false));
      dispatch(SetOpen("deleteConfirmModal", false));
      navigate("/");
      dispatch(Logout());
    }
  }

  const handleInputChange = (event: any, data: any) =>{
    setPassword(event.target.value );
  }

    const { deleteConfirmModal } = main;
    return (
      <>
        <Modal
          show={deleteConfirmModal}
          onHide={closeModal}
          centered
          size="sm"
        >
          <Modal.Header closeButton>Delete Account</Modal.Header>
          <Modal.Body>
            Deleting your account will permanently remove all of your
            information. This can not be undone.
            <Form.Group>
              <Form.Label>Enter your password to delete account</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Enter your password"
                value={
                  password.length > 0 ? password : ""
                }
                onChange={() =>handleInputChange}
                required
                autoComplete="off"
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeModal}>
              Cancel
            </Button>
            <Button variant="danger" onClick={onConfirm}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }


export default DeleteConfirmModal;
