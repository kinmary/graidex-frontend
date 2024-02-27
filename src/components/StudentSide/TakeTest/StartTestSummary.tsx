import React, { useEffect, useState } from "react";
import {
  Button,
  Form,
  Breadcrumb,
  Alert,
  Col,
  Row,
  ListGroup,
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

const StartTestSummary = () => {
  const dispatch = useAppDispatch();
  const main = useSelector((state: RootState) => state.main);
  const { attemptsInfo, currentTestDraft } = main;
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
    await dispatch(
      getAllQuestionsWithAnswers(attemptsInfo.currentTestResultId)
    ).then((response: any) => {
      if (response) {
        navigate(
          "/" +
            params.selectedSubjectId +
            "/" +
            params.test +
            "/" +
            attemptsInfo.currentTestResultId
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
              active={currentTestDraft.itemType === "TestDraft"}
              onClick={() =>
                navigate("/" + params.selectedSubjectId + "/" + params.test)
              }
            >
              {currentTestDraft && currentTestDraft.title}
            </Breadcrumb.Item>
          </Breadcrumb>
          {currentTestDraft !== undefined && (
            <Row className="mt-2 d-flex justify-content-center">
              {currentTestDraft.description ? (
              <Col>
                <p className="bg-white border border-light-subtle rounded p-2" style={{minHeight: '100%'}}>{currentTestDraft.description}</p>
              </Col>
              ):
              <div className="mt-5"></div>
              }
              <Col className="d-flex flex-column gap-3 text-center"
                   style={{maxWidth: '50%'}}>
              <ListGroup className="user-select-none">
                <ListGroup.Item action variant="light" as='div' className="d-flex align-items-center">
                  <i className="bi bi-calendar-check me-3 fs-5"></i>
                  Start date and time
                  <div className="flex-fill"></div>
                  <strong>{startDate.toLocaleString().slice(0, -3)}</strong>
                </ListGroup.Item>
                <ListGroup.Item action variant="light" as='div' className="d-flex align-items-center">
                  <i className="bi bi-calendar-x me-3 fs-5"></i>
                  End date and time
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
                  {/* TODO: Change to <i className="bi bi-crosshair me-3 fs-5"></i> */}
                  <i className="bi bi-bullseye me-3 fs-5"></i>
                  Grade to pass the test
                  <div className="flex-fill"></div>
                  <strong>{currentTestDraft.gradeToPass}</strong>
                </ListGroup.Item>
              </ListGroup>
                
                {startDate.getTime() > new Date().getTime() && (
                  <Alert variant="warning" className="mb-0 d-flex align-items-center">
                    This test has not started yet
                    <Button className="ms-auto" variant="outline-warning" size="sm"
                     onClick={() => window.location.reload()}>
                      <i className="bi bi-arrow-repeat me-2"></i>
                      Refresh page
                     </Button>
                  </Alert>
                )}
                {endDate.getTime() < new Date().getTime() && (
                  <Alert variant="danger" className="mb-0 d-flex align-items-center">
                    This test has already ended
                    <Button className="ms-auto" variant="outline-danger" size="sm"
                          href="mailto:example@email.com?subject=Missed test&body=Hello%2C%0A%0ALooks%20like%20I%20missed%20a%20test%2C%20can%20we%20agree%20on%20a%20retake%20date%3F%0A">
                      <i className="bi bi-envelope me-2"></i>
                      Email teacher
                    </Button>
                  </Alert>
                )}
                {attemptsInfo.currentTestResultId !== undefined &&
                attemptsInfo.currentTestResultId !== null &&
                attemptsInfo.currentTestResultId > 0 ? (
                  <Button
                    variant="outline-primary"
                    className="mx-5"
                    onClick={onContinueClick}
                    disabled={
                      startDate.getTime() > new Date().getTime() ||
                      endDate.getTime() < new Date().getTime()
                    }
                  >
                    Continue test attempt
                  </Button>
                ) : attemptsInfo.numberOfAvailableTestAttempts > 0 ? (
                  <Button
                    variant="primary"
                    className="mx-5"
                    onClick={onStartClick}
                    disabled={
                      startDate.getTime() > new Date().getTime() ||
                      endDate.getTime() < new Date().getTime()
                    }
                  >
                    Start test
                  </Button>
                ) : (
                  <Alert variant="secondary" className="mb-0">No more available attempts</Alert>
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
