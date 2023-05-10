import React, { Component } from "react";
import { Col, Row } from "react-bootstrap";
import { connect } from "react-redux";
import { withRouter } from "../../utils/withRouter";
import RightSideBar from "./RightSideBar";
import SideBar from "./SideBar";
import TestField from "./TestField";

class TestOfStudent extends Component {
 
  render() {
    return (
      <div
      style={{
        marginTop: "80px",
        paddingLeft: "50px",
        paddingRight: "50px",
        height: "100vh"
      }}
    >
      <Row xs = {3}>
      <Col key={1} className = "col-2" >
      <SideBar />
      </Col>
      <Col key={2} className = "col-8">
        <TestField />
      </Col>
      <Col key={3} className = "col-2">
        <RightSideBar />
      </Col>
      </Row>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
    main: state.main
  };
}

export default withRouter(connect(mapStateToProps, {})(TestOfStudent));
