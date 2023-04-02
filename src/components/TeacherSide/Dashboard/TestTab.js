import React, { Component } from "react";
import { Button, Tabs } from "react-bootstrap";
import { connect } from "react-redux";
import { withRouter } from "../../../utils/withRouter";
import { SetOpen, SetMessageOpen } from "../../MainAction";
import { AgGridReact } from "ag-grid-react";
import { AnswerGridCol } from "../../../constants/AnswerGridColumns";
import MessageModal from "./Modals/MessageModal";
import { Tab } from "bootstrap";
import AnswersGrid from "./AnswersGrid";

class TestsGrid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //! Status here probably is not needed?
      rowData: [
        {
          status: 0,
          studentId: "IF2000001",
          studentName: "Mariia Kindratyshyn",
          date: "2023-04-05",
          duration: "01:26",
          mark: 9.55,
        },
        {
          status: 0,
          studentId: "",
          studentName: "Barys Shauchuk",
          date: "2023-04-05",
          duration: "01:22",
          mark: 9.87,
        },
        {
          status: 0,
          studentId: "",
          studentName: "Ilaryon Saladkou",
          date: "2023-04-05",
          duration: "01:01",
          mark: 10,
        },
      ],

      noAnswersMessage: "This test has no answers yet",
      inProgressMessage:
        "This test is currently in progress, please close it to proceed",
    };
  }

  onGridReady = (params) => {
    this.gridApi = params.api;
    this.columnApi = params.columnApi;
  };

  render() {
    return (
      <>
        <MessageModal />
        {/* //TODO: Add breadcrumbs */}
        <div
          style={{
            marginTop: "80px",
            paddingLeft: "50px",
            paddingRight: "50px",
          }}
        >
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 5 }}>
            <h3 style={{ fontWeight: "bold", textAlign: "left", margin: "0" }}>
              Test name
            </h3>
            <div style={{ marginLeft: "auto" }}>
              <Button ><i class="bi bi-pencil-square"></i> Edit test</Button>
            </div>
          </div>

          <Tabs fill defaultActiveKey="settings"  style={{ marginLeft: "auto", marginRight: 0 }}>
          <Tab eventKey="settings" title="Settings"></Tab>
            <Tab eventKey="answers" title="Answers" >
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
  };
}

export default withRouter(
  connect(mapStateToProps, { SetOpen, SetMessageOpen })(TestsGrid)
);
