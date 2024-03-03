import React, { Component, useState } from "react";
import { connect } from "react-redux";
import SidebarMenu from "react-bootstrap-sidebar-menu";
import { Accordion, Card, Form, Nav } from "react-bootstrap";
import { InputChange, ChangeAnswers } from "./CreateTestActions";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../../app/hooks";
import { RootState } from "../../../app/store";

const RightSideBarMenu = () => {
  const dispatch = useAppDispatch();
  const createTest = useSelector((state: RootState) => state.createTest);
  const [state, setState] = useState({types: [
    { type: 0, name: "Single Choice" },
    { type: 1, name: "Multiple Choice" },
    { type: 2, name: "Open Question" },
  ]})

  const handleCheckBoxChange = (event: any, data: any) =>{
    const { questions } = createTest;
    if (questions) {
      const question = questions.find((question: any) => question.selected === true);
      if (question) {
        const id = question.id;
    dispatch(InputChange(id, event.target.name, event.target.checked))}}
  }
  const onInputChange = (event: any, data: any) => {
    const { questions } = createTest;
    if (questions) {
      const question = questions.find((question: any) => question.selected === true);
      if (question) {
        const id = question.id;
    dispatch(InputChange(id, event.target.name, parseInt(event.target.value)))}}
  }
  
  const onTypeChange = (event: any) => {
    const { questions } = createTest;
    const selectedQuestion = questions?.find(
      (question: any) => question.selected === true
    );
    if(selectedQuestion){
      let answerOptions = selectedQuestion.answerOptions.map((answer: any) => {
        return { ...answer, isCorrect: false };
      });
      dispatch(InputChange(
        selectedQuestion.id,
        "type",
        parseInt(event.target.id)
      ));
      dispatch(ChangeAnswers(selectedQuestion.id, answerOptions));
    }
  }


    let { questions } = createTest;
    
    const selectedQuestion = questions?.find(
      (question: any) => question.selected === true
    );
    let typeObj: any = {};
    if(selectedQuestion){
      typeObj = state.types.find(
        (t) => t.type === selectedQuestion.type
      );
    }
    return (
      <Nav className="sidebar">
        <SidebarMenu>
          <SidebarMenu.Header>
            <SidebarMenu.Brand
              as="h3"
              style={{ fontWeight: "bold", textAlign: "left", marginLeft: 10, color:"#000a55" }}
            >
              Properties
            </SidebarMenu.Brand>
          </SidebarMenu.Header>
          <SidebarMenu.Body style={{ marginTop: 10, marginRight: 20 }}>
          {selectedQuestion &&
          <>
            <Accordion>
              <Accordion.Item eventKey="0" style={{ border: "none" }}>
                <Accordion.Header style={{ textAlign: "left" }}>
                  {typeObj.name}
                </Accordion.Header>
                <Accordion.Body
                  id="0"
                  onClick={onTypeChange}
                  style={{
                    marginLeft: 10,
                    backgroundColor:
                      selectedQuestion.type === 0 ? "#f7f7f7" : "white",
                  }}
                >
                  Single Choice
                </Accordion.Body>
                <Accordion.Body
                  id="1"
                  onClick={onTypeChange}
                  style={{
                    marginLeft: 10,
                    backgroundColor:
                      selectedQuestion.type === 1 ? "#f7f7f7" : "white",
                  }}
                >
                  Multiple Choice
                </Accordion.Body>
                <Accordion.Body
                  id="2"
                  onClick={onTypeChange}
                  style={{
                    marginLeft: 10,
                    backgroundColor:
                      selectedQuestion.type === 2 ? "#f7f7f7" : "white",
                  }}
                >
                  Open Question
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>

            <Card style={{ border: "none" }}>
              <Card.Body
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div style={{ marginLeft: 4 }}>
                  {selectedQuestion.type === 2 ? "AI Check" : "Shuffle options"}
                </div>
                <Form.Check
                  name={
                    selectedQuestion.type === 2 ? "aiCheck" : "shuffleOptions"
                  }
                  type="checkbox"
                  disabled={selectedQuestion.type === 2 }
                  style={{ marginRight: 5 }}
                  checked={selectedQuestion.type === 2 ? selectedQuestion.aiCheck : selectedQuestion.shuffleOptions}
                  onChange={() => handleCheckBoxChange}
                />
              </Card.Body>
            </Card>
            {selectedQuestion.type === 2 && 
               <Card style={{ border: "none" }}>
               <Card.Body
                 style={{
                   display: "flex",
                   justifyContent: "space-between",
                   alignItems: "center",
                 }}
               >
                 <div style={{ marginLeft: 4 }}>
                   Allow Files
                 </div>
                 <Form.Check
                   name="allowFiles"
                   type="checkbox"
                   disabled={selectedQuestion.aiCheck === true}
                   style={{ marginRight: 5 }}
                   checked={selectedQuestion.allowFiles}
                   onChange={() => handleCheckBoxChange}
                 />
               </Card.Body>
               </Card>}
               {selectedQuestion.type === 2 && 
               <Card style={{ border: "none" }}>
               <Card.Body
                 style={{
                   display: "flex",
                   justifyContent: "space-between",
                   alignItems: "center",
                 }}
               >
                 <div style={{ marginLeft: 4 }}>
                   Plagiarism
                 </div>
                 <Form.Check
                   name="plagiarismCheck"
                   type="checkbox"
                   style={{ marginRight: 5 }}
                   checked={selectedQuestion.plagiarismCheck}
                   onChange={() => handleCheckBoxChange}
                 />
               </Card.Body>
               </Card>}
            <Card style={{ border: "none" }}>
              <Card.Body
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Form.Label
                  style={{
                    margin: "0",
                    marginLeft: "4px",
                    textAlign: "left",
                  }}
                >
                 {selectedQuestion.type === 1 ? "Points/Answer" : "Max Points"} 
                </Form.Label>
                <Form.Control
                  type="number"
                  autoComplete="off"
                  min={1}
                  style={{
                    marginRight: "5px",
                    textAlign: "center",
                    width: "30%",
                    padding: 1.5,
                  }}
                  name="maxPoints"
                  value={selectedQuestion.maxPoints}
                  onChange={() => onInputChange}
                />
              </Card.Body>
            </Card> </>}
          </SidebarMenu.Body> 
        </SidebarMenu>
      </Nav>
    );
  }

export default RightSideBarMenu;
