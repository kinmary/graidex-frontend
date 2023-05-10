import React, { Component, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { connect } from "react-redux";
import { withRouter } from "../../../utils/withRouter";
import { SetOpen } from "../../MainAction";
import RightSideBarMenu from "./RightSideBarMenu";
import SideBarMenu from "./SideBarMenu";
import TestConstructor from "./TestConstructor";
class CreateTest extends Component {
 
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
      <SideBarMenu />
      </Col>
      <Col key={2} className = "col-8">
        <TestConstructor />
      </Col>
      <Col key={3} className = "col-2">
        <RightSideBarMenu />
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

export default withRouter(connect(mapStateToProps, {SetOpen})(CreateTest));
