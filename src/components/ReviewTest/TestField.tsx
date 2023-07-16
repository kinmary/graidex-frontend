import React, { Component } from "react";
import { Button, Card, Form, InputGroup, Navbar } from "react-bootstrap";
import { connect } from "react-redux";
import { ChangeQuestionAttr, SetSelectedQ } from "./TestOfStudentActions";
import { useAppDispatch } from "../../app/hooks";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { IQuestion } from "../../interfaces/Questions";
import { Color } from "react-bootstrap/esm/types";

const TestField = () => {
  const dispatch = useAppDispatch();
  const test = useSelector((state: RootState) => state.testOfStudent);
  const main = useSelector((state: RootState) => state.main);
  const userRole = useSelector((state: RootState) => state.auth).userRole;

  const ChangePoints = (event: any) => {
    const questions = test.studentAnswers.find(
      (student: any) => student.studentName === main.studentName
    )?.questions;
    const selectedQuestion = questions?.find((question: IQuestion) => question.selected);
    if (selectedQuestion) {
      dispatch(ChangeQuestionAttr(
        main.studentName,
        selectedQuestion.id,
        "points",
        parseInt(event.target.value)
      ));
    }
  }

  const handleBackClick = () =>{
    const questions = test.studentAnswers.find(
      (student: any) => student.studentName === main.studentName
    )?.questions;
    const selectedQuestion = questions?.find((question: any) => question.selected);
    if(selectedQuestion){
      const index = questions?.indexOf(selectedQuestion);
      let setSelected = questions![index! - 1];
      dispatch(SetSelectedQ(main.studentName, setSelected.id));
    }
  
  }
  const handleNextClick = () => {
    const questions = test.studentAnswers.find(
      (student: any) => student.studentName === main.studentName
    )?.questions;
    const selectedQuestion = questions?.find((question: any) => question.selected);
    if(selectedQuestion){
      const index = questions?.indexOf(selectedQuestion);
      let setSelected = questions![index! + 1];
      dispatch(SetSelectedQ(main.studentName, setSelected.id));
    }
  }


    const questions = test.studentAnswers.find(
      (student: any) => student.studentName === main.studentName
    )?.questions;
    const selectedQuestion = questions?.find((question: any) => question.selected);
    let indexOfSelected = 0;
    if (selectedQuestion) {
      indexOfSelected = questions!.indexOf(selectedQuestion);
    }
    return (
      <>
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            marginBottom: 30,
          }}
        >
          <h4 style={{ fontWeight: "bold", width: "87%" }}>
            {selectedQuestion?.title}
          </h4>
          <InputGroup style={{ width: "13%" }}>
            <Form.Control
              type="number"
              value={selectedQuestion?.points}
              min={0}
              onChange={ChangePoints}
              readOnly = {userRole === 1}
            />
            <InputGroup.Text>/{selectedQuestion?.maxPoints}</InputGroup.Text>
          </InputGroup>
        </div>

        {selectedQuestion?.answerOptions.map((answer: any, idx: any) =>
          selectedQuestion?.type === 2 ? (
              <Card key={idx}>
                <Card.Body>{answer.text}</Card.Body>
              </Card>
          ) : (
            <div
              key={idx+"d"}
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: 2,
              }}
            >
              <Form.Check
              key={idx+"c"}
                type={selectedQuestion.type === 0 ? "radio" : "checkbox"}
                readOnly
                isValid={answer.isRight}
                isInvalid={answer.isRight === false && answer.selected === true}
                style={{ marginRight: 10, color: "red" }}
                name={answer.id.toString()}
                checked={answer.selected}
              />
              <Card
              key={idx+"t"}
                style={{
                  marginBottom: 5,
                  borderColor: "transparent",
                  width: "90%",
                }}
              >
                <Card.Text
                  style={{
                    color:
                      (answer.isRight && "green") ||
                      (answer.isRight === false &&
                        answer.selected === true &&
                        "red") as Color,
                  }}
                >
                  {answer.text}
                </Card.Text>
              </Card>
            </div>
          )
        )}

        <Navbar style={{ marginTop: 50 }}>
          {indexOfSelected > 0 && (
            <Navbar.Brand>
              {/* //TODO: add on hover text */}
              <Button
                variant="outline-dark"
                className="rounded-circle"
                style={{ fontSize: "24px"}}
                onClick={handleBackClick}
              >
                <i className="bi bi-arrow-left"></i>
              </Button>
            </Navbar.Brand>
          )}
          {indexOfSelected !== questions!.length - 1 && (
            <Navbar.Brand style={{ marginLeft: "auto", marginRight: 0 }}>
              <Button
                variant="outline-dark"
                className="rounded-circle"
                style={{ fontSize: "24px"}}
                onClick={handleNextClick}
              >
                <i className="bi bi-arrow-right"></i>
              </Button>
            </Navbar.Brand>
          )}
        </Navbar>
      </>
    );
  }

export default TestField;
