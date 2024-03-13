import React, {useEffect, useState} from "react";
import {Breadcrumb, Button, Card, Dropdown, OverlayTrigger, Tooltip} from "react-bootstrap";
import {SetOpen} from "../MainAction";
import {useAppDispatch} from "../../app/hooks";
import {useSelector} from "react-redux";
import {RootState} from "../../app/store";
import DeleteSubjectModal from "../Modals/DeleteSubjectModal";
import ChangeImageModal from "../Modals/ChangeImageModal";
import MessageModal from "../Modals/MessageModal";
import {Link, useNavigate, useParams} from "react-router-dom";
import ISubjectContent from "../../interfaces/SubjectContent";
import AddTestModal from "../Modals/AddTestModal";
import {getSubjectContent, getVisibleSubjectContent, updateContentVisibility} from "./SubjectActions";
import logoDark from "../../images/GraidexLogoDarkJPG.jpg";

const SubjectPage = () => {
  const auth = useSelector((state: RootState) => state.auth);
  const main = useSelector((state: RootState) => state.main);
  const [isPreview, setPreview] = useState(false);
  // const [testsView, setTestsView] = useState<ISubjectContent[]>(main.tests);
  const [tests, setTests] = useState<ISubjectContent[]>();
  const [drafts, setDrafts] = useState<ISubjectContent[]>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const [selectedSubject, setSelectedSubject] = useState<any>();
  useEffect(() => {
    if (!main.allSubjects) return;
    const selectedSubject = main.allSubjects.find((obj: any) => obj.id.toString() === params.selectedSubjectId!.toString());
    setSelectedSubject(selectedSubject);
  }, [params.selectedSubjectId!, main.allSubjects]);

  useEffect(() => {
    auth.userRole === 0 ? dispatch(getSubjectContent(params.selectedSubjectId!)) : dispatch(getVisibleSubjectContent(params.selectedSubjectId!));
  }, []);

  useEffect(() => {
    //navigate("/");
    if (main.tests && main.tests.length > 0) {
      // setTestsView(main.tests);
      setTests(main.tests.filter((x: ISubjectContent) => x.itemType === "Test"));
      setDrafts(main.tests.filter((x: ISubjectContent) => x.itemType === "TestDraft"));
    } else {
      // setTestsView(main.tests);
      setTests(main.tests);
      setDrafts(main.tests);
    }
  }, [main.tests]);

  const OnCreateTestClick = () => {
    dispatch(SetOpen("openTestModal", true));
  };

  const onPreviewDDClick = (preview: boolean) => {
    if (!preview) {
      main.tests !== undefined ? setTests(main.tests.filter((x: ISubjectContent) => x.itemType === "Test")) : setTests(main.tests);
    } else {
      main.tests !== undefined ? setTests(main.tests.filter((x: ISubjectContent) => x.itemType === "Test" && x.isVisible === true)) : setTests(main.tests);
    }
    setPreview(preview);
  };

  const onChangeVisible = (testid: string | number, visible: boolean, subjectid: string | number) => {
    dispatch(updateContentVisibility(testid, visible, subjectid));
  };
  const renderTooltip = (warning: string, props: any) => (
    <Tooltip id="button-tooltip-2" {...props}>
      {warning}
    </Tooltip>
  );
  if (!selectedSubject) return null;
  return (
    <>
      <DeleteSubjectModal selectedSubject={selectedSubject} />
      <ChangeImageModal selectedSubject={selectedSubject} />
      <MessageModal />
      <AddTestModal subjectId={params.selectedSubjectId} />
      <div style={{marginTop: "10px"}}>
        <div
          className="rounded mb-3"
          style={{
            backgroundImage: `url("${(selectedSubject && selectedSubject.imageUrl) || logoDark}"`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          <div className="d-flex flex-column blured-image p-3 rounded text-light">
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "start",
              }}
            >
              <h5 style={{fontWeight: "bold", textAlign: "left", margin: 0}}>
                {selectedSubject && selectedSubject.title}
                {auth.userRole === 0 && (
                  <Link to={`settings`} style={{color: "inherit", textDecoration: "none"}}>
                    <i style={{marginLeft: 10}} className="bi bi-gear"></i>
                  </Link>
                )}
              </h5>

              <div style={{marginLeft: "auto", display: "flex"}}>
                {auth.userRole === 0 && (
                  <>
                    <Button onClick={OnCreateTestClick}>
                      <i className="bi bi-plus-lg me-2"></i>Create draft
                    </Button>
                    <Dropdown>
                      <Dropdown.Toggle variant={main.theme} id="dropdown-basic">
                        {isPreview ? <i className="bi bi-eye"></i> : <i className="bi bi-eye-slash"></i>}
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item as={Button} value={true} key={1} onClick={() => onPreviewDDClick(true)}>
                          <i className="bi bi-eye"></i> Preview
                        </Dropdown.Item>
                        <Dropdown.Item as={Button} value={false} key={2} onClick={() => onPreviewDDClick(false)}>
                          <i className="bi bi-eye-slash"></i> Constructor
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </>
                )}
              </div>
            </div>
            <Breadcrumb style={{fontSize: 14}} data-bs-theme="dark">
              <Breadcrumb.Item
                linkAs={Link} linkProps={{to: '/'}}
              >
                Dashboard
              </Breadcrumb.Item>
              <Breadcrumb.Item active> {selectedSubject && selectedSubject.title} </Breadcrumb.Item>
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
                      <div key={idx} className="d-flex justify-content-between">
                        <Link to={`${test.id}`} style={{color: "transparent", textDecoration: "none", width: "89.5%"}}>
                          <Card className="mb-2" style={{flexGrow: 4}}>
                            <Card.Body>
                              <Card.Title className="d-flex justify-content-between mb-0 h6">
                                <div>{test.title}</div>
                                {test.warningMessage && (
                                  <OverlayTrigger overlay={(props) => renderTooltip(test.warningMessage || "", props)}>
                                    <i className="bi bi-exclamation-triangle-fill ms-auto text-warning"></i>
                                  </OverlayTrigger>
                                )}
                              </Card.Title>
                            </Card.Body>
                          </Card>
                        </Link>
                        <div className="d-flex justify-content-center mt-1" style={{width: "100px"}}>
                          <Dropdown>
                            <Dropdown.Toggle variant={main.theme}>{!test.isVisible ? "Hidden" : "Shown"}</Dropdown.Toggle>
                            <Dropdown.Menu>
                              <Dropdown.Item as={Button} key={`dropdown-1-${idx}`} value={true} onClick={() => onChangeVisible(test.id, true, test.subjectId)}>
                                Shown
                              </Dropdown.Item>
                              <Dropdown.Item as={Button} key={`dropdown-2-${idx}`} value={false} onClick={() => onChangeVisible(test.id, false, test.subjectId)}>
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
                      <div key={idx + "-draft"} className="d-flex justify-content-between">
                        <Link to={`${test.id}`} style={{color: "transparent", textDecoration: "none", width: "89.5%"}}>
                          <Card key={idx + "-draft-card"} className="mb-2" style={{flexGrow: 4}}>
                            <Card.Body>
                              <Card.Title className="d-flex justify-content-between mb-0 h6">
                                <div>{test.title}</div>
                              </Card.Title>
                            </Card.Body>
                          </Card>
                        </Link>
                        <div className="d-flex justify-content-center mt-1" style={{width: "100px"}}>
                          <Dropdown>
                            <Dropdown.Toggle disabled variant={main.theme} id="dropdown-basic">
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
                <div key={idx + "-student"} className="d-flex justify-content-between">
                  <Link to={`${test.id}`} style={{color: "transparent", textDecoration: "none", width: "100%"}}>
                    <Card key={idx + "-student-card"} className="mb-2" style={{flexGrow: 4}}>
                      <Card.Body>
                        <Card.Title className="d-flex justify-content-between mb-0 h6">
                          <div>{test.title}</div>
                        </Card.Title>
                      </Card.Body>
                    </Card>
                  </Link>
                </div>
              ))}
          </>
        )}
      </div>
    </>
  );
};

export default SubjectPage;
