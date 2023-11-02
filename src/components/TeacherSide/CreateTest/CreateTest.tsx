import { Col, Row, Button } from "react-bootstrap";
import TestConstructor from "./TestConstructor";
import RightSideMenu from "../../RightSideMenu";
import QuestionsGrid from "./QuestionsGrid";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const  CreateTest = () => {
  const [isChanged, setIsChanged] = useState(false);
  const navigate = useNavigate();

  const handleSaveChanges = () => {
    setIsChanged(false);
  }

  const handleDiscardAndFinish = () => {
    if (isChanged) {
      var result = window.confirm("Are you sure you want to discard changes?");
      if (!result) return;
    }

    setIsChanged(false);
    navigate(-1);
  }

  const handleQuestionChange = () => {
    setIsChanged(true);
  }

    return (
      <div>
        <Row xs = {2}>
          <Col key={2} className = "col-10 overflow-auto" onClick={handleQuestionChange}
            style={{ paddingTop: "16px", height: "calc(100vh - 46.67px)" }} 
          >
            <TestConstructor />
          </Col>
          <Col key={3} className = "col-2 px-0">
            <RightSideMenu 
              title="Questions" 
              bottomControls = {
                <div>
                  <Button variant="outline-secondary" className="w-100"
                     onClick={handleDiscardAndFinish}>
                    {isChanged ? "Discard & Finish" : "Finish editing"}
                  </Button>
                  {isChanged && 
                    <Button className="w-100 mt-2" onClick={handleSaveChanges}>
                      Save changes
                    </Button>
                  }
                </div>
              }
            >
              <QuestionsGrid />
            </RightSideMenu>
          </Col>
        </Row>
      </div>
    );
  }

export default CreateTest;
