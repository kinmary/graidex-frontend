import React, { Component } from "react";
import { Breadcrumb, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { withRouter } from "../../../utils/withRouter";
import { SetOpen, SetMessageOpen } from "../../MainAction";
import { AgGridReact } from "ag-grid-react";
import { TestsGridCol } from "../../../constants/TestsGridColumns";
import MessageModal from "./Modals/MessageModal";

class SubjectPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //! Status: 0 - planned, status: 2 - closed, status: 1 - in progress (?)
    };
  }
  OpenModal() {
    this.props.SetOpen("openSubjectModal", true);
  }
  onRowDoubleClick() {
    let selectedRows = this.gridApi.getSelectedRows();
    this.props.SetOpen("selectedTest", selectedRows[0]);
    this.props.navigate("/" + this.props.main.selectedSubjectId + "/test");
  }
  OnNewTestClick() {
    this.props.navigate(`/${this.props.main.selectedSubjectId}/new-test`);
    this.props.SetOpen("createTestPage", true);

  }

  onGridReady = (params) => {
    this.gridApi = params.api;
    this.columnApi = params.columnApi;
  };

  render() {
    const { selectedSubjectId, tests } = this.props.main;
    return (
      <>
        <MessageModal />
        <div
          style={{
            marginTop: "80px",
            paddingLeft: "50px",
            paddingRight: "50px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: 5,
            }}
          >
            <h3 style={{ fontWeight: "bold", textAlign: "left", margin: "0" }}>
              {/* //TODO: add subject name */}
              Subject name
            </h3>
            <div style={{ marginLeft: "auto" }}>
              <Button onClick={this.OnNewTestClick.bind(this)}>
                <i className="bi bi-plus-lg"></i> Create new test
              </Button>
            </div>
          </div>
          <Breadcrumb>
            <Breadcrumb.Item
              onClick={() => {
                this.props.navigate("/");
              }}
            >
              {" "}
              Dashboard
            </Breadcrumb.Item>
            <Breadcrumb.Item active> {selectedSubjectId} </Breadcrumb.Item>
          </Breadcrumb>
          {/* //TODO: Add text when zero tests in subject */}
          <div className="ag-theme-alpine">
            <AgGridReact
              onGridReady={this.onGridReady.bind(this)}
              rowSelection={"single"}
              columnDefs={TestsGridCol}
              rowData={tests}
              onRowClicked={this.onRowDoubleClick.bind(this)}
              style={{ width: "100%", height: "100%" }}
              domLayout="autoHeight"
            />
          </div>
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
  connect(mapStateToProps, { SetOpen, SetMessageOpen })(SubjectPage)
);
