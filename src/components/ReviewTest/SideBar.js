import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "../../utils/withRouter";
import SidebarMenu from "react-bootstrap-sidebar-menu";
import { Card, Col, Nav, Row } from "react-bootstrap";
import { SetSelectedQ } from "./TestOfStudentActions";
class SideBar extends Component {
  handleCardClick(event) {
    this.props.SetSelectedQ(this.props.main.studentName, event.currentTarget.id);
  }
  render() {
    const questions = this.props.test.studentAnswers.find(
      (student) => student.studentName === this.props.main.studentName
    ).questions;
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
              {questions.map((question, idx) => (
                <Col key={idx} style={{ padding: 2}}>
                  <Card 
                  onClick={this.handleCardClick.bind(this)}
                  key={idx}
                    className="text-center"
                    id={question.id}
                   
                    style={{
                      backgroundColor: 
                      question.type === 2
                        ? "#75baff"
                        : question.maxPoints <= question.points
                        ? "#5067ff"
                        : "#ff5272",
                         padding: "5px",
                         border:  (question.selected) && "1px solid #000a55",                         
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
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
    main: state.main,
    test: state.testOfStudent,
  };
}

export default withRouter(connect(mapStateToProps, {SetSelectedQ})(SideBar));
