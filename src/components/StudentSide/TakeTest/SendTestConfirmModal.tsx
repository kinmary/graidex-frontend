import React, {Component} from "react";
import {Button, Modal} from "react-bootstrap";
import {SetOpen} from "../../MainAction";
//import { ResetTakeTestState } from "../StudentSide/TakeTest/TakeTestActions";
import {useAppDispatch} from "../../../app/hooks";
import {RootState} from "../../../app/store";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {submitTestAttempt, updateTestAttempt} from "./TakeTestActions";

const StartTestConfirmModal = () => {
  const dispatch = useAppDispatch();
  const main = useSelector((state: RootState) => state.main);
  const takeTest = useSelector((state: RootState) => state.takeTest);
  const {questions, testResultId} = takeTest;

  const navigate = useNavigate();
  const closeModal = () => {
    dispatch(SetOpen("sendTestModal", false));
  };
  const onConfirm = () => {
    if (questions) {
      const question = questions.find((question: any) => question.selected === true);
      let questionIndex = questions.indexOf(questions.length - 1); //last question ??
      if (question) {
        questionIndex = questions.indexOf(question);
      }
      dispatch(updateTestAttempt(testResultId, question, questionIndex)).then(() => {
        dispatch(submitTestAttempt(testResultId)).then(() => {
          //TODO: show success/error messages
          dispatch(SetOpen("sendTestModal", false));
          navigate(-1);
        });
      });
    }
  };

  const {sendTestModal} = main;
  return (
    <>
      <Modal show={sendTestModal} onHide={closeModal} centered size="sm">
        <Modal.Header closeButton>Submit exam</Modal.Header>
        <Modal.Body>Are you sure you want to submit the test?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={onConfirm}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default StartTestConfirmModal;
