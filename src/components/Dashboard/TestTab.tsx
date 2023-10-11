import { Breadcrumb, Button } from "react-bootstrap";
import { SetOpen } from "../MainAction";
import AnswersGrid from "./AnswersGrid";
import { testExample } from "../../constants/TestExample";
import { useAppDispatch } from "../../app/hooks";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import MessageModal from "../Modals/MessageModal";
import {
  ChangeQuestions,
  ChangeTitle,
} from "../TeacherSide/CreateTest/CreateTestActions";
import { useNavigate } from "react-router-dom";

const TestTab = () => {
  const dispatch = useAppDispatch();
  const main = useSelector((state: RootState) => state.main);
  const auth = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  const onEditTestClick = () => {
    dispatch(SetOpen("editTestPage", true));
    dispatch(SetOpen("createTestPage", true));
    dispatch(ChangeQuestions(testExample));
    dispatch(ChangeTitle(main.selectedTest!.examName!));
    navigate("edit-test");
  };

  const { selectedSubjectId, selectedTest } = main;
  const selectedSubject = main.allSubjects.find(
    (obj: any) => obj.id.toString() === selectedSubjectId!.toString()
  );

  return (
    <>
      <MessageModal />
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
            {selectedTest && selectedTest.examName}
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
          <Breadcrumb.Item onClick={() => navigate(-1)}>
            {selectedSubject.title}
          </Breadcrumb.Item>
          <Breadcrumb.Item active>
            {selectedTest && selectedTest.examName}
          </Breadcrumb.Item>
        </Breadcrumb>
        {/* <Tabs
          fill
          defaultActiveKey={
            selectedTest && selectedTest.status !== 2 ? "settings" : "answers"
          }
          style={{ marginLeft: "auto", marginRight: 0 }}
        >
          <Tab eventKey="settings" title="Settings"> */}
        {/* <Settings /> */}
        {/* </Tab>
          <Tab
            eventKey="answers"
            disabled={selectedTest && selectedTest.status !== 2}
            title="Answers"
          > */}
        <AnswersGrid />
        {/* </Tab>
        </Tabs> */}
      </div>
    </>
  );
};

export default TestTab;
