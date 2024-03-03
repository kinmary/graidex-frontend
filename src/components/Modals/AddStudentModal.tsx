import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { SetOpen } from "../MainAction";
import { useAppDispatch } from "../../app/hooks";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { addStudent } from "../Dashboard/SubjectRequestActions";

const AddStudentModal = () => {
  const dispatch = useAppDispatch();
  const main = useSelector((state: RootState) => state.main);
  const [email, setEmail] = useState("");

  const closeModal = () => {
    setEmail( "" );
    dispatch(SetOpen("addStudentModal", false));
  }
  const AddStudent = () => {
    dispatch(addStudent(main.selectedSubjectId, email));
    setEmail( "" );
    dispatch(SetOpen("addStudentModal", false));
  }
  const handleInputChange = (event:React.ChangeEvent<HTMLInputElement> ) =>{
    setEmail(event.target.value)
  }

    const {addStudentModal} = main;
    return (
      <>
      <Modal show={addStudentModal} onHide={closeModal}
      centered  >
        <Modal.Header closeButton>
        <Modal.Title>
          Add student
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
            <Form.Group className="mb-3">
              <Form.Label>Student Email</Form.Label>
              <Form.Control
              autoComplete="off"
                placeholder="Enter student email"
                required
                value={email}
                name="email"
                onChange={handleInputChange}
              />
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
  }


export default AddStudentModal;
