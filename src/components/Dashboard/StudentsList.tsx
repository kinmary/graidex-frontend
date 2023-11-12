import React, { useEffect, useState } from "react";
import {
  Form,
  ListGroup,
  Row,
  Col,
  Image,
  Pagination,
  Alert,
} from "react-bootstrap";
import profilePic from "../../images/blank-profile-picture.jpg";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { IStudent } from "../../interfaces/Student";
import { getStudentsList } from "./SubjectActions";
import { SetOpen } from "../MainAction";
import { useAppDispatch } from "../../app/hooks";

type StudentListArg = {
  subjectId: string;
};
const StudentsList = ({ subjectId }: StudentListArg) => {
  const main = useSelector((state: RootState) => state.main);
  const dispatch = useAppDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const { currentTestDraft } = main;
  const [allowedStudents, setAllowedStudents] = useState<Array<IStudent>>([]);

  useEffect(() => {
    if (currentTestDraft.itemType === "Test" && main.studentsList) {
      const filteredStudents = main.studentsList.filter((student: IStudent) =>
        currentTestDraft.allowedStudents.includes(student.email)
      );
      setAllowedStudents(filteredStudents);
    }
  }, [currentTestDraft]);

  const studentsPerPage = 5;
  const handleRemoveStudent = (email: string) => {
    setAllowedStudents(allowedStudents.filter((s, sidx) => s.email !== email));
    //TODO: add remove student backend
  };
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = allowedStudents.slice(
    indexOfFirstStudent,
    indexOfLastStudent
  );
  const handleManageStudents = () => {
    dispatch(getStudentsList(subjectId));
    dispatch(SetOpen("addStudentsToTestModal", true));
  };

  return (
    <Form.Group style={{ marginTop: 20 }}>
      {currentStudents.length === 0 && (
        <Alert variant="danger">
          Note! This test has no students. Add them below
        </Alert>
      )}
      <Form.Label>Students List</Form.Label>
      <ListGroup>
        <ListGroup.Item
          variant="primary"
          className="d-flex justify-content-center"
          onClick={handleManageStudents}
        >
          <i className="bi bi-plus-lg me-2"></i>
          Add students
        </ListGroup.Item>

        {currentStudents.length > 0 &&
          currentStudents.map((student, idx) => (
            <ListGroup.Item
              key={idx}
              className="d-flex justify-content-between align-items-center"
            >
              <div>
                <Row>
                  <Col className="d-flex align-items-center">
                    {/* <Image
                      className="profile-image me-2"
                      src={profilePic}
                      style={{ objectFit: "cover" }}
                    /> */}
                    <span className="">
                      {student.name} {student.surname}
                    </span>
                  </Col>
                </Row>
                <Row>
                  <span className="text-muted text-nowrap ">
                    {student.email}
                  </span>
                </Row>
              </div>
              <i
                className="bi bi-dash-circle text-danger"
                onClick={() => handleRemoveStudent(student.email)}
              ></i>
            </ListGroup.Item>
          ))}
      </ListGroup>
      {allowedStudents.length > 5 && (
        <Pagination>
          <Pagination.Prev
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          />
          {[...Array(Math.ceil(allowedStudents.length / studentsPerPage))].map(
            (item, index) => (
              <Pagination.Item
                style={{ width: "100%", textAlign: "center" }}
                key={index}
                active={index + 1 === currentPage}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </Pagination.Item>
            )
          )}
          <Pagination.Next
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={indexOfLastStudent >= allowedStudents.length}
          />
        </Pagination>
      )}
    </Form.Group>
  );
};

export default StudentsList;
