import { Button, Modal } from "react-bootstrap";
import { SetOpen } from "../MainAction";
import { AgGridReact } from "ag-grid-react";
import { StudentListGridColumns } from "../../constants/StudentListGridColumns";
import { useAppDispatch } from "../../app/hooks";
import { RootState } from "../../app/store";
import { useSelector } from "react-redux";

const ManageStudentsModal = () => {
  const dispatch = useAppDispatch();
  const main = useSelector((state: RootState) => state.main);
  const closeModal = () => {
    dispatch(SetOpen("manageStudentsModal", false));
  }

    const { manageStudentsModal, selectedSubjectId } = main;
    const selectedSubject = main.allSubjects.find(
      (obj:any) => obj.id.toString() === selectedSubjectId.toString()
    );
    return (
      <>
        <Modal
          size="lg"
          show={manageStudentsModal}
          onHide={closeModal}
          centered
        >
          <Modal.Header closeButton>
            Students list of {selectedSubject.title}
          </Modal.Header>
          <Modal.Body>
            <div style={{ textAlign: "right" }} >
            <Button size= 'sm' onClick={()=>dispatch(SetOpen("addStudentModal", true))} >
                  <i className="bi bi-plus-lg"></i> Add student
                </Button>
            </div>
         
            <div className="ag-theme-alpine" style={{ height: 450 }}>
              <AgGridReact
                rowSelection={"single"}
                columnDefs={StudentListGridColumns}
                rowData={main.studentsList || []}
                pagination={true}
              />
            </div>
          </Modal.Body>
        </Modal>
      </>
    );
  }


export default ManageStudentsModal;
