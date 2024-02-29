import React, { useEffect, useState } from "react";
import {
  Breadcrumb,
  Button,
  Card,
  Dropdown,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { SetOpen } from "../MainAction";
import { useAppDispatch } from "../../app/hooks";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import DeleteSubjectModal from "../Modals/DeleteSubjectModal";
import ChangeImageModal from "../Modals/ChangeImageModal";
import MessageModal from "../Modals/MessageModal";
import StartTestConfirmModal from "../StudentSide/TakeTest/SendTestConfirmModal";
import AddStudentModal from "../Modals/AddStudentModal";
import { useNavigate, useParams } from "react-router-dom";
import ISubjectContent from "../../interfaces/SubjectContent";
import AddTestModal from "../Modals/AddTestModal";
import { getAttemptsDescription, getDraft, getTest, getVisibleTestStudent } from "./TestActions";
import { getSubjectContent, getVisibleSubjectContent, updateContentVisibility } from "./SubjectActions";
import logoDark from '../../images/GraidexLogoDarkJPG.jpg';

const SubjectPage = () => {
  const auth = useSelector((state: RootState) => state.auth);
  const main = useSelector((state: RootState) => state.main);
  const [isPreview, setPreview] = useState(false);
  // const [testsView, setTestsView] = useState<ISubjectContent[]>(main.tests);
  const [tests, setTests] = useState<ISubjectContent[]>(main.tests);
  const [drafts, setDrafts] = useState<ISubjectContent[]>(main.tests);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const selectedSubject = main.allSubjects.find(
    (obj: any) => obj.id.toString() === params.selectedSubjectId!.toString()
  );

  useEffect(() => {
    auth.userRole === 0
      ? dispatch(getSubjectContent(params.selectedSubjectId!))
      : dispatch(getVisibleSubjectContent(params.selectedSubjectId!));
  }, []);
  useEffect(() => {
    //navigate("/");
    if (main.tests && main.tests.length > 0) {
      // setTestsView(main.tests);
      setTests(
        main.tests.filter((x: ISubjectContent) => x.itemType === "Test")
      );
      setDrafts(
        main.tests.filter((x: ISubjectContent) => x.itemType === "TestDraft")
      );
    } else {
      // setTestsView(main.tests);
      setTests(main.tests);
      setDrafts(main.tests);
    }
  }, [main.tests]);

  const onTestClick = (testid: string | number, itemType: string) => {
    if (itemType === "Test") {
      dispatch(getTest(testid)).then(() => navigate(`${testid}`));
    }
    if (itemType === "TestDraft") {
      dispatch(getDraft(testid)).then(() => navigate(`${testid}`));;
    }
    // if (main.currentTestDraft) {
    //   navigate(`${testid}`);
    // }
  };

  const onRowClickByStudent = async (testid: string | number) => {
    await dispatch(getVisibleTestStudent(testid)).then(()=> {
      dispatch(getAttemptsDescription(testid)).then(() => {
        navigate(`${testid}`);
      })
    });

  };

  const OnCreateTestClick = () => {
    dispatch(SetOpen("openTestModal", true));
  };

  const onPreviewDDClick = (preview: boolean) => {
    if (!preview) {
      main.tests !== undefined
        ? setTests(
            main.tests.filter((x: ISubjectContent) => x.itemType === "Test")
          )
        : setTests(main.tests);
    } else {
      main.tests !== undefined
        ? setTests(
            main.tests.filter(
              (x: ISubjectContent) =>
                x.itemType === "Test" && x.isVisible === true
            )
          )
        : setTests(main.tests);
    }
    setPreview(preview);
  };

  const onChangeVisible = (
    testid: string | number,
    visible: boolean,
    subjectid: string | number
  ) => {
    dispatch(updateContentVisibility(testid, visible, subjectid));
  };

  return (
    <>
      <DeleteSubjectModal />
      <ChangeImageModal />
      <MessageModal />
      <StartTestConfirmModal />
      <AddStudentModal />
      <AddTestModal subjectId={params.selectedSubjectId} />
      <div style={{ marginTop: "10px" }}>
        <div 
        className="rounded mb-3"
        style={{
          backgroundImage: `url("${selectedSubject.imageUrl || logoDark}"`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}>
        <div className="d-flex flex-column blured-image p-3 rounded text-light"
        >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "start",
          }}
        >
          <h5 style={{ fontWeight: "bold", textAlign: "left", margin: 0 }}>
            {selectedSubject && selectedSubject.title}
            {auth.userRole === 0 && (
              <i
                style={{ marginLeft: 10 }}
                className="bi bi-gear"
                onClick={() => navigate("settings")}
              ></i>
            )}
          </h5>

          <div style={{ marginLeft: "auto", display: "flex" }}>
            {auth.userRole === 0 && (
              <>
                <Button onClick={OnCreateTestClick}>
                  <i className="bi bi-plus-lg me-2"></i>Create draft
                </Button>
                <Dropdown>
                  <Dropdown.Toggle variant="light" id="dropdown-basic">
                    {isPreview ? (
                      <i className="bi bi-eye"></i>
                    ) : (
                      <i className="bi bi-eye-slash"></i>
                    )}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item
                      value={true}
                      key={1}
                      onClick={() => onPreviewDDClick(true)}
                    >
                      <i className="bi bi-eye"></i> Preview
                    </Dropdown.Item>
                    <Dropdown.Item
                      value={false}
                      key={2}
                      onClick={() => onPreviewDDClick(false)}
                    >
                      <i className="bi bi-eye-slash"></i> Constructor
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </>
            )}
          </div>
        </div>
        <Breadcrumb style={{ fontSize: 14 }} data-bs-theme="dark">
          <Breadcrumb.Item
            onClick={() => {
              navigate("/");
            }}
          >
            Dashboard
          </Breadcrumb.Item>
          <Breadcrumb.Item active>
            {" "}
            {selectedSubject && selectedSubject.title}{" "}
          </Breadcrumb.Item>
        </Breadcrumb>
        </div>
        </div>
        {/* {main.showLoader ? <Loader /> :  */}
        {auth.userRole === 0 ? (
          <>
            {tests && tests.length > 0 && (
              <>
                <h6 className="ms-1">Tests</h6>
                {tests.map(
                  (test: ISubjectContent, idx: number) =>
                    test && (
                      <div
                        key={idx}
                        className="d-flex justify-content-between"
                      >
                        <Card
                          className="mb-2"
                          style={{ flexGrow: 4 }}
                          onClick={() => onTestClick(test.id, test.itemType)}
                        >
                          <Card.Body>
                            <Card.Title className="d-flex justify-content-between mb-0 h6">
                              <div>{test.title}</div>
                              {/* TODO: add date */}
                              {/* <div className="text-secondary">
                      {test.date}, {idx % 2 === 0 ? "10:00" : "12:00"} - {idx % 2 === 0 ? "14:00" : "13:00"}
                    </div> */}
                            {test.warningMessage && (
                              <OverlayTrigger
                                overlay={
                                  <Tooltip id="button-tooltip-2">{test.warningMessage}</Tooltip>
                                }>
                                <i className="bi bi-exclamation-triangle-fill ms-auto text-warning"></i>
                              </OverlayTrigger>
                            )}
                            </Card.Title>
                          </Card.Body>
                        </Card>
                        <div
                          className="d-flex justify-content-center mt-1"
                          style={{ width: "100px" }}
                        >
                          <Dropdown>
                            <Dropdown.Toggle
                              variant="light"
                            >
                              {!test.isVisible ? "Hidden" : "Shown"}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              <Dropdown.Item
                              key={`dropdown-1-${idx}`}
                                value={true}
                                onClick={() =>
                                  onChangeVisible(test.id, true, test.subjectId)
                                }
                              >
                                Shown
                              </Dropdown.Item>
                              <Dropdown.Item
                              key={`dropdown-2-${idx}`}
                                value={false}
                                onClick={() =>
                                  onChangeVisible(
                                    test.id,
                                    false,
                                    test.subjectId
                                  )
                                }
                              >
                                Hidden
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </div>
                      </div>
                    )
                )}
              </>
            )}
            {drafts && drafts.length > 0 && !isPreview && (
              <>
                <h6 className="ms-1 mt-3 text-danger">Drafts</h6>
                {drafts.map(
                  (test: any, idx: number) =>
                    test && (
                      <div
                        key={idx + "-draft"}
                        className="d-flex justify-content-between"
                      >
                        <Card
                          key={idx + "-draft-card"}
                          className="mb-2"
                          style={{ flexGrow: 4 }}
                          onClick={() => onTestClick(test.id, test.itemType)}
                        >
                          <Card.Body>
                            <Card.Title className="d-flex justify-content-between mb-0 h6">
                              <div>{test.title}</div>
                            </Card.Title>
                          </Card.Body>
                        </Card>
                        <div
                          className="d-flex justify-content-center mt-1"
                          style={{ width: "100px" }}
                        >
                          <Dropdown>
                            <Dropdown.Toggle
                              disabled
                              variant="light"
                              id="dropdown-basic"
                            >
                              Hidden
                            </Dropdown.Toggle>
                          </Dropdown>
                        </div>
                      </div>
                    )
                )}
              </>
            )}
          </>
        ) : (
          <>
            <h6>Tests</h6>
            {tests &&
              tests.map((test: any, idx: number) => (
                <div
                  key={idx + "-student"}
                  className="d-flex justify-content-between"
                >
                  <Card
                    key={idx + "-student-card"}
                    className="mb-2"
                    style={{ flexGrow: 4 }}
                    onClick={()=> onRowClickByStudent(test.id)}
                  >
                    <Card.Body>
                      <Card.Title className="d-flex justify-content-between mb-0 h6">
                        <div>{test.title}</div>
                      
                      </Card.Title>
                    </Card.Body>
                  </Card>
                </div>
              ))}
          </>
        )}
        
      </div>
    </>
  );
};

export default SubjectPage;
