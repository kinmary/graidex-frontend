import React, { Component, useEffect, useRef, useState } from "react";
import {
  Breadcrumb,
  Button,
  Tab,
  Tabs,
  Card,
  Row,
  Col,
  Dropdown,
  Alert,
} from "react-bootstrap";
import { connect } from "react-redux";
import { SetOpen } from "../MainAction";
import { useAppDispatch } from "../../app/hooks";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import DeleteSubjectModal from "../Modals/DeleteSubjectModal";
import ChangeImageModal from "../Modals/ChangeImageModal";
import MessageModal from "../Modals/MessageModal";
import StartTestConfirmModal from "../Modals/SendTestConfirmModal";
import AddStudentModal from "../Modals/AddStudentModal";
import { useNavigate, useParams } from "react-router-dom";
import ISubjectContent from "../../interfaces/SubjectContent";
import AddTestModal from "../Modals/AddTestModal";
import { getSubjectContent } from "./SubjectActions";
import { createTestDraft, updateTest } from "./TestActions";
import { IUpdateTestDto } from "../../interfaces/UpdateTestDto";

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

  const onRowDoubleClick = () => {
    // const selectedRows = gridRef.current!.api.getSelectedRows();
    //dispatch(SetOpen("selectedTest", 0));
    // navigate("test");
  };

  const onRowClickByStudent = () => {
    // const selectedRows = gridRef.current!.api.getSelectedRows();
    // let status = selectedRows[0].status;
    // let studentName = "Mariia Kindratyshyn"; //TODO: take name from settings
    // if (status === 2 && studentName) {
    //   dispatch(SetOpen("studentName", studentName));
    //   dispatch(SetOpen("testOfStudentPage", true));
    //   navigate(
    //     "test/" + studentName
    //   );
    // }
    // if (status === 0) {
    //   //TODO: make as modal
    //   dispatch(SetMessageOpen(true, "You cannot access this test"));
    // }
    // if (status === 1) {
    //   dispatch(SetOpen("startConfirmModal", true));
    //   //TODO: check the procedure when the exam is in progress
    // }
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

  const onChangeVisible = (testid: string, updateTestDto: IUpdateTestDto) => {
    // dispatch(updateTest())
  }

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
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 5,
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
                  <i className="bi bi-plus-lg me-2"></i>Create test
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
                      onClick={() => onPreviewDDClick(true)}
                    >
                      <i className="bi bi-eye"></i> Preview
                    </Dropdown.Item>
                    <Dropdown.Item
                      value={false}
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
        {/* //TODO: move style to css */}
        <Breadcrumb style={{ fontSize: 14 }}>
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
        {auth.userRole === 0 ? (
          <>
            {tests && tests.length > 0 && (
              <>
                <h6>Planned tests</h6>
                {tests.map(
                  (test: any, idx: number) =>
                    test && (
                      <div
                        key={idx + "planned"}
                        className="d-flex justify-content-between"
                      >
                        <Card
                          key={idx + "-planned-card"}
                          className="mb-2"
                          style={{ flexGrow: 4 }}
                          onClick={onRowDoubleClick}
                        >
                          <Card.Body>
                            <Card.Title className="d-flex justify-content-between mb-0 h6">
                              <div>{test.title}</div>
                              {/* TODO: add date */}
                              {/* <div className="text-secondary">
                      {test.date}, {idx % 2 === 0 ? "10:00" : "12:00"} - {idx % 2 === 0 ? "14:00" : "13:00"}
                    </div> */}
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
                              id="dropdown-basic"
                            >
                              {!test.isVisible ? "Hidden" : "Shown"}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              <Dropdown.Item
                                value={true}
                                onClick={() => onPreviewDDClick(true)}
                              >
                                Shown
                              </Dropdown.Item>
                              <Dropdown.Item
                                value={false}
                                onClick={() => onPreviewDDClick(false)}
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
                <h6 className="mt-3 text-danger">Drafts</h6>
                {drafts.map(
                  (test: any, idx: number) =>
                    test && (
                      <>
                        <div
                          key={idx + "-draft"}
                          className="d-flex justify-content-between"
                        >
                          <Card
                            key={idx + "-draft-card"}
                            className="mb-2"
                            style={{ flexGrow: 4 }}
                          >
                            <Card.Body>
                              <Card.Title className="d-flex justify-content-between mb-0 h6">
                                <div>{test.title}</div>
                                {/* TODO: add date! */}
                                {/* <div className="text-danger">

                      Last update:
                       {test.date} 
                       at {idx % 2 === 0 ? "19:00" : "22:00"}
                    </div> */}
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
                      </>
                    )
                )}
              </>
            )}
          </>
        ) : (
          <>
            <h6>Planned tests</h6>
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
                    //TODO: add onClick for student
                    // onClick={onRowDoubleClick}
                  >
                    <Card.Body>
                      <Card.Title className="d-flex justify-content-between mb-0 h6">
                        <div>{test.title}</div>
                        {/* TODO: add date */}
                        {/* <div className="text-secondary">
                        {test.date}, {idx % 2 === 0 ? "10:00" : "12:00"} - {idx % 2 === 0 ? "14:00" : "13:00"}
                      </div> */}
                      </Card.Title>
                    </Card.Body>
                  </Card>
                </div>
              ))}
          </>
        )}
        {(!main.tests || main.tests.length === 0) && !isPreview && (
          <Alert variant="primary" style={{ textAlign: "center" }}>
            {auth.userRole === 0 ? (
              <>
                <h6>
                  You don't have any tests or drafts yet. Create the first one
                  here!
                </h6>
                <Button onClick={OnCreateTestClick}>
                  <i className="bi bi-plus-lg me-2"></i>Create test
                </Button>
              </>
            ) : (
              <h6>
                You don't have any opened test yet. Wait until teacher opens
                one!
              </h6>
            )}
          </Alert>
        )}
      </div>
    </>
  );
};

export default SubjectPage;
