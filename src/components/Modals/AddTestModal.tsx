import React, { Component, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import { connect } from "react-redux";
import { useAppDispatch } from "../../app/hooks";
import { RootState } from "../../app/store";
import { SetOpen } from "../MainAction";
import { createTestDraft } from "../Dashboard/TestActions";
interface IProps {
  subjectId: string | undefined,
}
const AddTestModal = ({subjectId}: IProps) => {
  const dispatch = useAppDispatch();
  const main = useSelector((state: RootState) => state.main);
  const [testDraft, setTestDraft] = useState({
    title: "",
    description: "",
    gradeToPass: 4,
  });
  const closeModal = () => {
    setTestDraft({
      title: "",
      description: "",
      gradeToPass: 4,
    });
    dispatch(SetOpen("openTestModal", false));
  };
  const confirmModal = () => {
    dispatch(createTestDraft(subjectId, testDraft.title, testDraft.description, testDraft.gradeToPass));
    closeModal();
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTestDraft({
      ...testDraft,
      [event.target.name]: event.target.value,
    });
  };

  const { openTestModal } = main;
  return (
    <>
      <Modal show={openTestModal} onHide={closeModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Create new test draft</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                placeholder="Enter test title"
                required
                autoComplete="off"
                name="title"
                value={testDraft.title}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                name="description"
                as="textarea" 
                autoComplete="off"
                rows={2}
                placeholder="Enter description"
                value={testDraft.description}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Grade to pass</Form.Label>
              <Form.Control
                type="number"
                name="gradeToPass"
                autoComplete="off"
                max={10}
                min={1}
                value={testDraft.gradeToPass}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
          <Button variant="primary" onClick={confirmModal}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddTestModal;
