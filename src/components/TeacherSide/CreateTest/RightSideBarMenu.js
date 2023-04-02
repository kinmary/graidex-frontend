import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "../../../utils/withRouter";
import SidebarMenu from "react-bootstrap-sidebar-menu";
import { Accordion, Card, Form, Nav } from "react-bootstrap";
import { InputChange, ChangeAnswers } from "./CreateTestActions";

class RightSideBarMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      types: [
        { type: 0, name: "Single Choice" },
        { type: 1, name: "Multiple Choice" },
        { type: 2, name: "Open Question" },
      ],
    };
  }
  handleCheckBoxChange(event, data) {
    const { questions } = this.props.createTest;
    const id = questions.find((question) => question.selected === true).id;
    this.props.InputChange(id, event.target.name, event.target.checked);
  }
  onInputChange(event, data) {
    const { questions } = this.props.createTest;
    const id = questions.find((question) => question.selected === true).id;
    this.props.InputChange(id, event.target.name, parseInt(event.target.value));
  }
  onTypeChange(event) {
    const { questions } = this.props.createTest;
    const selectedQuestion = questions.find(
      (question) => question.selected === true
    );
    let answerOptions = selectedQuestion.answerOptions.map((answer) => {
      return { ...answer, isRight: false };
    });
    this.props.InputChange(
      selectedQuestion.id,
      "type",
      parseInt(event.target.id)
    );
    this.props.ChangeAnswers(selectedQuestion.id, answerOptions);
  }

  render() {
    const { questions } = this.props.createTest;
    const selectedQuestion = questions.find(
      (question) => question.selected === true
    );
    const typeObj = this.state.types.find(
      (t) => t.type === selectedQuestion.type
    );
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
            <Accordion>
              <Accordion.Item eventKey="0" style={{ border: "none" }}>
                <Accordion.Header style={{ textAlign: "left" }}>
                  {typeObj.name}
                </Accordion.Header>
                <Accordion.Body
                  id="0"
                  onClick={this.onTypeChange.bind(this)}
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
                  onClick={this.onTypeChange.bind(this)}
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
                  onClick={this.onTypeChange.bind(this)}
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
                  onChange={this.handleCheckBoxChange.bind(this)}
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
                   onChange={this.handleCheckBoxChange.bind(this)}
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
                   onChange={this.handleCheckBoxChange.bind(this)}
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
                  min={1}
                  style={{
                    marginRight: "5px",
                    textAlign: "center",
                    width: "30%",
                    padding: 1.5,
                  }}
                  name="maxPoints"
                  value={selectedQuestion.maxPoints}
                  onChange={this.onInputChange.bind(this)}
                />
              </Card.Body>
            </Card>
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
  connect(mapStateToProps, { InputChange, ChangeAnswers })(RightSideBarMenu)
);
