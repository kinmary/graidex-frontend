import React, { Component } from "react";
import { connect } from "react-redux";
import SidebarMenu from "react-bootstrap-sidebar-menu";
import { Card, Col, Nav, Row } from "react-bootstrap";
import { SetSelectedQ } from "./TestOfStudentActions";
import { useAppDispatch } from "../../app/hooks";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";

const SideBar = () => {
  const dispatch = useAppDispatch();
  const test = useSelector((state: RootState) => state.testOfStudent);
  const main = useSelector((state: RootState) => state.main);

  const handleCardClick = (event: any) => {
    dispatch(SetSelectedQ(main.studentName, event.currentTarget.id));
  }

    const questions = test.studentAnswers.find(
      (student: any) => student.studentName === main.studentName
    )?.questions;
    return (
      <Nav className="left-sidebar">
        <SidebarMenu>
          <SidebarMenu.Header>
            <SidebarMenu.Brand
              as="h3"
              style={{
                fontWeight: "bold",
                textAlign: "left",
                marginLeft: 20,
                color: "#000a55",
              }}
            >
              Questions
            </SidebarMenu.Brand>
          </SidebarMenu.Header>
          <SidebarMenu.Body
            style={{ marginTop: 10, marginLeft: 30, marginRight: 20 }}
          >
            <Row xs={1} md={3}>
              {questions?.map((question: any, idx: number) => (
                <Col key={idx} style={{ padding: 2}}>
                  <Card 
                  onClick={handleCardClick}
                  key={idx}
                    className="text-center"
                    id={question.id.toString()}
                   
                    style={{
                      backgroundColor: 
                      question.type === 2
                        ? "#75baff"
                        : question.maxPoints <= question.points!
                        ? "#5067ff"
                        : "#ff5272",
                         padding: "5px",
                         border : question.selected ? "1px solid #000a55" : undefined
                        }}
                    text="light"
                  >
                    <Card.Text>{idx + 1}</Card.Text>
                  </Card>
                </Col>
              ))}
            </Row>
          </SidebarMenu.Body>
        </SidebarMenu>
      </Nav>
    );
  }

export default SideBar;
