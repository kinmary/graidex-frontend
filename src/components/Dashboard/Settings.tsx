import React, { Component, useEffect, useState } from "react";
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
  Alert,
} from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { useNavigate, useParams } from "react-router-dom";
import MessageModal from "../Modals/MessageModal";

import { useAppDispatch } from "../../app/hooks";
import {
  createDraftFromTest,
  createTest,
  deleteDraft,
  deleteTest,
  duplicateDraft,
  updateDraft,
  updateTest,
} from "./TestActions";
import { IUpdateTestDto } from "../../interfaces/UpdateTestDto";
import StudentsList from "./StudentsList";
import { IUpdateTestDraftDto } from "../../interfaces/UpdateTestDraftDto";
import { ICreateTestDto } from "../../interfaces/CreateTestDto";
import AddStudentModal from "../Modals/AddStudentModal";
import AddStudentsToTestModal from "../Modals/AddStudentsToTestModal";

interface ITimeLimit {
  hours: number;
  minutes: number;
}
const Settings = () => {
  const main = useSelector((state: RootState) => state.main);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const params = useParams();
  const { currentTestDraft } = main;
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    gradeToPass: 4,
  });
  // !Date validations are:
  // Custom time limit can not be more than date difference
  // Start date can not be later than endDate
  const [dates, setDates] = useState({
    startDate: new Date(),
    endDate: new Date(),
  });
  const [autoCheck, setAutoCheck] = useState<boolean>(false);
  const [reviewResult, setReviewResult] = useState<string | undefined>("");
  const [isCustomTimeLimit, setIsCustomTimeLimit] = useState<boolean>(false);
  const [timeLimit, setTimeLimit] = useState<ITimeLimit>({
    hours: 0,
    minutes: 0,
  });

  useEffect(() => {
    setInputs({
      title: currentTestDraft.title,
      description: currentTestDraft.description,
      gradeToPass: currentTestDraft.gradeToPass,
    });

    if (currentTestDraft.itemType === "Test") {
      setAutoCheck(currentTestDraft.autoCheckAfterSubmission);
      setReviewResult(currentTestDraft.reviewResult);
      setDates({
        startDate: new Date(currentTestDraft.startDateTime),
        endDate: new Date(currentTestDraft.endDateTime),
      });
      setTimeLimit({
        hours: Number(currentTestDraft.timeLimit.split(":")[0]),
        minutes: Number(currentTestDraft.timeLimit.split(":")[1]),
      });
    }
  }, [currentTestDraft]);
  useEffect(() => {
    const timeDifference = dates.endDate.getTime() - dates.startDate.getTime();
    const hours = Math.floor(timeDifference / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference / (1000 * 60)) % 60);
    if (timeLimit.hours !== hours && timeLimit.minutes !== minutes) {
      setIsCustomTimeLimit(true);
    }
  }, [dates.endDate, dates.startDate, timeLimit.hours, timeLimit.minutes]);
  useEffect(() => {
    if (!isCustomTimeLimit) {
      const timeDifference =
        dates.endDate.getTime() - dates.startDate.getTime();
      const hours = Math.floor(timeDifference / (1000 * 60 * 60));
      const minutes = Math.floor((timeDifference / (1000 * 60)) % 60);
      setTimeLimit({ hours: hours, minutes: minutes });
    }
  }, [dates.startDate, dates.endDate, isCustomTimeLimit]);

  const handleDiscardChanges = () => {
    setInputs({
      title: currentTestDraft.title,
      description: currentTestDraft.description,
      gradeToPass: currentTestDraft.gradeToPass,
    });
    setDates({
      startDate: new Date(currentTestDraft.startDateTime),
      endDate: new Date(currentTestDraft.endDateTime),
    });
    setAutoCheck(currentTestDraft.autoCheckAfterSubmission);
    setReviewResult(currentTestDraft.reviewResult);
    setTimeLimit({
      hours: Number(currentTestDraft.timeLimit.split(":")[0]),
      minutes: Number(currentTestDraft.timeLimit.split(":")[1]),
    });
  };
  const handleSaveChanges = () => {
    if (currentTestDraft.itemType === "Test" && params.selectedSubjectId) {
      const timeDifference =
        dates.endDate.getTime() - dates.startDate.getTime();
      let milliseconds = 0;
      milliseconds = (timeLimit.hours * 60 + timeLimit.minutes) * 60 * 1000;
      if (milliseconds > timeDifference) {
        const hours = Math.floor(timeDifference / (1000 * 60 * 60));
        const minutes = Math.floor((timeDifference / (1000 * 60)) % 60);
        alert(
          `Custom time limit can not exceed the default limit ${hours}:${minutes}`
        );
      } else if (timeLimit.hours === 0 && timeLimit.minutes === 0) {
        alert(`Time limit should be at least 1 minute (00:01:00)`);
      } else {
        let start = new Date(dates.startDate);
        let hoursDiff = start.getHours() - start.getTimezoneOffset() / 60;
        start.setHours(hoursDiff);
        let end = new Date(dates.endDate);
        let endhoursDiff = end.getHours() - end.getTimezoneOffset() / 60;
        end.setHours(endhoursDiff);
        let newTest: IUpdateTestDto = {
          title: inputs.title,
          description: inputs.description,
          gradeToPass: inputs.gradeToPass,
          isVisible: currentTestDraft.isVisible,
          startDateTime: start,
          endDateTime: end,
          timeLimit: `${String(timeLimit.hours).padStart(2, "0")}:${String(
            timeLimit.minutes
          ).padStart(2, "0")}:00`,
          autoCheckAfterSubmission: autoCheck,
          reviewResult: reviewResult,
          orderIndex: currentTestDraft.orderIndex,
        };
        dispatch(
          updateTest(currentTestDraft.id, newTest, params.selectedSubjectId)
        );
      }
    }
    if (currentTestDraft.itemType === "TestDraft" && params.selectedSubjectId) {
      let updateTDraft: IUpdateTestDraftDto = {
        title: inputs.title,
        description: inputs.description,
        gradeToPass: inputs.gradeToPass,
        isVisible: currentTestDraft.isVisible,
        orderIndex: currentTestDraft.orderIndex,
      };
      dispatch(updateDraft(currentTestDraft.id, updateTDraft));
    }
  };

  const handleCreateTest = () => {
    let updateTDraft: IUpdateTestDraftDto = {
      title: inputs.title,
      description: inputs.description,
      gradeToPass: inputs.gradeToPass,
      isVisible: currentTestDraft.isVisible,
      orderIndex: currentTestDraft.orderIndex,
    };
    let start = new Date(dates.startDate);
        let hoursDiff = start.getHours() - start.getTimezoneOffset() / 60;
        start.setHours(hoursDiff);
        let end = new Date(dates.endDate);
        let endhoursDiff = end.getHours() - end.getTimezoneOffset() / 60;
        end.setHours(endhoursDiff);
        let createTestDto : ICreateTestDto = {
          startDateTime: start,
          endDateTime: end,
          timeLimit: `${String(timeLimit.hours).padStart(2, "0")}:${String(
            timeLimit.minutes
          ).padStart(2, "0")}:00`,
          autoCheckAfterSubmission: autoCheck,
          reviewResult: reviewResult,
          orderIndex: currentTestDraft.orderIndex,
        };
   
    dispatch(createTest(currentTestDraft.id, updateTDraft, createTestDto, params.selectedSubjectId!));
    navigate(`/${params.selectedSubjectId}`)
  }

  const handleInputsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputs({
      ...inputs,
      [event.target.name]: event.target.value,
    });
  };
  const handleTimeLimitChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    try {
      setTimeLimit({
        ...timeLimit,
        [event.target.name]: parseInt(event.target.value),
      });
    } catch {}
  };

  const timeLimitChange = () => {
    const timeDifference = dates.endDate.getTime() - dates.startDate.getTime();
    const hours = Math.floor(timeDifference / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference / (1000 * 60)) % 60);
    setTimeLimit({ hours: hours, minutes: minutes });
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const oldDate =
      event.target.name === "startDate" ? dates.startDate : dates.endDate;
    const newDate = new Date(oldDate);
    newDate.setFullYear(Number(event.target.value.substring(0, 4)));
    newDate.setMonth(Number(event.target.value.substring(5, 7)) - 1);
    newDate.setDate(Number(event.target.value.substring(8)));
    if (event.target.name === "startDate") {
      if (newDate < dates.endDate) {
        setDates({ ...dates, [event.target.name]: newDate });
      } else {
        alert(`Start date can not be later than end date ${dates.endDate}`);
      }
    }
    if (event.target.name === "endDate") {
      if (newDate > dates.startDate) {
        setDates({ ...dates, [event.target.name]: newDate });
      } else {
        alert(`End date can not be earlier than start date ${dates.startDate}`);
      }
    }
  };

  const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const oldDate =
      event.target.name === "startDate" ? dates.startDate : dates.endDate;
    const { value } = event.target;
    if (value !== "") {
      const newDate = new Date(oldDate);
      const [hours, minutes] = value.split(":");
      newDate.setHours(Number(hours), Number(minutes));
      // newDate.setMinutes(Number(minutes));
      if (event.target.name === "startDate") {
        if (newDate < dates.endDate) {
          setDates({ ...dates, [event.target.name]: newDate });
        } else {
          alert(`Start date can not be later than end date ${dates.endDate}`);
        }
      }
      if (event.target.name === "endDate") {
        if (newDate > dates.startDate) {
          setDates({ ...dates, [event.target.name]: newDate });
        } else {
          alert(
            `End date can not be earlier than start date ${dates.startDate}`
          );
        }
      }
    }
  };

  const selectedSubject = main.allSubjects.find(
    (obj: any) => obj.id.toString() === params.selectedSubjectId!.toString()
  );

  const handleTestDraftDuplicate = () => {
    if (currentTestDraft.itemType === "Test") {
      dispatch(createDraftFromTest(currentTestDraft.id));
    }
    else if (currentTestDraft.itemType === "TestDraft") {
      dispatch(duplicateDraft(currentTestDraft.id));
    }
    navigate(`/${params.selectedSubjectId!}`);
  };

  const handleDelete = () => {
    if(currentTestDraft.itemType === "Test"){
      dispatch(deleteTest(currentTestDraft.id, params.selectedSubjectId!))

    } 
    else if(currentTestDraft.itemType === "TestDraft"){
      dispatch(deleteDraft(currentTestDraft.id, params.selectedSubjectId!))
    }
    navigate(`/${params.selectedSubjectId}`)
  }
  return (
    <>
      <MessageModal />
      <AddStudentsToTestModal testid={currentTestDraft.id} selectedSubjectId={params.selectedSubjectId!} />
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
          Settings
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
            {currentTestDraft && currentTestDraft.title}
          </Breadcrumb.Item>
          <Breadcrumb.Item active>Settings</Breadcrumb.Item>
        </Breadcrumb>

        <Row className="mb-4">
          <Col>
            <div style={{ width: "80%" }}>
              <Form.Group key={1}>
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  placeholder="Enter title"
                  value={inputs.title}
                  onChange={handleInputsChange}
                />
              </Form.Group>

              <Form.Group style={{ marginTop: 5 }}>
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  name="description"
                  placeholder="Enter description"
                  value={inputs.description}
                  onChange={handleInputsChange}
                />
              </Form.Group>
              <Form.Group style={{ marginTop: 5 }}>
                <Form.Label>Grade to pass the test</Form.Label>
                <Form.Control
                  type="number"
                  name="gradeToPass"
                  min={0}
                  max={10}
                  disabled={currentTestDraft.itemType === "Test" && dates.endDate.getTime() < new Date().getTime()}
                  value={inputs.gradeToPass}
                  onChange={handleInputsChange}
                />
              </Form.Group>

              {/* {currentTestDraft.itemType === "Test" && ( */}
                <>
                  <Form.Group style={{ marginTop: 5 }}>
                    <Form.Label>Start date and time</Form.Label>
                    {/* {dates.startDate.getTime() < new Date().getTime() && (
                      <Alert variant="warning" dismissible>
                        This test has already started!
                      </Alert>
                    )} */}
                    <InputGroup>
                      <Form.Control
                        disabled={
                          currentTestDraft.itemType === "Test" && dates.startDate.getTime() < new Date().getTime()
                        }
                        type="date"
                        placeholder="Enter date"
                        name="startDate"
                        value={
                          dates.startDate &&
                          dates.startDate.toISOString().split("T")[0]
                        }
                        onChange={handleDateChange}
                      />
                      <Form.Control
                        type="time"
                        placeholder="Enter time"
                        name="startDate"
                        disabled={
                          currentTestDraft.itemType === "Test" && dates.startDate.getTime() < new Date().getTime()
                        }
                        value={`${String(dates.startDate.getHours()).padStart(
                          2,
                          "0"
                        )}:${String(dates.startDate.getMinutes()).padStart(
                          2,
                          "0"
                        )}`}
                        onChange={handleTimeChange}
                      />
                    </InputGroup>
                  </Form.Group>

                  <Form.Group style={{ marginTop: 5 }}>
                    <Form.Label>End date and time</Form.Label>
                    <InputGroup>
                      <Form.Control
                        type="date"
                        placeholder="Enter date"
                        name="endDate"
                        disabled={
                          currentTestDraft.itemType === "Test" && dates.endDate.getTime() < new Date().getTime()
                        }
                        value={
                          dates.endDate &&
                          dates.endDate.toISOString().split("T")[0]
                        }
                        onChange={handleDateChange}
                      />
                      <Form.Control
                        type="time"
                        placeholder="Enter time"
                        name="endDate"
                        disabled={
                          currentTestDraft.itemType === "Test" && dates.endDate.getTime() < new Date().getTime()
                        }
                        value={`${String(dates.endDate.getHours()).padStart(
                          2,
                          "0"
                        )}:${String(dates.endDate.getMinutes()).padStart(
                          2,
                          "0"
                        )}`}
                        onChange={handleTimeChange}
                      />
                    </InputGroup>
                  </Form.Group>

                  <Form.Group style={{ marginTop: 5 }}>
                    <Form.Label>Time limit</Form.Label>
                    <InputGroup>
                      <Form.Control
                        value={timeLimit.hours}
                        name="hours"
                        type="number"
                        min={0}
                        disabled={
                          !isCustomTimeLimit ||
                          (currentTestDraft.itemType === "Test" && dates.endDate.getTime() < new Date().getTime())
                        }
                        // defaultValue="5"
                        className="border-end-0"
                        onChange={handleTimeLimitChange}
                      />
                      {/* KYS */}
                      <InputGroup.Text
                        className={`border-start-0 
                text-muted 
                ${isCustomTimeLimit ? "" : "bg-body-secondary"}`}
                      >
                        HOURS
                      </InputGroup.Text>

                      <Form.Control
                        disabled={
                          !isCustomTimeLimit ||
                          (currentTestDraft.itemType === "Test" && dates.endDate.getTime() < new Date().getTime())
                        }
                        value={timeLimit.minutes}
                        name="minutes"
                        type="number"
                        min={0}
                        max={59}
                        className="border-end-0"
                        // defaultValue="30"
                        onChange={handleTimeLimitChange}
                      />
                      <InputGroup.Text
                        className={`border-start-0 
                text-muted 
                ${isCustomTimeLimit ? "" : "bg-body-secondary"}`}
                      >
                        MIN
                      </InputGroup.Text>
                      <InputGroup.Text>
                        <Form.Check
                          disabled={
                            currentTestDraft.itemType === "Test" && dates.endDate.getTime() < new Date().getTime()
                          }
                          reverse
                          type="switch"
                          id="custom-switch"
                          label="Custom"
                          checked={isCustomTimeLimit}
                          onChange={(event) => {
                            setIsCustomTimeLimit(event.target.checked);
                            if (event.target.checked === false) {
                              timeLimitChange();
                            }
                          }}
                        />
                      </InputGroup.Text>
                    </InputGroup>
                  </Form.Group>
                  <Form.Group style={{ marginTop: 10 }}>
                    <InputGroup.Text>
                      <Form.Check
                        type="switch"
                        id="custom-switch"
                        label="Auto check after submission"
                        disabled={
                          currentTestDraft.itemType === "Test" && dates.endDate.getTime() < new Date().getTime()
                        }
                        checked={autoCheck}
                        onChange={(event) => {
                          setAutoCheck(event.target.checked);
                        }}
                      />
                    </InputGroup.Text>
                  </Form.Group>
                  <Form.Group style={{ marginTop: 5 }}>
                    <InputGroup.Text>
                      <Form.Label>Review results of test</Form.Label>
                      <Dropdown style={{ marginLeft: "auto" }}>
                        <Dropdown.Toggle
                          variant="outline-primary"
                          id="status-dropdown"
                          disabled={
                            currentTestDraft.itemType === "Test" && dates.endDate.getTime() < new Date().getTime()
                          }
                        >
                          {reviewResult}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item
                            value={"SetManually"}
                            onClick={() => setReviewResult("SetManually")}
                          >
                            Set manually
                          </Dropdown.Item>
                          <Dropdown.Item
                            value={"AfterSubmission"}
                            onClick={() => setReviewResult("AfterSubmission")}
                          >
                            After submission
                          </Dropdown.Item>
                          <Dropdown.Item
                            value={"AfterAutoCheck"}
                            onClick={() => setReviewResult("AfterAutoCheck")}
                          >
                            After auto check
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </InputGroup.Text>
                  </Form.Group>
                </>
              {/* )} */}
              <Form.Group style={{ marginTop: 20 }}>
                <div className="d-100 d-flex">
                  <Button
                    variant="secondary"
                    style={{ width: "30%" }}
                    onClick={handleDiscardChanges}
                  >
                    Discard
                  </Button>
                  <Button
                    variant="primary"
                    style={{ marginLeft: "auto", width: "68%" }}
                    onClick={handleSaveChanges}
                  >
                    Save changes
                  </Button>
                </div>
              </Form.Group>
            </div>
          </Col>

          <Col>
            <div style={{ width: "60%" }}>
              {currentTestDraft.itemType === "Test" &&
                dates.endDate.getTime() < new Date().getTime() && (
                  <Alert variant="warning" dismissible>
                    This test has already ended. You can only change{" "}
                    <b>title</b> and <b>description</b> here. To open the test
                    again - duplicate it!
                  </Alert>
                )}
                {currentTestDraft.itemType === "TestDraft" &&
                  (<Alert variant="warning" dismissible>
                    This is a <b>draft</b>. Only title, description and grade to pass changes will be saved here. 
                    <b> To create test from this draft:</b>
                    <ol type="1">
                    <li>Set start and end date of test</li>
                    <li>Set custom time limit (if needed)</li>
                    <li>Set if test should be checked automatically</li>
                    <li>Set how to review results of test</li>
                    <li>Double check everything again and click <b>"Create test from draft"</b>.</li> </ol>
                   Note: You won't be able to change start and end dates of test after it's start!
                  </Alert>
                )}
              {currentTestDraft.itemType === "Test" && (
                <>
                <StudentsList subjectId={params.selectedSubjectId!} />
                <Form.Group>
                  <Button
                    variant="outline-primary"
                    style={{ marginTop: 10, width: "100%" }}
                    onClick={handleTestDraftDuplicate}
                  >
                    Duplicate test
                  </Button>

                  <Button
                    variant="danger"
                    // className="flex-grow-1"
                    style={{ marginTop: 10, width: "100%" }}
                    onClick={handleDelete}

                  >
                    Delete test
                  </Button>
                </Form.Group>
                </>
              )}
              {currentTestDraft.itemType === "TestDraft" && (
                <Form.Group>
                   <Button
                    variant="primary"
                    style={{ marginTop: 10, width: "100%" }}
                    onClick={handleCreateTest}
                  >
                    Create test from draft
                  </Button>
                  <Button
                    variant="outline-primary"
                    style={{ marginTop: 10, width: "100%" }}
                    onClick={handleTestDraftDuplicate}
                  >
                    Duplicate draft
                  </Button>

                  <Button
                    variant="danger"
                    // className="flex-grow-1"
                    style={{ marginTop: 10, width: "100%" }}
                    onClick={handleDelete}
                  >
                    Delete draft
                  </Button>
                </Form.Group>
              )}
            </div>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default Settings;
