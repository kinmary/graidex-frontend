import React, {useEffect, useState} from "react";
import {Breadcrumb, Button, Form, InputGroup, Row, Col, Alert, Dropdown} from "react-bootstrap";
import {useSelector} from "react-redux";
import {RootState} from "../../app/store";
import {Link, useNavigate, useParams} from "react-router-dom";
import MessageModal from "../Modals/MessageModal";
import {useAppDispatch} from "../../app/hooks";
import {createDraftFromTest, deleteDraft, deleteTest, duplicateDraft, getDraft, getTest, getTestDraftQuestions, updateDraft, updateTest, updateTestTime} from "./TestActions";
import {IUpdateTestDto, IUpdateTestTimeDto} from "../../interfaces/UpdateTestDto";
import StudentsList from "./StudentsList";
import {IUpdateTestDraftDto} from "../../interfaces/UpdateTestDraftDto";
import AddStudentsToTestModal from "../Modals/AddStudentsToTestModal";
import {getSubjectContent} from "./SubjectActions";
import ISubjectContent from "../../interfaces/SubjectContent";
import {SetOpen} from "../MainAction";
import CreateTestFromDraft from "../Modals/CreateTestFrDraftModal";
import {calcTimeLimit, parseTimeLimit} from "../../utils/TimeLimitRecalculate";
import {getShowToStudentName} from "../../utils/GetShowToStudent";
import { ITestDto } from "../../interfaces/TestDto";

