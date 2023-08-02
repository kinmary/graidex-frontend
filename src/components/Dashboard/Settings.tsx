import React, { Component, useState } from "react";
import {
  Breadcrumb,
  Button,
  Dropdown,
  Form,
  InputGroup,
  Row,
  Col,
  ListGroup,
  Image,
} from "react-bootstrap";
import { useAppDispatch } from "../../app/hooks";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { useNavigate, useParams } from "react-router-dom";
import MessageModal from "../Modals/MessageModal";

import profilePic from "../../images/blank-profile-picture.jpg";

const Settings = () => {
  const main = useSelector((state: RootState) => state.main);
  const [title, setTitle] = useState(main.selectedTest!.examName);
  const [date, setDate] = useState(main.selectedTest!.date);
  const [status, setStatus] = useState(main.selectedTest!.status);
  const navigate = useNavigate();
  const params = useParams();
  const { selectedTest } = main;

  const [isCustomTimeLimit, setIsCustomTimeLimit] = useState(false);

  const [targetGroup, setTargetGroup] = useState ([
    { name: 'Walter White', email: 'walter.white@example.com' },
    { name: 'Jesse Pinkman', email: 'jesse.pinkman@example.com' },
    { name: 'Skyler White', email: 'skyler.white@example.com' },
    { name: 'Hank Schrader', email: 'hank.schrader@example.com' },
    { name: 'Saul Goodman', email: 'saul.goodman@example.com' },
]);

  const handleTitleChange = (event: any) => {
    setTitle(event.target.value);
  };

  const handleDateChange = (event: any) => {
    setDate(event.target.value);
  };

  const handleStatusChange = (event: any) => {
    setStatus(event);
  };

  const handleRemoveStudent = (idx: number) => {
    setTargetGroup(targetGroup.filter((s, sidx) => idx !== sidx));
  }

  const selectedSubject = main.allSubjects.find((obj: any) => obj.id.toString() === params.selectedSubjectId!.toString());

  

  return (
    <>
    <MessageModal />
    <Form style={{ marginTop: 20 }}>
      <h5
        style={{
          fontWeight: "bold",
          textAlign: "left",
          display: "flex",
          alignItems: "center",
          marginBottom: 5,
        }}
        onClick={() => {
          navigate(-1);
        }}
      >
        {/*selectedTest && selectedTest.examName*/}
        Final Exam

        {/* <Button
            variant="danger"
            size="sm"
            style={{ marginLeft: 10 }}
            //onClick={this.handleDeleteTest}
          >
            Delete test
          </Button> */}
      </h5>
      <Breadcrumb style={{ fontSize: 14 }}>
        <Breadcrumb.Item onClick={() => navigate("/")}>
          Dashboard
        </Breadcrumb.Item>
        <Breadcrumb.Item
          onClick={() => navigate("/" + params.selectedSubjectId)}
        >
          {selectedSubject.title}
        </Breadcrumb.Item>
        <Breadcrumb.Item onClick={() => navigate(-1)}>
          {/*selectedTest && selectedTest.examName*/}
          ???
        </Breadcrumb.Item>
        <Breadcrumb.Item active>Settings</Breadcrumb.Item>
      </Breadcrumb>
      
      <Row className="mb-4">
        <Col>
        <div style={{ width: "80%" }}>
          <Form.Group>
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter title"
              value={title}
              onChange={handleTitleChange}
            />
          </Form.Group>

          <Form.Group style={{ marginTop: 20 }}>
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea" 
              rows={4}
              placeholder="Enter description"
            />
          </Form.Group>

          <Form.Group style={{ marginTop: 20 }}>
            <Form.Label>Start date and time</Form.Label>
            <InputGroup>
              <Form.Control
                type="date"
                placeholder="Enter date"
              />
              <Form.Control
                type="time"
                placeholder="Enter time"
              />
            </InputGroup>
          </Form.Group>

          <Form.Group style={{ marginTop: 20 }}>
            <Form.Label>End date and time</Form.Label>
            <InputGroup>
              <Form.Control
                type="date"
                placeholder="Enter date"
              />
              <Form.Control
                type="time"
                placeholder="Enter time"
              />
            </InputGroup>
          </Form.Group>

          <Form.Group style={{ marginTop: 20 }}>
            <Form.Label>Time limit</Form.Label>
            <InputGroup>
              {/* TODO: Change  */}
              <Form.Control
                disabled={!isCustomTimeLimit}
                type="text"
                placeholder="0"
                defaultValue="5"
                className="border-end-0"
              />
              <InputGroup.Text className={
                  `border-start-0 
                  text-muted 
                  ${isCustomTimeLimit ? '' : 'bg-body-secondary'}`
                }>
                DYS
              </InputGroup.Text>

              <Form.Control
                disabled={!isCustomTimeLimit}
                type="text"
                placeholder="0"
                defaultValue="2"
                className="border-end-0"
              />
              <InputGroup.Text className={
                  `border-start-0 
                  text-muted 
                  ${isCustomTimeLimit ? '' : 'bg-body-secondary'}`
                }>
                HRS
              </InputGroup.Text>

              <Form.Control
                disabled={!isCustomTimeLimit}
                type="text"
                placeholder="0"
                className="border-end-0"
                defaultValue="30"
              />
              <InputGroup.Text className={
                  `border-start-0 
                  text-muted 
                  ${isCustomTimeLimit ? '' : 'bg-body-secondary'}`
                }>
                MIN
              </InputGroup.Text>
              <InputGroup.Text>
                <Form.Check
                  reverse
                  type="switch"
                  id="custom-switch"
                  label="Custom"
                  onChange={(event) => {setIsCustomTimeLimit(event.target.checked);}}
                />
              </InputGroup.Text>
            </InputGroup>
          </Form.Group>

          <Form.Group style={{ marginTop: 20 }}>
            <Form.Label className="text-muted">Test actions</Form.Label>
            <div className="d-100 d-flex">
              <Button disabled variant="outline-primary" className="flex-grow-1 me-2">
                Duplicate test
              </Button>
              <Button disabled variant="danger" className="flex-grow-1">
                Delete test
              </Button>
            </div>
          </Form.Group>
          </div>
        </Col>
      
        <Col>
          <div style={{ width: "60%" }}>
            <Form.Group>
              <Form.Label>Participants</Form.Label>
              <Dropdown>
                <Dropdown.Toggle variant="outline-primary" id="status-dropdown">
                  All except the group
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item value={0} onClick={() => handleStatusChange("0")}>
                    All subject students
                  </Dropdown.Item>
                  <Dropdown.Item disabled value={1} onClick={() => handleStatusChange("1")}>
                  All except the group
                  </Dropdown.Item>
                  <Dropdown.Item value={2} onClick={() => handleStatusChange("2")}>
                    From the group only
                  </Dropdown.Item>
                  <Dropdown.Item value={3} onClick={() => handleStatusChange("3")}>
                    Nobody
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Form.Group>

            <Form.Group style={{ marginTop: 20 }}>
              <Form.Label>Group</Form.Label>
              <ListGroup>
              <ListGroup.Item variant="primary" action className="d-flex justify-content-center">
                <i className="bi bi-plus-lg me-2"></i>
                Add students
              </ListGroup.Item>

                {targetGroup.map ((student, idx) => (
                  <ListGroup.Item action className="d-flex justify-content-between align-items-center">
                    <div>
                      <Row>
                        <Col className="d-flex align-items-center">
                          <Image className="profile-image me-2" src={profilePic} />
                          <span className="">{student.name}</span>
                        </Col>
                      </Row>
                      <Row>
                          <span className="text-muted text-nowrap ms-1">{student.email}</span>
                      </Row>
                    </div>
                    <i
                      className="bi bi-dash-circle text-danger"
                      onClick={() => handleRemoveStudent(idx)}>
                    </i>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Form.Group>
          </div>
        </Col>
      </Row>
    </Form>
    </>
  );
};

export default Settings;
