import {
  Breadcrumb,
  Button,
} from "react-bootstrap";
import AnswersGrid from "./AnswersGrid";
import { useAppDispatch } from "../../app/hooks";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import MessageModal from "../Modals/MessageModal";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getDraft, getTest, getTestDraftQuestions, getTestQuestionsOfTeacher } from "./TestActions";
import {  getSubjectContent } from "./SubjectActions";
import ISubjectContent from "../../interfaces/SubjectContent";
import Settings from "./Settings";

const TestTab = () => {
  const dispatch = useAppDispatch();
  const main = useSelector((state: RootState) => state.main);
  const auth = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  const params = useParams();
  const selectedSubject = main.allSubjects.find(
    (obj: any) => obj.id.toString() === params.selectedSubjectId!.toString()
  );
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    if (auth.userRole === 0) {
      dispatch(getSubjectContent(params.selectedSubjectId!)).then(() => {
        if (main.tests) {
          let selectedTest = main.tests.find(
            (x: ISubjectContent) => x.id.toString() === params.test
          );
          if (selectedTest) {
            if (selectedTest.itemType === "Test") {
              dispatch(getTest(selectedTest.id)).then(() => setDataLoaded(true));
            }
            if (selectedTest.itemType === "TestDraft") {
              dispatch(getDraft(selectedTest.id)).then(() => setDataLoaded(true));
            }
          }
        }
      });
    }
  }, []);
  const onEditTestClick = () => {
    if (main.currentTestDraft.itemType === "Test") {
      dispatch(getTestQuestionsOfTeacher(main.currentTestDraft.id));
    }
    navigate("edit-test");
  };
  if(!dataLoaded){
    return null; //TODO: loader
  }

  return (
    <>
      <MessageModal />
      {main.currentTestDraft.itemType ==="Test" ?
      <div style={{ marginTop: "10px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 5,
          }}
        >
          <h5 style={{ fontWeight: "bold", textAlign: "left", margin: 0 }}>
            {main.currentTestDraft && main.currentTestDraft.title}
            {auth.userRole === 0 && (
              <i
                style={{ marginLeft: 10 }}
                className="bi bi-gear"
                onClick={() => navigate("settings")}
              ></i>
            )}
          </h5>
          <div style={{ marginLeft: "auto" }}>
            {auth.userRole === 0 && (
              <Button size="sm" onClick={onEditTestClick}>
                <i className="bi bi-pencil-square"></i> Edit test
              </Button>
            )}
          </div>
        </div>
        <Breadcrumb style={{ fontSize: 14 }}>
          <Breadcrumb.Item onClick={() => navigate("/")}>
            Dashboard
          </Breadcrumb.Item>
          <Breadcrumb.Item onClick={() => navigate("/"+selectedSubject.id)}>
            {selectedSubject && selectedSubject.title}
          </Breadcrumb.Item>
          <Breadcrumb.Item active>
            {main.currentTestDraft && main.currentTestDraft.title}
          </Breadcrumb.Item>
        </Breadcrumb>
        <AnswersGrid />
      </div>
       : <Settings />}
    </>
  );
};

export default TestTab;
