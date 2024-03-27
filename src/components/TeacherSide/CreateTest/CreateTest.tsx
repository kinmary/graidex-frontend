import { Col, Row, Button } from "react-bootstrap";
import TestConstructor from "./TestConstructor";
import RightSideMenu from "../../RightSideMenu";
import QuestionsGrid from "./QuestionsGrid";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "../../../app/hooks";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { getDraft, getTest, getTestDraftQuestions, getTestQuestionsOfTeacher, mapToBackendQuestions, updateTestDraftQuestions, updateTestQuestions } from "../../Dashboard/TestActions";
import { getSubjectContent } from "../../Dashboard/SubjectActions";
import ISubjectContent from "../../../interfaces/SubjectContent";
import { ITestDto } from "../../../interfaces/TestDto";

const CreateTest = () => {
  const [isChanged, setIsChanged] = useState(false);
  const params = useParams();
  const main = useSelector((state: RootState) => state.main);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [testFound, setTestFound] = useState(false);
  const [currentTestDraft, setCurrentTestDraft] = useState<ITestDto>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const questions = useSelector(
    (state: RootState) => state.createTest.questions
  );

  useEffect(() => {
    dispatch(getSubjectContent(params.selectedSubjectId!));
  }, []);

  useEffect(() => {
    if (main.tests) {
      let selectedTest = main.tests.find((x: ISubjectContent) => x.id.toString() === params.test);
      if (selectedTest) {
        if (selectedTest.itemType === "Test") {
          dispatch(getTest(selectedTest.id)).then(() => setTestFound(true));
        }
        if (selectedTest.itemType === "TestDraft") {
          dispatch(getDraft(selectedTest.id)).then(() => setTestFound(true));
        }
      } else {
        setTestFound(false);
      }
    }
  }, [main.tests]);

  useEffect(() => {
    if(!testFound) return;
    setCurrentTestDraft(main.currentTestDraft);
  }, [main.currentTestDraft, testFound]);

  useEffect(() => {
    if(!testFound) return;
    if(currentTestDraft?.itemType === "TestDraft"){
      dispatch(getTestDraftQuestions(currentTestDraft.id));
      setTimeout(() => {setDataLoaded(true)}, 200);
    } else if(currentTestDraft?.itemType === "Test"){
      dispatch(getTestQuestionsOfTeacher(main.currentTestDraft.id));
      setTimeout(() => {setDataLoaded(true)}, 200);
    }
  }, [currentTestDraft, testFound]);

  const handleSaveChanges = () => {
    setIsChanged(false);
    if(!currentTestDraft) return;
    let updateQuestionsDto: any = mapToBackendQuestions(questions);
    if (currentTestDraft.itemType === "Test" && updateQuestionsDto) {
      dispatch(updateTestQuestions(currentTestDraft.id, updateQuestionsDto))
    }
    if (currentTestDraft.itemType === "TestDraft" && updateQuestionsDto) {
      dispatch(updateTestDraftQuestions(currentTestDraft.id, updateQuestionsDto))
    }
  };

  const handleDiscardAndFinish = () => {
    if (isChanged) {
      var result = window.confirm("Are you sure you want to discard changes?");
      if (!result) return;
    }

    setIsChanged(false);
    navigate(-1);
  };

  const handleQuestionChange = () => {
    setIsChanged(true);
  };
if(!dataLoaded || !currentTestDraft || !questions || !testFound) return null;
  return (
    <div>
      <Row xs={2}>
        <Col
          key={2}
          className="col-10 overflow-auto"
          onClick={handleQuestionChange}
          style={{ paddingTop: "16px", height: "calc(100vh - 46.67px)" }}
        >
          <TestConstructor />
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
                  {isChanged ? "Discard & Finish" : "Finish editing"}
                </Button>
                {isChanged && (
                  <Button className="w-100 mt-2" onClick={handleSaveChanges}>
                    Save changes
                  </Button>
                )}
              </div>
            }
          >
            <QuestionsGrid />
          </RightSideMenu>
        </Col>
      </Row>
    </div>
  );
};

export default CreateTest;
