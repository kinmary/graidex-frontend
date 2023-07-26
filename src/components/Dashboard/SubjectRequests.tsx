import { Alert, Breadcrumb, Button, Card, Col, Row } from "react-bootstrap";
import logoDark from "../../images/GraidexLogoDarkJPG.jpg";
import AddSubjectModal from "../Modals/AddSubjectModal";
import { SetOpen } from "../MainAction";
import { useAppDispatch } from "../../app/hooks";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { useNavigate } from "react-router-dom";
import { getSubjectRequests, joinSubjectRequest, rejectSubjectRequest } from "./SubjectRequestActions";
import { useEffect } from "react";

const SubjectRequests = () => {

  const dispatch = useAppDispatch();
  const subjectRequests = useSelector((state: RootState) => state.main.subjectRequests);

  const HandleAcceptClick = (e: any) => {
    const selectedSubjectId = e.currentTarget.id;
    dispatch(
      joinSubjectRequest(selectedSubjectId));
  };
  const HandleRejectClick = (e: any) => {
    const selectedSubjectId = e.currentTarget.id;
    dispatch(
      rejectSubjectRequest(selectedSubjectId));
  };

  return (
    <>
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
            Subject Requests
          </h5>
          <div style={{ marginLeft: "auto" }}>
          
          </div>
        </div>
        <Breadcrumb  style={{fontSize: 14}}>
          <Breadcrumb.Item active>Subject Requests</Breadcrumb.Item>
        </Breadcrumb>
        {/*//TODO: add filter button */}
        {subjectRequests.length > 0 ? (
          <Row xs={1} md={3} className="g-4">
            {subjectRequests.map((subject: any, idx: number) => (
              <Col key={idx}>
                <Card
                  style={{ textAlign: "left", width: "100%", height: 300 }}
                  id={subject.id}
                >
                  <Card.Img
                    variant="top"
                    src={subject.subjectInfo.imageUrl || logoDark}
                    style={{ height: "60%", objectFit: "cover" }}
                  />
                  <Card.Body>
                    <Card.Subtitle className="mb-2 text-muted">
                      {subject.subjectInfo.customId}
                    </Card.Subtitle>
                    <Card.Title>{subject.subjectInfo.title}</Card.Title>
                    <Button id={subject.id} variant="danger" style={{width: "49%",}} onClick={HandleRejectClick}>Reject</Button>

                    <Button id={subject.id} style={{width: "49%",  float: "right"}} onClick={HandleAcceptClick}>Accept</Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        ) : (
          <Alert variant="primary" style={{ textAlign: "center" }}>
              <h6>
                You don't have any pending subject requests.
              </h6>
          </Alert>
        )}
      </div>
    </>
  );
};

export default SubjectRequests;
