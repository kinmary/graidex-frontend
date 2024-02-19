import { Button, Col, Row } from "react-bootstrap";
 import TestConstructor from "./TestConstructor";
import SendTestConfirmModal from "../../Modals/SendTestConfirmModal";
import RightSideMenu from "./RightSideMenu";
import QuestionsGrid from "./QuestionsGrid";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../app/hooks";
import { SetOpen } from "../../MainAction";

const TakeTest = () => {
  const questions = useSelector((state: RootState) => state.takeTest.questions);
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);
  const [startTime, setStartTime] = useState<number>(Date.now());

  const dispatch = useAppDispatch();
  useEffect(() => {
    // if(questions.length === 0){
    //   navigate(-1);
    //   // alert("Error occured in getting questions");
    // } else {
      setTimeout(() => {
        setIsLoaded(true);
        setStartTime(Date.now());
      }, 1000); // Delay of 1 second
    // }
  }, []);
  const handleSubmitAttempt = () => {
    dispatch(SetOpen("sendTestModal", true))
  };
  if (!isLoaded) {
    return null; 
  }
    return (
      <div>
      <SendTestConfirmModal />
      <Row xs={2}>
        <Col
          key={2}
          className="col-10 overflow-auto"
          style={{ paddingTop: "16px", height: "calc(100vh - 46.67px)" }}
        >
          <TestConstructor />
        </Col>
        <Col key={3} className="col-2 px-0">
          <RightSideMenu
              title="Questions"
              bottomControls={<div>
                <Button
                  variant="primary"
                  className="w-100"
                  onClick={handleSubmitAttempt}
                >
                  Submit attempt
                </Button>
              </div>} 
              startTime={startTime}          
              >
            <QuestionsGrid />
          </RightSideMenu>
        </Col>
      </Row>
      </div>
    );
  }

export default TakeTest;
