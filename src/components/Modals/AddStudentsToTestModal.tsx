import { Button, Modal } from "react-bootstrap";
import { SetOpen } from "../MainAction";
import { AgGridReact } from "ag-grid-react";
import { useAppDispatch } from "../../app/hooks";
import { RootState } from "../../app/store";
import { useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import { getStudentsList } from "../Dashboard/SubjectActions";
import { addStudentsToTest } from "../Dashboard/TestActions";
import { themes } from "../../constants/Themes";
interface Props {
  selectedSubjectId: string;
  testid: string;
}
const AddStudentsToTestModal = ({ selectedSubjectId, testid }: Props) => {
  const dispatch = useAppDispatch();
  const main = useSelector((state: RootState) => state.main);
  const { theme } = main;
  const gridRef = useRef<AgGridReact<any>>(null);
  const StudentListGridColumns = [
    { field: "name", flex: 1, headerName: "Name",filter: 'agSetColumnFilter' },
    { field: "surname", flex: 2, headerName: "Surname",filter: 'agSetColumnFilter' },
    { field: "customId", flex: 1, headerName: "Student Id",filter: 'agSetColumnFilter' },
    { field: "email", flex: 2, headerName: "Email",filter: 'agSetColumnFilter' },
    {
      field: "",
      flex: 0.5,
      headerCheckboxSelection: true,
      checkboxSelection: true,
    },
  ];

  useEffect(() => {
    dispatch(getStudentsList(selectedSubjectId));
  }, []);

  const closeModal = () => {
    dispatch(SetOpen("addStudentsToTestModal", false));
  };

  const handleAddStudentsClick = () => {
    const selectedRows = gridRef.current!.api.getSelectedRows();
    let selectedStudents = [];
    if (selectedRows.length > 0) {
        selectedStudents = selectedRows.map(x => x.email);
    }
    dispatch(addStudentsToTest(testid, selectedStudents));
    dispatch(SetOpen("addStudentsToTestModal", false));
  };
  const { addStudentsToTestModal } = main;
  return (
    <>
      <Modal
        size="lg"
        show={addStudentsToTestModal}
        onHide={closeModal}
        centered
      >
        {/* //TODO: show pending requests */}
        <Modal.Header closeButton>Students list to add</Modal.Header>
        <Modal.Body>
          <div style={{ textAlign: "right" }}>
            <Button size="sm" onClick={handleAddStudentsClick}>
              <i className="bi bi-plus-lg"></i> Add selected students
            </Button>
          </div>
          <div className={theme === themes.light ? "ag-theme-alpine" : "ag-theme-alpine-dark"} style={{ height: 450 }}>
            <AgGridReact
              ref={gridRef}
              rowSelection="multiple"
              columnDefs={StudentListGridColumns}
              rowData={main.studentsList || []}
              pagination={true}
            />
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddStudentsToTestModal;
