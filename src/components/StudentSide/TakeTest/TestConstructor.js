import React, { Component } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { Button, Card, Col, Form, InputGroup, Navbar, Row } from "react-bootstrap";
import { connect } from "react-redux";
import { withRouter } from "../../../utils/withRouter";
import { Grammarly, GrammarlyEditorPlugin } from '@grammarly/editor-sdk-react'
import { GRAMMARLY_CLIENT_ID } from "../../../constants/config";
import { ChangeAnswers, InputChange, ResetTakeTestState, SetSelectedQ } from "./TakeTestActions";
import { SetOpen } from "../../MainAction";
class TestConstructor extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  onInputChange(event, data) {
    const { questions } = this.props.takeTest;
    const id = questions.find((question) => question.selected === true).id;
    this.props.InputChange(id, event.target.value);
  }
  handleCheck(event) {
    const { questions } = this.props.takeTest;
    const selectedQuestion = questions.find(
      (question) => question.selected === true
    );
    let id = selectedQuestion.id;
    let type = selectedQuestion.type;
    let updated = selectedQuestion.answerOptions;
    if (type === 0) {
      updated = selectedQuestion.answerOptions.map((answer) =>
        answer.id.toString() === event.target.name.toString()
          ? { ...answer, selected: true }
          : { ...answer, selected: false }
      );
    } else {
      updated = selectedQuestion.answerOptions.map((answer) =>
        answer.id.toString() === event.target.name.toString()
          ? { ...answer, selected: event.target.checked }
          : answer
      );
    }
    this.props.ChangeAnswers(id, updated);
  }

  handleBackClick() {
    const { questions } = this.props.takeTest;
    const selectedQuestion = questions.find(
      (question) => question.selected === true
    );
    const index = questions.indexOf(selectedQuestion);
    let setSelected = questions[index - 1];
    this.props.SetSelectedQ(setSelected.id);
  }
  handleNextClick() {
    const { questions } = this.props.takeTest;
    const selectedQuestion = questions.find(
      (question) => question.selected === true
    );
    const index = questions.indexOf(selectedQuestion);
    let setSelected = questions[index + 1];
    this.props.SetSelectedQ(setSelected.id);
  }
  handleSaveAndSendClick() {
    this.props.SetOpen("sendTestModal", true);
  }

  render() {
    let { questions } = this.props.takeTest;
    const selectedQuestion = questions.find(
      (question) => question.selected === true
    );
    let indexOfSelected = 0;
    let answerOptions = [];
    if(selectedQuestion){
      indexOfSelected = questions.indexOf(selectedQuestion);
      answerOptions = selectedQuestion.answerOptions;
    }
    return (
       
        <Grammarly
        clientId={GRAMMARLY_CLIENT_ID}
        config={{
          documentDialect: "british",
          autocomplete: "on"
        }}
      > {selectedQuestion ? <Form>
        {/* {selectedQuestion.type === 2 && ( */}
        <Navbar
          bg="light"
          variant="light"
          style={{
            borderRadius: "5px 5px 0px 0px",
            padding: "0px 0px",
          }}
        >          
        </Navbar>
        {/* )}  */}
        <h4 style={{ fontWeight: "bold", width: "87%" }}>
            {selectedQuestion.title}
          </h4>
          {selectedQuestion.answerOptions.map((answer, idx) =>
          selectedQuestion.type === 2 ? (
            <GrammarlyEditorPlugin>
            <Form.Control
               as="textarea"
               rows={7}
               placeholder="Enter your answer here"
               name="text"
               value={answer.text}
               onChange={this.onInputChange.bind(this)}
               style={{ marginTop: 20 }}
             />
            </GrammarlyEditorPlugin>
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
                style={{ marginRight: 10, color: "red" }}
                name={answer.id}
                checked={answer.selected}
                onClick={this.handleCheck.bind(this)}
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
                >
                  {answer.text}
                </Card.Text>
              </Card>
            </div>
          )
        )}
       
        <Navbar>
          {indexOfSelected > 0 && <Navbar.Brand>
            {/* //TODO: add on hover text */}
            <Button
              variant="outline-dark"
              className="rounded-circle"
              style={{ fontSize: "24px" }}
              onClick = {this.handleBackClick.bind(this)}
            >
              <i className="bi bi-arrow-left"></i>
            </Button>
          </Navbar.Brand> }
         {indexOfSelected !== questions.length - 1 &&
          <Navbar.Brand style={{ marginLeft: "auto", marginRight: 0 }}>
            <Button
              variant="outline-dark"
              className="rounded-circle"
              style={{ fontSize: "24px" }}
              onClick = {this.handleNextClick.bind(this)}
            > 
              <i className="bi bi-arrow-right"></i>
            </Button>
          </Navbar.Brand>}
          {indexOfSelected === questions.length - 1 &&
          <Navbar.Brand style={{ marginLeft: "auto", marginRight: 0 }}>
            <Button
              variant="outline-dark"
              className="rounded-circle"
              style={{ fontSize: "24px" }}
              onClick = {this.handleSaveAndSendClick.bind(this)}
            > 
              <i className="bi bi-arrow-right"></i>
            </Button>
          </Navbar.Brand>}
        </Navbar>
      </Form>  : 
      <Card className="text-center">
        <Card.Header>Please select question</Card.Header>
      </Card> } </Grammarly>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
    main: state.main,
    takeTest: state.takeTest,
  };
}

export default withRouter(
  connect(mapStateToProps, {ChangeAnswers, InputChange, SetSelectedQ, ResetTakeTestState, SetOpen  })(
    TestConstructor
  )
);
