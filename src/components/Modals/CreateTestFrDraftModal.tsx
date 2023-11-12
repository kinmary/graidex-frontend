import React, { useEffect, useState } from "react";
import { Button, Form, InputGroup, Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../app/hooks";
import { RootState } from "../../app/store";
import { useNavigate } from "react-router-dom";
import { IUpdateTestDraftDto } from "../../interfaces/UpdateTestDraftDto";
import { ICreateTestDto } from "../../interfaces/CreateTestDto";
import { createTest } from "../Dashboard/TestActions";
import { SetOpen } from "../MainAction";
interface IProps {
  subjectId: string | undefined;
  inputs: { title: string; description: string; gradeToPass: number };
}

interface ITimeLimit {
  hours: number;
  minutes: number;
}
const CreateTestFromDraft = ({ subjectId, inputs }: IProps) => {
  const main = useSelector((state: RootState) => state.main);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { currentTestDraft } = main;
  const [dates, setDates] = useState({
    startDate: new Date(),
    endDate: new Date(),
  });
  const [autoCheck, setAutoCheck] = useState<boolean>(false);
  //TODO: check if shuffleQuestions needed
  // const [shuffleQuestions, setShuffleQuestions] = useState<boolean>(false);
  const [reviewResult, setReviewResult] = useState<string | undefined>(
    "SetManually"
  );
  const [isCustomTimeLimit, setIsCustomTimeLimit] = useState<boolean>(false);
  const [timeLimit, setTimeLimit] = useState<ITimeLimit>({
    hours: 0,
    minutes: 0,
  });

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

  const closeModal = () => {
    setDates({
      startDate: new Date(),
      endDate: new Date(),
    });
    setAutoCheck(false);
    setReviewResult("SetManually");
    setTimeLimit({
      hours: 0,
      minutes: 0,
    });
    dispatch(SetOpen("createTestFromDraft", false));
  };
  const handleCreateTest = () => {
    let updateTDraft: IUpdateTestDraftDto = {
      title: inputs.title,
      description: inputs.description,
      gradeToPass: inputs.gradeToPass,
      isVisible: currentTestDraft.isVisible,
      orderIndex: currentTestDraft.orderIndex,
    };
    let createTestDto: ICreateTestDto = {
      startDateTime: dates.startDate,
      endDateTime: dates.endDate,
      timeLimit: `${String(timeLimit.hours).padStart(2, "0")}:${String(
        timeLimit.minutes
      ).padStart(2, "0")}:00`,
      autoCheckAfterSubmission: autoCheck,
      reviewResult: reviewResult,
      orderIndex: currentTestDraft.orderIndex,
    };

    dispatch(
      createTest(currentTestDraft.id, updateTDraft, createTestDto, subjectId!)
    );
    dispatch(SetOpen("createTestFromDraft", false));
    navigate(`/${subjectId}`);
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

  const { createTestFromDraft } = main;
  return (
    <>
      <Modal show={createTestFromDraft} onHide={closeModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Create new test draft</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group style={{ marginTop: 5 }}>
              <Form.Label>Start date and time</Form.Label>
              <InputGroup>
                <Form.Control
                  disabled={
                    currentTestDraft.itemType === "Test" &&
                    dates.startDate.getTime() < new Date().getTime()
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
                    currentTestDraft.itemType === "Test" &&
                    dates.startDate.getTime() < new Date().getTime()
                  }
                  value={dates.startDate.toLocaleTimeString().slice(0,5)}
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
                    currentTestDraft.itemType === "Test" &&
                    dates.endDate.getTime() < new Date().getTime()
                  }
                  value={
                    dates.endDate && dates.endDate.toISOString().split("T")[0]
                  }
                  onChange={handleDateChange}
                />
                <Form.Control
                  type="time"
                  placeholder="Enter time"
                  name="endDate"
                  disabled={
                    currentTestDraft.itemType === "Test" &&
                    dates.endDate.getTime() < new Date().getTime()
                  }
                  value={dates.endDate.toLocaleTimeString().slice(0,5)}
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
                    (currentTestDraft.itemType === "Test" &&
                      dates.endDate.getTime() < new Date().getTime())
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
                    (currentTestDraft.itemType === "Test" &&
                      dates.endDate.getTime() < new Date().getTime())
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
                      currentTestDraft.itemType === "Test" &&
                      dates.endDate.getTime() < new Date().getTime()
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
                    currentTestDraft.itemType === "Test" &&
                    dates.endDate.getTime() < new Date().getTime()
                  }
                  checked={autoCheck}
                  onChange={(event) => {
                    setAutoCheck(event.target.checked);
                  }}
                />
              </InputGroup.Text>
            </Form.Group>
            {/* <Form.Group style={{ marginTop: 5 }}>
                  <InputGroup.Text>
                    <Form.Label>Review results of test</Form.Label>
                    <Dropdown style={{ marginLeft: "auto" }}>
                      <Dropdown.Toggle
                        variant="outline-primary"
                        id="status-dropdown"
                        disabled={
                          currentTestDraft.itemType === "Test" &&
                          dates.endDate.getTime() < new Date().getTime()
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
                </Form.Group> */}

            {/* <Form.Group style={{ marginTop: 10 }}>
                    <InputGroup.Text>
                      <Form.Check
                        type="switch"
                        id="custom-switch"
                        label="Shuffle questions on start"
                        disabled={
                          currentTestDraft.itemType === "Test" &&
                          dates.endDate.getTime() < new Date().getTime()
                        }
                        checked={shuffleQuestions}
                        onChange={(event) => {
                          setShuffleQuestions(event.target.checked);
                        }}
                      />
                    </InputGroup.Text>
                  </Form.Group> */}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCreateTest}>
            Create test
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CreateTestFromDraft;
