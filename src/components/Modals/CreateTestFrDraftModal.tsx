import React, {useEffect, useState} from "react";
import {Button, Dropdown, Form, InputGroup, Modal} from "react-bootstrap";
import {useSelector} from "react-redux";
import {useAppDispatch} from "../../app/hooks";
import {RootState} from "../../app/store";
import {useNavigate} from "react-router-dom";
import {IUpdateTestDraftDto} from "../../interfaces/UpdateTestDraftDto";
import {ICreateTestDto} from "../../interfaces/CreateTestDto";
import {addStudentsToTest, createTest} from "../Dashboard/TestActions";
import {SetOpen} from "../MainAction";
import {getStudentsList} from "../Dashboard/SubjectActions";
import {calcTimeLimit} from "../../utils/TimeLimitRecalculate";
import {getShowToStudentName} from "../../utils/GetShowToStudent";
interface IProps {
  subjectId: string | undefined;
  inputs: {title: string; description: string; gradeToPass: number};
}

interface ITimeLimit {
  hours: number;
  minutes: number;
}
const CreateTestFromDraft = ({subjectId, inputs}: IProps) => {
  const main = useSelector((state: RootState) => state.main);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {currentTestDraft} = main;
  const [dates, setDates] = useState({
    startDate: new Date(),
    endDate: new Date(),
  });
  // const [autoCheck, setAutoCheck] = useState<boolean>(false);
  const [shuffleQuestions, setShuffleQuestions] = useState<boolean>(false);
  const [addAllStudents, setAddAllStudents] = useState<boolean>(true);
  const [visible, setVisible] = useState<boolean>(false);
  const [title, setTitle] = useState<string>(inputs.title);
  const [showToStudent, setShowToStudent] = useState<number | undefined>(1);
  const [isCustomTimeLimit, setIsCustomTimeLimit] = useState<boolean>(false);
  const [timeLimit, setTimeLimit] = useState<ITimeLimit>({
    hours: 0,
    minutes: 0,
  });

  // useEffect(() => {
  //   const timeDifference = dates.endDate.getTime() - dates.startDate.getTime();
  //   const hours = Math.floor(timeDifference / (1000 * 60 * 60));
  //   const minutes = Math.floor((timeDifference / (1000 * 60)) % 60);
  //   // if (timeLimit.hours !== hours && timeLimit.minutes !== minutes) {
  //   //   setIsCustomTimeLimit(true);
  //   // }
  // }, [dates.endDate, dates.startDate, timeLimit.hours, timeLimit.minutes]);
  useEffect(() => {
    if (!isCustomTimeLimit) {
      const timeDifference = dates.endDate.getTime() - dates.startDate.getTime();
      const hours = Math.floor(timeDifference / (1000 * 60 * 60));
      const minutes = Math.floor((timeDifference / (1000 * 60)) % 60);
      setTimeLimit({hours: hours, minutes: minutes});
    }
  }, [dates.startDate, dates.endDate, isCustomTimeLimit]);

  const closeModal = () => {
    setDates({
      startDate: new Date(),
      endDate: new Date(),
    });
    // setAutoCheck(false);
    setShowToStudent(0);
    setTimeLimit({
      hours: 0,
      minutes: 0,
    });
    dispatch(SetOpen("createTestFromDraft", false));
  };

  const handleInputsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleCreateTest = async () => {
    const updateTDraft: IUpdateTestDraftDto = {
      title: inputs.title,
      description: inputs.description,
      gradeToPass: inputs.gradeToPass,
      isVisible: currentTestDraft.isVisible,
      orderIndex: currentTestDraft.orderIndex,
    };

    const startDateTime = new Date(dates.startDate.setSeconds(0, 0));
    const endDateTime = new Date(dates.endDate.setSeconds(0, 0));
    const createTestDto: ICreateTestDto = {
      title: title || inputs.title,
      startDateTime: startDateTime,
      endDateTime: endDateTime,
      timeLimit: calcTimeLimit(timeLimit.hours, timeLimit.minutes),
      // autoCheckAfterSubmission: autoCheck,
      showToStudent: showToStudent,
      shuffleQuestions: shuffleQuestions,
      isVisible: visible,
      orderIndex: currentTestDraft.orderIndex,
    };

    await dispatch(createTest(currentTestDraft.id, updateTDraft, createTestDto, subjectId!)).then((response: any) => {
      if (response && addAllStudents && subjectId && response.id) {
        dispatch(getStudentsList(subjectId)).then(() => {
          const {studentsList} = main;
          const students = studentsList.map((student: any) => student.email);
          dispatch(addStudentsToTest(response.id, students));
        });
      }
    });

    dispatch(SetOpen("createTestFromDraft", false));
    navigate(`/${subjectId}`);
  };

  const handleTimeLimitChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
    setTimeLimit({hours: hours, minutes: minutes});
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const oldDate = event.target.name === "startDate" ? dates.startDate : dates.endDate;
    const newDate = new Date(oldDate.setSeconds(0, 0));
    newDate.setFullYear(Number(event.target.value.substring(0, 4)));
    newDate.setMonth(Number(event.target.value.substring(5, 7)) - 1);
    newDate.setDate(Number(event.target.value.substring(8)));
    if (event.target.name === "startDate") {
      // if (newDate < dates.endDate) {
      setDates({...dates, [event.target.name]: newDate});
      // } else {
      // alert(`Start date can not be later than end date ${dates.endDate}`);
      // }
    }
    if (event.target.name === "endDate") {
      // if (newDate > dates.startDate) {
      setDates({...dates, [event.target.name]: newDate});
      // } else {
      // alert(`End date can not be earlier than start date ${dates.startDate}`);
      // }
    }
  };

  const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const oldDate = event.target.name === "startDate" ? dates.startDate : dates.endDate;
    const {value} = event.target;
    if (value !== "") {
      const newDate = new Date(oldDate.setSeconds(0, 0));
      const [hours, minutes] = value.split(":");
      newDate.setHours(Number(hours), Number(minutes));
      // newDate.setMinutes(Number(minutes));
      if (event.target.name === "startDate") {
        // if (newDate < dates.endDate) {
        setDates({...dates, [event.target.name]: newDate});
        // } else {
        // alert(`Start date can not be later than end date ${dates.endDate}`);
        // }
      }
      if (event.target.name === "endDate") {
        // if (newDate > dates.startDate) {
        setDates({...dates, [event.target.name]: newDate});
        // } else {
        // alert(
        //   `End date can not be earlier than start date ${dates.startDate}`
        // );
        // }
      }
    }
  };

  const {createTestFromDraft} = main;
  return (
    <>
      <Modal show={createTestFromDraft} onHide={closeModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Create new test</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group style={{marginTop: 5}}>
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" name="title" autoComplete="off" placeholder="Enter title" value={title} onChange={handleInputsChange} />
            </Form.Group>
            <Form.Group style={{marginTop: 5}}>
              <Form.Label>Start date and time</Form.Label>
              <InputGroup>
                <Form.Control type="date" placeholder="Enter date" autoComplete="off" name="startDate" value={dates.startDate && dates.startDate.toISOString().split("T")[0]} onChange={handleDateChange} />
                <Form.Control
                  type="time"
                  placeholder="Enter time"
                  name="startDate"
                  autoComplete="off"
                  value={new Intl.DateTimeFormat("default", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                  }).format(dates.startDate)}
                  onChange={handleTimeChange}
                />
              </InputGroup>
            </Form.Group>

            <Form.Group style={{marginTop: 5}}>
              <Form.Label>End date and time</Form.Label>
              <InputGroup>
                <Form.Control type="date" placeholder="Enter date" name="endDate" value={dates.endDate && dates.endDate.toISOString().split("T")[0]} onChange={handleDateChange} />
                <Form.Control
                  type="time"
                  placeholder="Enter time"
                  name="endDate"
                  autoComplete="off"
                  value={new Intl.DateTimeFormat("default", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                  }).format(dates.endDate)}
                  onChange={handleTimeChange}
                />
              </InputGroup>
            </Form.Group>

            <Form.Group style={{marginTop: 5}}>
              <Form.Label>Time limit</Form.Label>
              <InputGroup>
                <Form.Control
                  style={{color: timeLimit.hours < 0 ? "#dc3545" : ""}}
                  isInvalid={timeLimit.hours < 0}
                  value={timeLimit.hours}
                  name="hours"
                  type="number"
                  autoComplete="off"
                  min={0}
                  disabled={!isCustomTimeLimit || (currentTestDraft.itemType === "Test" && dates.endDate.getTime() < new Date().getTime())}
                  className="border-end-0"
                  onChange={handleTimeLimitChange}
                />
                <InputGroup.Text
                  className={`border-start-0 
                text-muted 
                ${isCustomTimeLimit ? "" : "bg-body-secondary"}`}
                >
                  HOURS
                </InputGroup.Text>

                <Form.Control
                  disabled={!isCustomTimeLimit || (currentTestDraft.itemType === "Test" && dates.endDate.getTime() < new Date().getTime())}
                  style={{color: timeLimit.minutes < 0 ? "#dc3545" : ""}}
                  isInvalid={timeLimit.minutes < 0}
                  value={timeLimit.minutes}
                  name="minutes"
                  type="number"
                  autoComplete="off"
                  min={0}
                  max={59}
                  className="border-end-0"
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
                    disabled={currentTestDraft.itemType === "Test" && dates.endDate.getTime() < new Date().getTime()}
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
            <Form.Group style={{marginTop: 10}}>
              <InputGroup.Text>
                <Form.Check
                  type="switch"
                  id="shuffle-questions-switch"
                  label="Shuffle questions on start"
                  checked={shuffleQuestions}
                  onChange={(event) => {
                    setShuffleQuestions(event.target.checked);
                  }}
                />
              </InputGroup.Text>
            </Form.Group>
            <Form.Group style={{marginTop: 10}}>
              <InputGroup.Text>
                <Form.Check
                  type="switch"
                  id="all-students-switch"
                  label="Add all students of subject"
                  checked={addAllStudents}
                  onChange={(event) => {
                    setAddAllStudents(event.target.checked);
                  }}
                />
              </InputGroup.Text>
            </Form.Group>
            <Form.Group style={{marginTop: 10}}>
              <InputGroup.Text>
                <Form.Check
                  type="switch"
                  id="set-visible-switch"
                  label="Set visible to all assigned students"
                  checked={visible}
                  onChange={(event) => {
                    setVisible(event.target.checked);
                  }}
                />
              </InputGroup.Text>
            </Form.Group>
            <Form.Group style={{marginTop: 5}}>
              <InputGroup.Text>
                <Form.Label>Review results of test</Form.Label>
                <Dropdown style={{marginLeft: "auto"}}>
                  <Dropdown.Toggle variant="outline-primary" id="status-dropdown">
                    {getShowToStudentName(showToStudent || 0)}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item as={Button} value={0} onClick={() => setShowToStudent(0)}>
                      Set manually
                    </Dropdown.Item>
                    <Dropdown.Item as={Button} value={1} onClick={() => setShowToStudent(1)}>
                      After submission
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </InputGroup.Text>
            </Form.Group>
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
