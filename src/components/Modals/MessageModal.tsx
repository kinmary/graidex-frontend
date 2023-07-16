import React, { Component } from "react";
import { Button,  Modal } from "react-bootstrap";
import { SetMessageOpen } from "../MainAction";
import { useAppDispatch } from "../../app/hooks";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";

const MessageModal = () => {
  const dispatch = useAppDispatch();
  const main = useSelector((state: RootState) => state.main);
  const closeModal = () => {
    dispatch(SetMessageOpen(false, ""));
  }

    const {messageModal, message} = main;
    return (
      <>
      <Modal show={messageModal} onHide={closeModal}
      centered size="sm">
        <Modal.Header closeButton>
            Message
      </Modal.Header>
      <Modal.Body>
      {message}
      </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={closeModal}>
            Got it
          </Button>
        </Modal.Footer>
      </Modal>
      </>
    );
  }


export default MessageModal;
