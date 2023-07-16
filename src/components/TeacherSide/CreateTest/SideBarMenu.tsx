import React, { Component, useState } from "react";
import { connect } from "react-redux";
import { SetOpen } from "../../MainAction";
import SidebarMenu from "react-bootstrap-sidebar-menu";
import { Button, Card, Col, Row, Nav } from "react-bootstrap";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {
  AddQuestion,
  ChangeQuestions,
  SetSelectedQ,
} from "./CreateTestActions";
import { useAppDispatch } from "../../../app/hooks";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { IQuestion } from "../../../interfaces/Questions";
const SideBarMenu = () => {
  const dispatch = useAppDispatch();
  const createTest = useSelector((state: RootState) => state.createTest);
    const [state, setState] = useState({
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
      }})

      const onDragEnd = (result: any) => {
        if (!result.destination) {
          return;
        }
        
        const { questions } = createTest;
        
        if (questions) {
          const reorderedQuestion = questions.splice(result.source.index, 1)[0];
          questions.splice(result.destination.index, 0, reorderedQuestion);
          dispatch(ChangeQuestions(questions));
        }
      }
      

  const AddQuestionHandler = () => {
    let questions = createTest.questions;
    if(questions){
    const objWithLargestId = questions.reduce((prev: any, current: any) => {
      return prev.id > current.id ? prev : current;
    });
    let nextQuestionId = objWithLargestId.id + 1;
    let question: IQuestion = {
      ...state.defaultQuestion,
      id: nextQuestionId,
      title: "Question " + (nextQuestionId + 1),
    };
    let updatedQuestions = questions.map((obj: any, index: any) => {
      return { ...obj, selected: false };
    });
    dispatch(ChangeQuestions(updatedQuestions));
    dispatch(AddQuestion(question));
  }}
  const handleQestionDelete = (event:any) => {
    let questions = createTest.questions;
    if(questions){
    const selectedQuestion = questions.find(
      (question: any) => question.selected === true
    );
    let updatedQuestions = questions.filter(
      (question: any) => question.id.toString() !== event.target.id.toString()
    );
    
    if (selectedQuestion?.id.toString() === event.target.id.toString()) {
      let questionToDel = questions.find(
        (question: any) => question.id.toString() === event.target.id.toString()
      );
      const indexToDel = questions.indexOf(questionToDel!);
      if(indexToDel === 0){
        updatedQuestions = updatedQuestions.map((obj: any, index: any) => {
          if (index === indexToDel + 1) {
            return { ...obj, selected: true };
          }
          return { ...obj, selected: false };
        });
      } else {
        updatedQuestions = updatedQuestions.map((obj: any, index: any) => {
          if (index === indexToDel - 1) {
            return { ...obj, selected: true };
          }
          return { ...obj, selected: false };
        });
      }
    }
    if(questions.length === 1){
      updatedQuestions = [state.defaultQuestion];
    }
   
    dispatch(ChangeQuestions(updatedQuestions));
  }
}
  const handleCardClick = (event: any) => {
    dispatch(SetSelectedQ(event.currentTarget.id));
  }

    let { questions } = createTest;
    
    const selectedQuestion = questions?.find(
      (question: IQuestion) => question.selected === true
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
            <DragDropContext onDragEnd={onDragEnd}>
              <Row xs={1} md={1} className="g-2">
                <Droppable droppableId="questions">
                  {(provided) => (
                    <div ref={provided.innerRef} {...provided.droppableProps}>
                      {questions && questions.map((question: any, index: any) => (
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
                                border={
                                 (selectedQuestion && selectedQuestion.id === question.id) ?
                                  "primary" : undefined
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
                                    id={question.id.toString()}
                                    onClick={handleCardClick}
                                  >
                                    {question.title.substring(0, 10)}
                                  </span>
                                  <i
                                    className="bi bi-trash-fill"
                                    style={{ float: "right" }}
                                    id={question.id.toString()}
                                    onClick={handleQestionDelete}
                                  ></i>
                                </Card.Body>
                              </Card>
                              {/* {provided.placeholder} */}
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
              onClick={AddQuestionHandler}
            >
              <i className="bi bi-plus-lg"></i> Add question
            </Button>
          </SidebarMenu.Body>
        </SidebarMenu>
      </Nav>
    );
  }


export default SideBarMenu;
