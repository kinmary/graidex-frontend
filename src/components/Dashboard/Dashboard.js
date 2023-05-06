import React, { Component } from "react";
import { Alert, Breadcrumb, Button, Card, Col, Row } from "react-bootstrap";
import { connect } from "react-redux";
import logoDark from "../../images/GraidexLogoDarkJPG.jpg";
import AddSubjectModal from "../Modals/AddSubjectModal";
import { withRouter } from "../../utils/withRouter";
import { SetOpen } from "../MainAction";
import { getAllSubjects } from "./SubjectActions";

class Dashboard extends Component {
  // componentDidMount(){
  //   this.props.getAllSubjects();
  // }
  OpenModal() {
    this.props.SetOpen("openSubjectModal", true);
  }
  HandleCardClick(e, data) {
    this.props.SetOpen("selectedSubjectId", e.currentTarget.id);
    this.props.navigate("/" + e.currentTarget.id);
  }

  render() {
    let { allSubjects } = this.props.main;
    return (
      <>
        {/* //TODO: Add edit card (+delete) (three dots icon with dropdown on every card) */}
        <AddSubjectModal />
        <div
          style={{
            marginTop: "80px",
            paddingLeft: "50px",
            paddingRight: "50px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: 5,
            }}
          >
            <h3 style={{ fontWeight: "bold", textAlign: "left", margin: "0" }}>
              Subjects
            </h3>
            <div style={{ marginLeft: "auto" }}>
              {/* //! Or make more dynamic field to add new card with text and 
              //!     change directly on card (without modal) */}
              {this.props.main.userRole === 0 && (
                <Button onClick={this.OpenModal.bind(this)}>
                  <i className="bi bi-plus-lg"></i>Add subject
                </Button>
              )}
            </div>
          </div>
          <Breadcrumb>
            <Breadcrumb.Item active> Dashboard</Breadcrumb.Item>
          </Breadcrumb>
          {/*//TODO: add filter button */}
          {allSubjects.length > 0 ? (
            <Row xs={1} md={3} className="g-3">
              {allSubjects.map((subject, idx) => (
                <Col key={idx}>
                  <Card
                    style={{ textAlign: "left" }}
                    id={subject.id}
                    onClick={this.HandleCardClick.bind(this)}
                  >
                    <Card.Img variant="top" src={subject.imageUrl || logoDark} />
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
              {this.props.main.userRole === 0 ? (
                <>
                  <h6>
                    {" "}
                    You don't have any subjects yet. Create the first one here!{" "}
                  </h6>
                  <Button onClick={this.OpenModal.bind(this)}>
                    <i className="bi bi-plus-lg"></i>Add subject
                  </Button>
                </>
              ) : (
                <h6>
                  {" "}
                  You don't have any subjects yet. Add subject by clicking
                  invitation link from your teacher!{" "}
                </h6>
              )}
            </Alert>
          )}
        </div>
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
    main: state.main,
  };
}

export default withRouter(
  connect(mapStateToProps, { SetOpen, getAllSubjects })(Dashboard)
);
