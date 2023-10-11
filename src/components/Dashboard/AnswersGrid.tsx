import React, { Component, useCallback, useRef, useState } from "react";
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
//import { AnswerGridCol } from "../../constants/AnswerGridColumns";

const AnswersGrid = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state: RootState) => state.auth);
  const main = useSelector((state: RootState) => state.main);
  const gridRef = useRef<AgGridReact<IAnswerGrid>>(null);
  const [rowData, setRowData] = useState([
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
  ]);
  const [columnDefs, setColumnDefs] = useState<ColDef[]>(AnswerGridCol);
  const getRowId = useCallback((params: GetRowIdParams) => {
    return params.data.studentName;
  }, []);

  const onRowDoubleClicked = () => {
    const selectedRows = gridRef.current!.api.getSelectedRows();
    if (selectedRows.length > 0) {
      const studentName = selectedRows?.[0]?.studentName;
      if (studentName) {
        dispatch(SetOpen("studentName", studentName));
        dispatch(SetOpen("testOfStudentPage", true));
        navigate(studentName);
      }
    }
  };

  return (
    <>
      {/* //TODO: Add filter and sort buttons, + search in name field */}
      <div
        className="ag-theme-alpine"
        style={{ marginTop: 10, height: "100%" }}
      >
        <AgGridReact<IAnswerGrid>
          ref={gridRef}
          getRowId={getRowId}
          rowSelection="single"
          columnDefs={columnDefs}
          rowData={rowData}
          onRowDoubleClicked={onRowDoubleClicked}
          //TODO: find better solution
          domLayout="autoHeight"
        />
      </div>
    </>
  );
};

export default AnswersGrid;
