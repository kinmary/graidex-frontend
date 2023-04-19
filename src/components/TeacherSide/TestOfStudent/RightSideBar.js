import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "../../../utils/withRouter";
import SidebarMenu from "react-bootstrap-sidebar-menu";
import { Accordion, Card, Form, Nav } from "react-bootstrap";
import { ChangeQuestionAttr } from "./TestOfStudentActions";
import { GrammarlyEditorPlugin } from "@grammarly/editor-sdk-react";
import { GRAMMARLY_CLIENT_ID } from "../../../constants/config";

class RightSideBar extends Component {
  handleCommentChange(event) {
    const questions = this.props.test.studentAnswers.find(
      (student) => student.studentName === this.props.main.studentName
    ).questions;
    const selectedQuestion = questions.find((question) => question.selected);
    if(selectedQuestion){
      this.props.ChangeQuestionAttr(this.props.main.studentName, selectedQuestion.id, "comment", event.target.value);
    }
  }
  
  render() {
    const questions = this.props.test.studentAnswers.find(
      (student) => student.studentName === this.props.main.studentName
    ).questions;
    const selectedQuestion = questions.find((question) => question.selected);
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
            onChange={this.handleCommentChange.bind(this)}
            value={selectedQuestion.comment}
            />
            </GrammarlyEditorPlugin>
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
    test: state.testOfStudent,
  };
}

export default withRouter(
  connect(mapStateToProps, {ChangeQuestionAttr })(RightSideBar)
);
