import React, { Component } from "react";
import { Breadcrumb, Button, Card, Col, Row } from "react-bootstrap";
import { connect } from "react-redux";
import logoDark from "../../images/GraidexLogoDarkJPG.jpg";
import AddSubjectModal from "../Modals/AddSubjectModal";
import { withRouter } from "../../utils/withRouter";
import { SetOpen } from "../MainAction";

class Dashboard extends Component {
  OpenModal() {
    this.props.SetOpen("openSubjectModal", true);
  }
  HandleCardClick(e, data) {
    this.props.SetOpen("selectedSubjectId", e.currentTarget.id);
    this.props.navigate("/" + e.currentTarget.id);
  }

  render() {
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
          <Row xs={1} md={3} className="g-3">
            {Array.from({ length: 9 }).map((_, idx) => (
              <Col key={idx}>
                <Card
                  style={{ textAlign: "left" }}
                  id="IF3333_EN"
                  onClick={this.HandleCardClick.bind(this)}
                >
                  <Card.Img variant="top" src={logoDark} />
                  <Card.Body>
                    <Card.Subtitle className="mb-2 text-muted">
                      IF3333_EN
                    </Card.Subtitle>
                    <Card.Title>Media and Design</Card.Title>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
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

export default withRouter(connect(mapStateToProps, { SetOpen })(Dashboard));