interface ITimeLimit {
  hours: number;
  minutes: number;
}
const Settings = () => {
  const main = useSelector((state: RootState) => state.main);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const params = useParams();
  const [currentTestDraft, setCurrentTestDraft] = useState<ITestDto>();
  const [dataLoaded, setDataLoaded] = useState(false);
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    gradeToPass: 4,
  });

  const [dates, setDates] = useState({
    startDate: new Date(),
    endDate: new Date(),
  });
  const [shuffleQuestions, setShuffleQuestions] = useState<boolean>(false);
  const [showToStudent, setShowToStudent] = useState<number | undefined>(1);
  const [isCustomTimeLimit, setIsCustomTimeLimit] = useState<boolean>(false);
  const [timeLimit, setTimeLimit] = useState<ITimeLimit>({
    hours: 0,
    minutes: 0,
  });
  const [selectedSubject, setSelectedSubject] = useState<ISubjectContent>();
  useEffect(() => {
    dispatch(getSubjectContent(params.selectedSubjectId!));
  }, []);
  useEffect(()=> {
    if(!main.allSubjects) return;
    const selectedSubject = main.allSubjects.find((obj: any) => obj.id.toString() === params.selectedSubjectId!.toString());
    setSelectedSubject(selectedSubject);
  }, [params.selectedSubjectId!, main.allSubjects]);

  useEffect(() => {
    if (main.tests) {
      let selectedTest = main.tests.find((x: ISubjectContent) => x.id.toString() === params.test);
      if (selectedTest) {
        if (selectedTest.itemType === "Test") {
          dispatch(getTest(selectedTest.id)).then(() => setDataLoaded(true));
        }
        if (selectedTest.itemType === "TestDraft") {
          dispatch(getDraft(selectedTest.id)).then(() => setDataLoaded(true));
        }
      }
    }
  }, [main.tests])
  useEffect(() => {
    setCurrentTestDraft(main.currentTestDraft);
  }, [main.currentTestDraft]);

  useEffect(() => {
    if (!currentTestDraft) return;
    setInputs({
      title: currentTestDraft.title,
      description: currentTestDraft.description || "",
      gradeToPass: currentTestDraft.gradeToPass,
    });

    if (currentTestDraft.itemType === "Test") {
      let timeLimit = parseTimeLimit(currentTestDraft.timeLimit?.toString() || "00:00:00");
      setShuffleQuestions(currentTestDraft.shuffleQuestions);
      setShowToStudent(currentTestDraft.showToStudent);
      if(currentTestDraft.startDateTime && currentTestDraft.endDateTime){
        setDates({
          startDate: new Date(currentTestDraft.startDateTime),
          endDate: new Date(currentTestDraft.endDateTime),
        });
      }
      setTimeLimit({
        hours: Number(timeLimit.hours),
        minutes: Number(timeLimit.minutes),
      });
      const timeDifference = dates.endDate.getTime() - dates.startDate.getTime();
      const hours = Math.floor(timeDifference / (1000 * 60 * 60));
      const minutes = Math.floor((timeDifference / (1000 * 60)) % 60);
      if (timeLimit.hours !== hours && timeLimit.minutes !== minutes) {
        setIsCustomTimeLimit(true);
      }
    }
  }, [currentTestDraft]);


  const handleDiscardChanges = () => {
    if (!currentTestDraft) return;
    let timeLimit = parseTimeLimit(currentTestDraft.timeLimit?.toString() || "00:00:00");
    setInputs({
      title: currentTestDraft.title,
      description: currentTestDraft.description || "",
      gradeToPass: currentTestDraft.gradeToPass,
    });
    if(currentTestDraft.startDateTime && currentTestDraft.endDateTime){
    setDates({
      startDate: new Date(currentTestDraft.startDateTime),
      endDate: new Date(currentTestDraft.endDateTime),
    });
  }
    setShuffleQuestions(currentTestDraft.shuffleQuestions);
    setShowToStudent(currentTestDraft.showToStudent);
    setTimeLimit({
      hours: Number(timeLimit.hours),
      minutes: Number(timeLimit.minutes),
    });
  };
  const handleSaveChanges = () => {
    if (!currentTestDraft) return;
    if (currentTestDraft.itemType === "Test" && params.selectedSubjectId) {
      const startDateTime = new Date(dates.startDate.setSeconds(0, 0));
      const endDateTime = new Date(dates.endDate.setSeconds(0, 0));
      if (timeLimit.hours === 0 && timeLimit.minutes === 0) {
        alert(`Time limit should be at least 1 minute (00:01:00)`);
      } else {
        let newTest: IUpdateTestDto = {
          title: inputs.title,
          description: inputs.description,
          gradeToPass: inputs.gradeToPass,
          isVisible: currentTestDraft.isVisible,
          // autoCheckAfterSubmission: autoCheck,
          showToStudent: showToStudent,
          shuffleQuestions: shuffleQuestions,
          orderIndex: currentTestDraft.orderIndex,
        };

        if (dates.startDate.getTime() > new Date().getTime()) {
          let updateTestTimeDto: IUpdateTestTimeDto = {
            startDateTime: startDateTime,
            endDateTime: endDateTime,
            timeLimit: calcTimeLimit(timeLimit.hours, timeLimit.minutes),
          };
          dispatch(updateTestTime(currentTestDraft.id, updateTestTimeDto, params.selectedSubjectId)).then(() => {
            dispatch(updateTest(currentTestDraft.id, newTest, params.selectedSubjectId!));
          });
        } else {
          dispatch(updateTest(currentTestDraft.id, newTest, params.selectedSubjectId));
        }
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
    dispatch(SetOpen("createTestFromDraft", true));
  };

  const handleInputsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputs({
      ...inputs,
      [event.target.name]: event.target.value,
    });
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
        // `End date can not be earlier than start date ${dates.startDate}`
        // );
        // }
      }
    }
  };


  const handleTestDraftDuplicate = () => {
    if(!currentTestDraft) return;
    if (currentTestDraft.itemType === "Test") {
      dispatch(createDraftFromTest(currentTestDraft.id, currentTestDraft.title));
    } else if (currentTestDraft.itemType === "TestDraft") {
      dispatch(duplicateDraft(currentTestDraft.id, currentTestDraft.title));
    }
    navigate(`/${params.selectedSubjectId!}`);
  };

  const handleDelete = () => {
    if(!currentTestDraft) return;
    if (currentTestDraft.itemType === "Test") {
      dispatch(deleteTest(currentTestDraft.id, params.selectedSubjectId!));
    } else if (currentTestDraft.itemType === "TestDraft") {
      dispatch(deleteDraft(currentTestDraft.id, params.selectedSubjectId!));
    }
    navigate(`/${params.selectedSubjectId}`);
  };
  const onEditTestClick = () => {
    if(!currentTestDraft) return;
    if (currentTestDraft.itemType === "TestDraft") {
      dispatch(getTestDraftQuestions(currentTestDraft.id));
      navigate("edit-test");
    }
  };

  if (!dataLoaded || !currentTestDraft || !selectedSubject) {
    return null; //TODO: loader
  }
  return (
    <>
      <MessageModal />
      {currentTestDraft.itemType === "TestDraft" && <CreateTestFromDraft subjectId={params.selectedSubjectId} inputs={inputs} />}

      <AddStudentsToTestModal testid={currentTestDraft.id.toString()} selectedSubjectId={params.selectedSubjectId!} />
      <Form style={{marginTop: 20}}>
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
        <Breadcrumb style={{fontSize: 14}}>
          <Breadcrumb.Item linkAs={Link} linkProps={{to:'/'}}>Dashboard</Breadcrumb.Item>
          <Breadcrumb.Item linkAs={Link} linkProps={{to:`/${ params.selectedSubjectId}`}}>{selectedSubject.title}</Breadcrumb.Item>
          <Breadcrumb.Item active={currentTestDraft.itemType === "TestDraft"} linkAs={Link} linkProps={{to:`/${ params.selectedSubjectId}/${params.test}`}}>
            {/*selectedTest && selectedTest.examName*/}
            {currentTestDraft && currentTestDraft.title}
          </Breadcrumb.Item>
          {currentTestDraft && currentTestDraft.itemType === "Test" && <Breadcrumb.Item linkAs={Link} linkProps={{to:`/${ params.selectedSubjectId}/${params.test}/settings`}} active>Settings</Breadcrumb.Item>}
        </Breadcrumb>

        <Row className="mb-4">
          <Col>
            <div style={{width: "80%"}}>
              <Form.Group key={1}>
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" name="title" autoComplete="off" placeholder="Enter title" value={inputs.title} onChange={handleInputsChange} />
              </Form.Group>

              <Form.Group style={{marginTop: 5}}>
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" rows={4} name="description" autoComplete="off" placeholder="Enter description" value={inputs.description} onChange={handleInputsChange} />
              </Form.Group>
              <Form.Group style={{marginTop: 5}}>
                <Form.Label>Grade to pass the test</Form.Label>
                <Form.Control type="number" name="gradeToPass" autoComplete="off" min={0} max={10} disabled={currentTestDraft.itemType === "Test" && dates.endDate.getTime() < new Date().getTime()} value={inputs.gradeToPass} onChange={handleInputsChange} />
              </Form.Group>

              {currentTestDraft.itemType === "Test" && (
                <>
                  <Form.Group style={{marginTop: 5}}>
                    <Form.Label>Start date and time</Form.Label>
                    <InputGroup>
                      <Form.Control
                        disabled={currentTestDraft.itemType === "Test" && dates.startDate.getTime() < new Date().getTime()}
                        type="date"
                        placeholder="Enter date"
                        autoComplete="off"
                        name="startDate"
                        value={dates.startDate && dates.startDate.toISOString().split("T")[0]}
                        onChange={handleDateChange}
                      />
                      <Form.Control
                        type="time"
                        placeholder="Enter time"
                        name="startDate"
                        autoComplete="off"
                        disabled={currentTestDraft.itemType === "Test" && dates.startDate.getTime() < new Date().getTime()}
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
                      <Form.Control
                        type="date"
                        placeholder="Enter date"
                        name="endDate"
                        autoComplete="off"
                        disabled={currentTestDraft.itemType === "Test" && dates.startDate.getTime() < new Date().getTime()}
                        value={dates.endDate && dates.endDate.toISOString().split("T")[0]}
                        onChange={handleDateChange}
                      />
                      <Form.Control
                        type="time"
                        placeholder="Enter time"
                        name="endDate"
                        autoComplete="off"
                        disabled={currentTestDraft.itemType === "Test" && dates.startDate.getTime() < new Date().getTime()}
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
                        value={timeLimit.hours}
                        name="hours"
                        type="number"
                        autoComplete="off"
                        style={{
                          color: timeLimit.hours < 0 ? "#dc3545" : "",
                          // borderColor: "#dee2e6",
                        }}
                        isInvalid={timeLimit.hours < 0}
                        min={0}
                        disabled={!isCustomTimeLimit || (currentTestDraft.itemType === "Test" && dates.startDate.getTime() < new Date().getTime())}
                        // defaultValue="5"
                        className="border-end-0"
                        onChange={handleTimeLimitChange}
                      />
                      {/* KYS */}
                      <InputGroup.Text
                        className={`border-start-0 
                text-muted 
                ${isCustomTimeLimit && dates.startDate.getTime() > new Date().getTime() ? "" : "bg-body-secondary"}`}
                      >
                        HOURS
                      </InputGroup.Text>

                      <Form.Control
                        disabled={!isCustomTimeLimit || (currentTestDraft.itemType === "Test" && dates.startDate.getTime() < new Date().getTime())}
                        value={timeLimit.minutes}
                        autoComplete="off"
                        style={{
                          color: timeLimit.minutes < 0 ? "#dc3545" : "",
                          // borderColor: "#dee2e6",
                        }}
                        isInvalid={timeLimit.hours < 0}
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
                ${isCustomTimeLimit && dates.startDate.getTime() > new Date().getTime() ? "" : "bg-body-secondary"}`}
                      >
                        MIN
                      </InputGroup.Text>
                      <InputGroup.Text>
                        <Form.Check
                          disabled={currentTestDraft.itemType === "Test" && dates.startDate.getTime() < new Date().getTime()}
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
                        id="custom-switch"
                        label="Shuffle questions on start"
                        disabled={currentTestDraft.itemType === "Test" && dates.endDate.getTime() < new Date().getTime()}
                        checked={shuffleQuestions}
                        onChange={(event) => {
                          setShuffleQuestions(event.target.checked);
                        }}
                      />
                    </InputGroup.Text>
                  </Form.Group>
                  <Form.Group style={{marginTop: 5}}>
                    <InputGroup.Text>
                      <Form.Label>Review results of test</Form.Label>
                      <Dropdown style={{marginLeft: "auto"}}>
                        <Dropdown.Toggle variant="outline-primary" id="status-dropdown" disabled={currentTestDraft.itemType === "Test" && dates.endDate.getTime() < new Date().getTime()}>
                          {getShowToStudentName(showToStudent)}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item as={Button} key={0} value={0} onClick={() => setShowToStudent(0)}>
                            Set manually
                          </Dropdown.Item>
                          <Dropdown.Item as={Button} key={1} value={1} onClick={() => setShowToStudent(1)}>
                            After submission
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </InputGroup.Text>
                  </Form.Group>
                </>
              )}
              <Form.Group style={{marginTop: 20}}>
                <div className="d-100 d-flex">
                  <Button variant="secondary" style={{width: "30%"}} onClick={handleDiscardChanges}>
                    Discard
                  </Button>
                  <Button variant="primary" style={{marginLeft: "auto", width: "68%"}} onClick={handleSaveChanges}>
                    Save changes
                  </Button>
                </div>
              </Form.Group>
            </div>
          </Col>

          <Col>
            <div style={{width: "60%"}}>
              {currentTestDraft.itemType === "Test" && dates.endDate.getTime() < new Date().getTime() && (
                <Alert variant="warning" dismissible>
                  This test has already ended. You can only change <b>title</b> and <b>description</b> here. To open the test again - duplicate it!
                </Alert>
              )}
              {currentTestDraft.itemType === "TestDraft" && (
                <Alert variant="warning" dismissible>
                  This is a <b>draft</b>. Only title, description and grade to pass changes will be saved here.
                  <b> To create test from this draft:</b>
                  <ol type="1">
                    <li>
                      Double check everything again and click <b>"Create test from draft"</b>.
                    </li>
                    {/* <li>Set start and end date of test</li>
                    <li>Set custom time limit (if needed)</li>
                    <li>Set if test should be checked automatically</li> */}
                    {/* <li>Set how to review results of test</li> */}
                  </ol>
                  Note: You won't be able to change start and end dates of test after it's start!
                </Alert>
              )}
              {currentTestDraft.itemType === "Test" && (
                <>
                  <StudentsList subjectId={params.selectedSubjectId!} />
                  <Form.Group>
                    {/* {dates.startDate.getTime() > new Date().getTime() && (
                      <Button
                        style={{ marginTop: 10, width: "100%" }}
                        variant="primary"
                        onClick={onEditTestClick}
                      >
                        <i className="bi bi-pencil-square"></i> Edit draft
                        questions
                      </Button>
                    )} */}
                    <Button variant="outline-primary" style={{marginTop: 10, width: "100%"}} onClick={handleTestDraftDuplicate}>
                      Duplicate test to draft
                    </Button>

                    <Button
                      variant="danger"
                      // className="flex-grow-1"
                      style={{marginTop: 10, width: "100%"}}
                      onClick={handleDelete}
                    >
                      Delete test
                    </Button>
                  </Form.Group>
                </>
              )}
              {currentTestDraft.itemType === "TestDraft" && (
                <Form.Group>
                  <Button style={{marginTop: 10, width: "100%"}} variant="primary" onClick={onEditTestClick}>
                    <i className="bi bi-pencil-square"></i> Edit draft questions
                  </Button>
                  <Button variant="outline-primary" style={{marginTop: 10, width: "100%"}} onClick={handleCreateTest}>
                    Create test from draft
                  </Button>
                  <Button variant="outline-primary" style={{marginTop: 10, width: "100%"}} onClick={handleTestDraftDuplicate}>
                    Duplicate draft
                  </Button>

                  <Button
                    variant="danger"
                    // className="flex-grow-1"
                    style={{marginTop: 10, width: "100%"}}
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
