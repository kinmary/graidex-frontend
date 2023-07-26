import React, { Component, useRef, useState } from "react";
import { Breadcrumb, Button, Tab, Tabs } from "react-bootstrap";
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
    const selectedRows = gridRef.current!.api.getSelectedRows();
    dispatch(SetOpen("selectedTest", selectedRows[0]));
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
                <Button size="sm" onClick={OnNewTestClick}>
                  <i className="bi bi-plus-lg"></i> Create new test
                </Button>
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
          {auth.userRole === 0 ? (
            // <Tabs
            //   fill
            //   defaultActiveKey={"tests"}
            //   style={{ marginLeft: "auto", marginRight: 0 }}
            // >
            //   <Tab eventKey="settings" title="Settings">
            //     <SubjectSettings />
            //   </Tab>
            //   <Tab eventKey="tests" title="Tests">
            //TODO: add text when no tests are in subject yet
                <div className="ag-theme-alpine">
                  <AgGridReact<ITestGrid>
                    ref = {gridRef}
                    rowSelection="single"
                    columnDefs={columnDefs}
                    rowData={tests}
                    onRowClicked={onRowDoubleClick}
                    //TODO: find better solution for height
                    domLayout="autoHeight"
                  />
                </div>
            //   </Tab>
            // </Tabs>
          ) : (
            <div className="ag-theme-alpine">
              <AgGridReact<ITestGrid>
                ref={gridRef}
                rowSelection={"single"}
                columnDefs={studentColDefs}
                rowData={tests}
                onRowClicked={onRowClickByStudent}
                //TODO: find better solution for height
                domLayout="autoHeight"
              />
            </div>
          )}
        </div>
      </>
    );
  }

export default SubjectPage;