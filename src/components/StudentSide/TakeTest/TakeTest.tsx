import {Button, Col, Row} from "react-bootstrap";
import TestConstructor from "./TestConstructor";
import SendTestConfirmModal from "./SendTestConfirmModal";
import RightSideMenu from "./RightSideMenu";
import QuestionsGrid from "./QuestionsGrid";
import {useEffect, useState} from "react";
import {useAppDispatch} from "../../../app/hooks";
import {SetOpen} from "../../MainAction";
import {useSelector} from "react-redux";
import {RootState} from "../../../app/store";

const TakeTest = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [endTime, setEndTime] = useState<number | null>(null);
  const end = useSelector((state: RootState) => state.takeTest.endTime);
  const dispatch = useAppDispatch();
  useEffect(() => {
    setTimeout(() => {
      if (end !== undefined && end !== null) {
        setEndTime(end);
      }
      setIsLoaded(true);
    }, 1000); // Delay of 1 second
  }, []);
  const handleSubmitAttempt = () => {
    dispatch(SetOpen("sendTestModal", true));
  };
  if (!isLoaded || !end || !endTime) {
    return null;
  }
  return (
    <div>
      <SendTestConfirmModal />
      <Row xs={2}>
        <Col key={2} className="col-10 overflow-auto" style={{paddingTop: "16px", height: "calc(100vh - 46.67px)"}}>
          <TestConstructor />
        </Col>
        <Col key={3} className="col-2 px-0">
          <RightSideMenu
            title="Questions"
            bottomControls={
              <div>
                <Button variant="primary" className="w-100" onClick={handleSubmitAttempt}>
                  Submit attempt
                </Button>
              </div>
            }
            endTime={endTime}
          >
            <QuestionsGrid />
          </RightSideMenu>
        </Col>
      </Row>
    </div>
  );
};

export default TakeTest;
