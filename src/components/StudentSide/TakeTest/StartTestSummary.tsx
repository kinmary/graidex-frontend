import React, { useEffect, useState } from "react";
import {
  Button,
  Form,
  Breadcrumb,
  Alert,
  ListGroup,
  Row,
  Col,
  Badge,
} from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { useAppDispatch } from "../../../app/hooks";
import { useNavigate, useParams } from "react-router-dom";
import { getVisibleSubjectContent } from "../../Dashboard/SubjectActions";
import ISubjectContent from "../../../interfaces/SubjectContent";
import {
  getAttemptsDescription,
  getVisibleTestStudent,
} from "../../Dashboard/TestActions";
import {
  getAllQuestionsWithAnswers,
  startTestAttempt,
} from "./TakeTestActions";
import { GetAttemptsDescDto } from "../../../interfaces/GetAttemptsDescDto";

const StartTestSummary = () => {
  const dispatch = useAppDispatch();
  const main = useSelector((state: RootState) => state.main);
  const { attemptsInfo, currentTestDraft } : {attemptsInfo: GetAttemptsDescDto, currentTestDraft: any} = main;
  const navigate = useNavigate();
  const params = useParams();
  const selectedSubject = main.allSubjects.find(
    (obj: any) => obj.id.toString() === params.selectedSubjectId!.toString()
  );
  const [startDate] = useState(new Date(currentTestDraft.startDateTime));
  const [endDate] = useState(new Date(currentTestDraft.endDateTime));
  const [dataLoaded, setDataLoaded] = useState(false);
  useEffect(() => {
    dispatch(getVisibleSubjectContent(params.selectedSubjectId!)).then(() => {
      if (main.tests) {
        let selectedTest = main.tests.find(
          (x: ISubjectContent) => x.id.toString() === params.test
        );
        if (selectedTest) {
          dispatch(getVisibleTestStudent(selectedTest.id)).then(() =>
            dispatch(getAttemptsDescription(selectedTest.id)).then(() => {
              setDataLoaded(true);
            })
          );
        }
      }
    });
  }, [dataLoaded]);

  const onStartClick = async () => {
    await dispatch(startTestAttempt(currentTestDraft.id)).then(
      (response: any) => {
        // if(response.id !== undefined && response.id !== null && response.id !== 0){
        // dispatch(getAllQuestionsWithAnswers(response.id)).then((success: any) => {
        if (response !== undefined && response !== null && response !== 0) {
          navigate(
            "/" +
              params.selectedSubjectId +
              "/" +
              params.test +
              "/" +
              response.id
          );
        } else {
          alert("Error occured in getting questions");
          navigate(-1);
        }
      }
    );
  };
  const onContinueClick = async () => {
    if (!attemptsInfo.currentTestAttempt) {
      alert("Error occurred continuing test");
      return;
    }

    var testAttemptId = attemptsInfo.currentTestAttempt.id;

    await dispatch(
      getAllQuestionsWithAnswers(testAttemptId.toString())
    ).then((response: any) => {
      if (response) {
        navigate(
          "/" +
            params.selectedSubjectId +
            "/" +
            params.test +
            "/" +
            testAttemptId
        );
      } else {
        alert("Error occured");
        navigate(-1);
      }
    });
    // } else {
    //   alert("No attempts available. Error occured in starting test");
    //   // navigate(-1);
    // }
  };

  const onReviewClick = async (testResultId: number) => {

  };

  const showTestDescriptionAtLeft =
    attemptsInfo.submittedTestResults.length > 0 ||
    attemptsInfo.currentTestAttempt !== null;

  const showTestNotStartedAlert =
    startDate.getTime() > new Date().getTime();

  const showTestEndedAlert = 
    endDate.getTime() < new Date().getTime();

  const skippedTestEmailLink = "mailto:example@email.com?subject=Missed test&body=Hello%2C%0A%0ALooks%20like%20I%20missed%20a%20test%2C%20can%20we%20agree%20on%20a%20retake%20date%3F%0A";

  const showNoMoreAttemptsAlert =
    endDate.getTime() > new Date().getTime()
    && attemptsInfo.numberOfAvailableTestAttempts === 0
    && attemptsInfo.currentTestAttempt === null;

  const showStartTestButton =
    endDate.getTime() > new Date().getTime()
    && attemptsInfo.numberOfAvailableTestAttempts > 0 
    && attemptsInfo.currentTestAttempt === null;

  return (
    <>
      {dataLoaded && (
        <Form style={{ marginTop: 20 }}>
          <h5
            style={{
              fontWeight: "bold",
              textAlign: "left",
              display: "flex",
              alignItems: "center",
              marginBottom: 5,
            }}
          >
            {currentTestDraft.title}
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
            <Breadcrumb.Item
              active={currentTestDraft.itemType === "Test"}
              onClick={() =>
                navigate("/" + params.selectedSubjectId + "/" + params.test)
              }
            >
              {currentTestDraft && currentTestDraft.title}
            </Breadcrumb.Item>
          </Breadcrumb>
          {currentTestDraft !== undefined && (
            <Row className="mt-2 mb-2">
              <Col className="d-flex flex-column gap-3">
                <ListGroup>
                  <ListGroup.Item action variant="light" as='div' className="d-flex align-items-center">
                    <i className="bi bi-calendar-check me-3 fs-5"></i>
                    {startDate.getTime() < new Date().getTime() ? "Was open from" : "Will be open from"}
                    <div className="flex-fill"></div>
                    <strong>{startDate.toLocaleString().slice(0, -3)}</strong>
                  </ListGroup.Item>

                  <ListGroup.Item action variant="light" as='div' className="d-flex align-items-center">
                    <i className="bi bi-calendar-x me-3 fs-5"></i>
                    {endDate.getTime() < new Date().getTime() ? "Closed on" : "Will be closed from"}
                    <div className="flex-fill"></div>
                    <strong>{endDate.toLocaleString().slice(0, -3)}</strong>
                  </ListGroup.Item>

                  <ListGroup.Item action variant="light" as='div' className="d-flex align-items-center">
                    <i className="bi bi-stopwatch me-3 fs-5"></i>
                    Time limit
                    <div className="flex-fill"></div>
                    <strong>{currentTestDraft.timeLimit}</strong>
                  </ListGroup.Item>

                  <ListGroup.Item action variant="light" as='div' className="d-flex align-items-center">
                    <i className="bi bi-crosshair me-3 fs-5"></i>
                    Grade to pass the test
                    <div className="flex-fill"></div>
                    <strong>{currentTestDraft.gradeToPass}</strong>
                  </ListGroup.Item>

                  {(showTestDescriptionAtLeft) && (
                    <ListGroup.Item variant="light" className="text-start d-flex align-items-top">
                      <i className="bi bi-text-paragraph me-3 fs-5"></i>
                      <span className={currentTestDraft.description || "text-muted user-select-none"} style={{marginTop: "0.125rem"}}>
                        {currentTestDraft.description ? currentTestDraft.description : "No description was provided"}
                      </span>
                    </ListGroup.Item>
                  )}

                  {showStartTestButton && (
                    <ListGroup.Item variant="light" className="d-flex p-2">
                      <Button
                        variant="primary"
                        className="flex-fill"
                        onClick={onStartClick}
                        disabled={
                          startDate.getTime() > new Date().getTime() ||
                          endDate.getTime() < new Date().getTime()
                        }
                      >
                        Start test
                      </Button>
                    </ListGroup.Item>
                  )}
                </ListGroup>

                {showTestNotStartedAlert && (
                  <Alert variant="warning" className="mb-0 d-flex align-items-center">
                    This test has not started yet
                    <Button className="ms-auto" variant="outline-warning" size="sm"
                    onClick={() => window.location.reload()}>
                      <i className="bi bi-arrow-repeat me-2"></i>
                      Refresh page
                    </Button>
                  </Alert>
                )}

                {showTestEndedAlert && (
                  <Alert variant="danger" className="mb-0 d-flex align-items-center justify-content-center">
                    This test has already ended
                    {attemptsInfo.submittedTestResults.length === 0 && (
                      <Button className="ms-auto" variant="outline-danger" size="sm"
                            href={skippedTestEmailLink}>
                        <i className="bi bi-envelope me-2"></i>
                        Email teacher
                      </Button>
                    )}
                  </Alert>
                )}

                {(showNoMoreAttemptsAlert) && (
                  <Alert variant="secondary" className="mb-0 text-center">No more available attempts</Alert>
                )}

              </Col>

              <Col className="d-flex flex-column gap-3">
              {(!showTestDescriptionAtLeft) && (
                <ListGroup className="h-100">
                  <ListGroup.Item variant="light" className="d-flex align-items-top h-100">
                    <i className="bi bi-text-paragraph me-3 fs-5"></i>
                    <span className={currentTestDraft.description || "text-muted user-select-none"} style={{marginTop: "0.125rem"}}>
                      {currentTestDraft.description ? currentTestDraft.description : "No description was provided"}
                    </span>
                  </ListGroup.Item>
                </ListGroup>
              )}

              {attemptsInfo.submittedTestResults.map((attempt, idx) => (
                <ListGroup>
                  <ListGroup.Item className="d-flex align-items-center">
                  <h6 className="m-0 text-start me-3">Attempt {idx + 1}</h6>
                  {attempt.grade !== null && (
                    attempt.grade >= currentTestDraft.gradeToPass ? (
                      <Badge bg="success" className="ms-auto">
                        <i className="bi bi-check-lg me-1"></i>
                        Passed
                      </Badge>
                    ) : (
                      <Badge bg="danger" className="ms-auto">
                        <i className="bi bi-x-lg me-1"></i>
                        Failed
                      </Badge>
                    )
                  )}
                  </ListGroup.Item>
                  <ListGroup.Item action as='div' variant="light" className="d-flex align-items-center">
                    <i className="bi bi-calendar-check-fill me-3"></i>
                    Started
                    <div className="flex-fill"></div>
                    <strong>{attempt.startTime.toLocaleString().slice(0, -3)}</strong>
                  </ListGroup.Item>
                  <ListGroup.Item action as='div' variant="light" className="d-flex align-items-center">
                    <i className="bi bi-calendar-x-fill me-3"></i>
                    Ended
                    <div className="flex-fill"></div>
                    <strong>{attempt.endTime.toLocaleString().slice(0, -3)}</strong>
                  </ListGroup.Item>
                  <ListGroup.Item action as='div' variant="light" className="d-flex align-items-center">
                    <i className="bi bi-plus-slash-minus me-3"></i>
                    Points
                    <div className="flex-fill"></div>
                    {attempt.totalPoints !== null ? (
                      <strong>{attempt.totalPoints} / {currentTestDraft.maxPoints}</strong>
                    ) : (
                      <span className="text-muted">Not graded yet</span>
                    )}
                  </ListGroup.Item>
                  <ListGroup.Item action as='div' variant="light" className="d-flex align-items-center justify-content-center">
                    <i className="bi bi-crosshair2 me-3"></i>
                    Grade
                    <div className="flex-fill"></div>
                    
                    {attempt.totalPoints !== null && (
                      <>
                        <span className="text-muted">
                          {(attempt.totalPoints / currentTestDraft.maxPoints * 100).toFixed(2)}%
                        </span>
                        <i className="bi bi-arrow-right ms-2 me-3 text-muted"></i>
                      </>
                    )}

                    {(attempt.grade !== null) ? (
                      <strong>
                        {attempt.grade}
                      </strong>
                    ) : (
                      <span className="text-muted">Not graded yet</span>
                    )}
                    
                  </ListGroup.Item>
                  <ListGroup.Item variant="light" className="d-flex p-2">
                    <Button
                      variant="outline-primary"
                      className="flex-fill"
                      onClick={() => onReviewClick(attempt.id)}
                      disabled={!attempt.canReview}
                    >
                      Review evaluation
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              ))}

              {attemptsInfo.currentTestAttempt && (
                <ListGroup>
                  <ListGroup.Item className="d-flex align-items-center">
                  <h6 className="m-0 text-start me-3">Attempt {attemptsInfo.submittedTestResults.length + 1}</h6>
                  <Badge bg="primary" className="ms-auto">
                    In progress
                  </Badge>
                  </ListGroup.Item>
                  <ListGroup.Item action as='div' variant="light" className="d-flex align-items-center">
                    <i className="bi bi-calendar-check-fill me-3"></i>
                    Started
                    <div className="flex-fill"></div>
                    <strong>{attemptsInfo.currentTestAttempt.startTime.toLocaleString().slice(0, -3)}</strong>
                  </ListGroup.Item>
                  <ListGroup.Item action as='div' variant="light" className="d-flex align-items-center">
                    <i className="bi bi-calendar-x-fill me-3"></i>
                    Ends on
                    <div className="flex-fill"></div>
                    <strong>{attemptsInfo.currentTestAttempt.endTime.toLocaleString().slice(0, -3)}</strong>
                  </ListGroup.Item>
                  <ListGroup.Item variant="light" className="d-flex p-2">
                    <Button
                      variant="primary"
                      className="flex-fill"
                      onClick={onContinueClick}
                    >
                      Continue test attempt
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              )}
              </Col>
            </Row>
          )}
        </Form>
      )}
    </>
  );
};

export default StartTestSummary;
