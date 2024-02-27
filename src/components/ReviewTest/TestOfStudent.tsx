import React, { useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import TestField from "./TestField";
import RightSideMenu from "../RightSideMenu";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import QuestionsGrid from "./QuestionsGrid";
import { useAppDispatch } from "../../app/hooks";
import { IQuestion } from "../../interfaces/Questions";
import { LeaveFeedbackOnAnswer } from "./TestOfStudentActions";

const TestOfStudent = () => {
  const userRole = useSelector((state: RootState) => state.auth.userRole);
  const [isChanged, setIsChanged] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  let {testResult} = useSelector((state: RootState) => state.testOfStudent);

  const handleDiscardAndFinish = () => {
    navigate(-1);
  };
  const handleSaveChanges = () => {
    //TODO: add test result id of student
    let success = true
    if(testResult.resultAnswers === undefined) return;
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
