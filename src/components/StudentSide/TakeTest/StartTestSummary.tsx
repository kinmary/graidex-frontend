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
import { getVisibleTestStudent } from "../../Dashboard/TestActions";

const StartTestSummary = () => {
  const dispatch = useAppDispatch();
  const main = useSelector((state: RootState) => state.main);
  const currentTestDraft = useSelector(
    (state: RootState) => state.main.currentTestDraft
  );
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
            setDataLoaded(true)
          );
        }
      }
    });
  }, [dataLoaded]);

  const onStartClick = () => {};
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
              </div>
            </div>
          )}
        </Form>
      )}
    </>
  );
};

export default StartTestSummary;
