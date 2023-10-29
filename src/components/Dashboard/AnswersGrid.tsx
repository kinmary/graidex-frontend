import React, { Component, useCallback, useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { SetOpen, SetMessageOpen } from "../MainAction";
import { AgGridReact } from "ag-grid-react";
import IAnswerGrid from "../../interfaces/AnswerGrid";
import { AnswerGridCol } from "../../constants/AnswerGridColumns";
import { ColDef, GetRowIdParams } from "ag-grid-community";
import { useAppDispatch } from "../../app/hooks";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { useNavigate } from "react-router-dom";
import { Button, ButtonGroup, Dropdown, Form } from "react-bootstrap";
//import { AnswerGridCol } from "../../constants/AnswerGridColumns";
import "../../index.css";

const AnswersGrid = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state: RootState) => state.auth);
  const main = useSelector((state: RootState) => state.main);
  const gridRef = useRef<AgGridReact<IAnswerGrid>>(null);
  const [rowData, setRowData] = useState([
      {
          student: {
              email: "if123@example.com",
              name: "Ivan Fedorov",
              customId: "IF00123"
          },
          startEnd: {
              start: "January 1, 10:00",
              end: "January 1, 11:00"
          },
          grade: {
            grade: 10,
            percent: 100,
          },
          status: 3,
          isShown: true
      },
      {
          student: {
              email: "po456@example.com",
              name: "Paula Ortiz",
              customId: "PO00456"
          },
          startEnd: {
              start: "January 2, 10:30",
              end: "January 2, 11:30"
          },
          grade: {
            grade: 9,
            percent: 92,
          },
          status: 3,
          isShown: true
      },
      {
          student: {
              email: "if789@example.com",
              name: "Isaac Freeman",
              customId: "IF00789"
          },
          startEnd: {
              start: "January 3, 11:00",
              end: "January 3, 12:00"
          },
          grade: null,
          status: 2,
          isShown: true
      },
      {
          student: {
              email: "po101@example.com",
              name: "Pia Olsen",
              customId: "PO00101"
          },
          startEnd: {
              start: "January 4, 11:30",
              end: "January 4, 12:30"
          },
          grade: null,
          status: 2,
          isShown:true
      },
      {
         student:{
            email:"if112@example.com",
            name:"Irene Fisher",
            customId:"IF00112"
         },
         startEnd:{
            start:"January 5, 12:00",
            end:"January 5, 13:00"
         },
         grade: {
          grade: 6,
          percent: 57.55,
        },
         status:3,
         isShown:true
      },
      {
         student:{
            email:"po123@example.com",
            name:"Pedro Ochoa",
            customId:"PO00123"
         },
         startEnd:{
            start:"January 6, 12:30",
            end:"January 6, 13:30"
         },
         grade: {
          grade: 5,
          percent: 52.01,
        },
         status:3,
         isShown:true
      },
      {
         student:{
            email:"if134@example.com",
            name:"Ivy Foster",
            customId:"IF00134"
         },
         startEnd:{
            start:"January 7, 13:00",
            end:"January 7, 14:00"
         },
         grade: {
          grade: 4,
          percent: 44.29,
        },
         status:4,
         isShown:false
      },
      {
         student:{
            email:"po145@example.com",
            name:"Pablo Ortega",
            customId:"PO00145"
         },
         startEnd:{
            start:"January 8, 13:30",
            end:"January 8, 14:30"
         },
         grade: {
          grade: 3,
          percent: 28.12,
        },
         status:4,
         isShown:false
      },
      {
         student:{
            email:"if156@example.com",
            name:"Ingrid Frank",
            customId:"IF00156"
         },
         startEnd:{
            start:"January 9, 14:00",
            end:"now"
         },
          grade:null,
         status:0,
         isShown:false
      },
      {
        student:{
           email:"po167@example.com",
           name:"Peter O'Brien",
           customId:"PO00167"
        },
        startEnd:{
           start:"January10, 14:30",
           end:"now"
        },
        grade:null,
        status:1,
        isShown:false
     }  
  ]);
  const [columnDefs, setColumnDefs] = useState<ColDef[]>(AnswerGridCol);
  const getRowId = useCallback((params: GetRowIdParams) => {
    return params.data.student.email;
  }, []);

  const [selectedRowsCount, setSelectedRowsCount] = useState(0);

  const onQuickFilterChanged = useCallback(() => {
    gridRef.current?.api.setQuickFilter(
      (document.getElementById('quickFilter') as HTMLInputElement).value
    );
  }, []);

  const onRowDoubleClicked = useCallback((param: any) => {
    const selectedStudent = param.data.student.email;
    if (selectedStudent) {
      console.log(1);
      dispatch(SetOpen("studentName", selectedStudent));
      dispatch(SetOpen("testOfStudentPage", true));
      navigate(selectedStudent);
    }
  }, [dispatch, navigate, gridRef]);

  return (
    <>
      {/* //TODO: Add filter and sort buttons, + search in name field */}
      <div
        className="ag-theme-alpine"
        style={{ marginTop: 10, height: "calc(100vh - 110px)" }}
      >
        <div className="d-flex mb-2">
          <h5 className="fw-bold text-left m-0 me-5 lh-base">
            {main.currentTestDraft && main.currentTestDraft.title}
          </h5>
          <Form.Control
            size="sm"
            className="ms-5 me-2 w-auto flex-grow-1"
            type="text"
            onInput={onQuickFilterChanged}
            id="quickFilter"
            placeholder="Filter attempts..."
          />
          <Dropdown as={ButtonGroup} size="sm" align="end" className="me-2">
              <Button size="sm" disabled={selectedRowsCount === 0} variant="outline-primary">
              <i className="bi bi-eye me-2"></i>  Show selected
              </Button>
              <Dropdown.Toggle disabled={selectedRowsCount === 0} split id="dropdown-split-basic" variant="outline-primary" />
                <Dropdown.Menu>
                  <Dropdown.Item href="#/action-1" disabled>
                    <i className="bi bi-eye-slash me-2"></i> Hide selected
                  </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
          <Dropdown as={ButtonGroup} size="sm" align="end">
              <Button size="sm" disabled={selectedRowsCount === 0}>
                <i className="bi bi-play-fill"></i> Autocheck selected
              </Button>
              <Dropdown.Toggle split id="dropdown-split-basic" />
                <Dropdown.Menu>
                  <Dropdown.Item href="#/action-1">
                    <i className="bi bi-exclamation-circle me-2"></i> Check new
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item href="#/action-1" disabled>
                    <i className="bi bi-x-square me-2"></i> Abort selected
                  </Dropdown.Item>
                  <Dropdown.Item href="#/action-1" >
                    <i className="bi bi-x-square-fill me-2"></i> Abort all
                  </Dropdown.Item>
                  {/* <Dropdown.Divider />
                  <Dropdown.Header className="py-0">Parameters</Dropdown.Header>
                  <Dropdown.ItemText>
                    <Form.Check
                    type="switch"
                    id="custom-switch"
                    label="Use AI"
                    reverse
                    className="w-100 text-start"
                    />
                    </Dropdown.ItemText>
                     <Dropdown.ItemText>
                      <Form.Check
                      type="switch"
                      id="custom-switch"
                      label="Plagiarism"
                      reverse
                      className="w-100 text-start"
                      />
                      </Dropdown.ItemText> */}
                      </Dropdown.Menu>
                      </Dropdown>
        </div>
        
        <AgGridReact<IAnswerGrid>
          //className="rounded"
          ref={gridRef}
          getRowId={getRowId}
          rowSelection="multiple"
          columnDefs={columnDefs}
          rowData={rowData}
          onRowDoubleClicked={onRowDoubleClicked}
          suppressRowClickSelection={true}
          suppressCellFocus
          suppressMovableColumns
          alwaysMultiSort
          animateRows
          onSelectionChanged={() => setSelectedRowsCount(gridRef.current?.api?.getSelectedRows()?.length || 0)}
          //TODO: find better solution
          //domLayout="autoHeight"
        />
      </div>
    </>
  );
};

export default AnswersGrid;
