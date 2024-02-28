import React, { Component } from "react";
import { Button,  Modal } from "react-bootstrap";
import { connect } from "react-redux";
import {  SetOpen } from "../../MainAction";
import { useAppDispatch } from "../../../app/hooks";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { useNavigate } from "react-router-dom";

const StartTestConfirmModal = () => {
  const dispatch = useAppDispatch();
  const main : any = useSelector((state: RootState) => state.main);
  const navigate = useNavigate();

  const closeModal = () => {
    dispatch(SetOpen("startConfirmModal", false));
  }
  const onConfirm = () => {
    dispatch(SetOpen("startConfirmModal", false));
    navigate("take-test");
  }

    const {startConfirmModal} = main;
    return (
      <>
      <Modal show={startConfirmModal} onHide={closeModal}
      centered size="sm">
        <Modal.Header closeButton>
            Take exam
      </Modal.Header>
      <Modal.Body>
     Start this testing?
      </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={onConfirm}>
            Start
          </Button>
        </Modal.Footer>
      </Modal>
      </>
    );
  }

export default StartTestConfirmModal;
