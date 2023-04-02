import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "../../../utils/withRouter";
import { SetOpen } from "../../MainAction";
import SidebarMenu from "react-bootstrap-sidebar-menu";
import { Button, Card, Col, Row, Nav } from "react-bootstrap";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {
  AddQuestion,
  ChangeQuestions,
  SetSelectedQ,
} from "./CreateTestActions";
class SideBarMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultQuestion: {
        id: 0,
        title: "Question",
        comment: "",
        maxPoints: 1,
        shuffleOptions: true,
        aiCheck: true,
        plagiarismCheck: true,
        allowFiles: false,
        type: 0,
        selected: true,
        files: [],
        previews: [],
        answerOptions: [{ id: 0, text: "", isRight: false }],
      },
    };
  }
  onDragEnd(result) {
    if (!result.destination) {
      return;
    }
    const { questions } = this.props.createTest;
    const [reorderedQuestion] = questions.splice(result.source.index, 1);
    questions.splice(result.destination.index, 0, reorderedQuestion);
    this.props.ChangeQuestions(questions);
  }

  AddQuestionHandler() {
    let questions = this.props.createTest.questions;
    const objWithLargestId = questions.reduce((prev, current) => {
      return prev.id > current.id ? prev : current;
    });
    let nextQuestionId = objWithLargestId.id + 1;
    let question = {
      ...this.state.defaultQuestion,
      id: nextQuestionId,
      title: "Question " + (nextQuestionId + 1),
    };
    let updatedQuestions = questions.map((obj, index) => {
      return { ...obj, selected: false };
    });
    this.props.ChangeQuestions(updatedQuestions);
    this.props.AddQuestion(question);
  }
  handleQestionDelete(event) {
    let questions = this.props.createTest.questions;
    const selectedQuestion = questions.find(
      (question) => question.selected === true
    );
    let updatedQuestions = questions.filter(
      (question) => question.id.toString() !== event.target.id.toString()
    );
    
    if (selectedQuestion.id.toString() === event.target.id.toString()) {
      let questionToDel = questions.find(
        (question) => question.id.toString() === event.target.id.toString()
      );
      const indexToDel = questions.indexOf(questionToDel);
      if(indexToDel === 0){
        updatedQuestions = updatedQuestions.map((obj, index) => {
          if (index === indexToDel + 1) {
            return { ...obj, selected: true };
          }
          return { ...obj, selected: false };
        });
      } else {
        updatedQuestions = updatedQuestions.map((obj, index) => {
          if (index === indexToDel - 1) {
            return { ...obj, selected: true };
          }
          return { ...obj, selected: false };
        });
      }
    }
    if(questions.length === 1){
      updatedQuestions = [this.state.defaultQuestion];
    }
   
    this.props.ChangeQuestions(updatedQuestions);
  }
  handleCardClick(event) {
    this.props.SetSelectedQ(event.currentTarget.id);
  }
  render() {
    const { questions } = this.props.createTest;
    const selectedQuestion = questions.find(
      (question) => question.selected === true
    );
    return (
      <Nav className="left-sidebar">
        <SidebarMenu>
          <SidebarMenu.Header>
            <SidebarMenu.Brand
              as="h3"
              style={{ fontWeight: "bold", textAlign: "left", marginLeft: 20, color:"#000a55" }}
            >
              Questions
            </SidebarMenu.Brand>
          </SidebarMenu.Header>
          <SidebarMenu.Body style={{ marginTop: 10 }}>
            <DragDropContext onDragEnd={this.onDragEnd.bind(this)}>
              <Row xs={1} md={1} className="g-2">
                <Droppable droppableId="questions">
                  {(provided) => (
                    <div ref={provided.innerRef} {...provided.droppableProps}>
                      {questions.map((question, index) => (
                        <Draggable
                          key={question.id}
                          draggableId={question.title + question.id}
                          index={index}
                        >
                          {(provided) => (
                            <Col
                              style={{
                                marginBottom: 10,
                                marginLeft: 30,
                                width: "95%",
                              }}
                            >
                              <Card
                                size="sm"
                                border={
                                  selectedQuestion.id === question.id &&
                                  "primary"
                                }
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                                <Card.Body
                                  style={{ fontWeight: "bold", padding: 10 }}
                                >
                                  <i className="bi bi-grip-vertical"></i>
                                  <span
                                    id={question.id}
                                    onClick={this.handleCardClick.bind(this)}
                                  >
                                    {question.title.substring(0, 10)}
                                  </span>
                                  <i
                                    className="bi bi-trash-fill"
                                    style={{ float: "right" }}
                                    id={question.id}
                                    onClick={this.handleQestionDelete.bind(
                                      this
                                    )}
                                  ></i>
                                </Card.Body>
                              </Card>
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
              style={{ marginLeft: 30, marginTop: 10, width: "90%" }}
              onClick={this.AddQuestionHandler.bind(this)}
            >
              <i className="bi bi-plus-lg"></i> Add question
            </Button>
          </SidebarMenu.Body>
        </SidebarMenu>
      </Nav>
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
  connect(mapStateToProps, {
    SetOpen,
    AddQuestion,
    ChangeQuestions,
    SetSelectedQ,
  })(SideBarMenu)
);
