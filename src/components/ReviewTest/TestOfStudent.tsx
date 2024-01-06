import React, { useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import TestField from "./TestField";
import RightSideMenu from "../RightSideMenu";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import QuestionsGrid from "./QuestionsGrid";

const TestOfStudent = () => {
  const userRole = useSelector((state: RootState) => state.auth.userRole);
  const [isChanged, setIsChanged] = useState(false);

  const navigate = useNavigate();
  const handleDiscardAndFinish = () => {
    navigate(-1);
  };
  const handleSaveChanges = () => {
    navigate(-1);
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
