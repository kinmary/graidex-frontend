import React, { Component } from "react";
import { Breadcrumb, Button, Tabs } from "react-bootstrap";
import { connect } from "react-redux";
import { withRouter } from "../../utils/withRouter";
import { SetOpen, SetMessageOpen } from "../MainAction";
import MessageModal from "../Modals/MessageModal";
import { Tab } from "bootstrap";
import AnswersGrid from "./AnswersGrid";
import Settings from "./Settings";
import { ChangeQuestions, ChangeTitle } from "../TeacherSide/CreateTest/CreateTestActions";
import { testExample } from "../../constants/TestExample";

class TestTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      noAnswersMessage: "This test has no answers yet",
      inProgressMessage:
        "This test is currently in progress, please close it to proceed",
    };
  }

  onGridReady = (params) => {
    this.gridApi = params.api;
    this.columnApi = params.columnApi;
  };
  onEditTestClick(){
    this.props.SetOpen("editTestPage", true);
    this.props.SetOpen("createTestPage", true);
    this.props.ChangeQuestions(testExample);
    this.props.ChangeTitle(this.props.main.selectedTest.examName);
    this.props.navigate("/"+this.props.main.selectedSubjectId + "/test/edit-test")
  }

  render() {
    const {selectedSubjectId, selectedTest} = this.props.main;
    return (
      <>
        <MessageModal />
        <div
          style={{
            marginTop: "80px",
            paddingLeft: "50px",
            paddingRight: "50px",
            height: "100vh"
          }}
        >
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 5 }}>
            <h3 style={{ fontWeight: "bold", textAlign: "left", margin: "0" }}>
              {selectedTest.examName}
            </h3>
            <div style={{ marginLeft: "auto" }}>
              <Button onClick = {this.onEditTestClick.bind(this)}><i className="bi bi-pencil-square"></i> Edit test</Button>
            </div>
          </div>
          <Breadcrumb>
        <Breadcrumb.Item onClick={()=> {this.props.navigate("/")}}> Dashboard</Breadcrumb.Item>
        <Breadcrumb.Item onClick={()=> {this.props.navigate(-1)}}> {selectedSubjectId} </Breadcrumb.Item>
        <Breadcrumb.Item active> {selectedTest.examName} </Breadcrumb.Item>
      </Breadcrumb>
          <Tabs fill defaultActiveKey={selectedTest.status !== 2 ? "settings" : "answers"}  style={{ marginLeft: "auto", marginRight: 0 }}>
          <Tab eventKey="settings" title="Settings">
          <Settings />
          </Tab>
            <Tab eventKey="answers" disabled={selectedTest.status !== 2} title="Answers" >
              <AnswersGrid />
            </Tab>
          </Tabs>
        </div>
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
    main: state.main,
    createTest: state.createTest
  };
}

export default withRouter(
  connect(mapStateToProps, { SetOpen, SetMessageOpen, ChangeQuestions, ChangeTitle })(TestTab)
);
