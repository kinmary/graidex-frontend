import React, { Component, useRef, useState } from "react";
import { Breadcrumb, Button, Tab, Tabs, Card, Row, Col, Dropdown } from "react-bootstrap";
import { connect } from "react-redux";
import { SetOpen, SetMessageOpen } from "../MainAction";
import { AgGridReact } from "ag-grid-react";
import {
  StudentTestGridCol,
  TestsGridCol,
} from "../../constants/TestsGridColumns";
import ITestGrid from "../../interfaces/TestGrid";
import { useAppDispatch } from "../../app/hooks";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { ColDef } from "ag-grid-community";
import SubjectSettings from "./SubjectSettings";
import DeleteSubjectModal from "../Modals/DeleteSubjectModal";
import ChangeImageModal from "../Modals/ChangeImageModal";
import MessageModal from "../Modals/MessageModal";
import StartTestConfirmModal from "../Modals/SendTestConfirmModal";
import AddStudentModal from "../Modals/AddStudentModal";
import ManageStudentsModal from "../Modals/ManageStudentsModal";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";

const SubjectPage = () => {
    const dispatch = useAppDispatch();
  const auth = useSelector((state: RootState) => state.auth);
  const main = useSelector((state: RootState) => state.main);
  const gridRef = useRef<AgGridReact<ITestGrid>>(null);
  const navigate = useNavigate();
  const [columnDefs, setColumnDefs] = useState<ColDef[]>(TestsGridCol);
  const [studentColDefs, setStudentColDefs] = useState<ColDef[]>(StudentTestGridCol);

  const onRowDoubleClick = () => {
    // const selectedRows = gridRef.current!.api.getSelectedRows();
    dispatch(SetOpen("selectedTest", 0));
    navigate("test");
  }

  const onRowClickByStudent = () => {
    const selectedRows = gridRef.current!.api.getSelectedRows();
    let status = selectedRows[0].status;
    let studentName = "Mariia Kindratyshyn"; //TODO: take name from settings
    if (status === 2 && studentName) {
      dispatch(SetOpen("studentName", studentName));
      dispatch(SetOpen("testOfStudentPage", true));
      navigate(
        "test/" + studentName
      );
    }
    if (status === 0) {
      //TODO: make as modal
      dispatch(SetMessageOpen(true, "You cannot access this test"));
    }
    if (status === 1) {
      dispatch(SetOpen("startConfirmModal", true));
      //TODO: check the procedure when the exam is in progress
    }
  }
  const OnNewTestClick = () => {
    navigate(`new-test`);
    SetOpen("createTestPage", true);
  }

    const params = useParams();
    const { tests } = main;
    const selectedSubject = main.allSubjects.find((obj: any) => obj.id.toString() === params.selectedSubjectId!.toString());  
    return (
      <>
      <DeleteSubjectModal />
        <ChangeImageModal />
        <MessageModal />
        <StartTestConfirmModal />
        <AddStudentModal />
        <div
      style={{marginTop: "10px"}}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 5,
          }}
        >
          <h5 style={{ fontWeight: "bold", textAlign: "left", margin: 0 }}>
              {selectedSubject.title}
              {auth.userRole === 0 &&  <i style = {{marginLeft: 10}} className="bi bi-gear" onClick={() => navigate("settings")}></i>}
            </h5>
            
            <div style={{ marginLeft: "auto" }}>
              {auth.userRole === 0 ? (
                <Dropdown>
                <Dropdown.Toggle variant="light" id="dropdown-basic">
                  Constructor
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item href="#/action-1">Preview</Dropdown.Item>
                  <Dropdown.Item href="#/action-2" disabled>Constructor</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              ) : (
                //TODO: check if this avg score needed?
                <h5
                  style={{
                    fontWeight: "bold",
                    textAlign: "right",
                    margin: "0",
                  }}
                >
                  9.55/10
                </h5>
              )}
            </div>
           
          </div>
          {/* //TODO: move style to css */}
          <Breadcrumb style={{fontSize: 14}} >
            <Breadcrumb.Item 
              onClick={() => {
                navigate("/");
              }}
            >
              Dashboard
            </Breadcrumb.Item>
            <Breadcrumb.Item active> {selectedSubject.title} </Breadcrumb.Item>
          </Breadcrumb>
          <h6>
            Planned tests
          </h6>

          {tests.map((test: any, idx: number) => (
          <div className="d-flex justify-content-between">
              <Card className="mb-2" style={{flexGrow: 4}} onClick={onRowDoubleClick}>
                <Card.Body>
                  <Card.Title className="d-flex justify-content-between mb-0 h6">
                    <div>
                      {test.examName}
                    </div>
                    <div className="text-secondary">
                      {test.date}, {idx % 2 === 0 ? "10:00" : "12:00"} - {idx % 2 === 0 ? "14:00" : "13:00"}
                    </div>
                  </Card.Title>
                </Card.Body>
              </Card>
              <div className="d-flex justify-content-center mt-1" style={{width: "100px"}}>
                <Dropdown>
                  <Dropdown.Toggle variant="light" id="dropdown-basic">
                    {idx % 2 === 0 ? "Hidden" : "Shown"}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">Shown</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Hidden</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
            </div>
          </div>
          ))}

          <h6 className="mt-3 text-danger">
            Drafts
          </h6>
          {tests.map((test: any, idx: number) => (
          <div className="d-flex justify-content-between">
              <Card className="mb-2" style={{flexGrow: 4}}>
                <Card.Body>
                  <Card.Title className="d-flex justify-content-between mb-0 h6">
                    <div>
                      {test.examName}
                    </div>
                    <div className="text-danger">
                      Last update: {test.date} at {idx % 2 === 0 ? "19:00" : "22:00"}
                    </div>
                  </Card.Title>
                </Card.Body>
              </Card>
              <div className="d-flex justify-content-center mt-1" style={{width: "100px"}}>
              <Dropdown>
                  <Dropdown.Toggle disabled variant="light" id="dropdown-basic">
                    Hidden
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">Shown</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Hidden</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
          </div>
          ))}
        </div>
      </>
    );
  }

export default SubjectPage;