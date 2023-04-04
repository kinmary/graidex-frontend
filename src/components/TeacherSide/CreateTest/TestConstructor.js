import React, { Component } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { Button, Card, Col, Form, InputGroup, Navbar, Row } from "react-bootstrap";
import { connect } from "react-redux";
import { withRouter } from "../../../utils/withRouter";
import { AddAnswer, InputChange, ChangeAnswers, SetSelectedQ } from "./CreateTestActions";
import DropZone from "./DropZone";
class TestConstructor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultAnswer: { id: 0, text: "", isRight: false },
      file: null,
      preview: "",
      addFile: false,
    };
  }
  onInputChange(event, data) {
    const { questions } = this.props.createTest;
    const id = questions.find((question) => question.selected === true).id;
    this.props.InputChange(id, event.target.name, event.target.value);
  }

  onDragEnd(result) {
    if (!result.destination) {
      return;
    }
    const { questions } = this.props.createTest;
    const selectedQuestion = questions.find(
      (question) => question.selected === true
    );
    const answers = selectedQuestion.answerOptions;
    const id = selectedQuestion.id;
    const [reorderedQuestion] = answers.splice(result.source.index, 1);
    answers.splice(result.destination.index, 0, reorderedQuestion);
    this.props.ChangeAnswers(id, answers);
  }

  addAnswerOptionHandler() {
    const { questions } = this.props.createTest;
    const selectedQuestion = questions.find(
      (question) => question.selected === true
    );
    const objWithLargestId = selectedQuestion.answerOptions.reduce(
      (prev, current) => {
        return prev.id > current.id ? prev : current;
      }
    );
    let nextOptionId = objWithLargestId.id + 1;
    let answer = {
      ...this.state.defaultAnswer,
      id: nextOptionId,
    };
    this.props.AddAnswer(selectedQuestion.id, answer);
  }

  handleCheck(event) {
    const { questions } = this.props.createTest;
    const selectedQuestion = questions.find(
      (question) => question.selected === true
    );
    let id = selectedQuestion.id;
    let type = selectedQuestion.type;
    let updated = selectedQuestion.answerOptions;
    if (type === 0) {
      updated = selectedQuestion.answerOptions.map((answer) =>
        answer.id.toString() === event.target.name.toString()
          ? { ...answer, isRight: true }
          : { ...answer, isRight: false }
      );
    } else {
      updated = selectedQuestion.answerOptions.map((answer) =>
        answer.id.toString() === event.target.name.toString()
          ? { ...answer, isRight: event.target.checked }
          : answer
      );
    }

    this.props.ChangeAnswers(id, updated);
  }
  handleOptionDelete(event) {
    let questions = this.props.createTest.questions;
    const selectedQuestion = questions.find(
      (question) => question.selected === true
    );
    let updatedAnswers = selectedQuestion.answerOptions.filter(
      (answer) => answer.id.toString() !== event.target.id.toString()
    );
    if(updatedAnswers.length === 0){
      updatedAnswers = [this.state.defaultAnswer];
    }
    this.props.ChangeAnswers(selectedQuestion.id, updatedAnswers);
  }

  handleAnswerOptionChange(event, data) {
    const { questions } = this.props.createTest;
    const selectedQuestion = questions.find(
      (question) => question.selected === true
    );
    let id = selectedQuestion.id;
    let updated = selectedQuestion.answerOptions.map((answer) =>
      answer.id.toString() === event.target.name.toString()
        ? { ...answer, text: event.target.value }
        : { ...answer }
    );
    this.props.ChangeAnswers(id, updated);
  }

  handleImageDrop(acceptedFiles) {
    const file = acceptedFiles[0];
    this.setState({ file: file });
    this.setState({ preview: URL.createObjectURL(file) });
  }
  closeImage(){
    this.setState({ addFile: false });
    const { questions } = this.props.createTest;
    const id = questions.find((question) => question.selected === true).id;
    this.props.InputChange(id, "files", []);
    this.props.InputChange(id, "previews", []);
  }
  handleBackClick() {
    const { questions } = this.props.createTest;
    const selectedQuestion = questions.find(
      (question) => question.selected === true
    );
    const index = questions.indexOf(selectedQuestion);
    let setSelected = questions[index - 1];
    this.props.SetSelectedQ(setSelected.id);
  }
  handleNextClick() {
    const { questions } = this.props.createTest;
    const selectedQuestion = questions.find(
      (question) => question.selected === true
    );
    const index = questions.indexOf(selectedQuestion);
    let setSelected = questions[index + 1];
    this.props.SetSelectedQ(setSelected.id);
  }

  render() {
    let { questions } = this.props.createTest;
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
       
        <> {selectedQuestion ? <Form>
        {/* {selectedQuestion.type === 2 && ( */}
        <Navbar
          bg="light"
          variant="light"
          style={{
            borderRadius: "5px 5px 0px 0px",
            padding: "0px 0px",
          }}
        >
          {/* //TODO: bold italic underline  */}
          <Navbar.Brand style={{ marginLeft: "auto", marginRight: 10 }}>
            <i
              className="bi bi-paperclip"
              onClick={() => {
                this.setState({ addFile: true });
              }}
            ></i>
          </Navbar.Brand>
        </Navbar>
        {/* )}  */}

        <Form.Control
          as="textarea"
          rows={selectedQuestion.type !== 2 ? 2 : 5}
          size="lg"
          name="title"
          required
          placeholder="Enter question here"
          onChange={this.onInputChange.bind(this)}
          value={selectedQuestion.title}
          style={{
            marginBottom: 20,
            fontWeight: "bold",
            borderRadius: "0px 0px 5px 5px",
          }}
        />
         {this.state.addFile && (
          <>
            <Navbar
              bg="light"
              variant="light"
              style={{
                borderRadius: "5px 5px 0px 0px",
                padding: "0px 0px",
              }}
            >
              {/* //TODO: bold italic underline  */}
              <Navbar.Brand style={{ marginLeft: "auto", marginRight: 10 }}>
                <i
                  className="bi bi-x"
                  onClick={this.closeImage.bind(this)}
                ></i>
              </Navbar.Brand>
            </Navbar>
            <DropZone
              onDrop={this.handleImageDrop.bind(this)}
              id={selectedQuestion.id}
              files={selectedQuestion.files}
              previews={selectedQuestion.previews}
            />
          </>
        )}
        {selectedQuestion.type !== 2 && (
          <>
            <DragDropContext onDragEnd={this.onDragEnd.bind(this)} >
              <Row xs={1} md={1} className="g-2">
                <Droppable droppableId="answerOptions">
                  {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                      {answerOptions.map((answer, _idx) => (
                        <Draggable
                          key={answer.id}
                          draggableId={answer.id.toString()}
                          index={_idx}
                        >
                          {(provided) => (
                            <Col>
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className="mb-3"
                              >
                                <InputGroup
                                  style={{
                                    alignItems: "center",
                                    width: "50%",
                                  }}
                                >
                                  <i className="bi bi-grip-vertical"></i>
                                  <Form.Check
                                    type={
                                      selectedQuestion.type === 0
                                        ? "radio"
                                        : "checkbox"
                                    }
                                    style={{ marginRight: 10 }}
                                    name={answer.id}
                                    checked={answer.isRight}
                                    onChange={this.handleCheck.bind(this)}
                                  />
                                  <Form.Control
                                    placeholder={
                                      "Answer option " + (answer.id + 1)
                                    }
                                    as="textarea"
                                    rows={1}
                                    required
                                    name={answer.id}
                                    value={answer.text}
                                    onChange={this.handleAnswerOptionChange.bind(
                                      this
                                    )}
                                  />
                                  <i
                                    className="bi bi-x-lg"
                                    color="black"
                                    style={{ marginLeft: 5 }}
                                    id={answer.id}
                                    onClick={this.handleOptionDelete.bind(this)}
                                  ></i>
                                </InputGroup>
                              </div>
                              {provided.placeholder}
                            </Col>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </Row>
            </DragDropContext>
            <Button
              color="primary"
              style={{ marginLeft: 40, marginTop: 0, width: "25%" }}
              onClick={this.addAnswerOptionHandler.bind(this)}
            >
              <i className="bi bi-plus-lg"></i>
              Add answer option
            </Button>
          </>
        )}
       
        <Form.Control
          as="textarea"
          rows={5}
          placeholder="Add default comment for the task solution"
          name="comment"
          value={selectedQuestion.comment}
          onChange={this.onInputChange.bind(this)}
          style={{ marginTop: 40 }}
        />
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
        </Navbar>
      </Form>  : 
      <Card className="text-center">
        <Card.Header>Please select question to edit</Card.Header>
      </Card> } </>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
    main: state.main,
    createTest: state.createTest,
  };
}

export default withRouter(
  connect(mapStateToProps, { InputChange, AddAnswer, ChangeAnswers, SetSelectedQ })(
    TestConstructor
  )
);
