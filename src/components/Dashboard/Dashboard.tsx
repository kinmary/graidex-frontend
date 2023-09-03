import { Alert, Breadcrumb, Button, Card, Col, Row } from "react-bootstrap";
import logoDark from "../../images/GraidexLogoDarkJPG.jpg";
import AddSubjectModal from "../Modals/AddSubjectModal";
import { SetOpen } from "../MainAction";
import { useAppDispatch } from "../../app/hooks";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { useNavigate } from "react-router-dom";
import { getSubjectContent } from "./SubjectActions";

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const auth = useSelector((state: RootState) => state.auth);
  const main = useSelector((state: RootState) => state.main);
  const navigate = useNavigate();
  let { allSubjects } = main;

  const OpenModal = () => {
    dispatch(SetOpen("openSubjectModal", true));
  };
  const HandleCardClick = (e: any) => {
    const selectedSubjectId = e.currentTarget.id;
    dispatch(SetOpen("selectedSubjectId", selectedSubjectId));
    auth.userRole === 0 ? dispatch(getSubjectContent(false, selectedSubjectId)) : dispatch(getSubjectContent(true, selectedSubjectId));
    navigate(`${selectedSubjectId}`);
  };

  return (
    <>
      <AddSubjectModal />
      <div
      style={{marginTop: "10px"}}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 5,
          }}
        >
          <h5 style={{ fontWeight: "bold", textAlign: "left", margin: 0 }}>
            Subjects
          </h5>
          <div style={{ marginLeft: "auto" }}>
            {/* //! Or make more dynamic field to add new card with text and 
              //!     change directly on card (without modal) */}
            {auth.userRole === 0 && (
              <Button size="sm" onClick={OpenModal}>
                <i className="bi bi-plus-lg"></i> Add subject
              </Button>
            )}
          </div>
        </div>
        <Breadcrumb  style={{fontSize: 14}}>
          <Breadcrumb.Item active > Dashboard</Breadcrumb.Item>
        </Breadcrumb>
        {/*//TODO: add filter button */}
        {allSubjects.length > 0 ? (
          <Row xs={1} md={3} className="g-4">
            {allSubjects.map((subject: any, idx: number) => (
              <Col key={idx}>
                <Card
                  style={{ textAlign: "left", width: "100%", height: 300 }}
                  id={subject.id}
                  onClick={HandleCardClick}
                >
                  <Card.Img
                    variant="top"
                    src={subject.imageUrl || logoDark}
                    style={{ height: "70%", objectFit: "cover" }}
                  />
                  <Card.Body>
                    <Card.Subtitle className="mb-2 text-muted">
                      {subject.customId}
                    </Card.Subtitle>
                    <Card.Title>{subject.title}</Card.Title>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        ) : (
          <Alert variant="primary" style={{ textAlign: "center" }}>
            {auth.userRole === 0 ? (
              <>
                <h6>
                  You don't have any subjects yet. Create the first one here!
                </h6>
                <Button onClick={OpenModal}>
                  <i className="bi bi-plus-lg"></i>Add subject
                </Button>
              </>
            ) : (
              <h6>
                You don't have any subjects yet. Add subject by clicking
                invitation link from your teacher!
              </h6>
            )}
          </Alert>
        )}
      </div>
    </>
  );
};

export default Dashboard;
