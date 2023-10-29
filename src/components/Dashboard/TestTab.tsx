import { Alert, Breadcrumb, Button, Col, Row, ToggleButtonGroup, ToggleButton } from "react-bootstrap";
import AnswersGrid from "./AnswersGrid";
import { useAppDispatch } from "../../app/hooks";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import MessageModal from "../Modals/MessageModal";
import { Link, useNavigate, useParams } from "react-router-dom";
import RightSideMenu from "../RightSideMenu";

const TestTab = () => {
  const dispatch = useAppDispatch();
  const main = useSelector((state: RootState) => state.main);
  const auth = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  const params = useParams();
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
      <Row>
        <Col className="col-10">
        <div style={{ marginTop: "10px" }}>

          {/* <div
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
          </Breadcrumb> */}
          <AnswersGrid />
        </div>
        </Col>
        <Col className="col-2 px-0">
          <RightSideMenu title="Test" bottomControls={
            <Alert variant={"primary"} className="small p-2">
              <i className="bi bi-info-circle me-2"></i>
              Tip: double click on a row to open the attempt
              
              <div className="d-flex justify-content-end mt-2">
                <Button variant="outline-primary" size="sm" className="me-2 flex-grow-1">
                  Hide tips
                </Button>
                <Button size="sm">
                  Ok
                </Button>
              </div>
            </Alert>
          }>
            <div className="d-flex flex-column px-1">
              <Button onClick={() => navigate("settings")} variant="light" className="mb-1 text-start border-0">
                <i className="bi bi-sliders me-2"></i>
                Parameters
                </Button>
              <Button variant="light" className="mb-1 text-start border-0">
                <i className="bi bi-people me-2"></i>
                Participants
                </Button>
              <Button variant="light" active className="mb-1 text-start bg-dark-subtle border-0">
                <i className="bi bi-table me-2"></i>
                Results
                </Button>
              <Button variant="light" className="mb-1 text-start border-0" onClick={onEditTestClick}>
                <i className="bi bi-pencil-square me-2"></i>
                Edit questions...
                </Button>
            </div>
          </RightSideMenu>
        </Col>
      </Row>
    </>
  );
};

export default TestTab;
