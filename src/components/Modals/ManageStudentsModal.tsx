import { Button, Modal, Tab, Tabs } from "react-bootstrap";
import { SetOpen } from "../MainAction";
import { AgGridReact } from "ag-grid-react";
import { useAppDispatch } from "../../app/hooks";
import { RootState } from "../../app/store";
import { useSelector } from "react-redux";
import BtnCellRenderer from "../../constants/BtnCellRenderer";
import { useCallback, useEffect } from "react";
import { getSubjRequestsOfTeacher } from "../Dashboard/SubjectRequestActions";
import { getStudentsList } from "../Dashboard/SubjectActions";
import { ColumnState, GridReadyEvent } from "ag-grid-community";
interface Props {
  selectedSubjectId: string;
}
const ManageStudentsModal = ({ selectedSubjectId }: Props) => {
  const dispatch = useAppDispatch();
  const main = useSelector((state: RootState) => state.main);

  const PendingStudentRequests = [
    { field: "studentEmail", flex: 2, headerName: "Email" },
    {
      field: "date",
      flex: 2,
      headerName: "Date",
      valueFormatter: (params: any) => {
        const date = 
        new Date(params.value)
        .toLocaleString("en-US", {
          year: "numeric",
          day: "2-digit",
          month: "long",
          hour: '2-digit',
          minute: '2-digit', 
          hour12: false
        });
        
        return date;
      },
    },
    {
      field: "",
      flex: 0.25,
      headerName: "",
      cellRenderer: (params: any) => (
        <BtnCellRenderer
          subjectId={selectedSubjectId}
          pendingRequest={true}
          subjectRequestId={params.data.id}
          studentEmail={params.data.studentEmail}
        />
      ),
    },
  ];

  const StudentListGridColumns = [
    { field: "name", flex: 1, headerName: "Name" },
    { field: "surname", flex: 2, headerName: "Surname" },
    { field: "customId", flex: 1, headerName: "Student Id" },
    { field: "email", flex: 2, headerName: "Email" },
    {
      field: "",
      flex: 0.25,
      headerName: "",
      cellRenderer: (params: any) => (
        <BtnCellRenderer
          subjectId={selectedSubjectId!}
          pendingRequest={false}
          studentEmail={params.data.email}
        />
      ),
    },
  ];

  useEffect(() => {
    dispatch(getStudentsList(selectedSubjectId));
    dispatch(getSubjRequestsOfTeacher(selectedSubjectId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedSubjectId]);

  const onGridReady = useCallback((params: GridReadyEvent) => {
    var defaultSortModel: ColumnState[] = [
      { colId: "date", sort: "desc", sortIndex: 0 },
    ];
    params.columnApi.applyColumnState({ state: defaultSortModel });
  }, []);

  const closeModal = () => {
    dispatch(SetOpen("manageStudentsModal", false));
  };
  const { manageStudentsModal } = main;
  const selectedSubject = main.allSubjects.find(
    (obj: any) => obj.id.toString() === selectedSubjectId!.toString()
  );
  return (
    <>
      <Modal size="lg" show={manageStudentsModal} onHide={closeModal} centered>
        {/* //TODO: show pending requests */}
        <Modal.Header closeButton>
          Students list of {selectedSubject.title}
        </Modal.Header>
        <Modal.Body>
          <div style={{ textAlign: "right" }}>
            <Button
              size="sm"
              onClick={() => dispatch(SetOpen("addStudentModal", true))}
            >
              <i className="bi bi-plus-lg"></i> Add student
            </Button>
          </div>
          <Tabs
            fill
            defaultActiveKey={"active-students"}
            style={{
              marginLeft: "auto",
              marginTop: 4,
              marginRight: 0,
              justifyContent: "center",
            }}
          >
            <Tab title={"Active students (" + (main.studentsList.length  || 0) + ")"} eventKey={"active-students"}>
              <div className="ag-theme-alpine" style={{ height: 450 }}>
                <AgGridReact
                  rowSelection={"single"}
                  columnDefs={StudentListGridColumns}
                  rowData={main.studentsList || []}
                  pagination={true}
                />
              </div>
            </Tab>
            {/* //TODO: add row count of pending requests to see how much pending in header */}
            <Tab title={"Pending requests (" + (main.pendingSubjRequests.length  || 0) + ")"} eventKey={"pending-students"}>
              <div className="ag-theme-alpine" style={{ height: 450 }}>
                <AgGridReact
                  rowSelection={"single"}
                  columnDefs={PendingStudentRequests}
                  rowData={main.pendingSubjRequests || []}
                  onGridReady={onGridReady}
                  pagination={true}
                />
              </div>
            </Tab>
          </Tabs>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ManageStudentsModal;
