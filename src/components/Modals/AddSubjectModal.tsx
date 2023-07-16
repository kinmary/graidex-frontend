import React, { Component, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { connect } from "react-redux";
import { SetOpen } from "../MainAction";
import { createNewSubject } from "../Dashboard/SubjectActions";
import logoDark from "../../images/GraidexLogoDarkJPG.jpg";
import { useAppDispatch } from "../../app/hooks";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { useNavigate } from "react-router-dom";

const AddSubjectModal = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const main = useSelector((state: RootState) => state.main);
  const [state, setState] = useState({
    title: "",
    subjectId: "",
    imageUrl: null,
  });

  const closeModal = () => {
    setState({ ...state, title: "", subjectId: "" });
    dispatch(SetOpen("openSubjectModal", false));
  };
  const createSubject = () => {
    dispatch(createNewSubject(state.subjectId, state.title, state.imageUrl!));
    setState({ ...state, title: "", subjectId: "" });
    dispatch(SetOpen("openSubjectModal", false));
    //TODO: add subject redirect to new subject
    navigate("/");
  };
  const handleInputChange = (event: any) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const { openSubjectModal } = main;
  return (
    <>
      <Modal show={openSubjectModal} onHide={closeModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add new subject</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Subject Title</Form.Label>
              <Form.Control
                placeholder="Enter subject title"
                required
                value={state.title}
                name="title"
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Subject Id</Form.Label>
              <Form.Control
                placeholder="Enter subject Id"
                value={state.subjectId}
                name="subjectId"
                onChange={handleInputChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
          <Button variant="primary" onClick={createSubject}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddSubjectModal;
