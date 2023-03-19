import React, { Component } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { connect } from "react-redux";
import Header from "../Header";
import logoDark from "../../../images/GraidexLogoDarkJPG.jpg";

class Dashboard extends Component {
  render() {
    //TODO: Move header to layout
    return (
      <>      
        <Header />
        <div
          style={{
            marginTop: "80px",
            paddingLeft: "50px",
            paddingRight: "50px",
          }}
        >
          <h3 style={{ fontWeight: "bold", textAlign: "left" }}>Subjects </h3>
          {/*//TODO: add filter button */}
          <Row xs={1} md={3} className="g-4">
      {Array.from({ length: 9 }).map((_, idx) => (
        <Col key={idx}>
          <Card style = {{textAlign: "left"}}>
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
  };
}

export default connect(mapStateToProps, {})(Dashboard);
