import React, { Component, useState } from "react";
import { connect } from "react-redux";
import { SetOpen } from "../../MainAction";
import SidebarMenu from "react-bootstrap-sidebar-menu";
import { Button, Card, Col, Row, Nav, Badge, Form } from "react-bootstrap";
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

const QuestionsDraggableList = () => {
  const dispatch = useAppDispatch();
  const createTest = useSelector((state: RootState) => state.createTest);
  const [state, setState] = useState({
    defaultQuestion: {
      id: 0,
      title: "Question",
      feedback: "",
      maxPoints: 1,
      shuffleOptions: true,
      aiCheck: true,
      plagiarismCheck: true,
      allowFiles: false,
      type: 0,
      selected: true,
      files: [],
      previews: [],
      answerOptions: [{ id: 0, text: "", isCorrect: false }],
    },
  });

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
  };

  const handleQuestionDelete = (event: any) => {
    let questions = createTest.questions;
    if (questions) {
      const selectedQuestion = questions.find(
        (question: any) => question.selected === true
      );

      let updatedQuestions = questions.filter(
        (question: any) => question.id.toString() !== event.target.id.toString()
      );

      if (selectedQuestion?.id.toString() === event.target.id.toString()) {
        let questionToDel = questions.find(
          (question: any) =>
            question.id.toString() === event.target.id.toString()
        );

        const indexToDel = questions.indexOf(questionToDel!);
        if (indexToDel === 0) {
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

      if (questions.length === 1) {
        updatedQuestions = [state.defaultQuestion];
      }

      dispatch(ChangeQuestions(updatedQuestions));
    }
  };

  const handleCardClick = (event: any) => {
    dispatch(SetSelectedQ(event.currentTarget.id));
  };

  let { questions } = createTest;

  const selectedQuestion = questions?.find(
    (question: IQuestion) => question.selected === true
  );

  return (
    <div>
      <DragDropContext onDragEnd={onDragEnd}>
        {/* <Row xs={1} md={1} className="g-2"> */}
          <Droppable droppableId="questions">
            {(provided, snapshot) => (
              <Row
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {questions &&
                  questions.map((question: any, index: any) => (
                    <Draggable
                      key={question.id + question.title}
                      draggableId={question.title + question.id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <Card style={{ margin: 5 }}>
                            <Card.Body
                              style={{ fontWeight: "bold", padding: 10 }}
                              className="d-flex align-items-center"
                            >
                              <i
                                className="bi bi-grip-vertical"
                                {...provided.dragHandleProps}
                              ></i>
                              <Badge bg="secondary" className="me-2">
                                {index + 1}
                              </Badge>
                              <span
                                id={question.id.toString()}
                                onClick={handleCardClick}
                                className="flex-grow-1"
                              >
                                {question.title}
                              </span>
                              <i
                                style={{ cursor: "pointer" }}
                                className="bi bi-trash-fill"
                                id={question.id.toString()}
                                onClick={handleQuestionDelete}
                              ></i>
                            </Card.Body>
                          </Card>
                        </div>
                      )}
                    </Draggable>
                  ))}
                {provided.placeholder}
              </Row>
            )}
          </Droppable>
        {/* </Row> */}
      </DragDropContext>
    </div>
  );
};

export default QuestionsDraggableList;
