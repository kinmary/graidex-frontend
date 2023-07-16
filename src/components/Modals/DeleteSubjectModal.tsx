import { Button, Modal } from "react-bootstrap";
import { SetOpen } from "../MainAction";
import { deleteSubject } from "../Dashboard/SubjectActions";
import { useAppDispatch } from "../../app/hooks";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { useNavigate } from "react-router-dom";

const DeleteSubjectModal = () => {
  const dispatch = useAppDispatch();
  const main = useSelector((state: RootState) => state.main);
  const navigate = useNavigate();
  const closeModal = () => {
    dispatch(SetOpen("deleteSubjectModal", false));
  }
  const onConfirm = async (event: any) =>{
    event.preventDefault();
    let result = await dispatch(deleteSubject(main.selectedSubjectId));
    if (result) {
      dispatch(SetOpen("deleteSubjectModal", false));
      navigate("/");
    }
  }


    const { deleteSubjectModal, selectedSubjectId } = main;
    const selectedSubject = main.allSubjects.find((obj:any) => obj.id.toString() === selectedSubjectId.toString());
    return (
      <>
        <Modal
          show={deleteSubjectModal}
          onHide={closeModal}
          centered
          size="sm"
        >
          <Modal.Header closeButton>Delete Subject: {selectedSubject.title}</Modal.Header>
          <Modal.Body>
            Deleting this subject will permanently remove all information. This can not be undone.
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeModal}>
              Cancel
            </Button>
            <Button variant="danger" onClick={onConfirm}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }

export default DeleteSubjectModal;

