import {Button, Modal} from "react-bootstrap";
import {SetOpen} from "../MainAction";
import {deleteSubject} from "../Dashboard/SubjectActions";
import {useAppDispatch} from "../../app/hooks";
import {useSelector} from "react-redux";
import {RootState} from "../../app/store";
import {useNavigate} from "react-router-dom";
import {ISubject} from "../../interfaces/Subject";
interface DeleteSubjectModalProps {
  selectedSubject: ISubject;
}
const DeleteSubjectModal = ({selectedSubject}: DeleteSubjectModalProps) => {
  const dispatch = useAppDispatch();
  const deleteSubjectModal = useSelector((state: RootState) => state.main.deleteSubjectModal);
  const navigate = useNavigate();
  const closeModal = () => {
    dispatch(SetOpen("deleteSubjectModal", false));
  };
  const onConfirm = async (event: any) => {
    event.preventDefault();
    let result = await dispatch(deleteSubject(selectedSubject.id.toString()));
    if (result) {
      dispatch(SetOpen("deleteSubjectModal", false));
      navigate("/");
    }
  };
  return (
    <>
      <Modal show={deleteSubjectModal} onHide={closeModal} centered size="sm">
        <Modal.Header closeButton>Delete Subject: {selectedSubject.title}</Modal.Header>
        <Modal.Body>Deleting this subject will permanently remove all information. This can not be undone.</Modal.Body>
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
};

export default DeleteSubjectModal;
