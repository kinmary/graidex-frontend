import React, { Component } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import { connect } from "react-redux";
import { useAppDispatch } from "../../app/hooks";
import { RootState } from "../../app/store";
import { SetOpen } from "../MainAction";

const  AddTestModal = () => {
  const dispatch = useAppDispatch();
  const main = useSelector((state: RootState) => state.main);
  const closeModal =() => {
    dispatch(SetOpen("openTestModal", false));
  }

    const {openTestModal} = main;
    //! (This modal probably is not needed)
    //! Add student to subject or to test, how to send the invitation to student or add him???
    return (
      <>
      <Modal show={openTestModal} onHide={closeModal}
      centered>
        <Modal.Header closeButton>
        <Modal.Title>
          Create new test
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                placeholder="Enter test title"
                required
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
            >
                {/* //TODO: understand what time limits etc we need to add, delete etc when creating */}
              <Form.Label>Date</Form.Label>
              <Form.Control placeholder="Date" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
          {/* //TODO: Add post request to backend  */}
          <Button variant="primary" onClick={closeModal}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>
      </>
    );
  }


export default AddTestModal;
