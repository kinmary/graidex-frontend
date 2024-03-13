import React, { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import TestField from "./TestField";
import RightSideMenu from "../RightSideMenu";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import QuestionsGrid from "./QuestionsGrid";
import { useAppDispatch } from "../../app/hooks";
import { IQuestion } from "../../interfaces/Questions";
import { GetTestResultForStudent, LeaveFeedbackOnAnswer } from "./TestOfStudentActions";

const TestOfStudent = () => {
  const userRole = useSelector((state: RootState) => state.auth.userRole);
  const testOfStudent = useSelector((state: RootState) => state.testOfStudent);

  const [isChanged, setIsChanged] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [testResult, setTestResult] = useState<any>();
  const params = useParams();
  useEffect(() => {
    if(params.testResultId === undefined) return;
    if(userRole === 0) {}
    if(userRole === 1) dispatch(GetTestResultForStudent(params.testResultId.toString()))
  }, [params.testResultId, userRole]);

  useEffect(() => {
    if(testOfStudent.testResult === undefined) return;
    setTestResult(testOfStudent.testResult);
  }, [testOfStudent.testResult]);

  const handleDiscardAndFinish = () => {
    navigate(-1);
  };
  const handleSaveChanges = () => {
    //TODO: add test result id of student
    let success = true
    if(testResult || testResult.resultAnswers === undefined) return;
    testResult.resultAnswers.forEach((result: IQuestion) => {
      if(result.points === undefined) result.points = 0;
      if(result.feedback === undefined) result.feedback = "";
      dispatch(LeaveFeedbackOnAnswer("8", result.id.toString(), result.points, result.feedback)).then((res: any) => {
        if(!res) success = false;
      }) 
      if(!success) return;
    });
    if(success) setIsChanged(false);
    if(!success) alert("Error occured while saving changes");
  };
  const handleQuestionChange = () => {
    setIsChanged(true);
  };
  if(testResult === undefined) return null;
    return (
      <div>
      <Row xs={2}>
        <Col
          key={2}
          className="col-10 overflow-auto"
          onClick={handleQuestionChange}
          style={{ paddingTop: "16px", height: "calc(100vh - 46.67px)" }}
        >
        <TestField />
        </Col>
        <Col key={3} className="col-2 px-0">
          <RightSideMenu
              title="Questions"
              bottomControls={
               <div>
                <Button
                  variant="outline-secondary"
                  className="w-100"
                  onClick={handleDiscardAndFinish}
                >
                   Finish review
                </Button>
               {userRole === 0 && isChanged &&  <Button className="w-100 mt-2" onClick={handleSaveChanges}>
                    Save changes
                  </Button> }
              </div>
              } >
            <QuestionsGrid />
          </RightSideMenu>
        </Col>
      </Row>
      </div>
    );
  }


export default TestOfStudent;
