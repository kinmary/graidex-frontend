import { Breadcrumb, Button } from "react-bootstrap";
import AnswersGrid from "./AnswersGrid";
import { useAppDispatch } from "../../app/hooks";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import MessageModal from "../Modals/MessageModal";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { CheckAuthentication } from "../Auth/AuthAction";

const TestTab = () => {
  const dispatch = useAppDispatch();
  const main = useSelector((state: RootState) => state.main);
  const auth = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  const params = useParams();
  useEffect(() => {
    dispatch(CheckAuthentication());
  }, []);
  const selectedSubject = main.allSubjects.find(
    (obj: any) => obj.id.toString() === params.selectedSubjectId!.toString()
  );
  const onEditTestClick = () => {
    // dispatch(SetOpen("editTestPage", true));
    // dispatch(SetOpen("createTestPage", true));
    // dispatch(ChangeQuestions(testExample));
    // dispatch(ChangeTitle(main.selectedTest!.examName!));
    // navigate("edit-test");
  };

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
          <Breadcrumb.Item onClick={() => navigate(-1)}>
            {selectedSubject && selectedSubject.title}
          </Breadcrumb.Item>
          <Breadcrumb.Item active>
          {main.currentTestDraft && main.currentTestDraft.title}
          </Breadcrumb.Item>
        </Breadcrumb>
        <AnswersGrid />
      </div>
    </>
  );
};

export default TestTab;
