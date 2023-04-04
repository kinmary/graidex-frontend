import React, { Component } from "react";
import { Button, Card, Form, InputGroup, Navbar } from "react-bootstrap";
import { connect } from "react-redux";
import { withRouter } from "../../../utils/withRouter";
import { ChangeQuestionAttr, SetSelectedQ } from "./TestOfStudentActions";

class TestField extends Component {
  ChangePoints(event) {
    const questions = this.props.test.studentAnswers.find(
      (student) => student.studentName === this.props.main.studentName
    ).questions;
    const selectedQuestion = questions.find((question) => question.selected);
    if (selectedQuestion) {
      this.props.ChangeQuestionAttr(
        this.props.main.studentName,
        selectedQuestion.id,
        "points",
        parseInt(event.target.value)
      );
    }
  }

  handleBackClick() {
    const questions = this.props.test.studentAnswers.find(
      (student) => student.studentName === this.props.main.studentName
    ).questions;
    const selectedQuestion = questions.find((question) => question.selected);
    const index = questions.indexOf(selectedQuestion);
    let setSelected = questions[index - 1];
    this.props.SetSelectedQ(this.props.main.studentName, setSelected.id);
  }
  handleNextClick() {
    const questions = this.props.test.studentAnswers.find(
      (student) => student.studentName === this.props.main.studentName
    ).questions;
    const selectedQuestion = questions.find((question) => question.selected);
    const index = questions.indexOf(selectedQuestion);
    let setSelected = questions[index + 1];
    this.props.SetSelectedQ(this.props.main.studentName, setSelected.id);
  }

  render() {
    const questions = this.props.test.studentAnswers.find(
      (student) => student.studentName === this.props.main.studentName
    ).questions;
    const selectedQuestion = questions.find((question) => question.selected);
    let indexOfSelected = 0;
    if (selectedQuestion) {
      indexOfSelected = questions.indexOf(selectedQuestion);
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
            {selectedQuestion.title}
          </h4>
          <InputGroup style={{ width: "13%" }}>
            <Form.Control
              type="number"
              value={selectedQuestion.points}
              min={0}
              onChange={this.ChangePoints.bind(this)}
            />
            <InputGroup.Text>/{selectedQuestion.maxPoints}</InputGroup.Text>
          </InputGroup>
        </div>

        {selectedQuestion.answerOptions.map((answer, idx) =>
          selectedQuestion.type === 2 ? (
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
                name={answer.id}
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
                        "red"),
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
                onClick={this.handleBackClick.bind(this)}
              >
                <i className="bi bi-arrow-left"></i>
              </Button>
            </Navbar.Brand>
          )}
          {indexOfSelected !== questions.length - 1 && (
            <Navbar.Brand style={{ marginLeft: "auto", marginRight: 0 }}>
              <Button
                variant="outline-dark"
                className="rounded-circle"
                style={{ fontSize: "24px"}}
                onClick={this.handleNextClick.bind(this)}
              >
                <i className="bi bi-arrow-right"></i>
              </Button>
            </Navbar.Brand>
          )}
        </Navbar>
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
    main: state.main,
    test: state.testOfStudent,
  };
}

export default withRouter(
  connect(mapStateToProps, { ChangeQuestionAttr, SetSelectedQ })(TestField)
);
