import React, {useState} from "react";
import {Button, Form, Modal} from "react-bootstrap";
import {SetOpen} from "../MainAction";
import {useAppDispatch} from "../../app/hooks";
import {useSelector} from "react-redux";
import {RootState} from "../../app/store";
import {addStudent} from "../Dashboard/SubjectRequestActions";
import {ISubject} from "../../interfaces/Subject";

interface Props {
  selectedSubject: ISubject;
}

const AddStudentModal = ({selectedSubject}: Props) => {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState("");
  const addStudentModal = useSelector((state: RootState) => state.main.addStudentModal);
  const closeModal = () => {
    setEmail("");
    dispatch(SetOpen("addStudentModal", false));
  };
  const AddStudent = () => {
    dispatch(addStudent(selectedSubject.id.toString(), email));
    setEmail("");
    dispatch(SetOpen("addStudentModal", false));
  };
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setEmail(event.target.value);
  };

  return (
    <>
      <Modal show={addStudentModal} onHide={closeModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add student</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={(event) => event.preventDefault()}>
            <Form.Group className="mb-3">
              <Form.Label>Student Email</Form.Label>
              <Form.Control autoComplete="off" placeholder="Enter student email" required value={email} name="email" onChange={handleInputChange} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
          <Button variant="primary" onClick={AddStudent}>
            Add student
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddStudentModal;
