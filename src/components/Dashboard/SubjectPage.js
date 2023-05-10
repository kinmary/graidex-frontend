import React, { Component,  } from "react";
import { Breadcrumb, Button, Tab, Tabs } from "react-bootstrap";
import { connect } from "react-redux";
import { withRouter } from "../../utils/withRouter";
import { SetOpen, SetMessageOpen } from "../MainAction";
import { AgGridReact } from "ag-grid-react";
import {
  StudentTestGridCol,
  TestsGridCol,
} from "../../constants/TestsGridColumns";
import MessageModal from "../Modals/MessageModal";
import StartTestConfirmModal from "../Modals/StartTestConfirmModal";
import SubjectSettings from "./SubjectSettings";
import ChangeImageModal from "../Modals/ChangeImageModal";
import DeleteSubjectModal from "../Modals/DeleteSubjectModal";
import ManageStudentsModal from "../Modals/ManageStudentsModal";
import AddStudentModal from "../Modals/AddStudentModal";
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents, } from 'react-leaflet'
import "../../styles/subjectpage.css"
import L, { latLng } from 'leaflet';
import 'leaflet-control-geocoder';
import LocationMap from "../LocationMap";


const center = {lat: 54.9, lng: 23.9}
var subjectLocation = {lat: 54.9, lng: 23.9};

class SubjectPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //! Status: 0 - planned, status: 2 - closed, status: 1 - in progress (?)
    };
  }

  onRowDoubleClick() {
    let selectedRows = this.gridApi.getSelectedRows();
    this.props.SetOpen("selectedTest", selectedRows[0]);
    this.props.navigate("/" + this.props.main.selectedSubjectId + "/test");
  }
  onRowClickByStudent() {
    let selectedRows = this.gridApi.getSelectedRows();
    //this.props.SetOpen("selectedTest", selectedRows[0]);
    //this.props.navigate("/" + this.props.main.selectedSubjectId + "/test");
    let status = selectedRows[0].status;
    let studentName = "Mariia Kindratyshyn"; //TODO: take name from settings
    if (status === 2 && studentName) {
      this.props.SetOpen("studentName", studentName);
      this.props.SetOpen("testOfStudentPage", true);
      this.props.navigate(
        "/" + this.props.main.selectedSubjectId + "/test" + studentName
      );
    }
    if (status === 0) {
      //TODO: make as modal
      this.props.SetMessageOpen(true, "You cannot access this test");
    }
    if (status === 1) {
      this.props.SetOpen("startConfirmModal", true);
      //TODO: check the procedure when the exam is in progress
    }
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
    const selectedSubject = this.props.main.allSubjects.find(obj => obj.id.toString() === selectedSubjectId.toString());

    return (
      <>
      <DeleteSubjectModal />
        <ChangeImageModal />
        <MessageModal />
        <StartTestConfirmModal />
        <AddStudentModal />
        <ManageStudentsModal />
        <div
          style={{
            marginTop: "80px",
            paddingLeft: "50px",
            paddingRight: "50px",
            height:"150vh"
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
              {selectedSubject.title}
            </h3>
            <div style={{ marginLeft: "auto" }}>
              {this.props.main.userRole === 0 ? (
                <Button onClick={this.OnNewTestClick.bind(this)}>
                  <i className="bi bi-plus-lg"></i> Create new test
                </Button>
              ) : (
                <h4
                  style={{
                    fontWeight: "bold",
                    textAlign: "right",
                    margin: "0",
                  }}
                >
                  9.55/10
                </h4>
              )}
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
            <Breadcrumb.Item active> {selectedSubject.title} </Breadcrumb.Item>
          </Breadcrumb>
          {this.props.main.userRole === 0 ? (
            <Tabs
              fill
              defaultActiveKey={"tests"}
              style={{ marginLeft: "auto", marginRight: 0 }}
            >
              <Tab eventKey="settings" title="Settings">
                <SubjectSettings />
              </Tab>
              <Tab eventKey="tests" title="Tests">
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
              </Tab>
            </Tabs>
          ) : (
            <div className="ag-theme-alpine">
              <AgGridReact
                onGridReady={this.onGridReady.bind(this)}
                rowSelection={"single"}
                columnDefs={StudentTestGridCol}
                rowData={tests}
                onRowClicked={this.onRowClickByStudent.bind(this)}
                style={{ width: "100%", height: "100%" }}
                domLayout="autoHeight"
              />
              <LocationMap defaultPosition={{lat: selectedSubject.latitude || 0, lng: selectedSubject.longitude || 0}} />
            </div>
          )}
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
