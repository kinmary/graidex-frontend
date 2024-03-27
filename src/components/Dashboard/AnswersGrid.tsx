import React, {useCallback, useEffect, useRef, useState} from "react";
import {AgGridReact} from "ag-grid-react";
import IAnswerGrid from "../../interfaces/AnswerGrid";
import {ColDef, GetRowIdParams} from "ag-grid-community";
import {useAppDispatch} from "../../app/hooks";
import {useSelector} from "react-redux";
import {RootState} from "../../app/store";
import {useNavigate, useParams} from "react-router-dom";
import {Button, ButtonGroup, Dropdown, Form} from "react-bootstrap";
import "../../index.css";
import {GetTestResultForTeacher} from "../ReviewTest/TestOfStudentActions";
import {themes} from "../../constants/Themes";
import {setShowTestResultsToStudents, getAllTestResults, checkTestResultsWithAI} from "./TestActions";
import {AnswerGridCol} from "../../constants/AnswerGridColumns";

const AnswersGrid = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const gridRef = useRef<AgGridReact<IAnswerGrid>>(null);
  const theme = useSelector((state: RootState) => state.main.theme);
  const [rowData, setRowData] = useState<IAnswerGrid[]>();
  const main = useSelector((state: RootState) => state.main);
  const [columnDefs, setColumnDefs] = useState<ColDef[]>();
  const params = useParams();
  useEffect(() => {
    if (!params.test) return;
    dispatch(getAllTestResults(params.test));
  }, [params.test]);
  useEffect(() => {
    if (main.answersGrid) {
      main.answersGrid.map((item: IAnswerGrid) => {
        if (new Date(item.endTime) > new Date()) {
          item.status = 0;
          return item;
        } else if (item.grade > (main.currentTestDraft?.gradeToPass || 4)) {
          item.status = 3;
        } else if (item.grade < (main.currentTestDraft?.gradeToPass || 4)) {
          item.status = 4;
        }

        if (item.requireTeacherReview) {
          item.status = 2;
        }

        return item;
      });
      setRowData(main.answersGrid);
      setColumnDefs(AnswerGridCol);
    }
  }, [main.answersGrid]);

  const getRowId = useCallback((params: GetRowIdParams) => {
    return params.data.id;
  }, []);

  const [selectedRowsCount, setSelectedRowsCount] = useState(0);

  const onQuickFilterChanged = useCallback(() => {
    gridRef.current?.api.setQuickFilter((document.getElementById("quickFilter") as HTMLInputElement).value);
  }, []);

  const [doubleClicked, setDoubleClicked] = useState(false);

  const onRowDoubleClicked = useCallback(
    (param: any) => {
      if (doubleClicked) return;

      setDoubleClicked(true);
      setTimeout(() => setDoubleClicked(false), 400);

      const testResultId = param.data.id;
      if (testResultId) {
        dispatch(GetTestResultForTeacher(testResultId)).then((res: any) => {
          navigate(`review/${testResultId}`);
        });
      }
    },
    [gridRef, doubleClicked]
  );

  const handleShowTestResults = () => {
    const selectedRows = gridRef.current?.api.getSelectedRows();
    if (!selectedRows || !params.test) return;
    const testResultIds = selectedRows.map((item) => item.id);
    dispatch(setShowTestResultsToStudents(params.test, testResultIds, true));
  };

  const handleHideTestResults = () => {
    const selectedRows = gridRef.current?.api.getSelectedRows();
    if (!selectedRows || !params.test) return;
    const testResultIds = selectedRows.map((item) => item.id);
    dispatch(setShowTestResultsToStudents(params.test, testResultIds, false));
  };
  const handleCheckWithAI = () => {
    const selectedRows = gridRef.current?.api.getSelectedRows();
    if (!selectedRows || !params.test) return;
    const testResultIds = selectedRows.map((item) => item.id);
    dispatch(checkTestResultsWithAI(params.test, testResultIds));
  };
  const handleCheckAllWithAI = () => {
    if (!rowData || !params.test) return;
    const testResultIds = rowData.map((item: any) => item.id);
    dispatch(checkTestResultsWithAI(params.test, testResultIds));
  };

  if (!rowData || !columnDefs) return null;
  return (
    <>
      <div className="ag-theme-alpine" style={{marginTop: 10, height: "calc(100vh - 110px)"}}>
        <div className="d-flex mb-2">
          <Form.Control autoComplete="off" size="sm" className="me-2 w-auto flex-grow-1" type="text" onInput={onQuickFilterChanged} id="quickFilter" placeholder="Filter attempts..." />
          <Dropdown as={ButtonGroup} size="sm" align="end" className="me-2">
            <Button size="sm" disabled={selectedRowsCount === 0} variant="outline-primary" onClick={handleShowTestResults}>
              <i className="bi bi-eye me-2"></i> Show selected
            </Button>
            <Dropdown.Toggle disabled={selectedRowsCount === 0} split id="dropdown-split-basic" variant="outline-primary" />
            <Dropdown.Menu>
              <Dropdown.Item as={Button} onClick={handleHideTestResults}>
                <i className="bi bi-eye-slash me-2"></i> Hide selected
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown as={ButtonGroup} size="sm" align="end">
            <Button size="sm" disabled={selectedRowsCount === 0} onClick={handleCheckWithAI}>
              <i className="bi bi-stars"></i> Check with AI
            </Button>
            <Dropdown.Toggle split id="dropdown-split-basic" />
            <Dropdown.Menu>
              <Dropdown.Item as={Button} onClick={handleCheckAllWithAI}>
                <i className="bi bi-exclamation-circle me-2"></i> Check all
              </Dropdown.Item>
              {/* <Dropdown.Divider />
              <Dropdown.Item href="#/action-1" disabled>
                <i className="bi bi-x-square me-2"></i> Abort selected
              </Dropdown.Item>
              <Dropdown.Item href="#/action-1">
                <i className="bi bi-x-square-fill me-2"></i> Abort all
              </Dropdown.Item> 
              <Dropdown.Divider />
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

        <div style={{height: "95%"}} className={theme === themes.light ? "ag-theme-alpine" : "ag-theme-alpine-dark"}>
          <AgGridReact<IAnswerGrid>
            ref={gridRef}
            getRowId={getRowId}
            rowSelection="multiple"
            columnDefs={columnDefs}
            rowData={rowData}
            onRowClicked={onRowDoubleClicked}
            suppressRowClickSelection={true}
            suppressCellFocus
            pagination={true}
            suppressMovableColumns
            alwaysMultiSort
            animateRows
            onSelectionChanged={() => setSelectedRowsCount(gridRef.current?.api?.getSelectedRows()?.length || 0)}
          />
        </div>
      </div>
    </>
  );
};

export default AnswersGrid;
