import React, { useEffect, useState } from "react";
import {
  Button,
  Form,
  Breadcrumb,
  Alert,
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

  const onReviewClick = async () => {

  }
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
            <div>
              <p>{currentTestDraft.description}</p>

              <div className="text-center">
                <h6 className="mt-5">
                  Grade to pass the test: {currentTestDraft.gradeToPass}
                </h6>
                <h6>Start date and time: {startDate.toLocaleString()} </h6>
                <h6>End date and time: {endDate.toLocaleString()} </h6>
                <h6>Time Limit: {currentTestDraft.timeLimit} </h6>
                {startDate.getTime() > new Date().getTime() && (
                  <Alert variant="warning">This test has not started yet</Alert>
                )}
                {endDate.getTime() < new Date().getTime() && (
                  <Alert variant="danger">This test has already ended</Alert>
                )}
                {attemptsInfo.currentTestResultId !== undefined &&
                attemptsInfo.currentTestResultId !== null &&
                attemptsInfo.currentTestResultId > 0 ? (
                  <Button
                    variant="outline-primary"
                    style={{ marginTop: 10, width: "100%" }}
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
                    style={{ marginTop: 10, width: "100%" }}
                    onClick={onStartClick}
                    disabled={
                      startDate.getTime() > new Date().getTime() ||
                      endDate.getTime() < new Date().getTime()
                    }
                  >
                    Start test
                  </Button>
                ) : (
                  <>
                    <Alert variant="secondary">No more available attempts</Alert>
                    <Button
                    variant="outline-primary"
                    style={{ width: "100%" }}
                    onClick={onReviewClick}
                    // disabled={
                    // TODO: can review test after it ends?
                    // }
                  >
                    Review test result
                  </Button>
                  </>
                )}
              </div>
            </div>
          )}
        </Form>
      )}
    </>
  );
};

export default StartTestSummary;
