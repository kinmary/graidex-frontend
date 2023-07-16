import React, { Component } from "react";
import { connect } from "react-redux";
import SidebarMenu from "react-bootstrap-sidebar-menu";
import { Form, Nav } from "react-bootstrap";
import { ChangeQuestionAttr } from "./TestOfStudentActions";
import { GrammarlyEditorPlugin } from "@grammarly/editor-sdk-react";
import { GRAMMARLY_CLIENT_ID } from "../../constants/config";
import { useAppDispatch } from "../../app/hooks";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";

const RightSideBar = () => {
  const dispatch = useAppDispatch();
  const test = useSelector((state: RootState) => state.testOfStudent);
  const main = useSelector((state: RootState) => state.main);
  const userRole = useSelector((state: RootState) => state.auth).userRole;


  const handleCommentChange = (event: any)  => {
    const questions = test.studentAnswers.find(
      (student: any) => student.studentName === main.studentName
    )?.questions;
    const selectedQuestion = questions?.find((question: any) => question.selected);
    if(selectedQuestion){
      dispatch(ChangeQuestionAttr(main.studentName, selectedQuestion.id, "comment", event.target.value));
    }
  }
  

    const questions = test.studentAnswers.find(
      (student: any) => student.studentName === main.studentName
    )?.questions;
    const selectedQuestion = questions?.find((question: any) => question.selected);
    return (
      <Nav className="sidebar">
        <SidebarMenu>
          <SidebarMenu.Header>
            <SidebarMenu.Brand
              as="h3"
              style={{ fontWeight: "bold", textAlign: "left", marginLeft: 10, color:"#000a55" }}
            >
              Comment 
              {/* <i style={{fontSize: "20px", marginLeft: 25}} className="bi bi-pencil-fill"></i> */}
            </SidebarMenu.Brand>
          </SidebarMenu.Header>
          <SidebarMenu.Body style={{ marginTop: 10, marginRight: 20, marginLeft: 10 }}>
            <GrammarlyEditorPlugin clientId={GRAMMARLY_CLIENT_ID}>
            <Form.Control 
            as="textarea"
            rows={10}
            onChange={handleCommentChange}
            value={selectedQuestion?.comment}
            //TODO: check if readOnly is fine or make like card with text
            readOnly = {userRole === 1}
            />
            </GrammarlyEditorPlugin>
          </SidebarMenu.Body> 
        </SidebarMenu>
      </Nav>
    );
  }

export default RightSideBar;
