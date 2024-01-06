import React, { useCallback, useRef, useState } from "react";
import { SetOpen } from "../MainAction";
import { AgGridReact } from "ag-grid-react";
import IAnswerGrid from "../../interfaces/AnswerGrid";
import { AnswerGridCol } from "../../constants/AnswerGridColumns";
import { ColDef, GetRowIdParams } from "ag-grid-community";
import { useAppDispatch } from "../../app/hooks";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { useNavigate } from "react-router-dom";
import { Button, ButtonGroup, Dropdown, Form } from "react-bootstrap";
import "../../index.css";
import { answersGrid } from "../../constants/TestExample";

const AnswersGrid = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const gridRef = useRef<AgGridReact<IAnswerGrid>>(null);
  const [rowData, setRowData] = useState(answersGrid);
  const [columnDefs, setColumnDefs] = useState<ColDef[]>(AnswerGridCol);
  const getRowId = useCallback((params: GetRowIdParams) => {
    return params.data.student.email;
  }, []);

  const [selectedRowsCount, setSelectedRowsCount] = useState(0);

  const onQuickFilterChanged = useCallback(() => {
    gridRef.current?.api.setQuickFilter(
      (document.getElementById("quickFilter") as HTMLInputElement).value
    );
  }, []);

  const onRowDoubleClicked = useCallback(
    (param: any) => {
      const selectedStudent = param.data.student.email;
      if (selectedStudent) {
        // console.log(1);
        // dispatch(SetOpen("studentName", selectedStudent));
        // dispatch(SetOpen("testOfStudentPage", true));
        navigate(`review/${selectedStudent}`);
      }
    },
    [gridRef]
  );

  return (
    <>
      {/* //TODO: Add filter and sort buttons, + search in name field */}
      <div
        className="ag-theme-alpine"
        style={{ marginTop: 10, height: "calc(100vh - 110px)" }}
      >
        <div className="d-flex mb-2">
          <Form.Control
            size="sm"
            className="me-2 w-auto flex-grow-1"
            type="text"
            onInput={onQuickFilterChanged}
            id="quickFilter"
            placeholder="Filter attempts..."
          />
          <Dropdown as={ButtonGroup} size="sm" align="end" className="me-2">
            <Button
              size="sm"
              disabled={selectedRowsCount === 0}
              variant="outline-primary"
            >
              <i className="bi bi-eye me-2"></i> Show selected
            </Button>
            <Dropdown.Toggle
              disabled={selectedRowsCount === 0}
              split
              id="dropdown-split-basic"
              variant="outline-primary"
            />
            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1" disabled>
                <i className="bi bi-eye-slash me-2"></i> Hide selected
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown as={ButtonGroup} size="sm" align="end">
            <Button size="sm" disabled={selectedRowsCount === 0}>
              <i className="bi bi-play-fill"></i> Autocheck new
            </Button>
            <Dropdown.Toggle split id="dropdown-split-basic" />
            <Dropdown.Menu>
              <Dropdown.Item>
                <i className="bi bi-exclamation-circle me-2"></i> Check all
              </Dropdown.Item>
              {/* <Dropdown.Divider />
              <Dropdown.Item href="#/action-1" disabled>
                <i className="bi bi-x-square me-2"></i> Abort selected
              </Dropdown.Item>
              <Dropdown.Item href="#/action-1">
                <i className="bi bi-x-square-fill me-2"></i> Abort all
              </Dropdown.Item> */}
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

        <div style={{ height: "95%" }}>
          <AgGridReact<IAnswerGrid>
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
            onSelectionChanged={() =>
              setSelectedRowsCount(
                gridRef.current?.api?.getSelectedRows()?.length || 0
              )
            }
          />
        </div>
      </div>
    </>
  );
};

export default AnswersGrid;
