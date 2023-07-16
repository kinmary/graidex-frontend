import React, { Component, useState } from "react";
import {
  Breadcrumb,
  Button,
  Dropdown,
  Form,
  InputGroup,
} from "react-bootstrap";
import { useAppDispatch } from "../../app/hooks";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { useNavigate, useParams } from "react-router-dom";
import MessageModal from "../Modals/MessageModal";

const Settings = () => {
  const main = useSelector((state: RootState) => state.main);
  const [title, setTitle] = useState(main.selectedTest!.examName);
  const [date, setDate] = useState(main.selectedTest!.date);
  const [status, setStatus] = useState(main.selectedTest!.status);
  const navigate = useNavigate();
  const params = useParams();
  const { selectedTest } = main;

  const handleTitleChange = (event: any) => {
    setTitle(event.target.value);
  };

  const handleDateChange = (event: any) => {
    setDate(event.target.value);
  };

  const handleStatusChange = (event: any) => {
    setStatus(event);
  };

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
        {selectedTest && selectedTest.examName}

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
          {params.selectedSubjectId}
        </Breadcrumb.Item>
        <Breadcrumb.Item onClick={() => navigate(-1)}>
          {selectedTest && selectedTest.examName}
        </Breadcrumb.Item>
        <Breadcrumb.Item active>Settings</Breadcrumb.Item>
      </Breadcrumb>
      <Form.Group style={{ marginTop: 20 }}>
        <Form.Label>Title of test </Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter title"
          style={{ width: "30%" }}
          value={title}
          onChange={handleTitleChange}
        />
      </Form.Group>
      <Form.Group style={{ marginTop: 20 }}>
        <Form.Label>Status</Form.Label>
        <Dropdown>
          <Dropdown.Toggle variant="outline-primary" id="status-dropdown">
            {status === 0
              ? "Not started"
              : status === 1
              ? "In progress"
              : "Completed"}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item value={0} onClick={() => handleStatusChange("0")}>
              Not started
            </Dropdown.Item>
            <Dropdown.Item value={1} onClick={() => handleStatusChange("1")}>
              In progress
            </Dropdown.Item>
            <Dropdown.Item value={2} onClick={() => handleStatusChange("2")}>
              Completed
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Form.Group>
      <Form.Group style={{ marginTop: 20 }}>
        <Form.Label>Date</Form.Label>
        <Form.Control
          type="date"
          placeholder="Enter date"
          style={{ width: "20%" }}
          value={date}
          onChange={handleDateChange}
        />
      </Form.Group>
      <Form.Group style={{ marginTop: 20 }}>
        <Form.Label>Share link </Form.Label>
        <InputGroup style={{ width: "35%" }}>
          <InputGroup.Text>
            <i className="bi bi-link"></i>
          </InputGroup.Text>
          <Form.Control readOnly value={"https://example.com/users/"} />
          <InputGroup.Text>
            <Button size="sm">Copy</Button>
          </InputGroup.Text>
        </InputGroup>
      </Form.Group>
      <Form.Group style={{ marginTop: 20 }}>
        <Form.Label>Manage Participants </Form.Label>
        <InputGroup style={{ width: "35%" }}>
          <Button>Manage Participants</Button>
        </InputGroup>
      </Form.Group>
    </Form>
    </>
  );
};

export default Settings;
