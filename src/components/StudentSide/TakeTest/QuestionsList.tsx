import React, { Component, useState } from "react";
import { connect } from "react-redux";
import { SetOpen } from "../../MainAction";
import SidebarMenu from "react-bootstrap-sidebar-menu";
import { Button, Card, Col, Row, Nav, Badge, Form } from "react-bootstrap";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {
  SetSelectedQ,
} from "./TakeTestActions";
import { useAppDispatch } from "../../../app/hooks";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { IQuestion } from "../../../interfaces/Questions";

const QuestionsList = () => {
  const dispatch = useAppDispatch();
  const takeTest = useSelector((state: RootState) => state.takeTest);

  const handleCardClick = (event: any) => {
    dispatch(SetSelectedQ(event.currentTarget.id));
  };

  let { questions } = takeTest;
  return (
    <div>
      <Row xs={1} md={1} className="g-2">
        {questions &&
          questions.map((question: any, index: any) => (
            <Col style={{ marginBottom: 5 }}>
              <Card>
                <Card.Body
                  style={{ fontWeight: "bold", padding: 10 }}
                  className="d-flex align-items-center"
                >
                  <Badge bg="secondary" className="me-2">
                    {question.id + 1}
                  </Badge>
                  <span
                    id={question.id.toString()}
                    onClick={handleCardClick}
                    className="flex-grow-1"
                  >
                    {question.title}
                  </span>
                </Card.Body>
              </Card>
            </Col>
          ))}
      </Row>
    </div>
  );
};

export default QuestionsList;
