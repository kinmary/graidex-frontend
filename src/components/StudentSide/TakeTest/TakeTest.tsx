import React, { Component } from "react";
import { Col, Row } from "react-bootstrap";
import { connect } from "react-redux";
import { SetOpen } from "../../MainAction";
import RightSideBarMenu from "./RightSideBarMenu";
import SideBarMenu from "./SideBarMenu";
 import TestConstructor from "./TestConstructor";
import SendTestConfirmModal from "../../Modals/SendTestConfirmModal";

const TakeTest = () => {
    return (
      <div
      style={{
        marginTop: "80px",
        paddingLeft: "50px",
        paddingRight: "50px",
        height: "100vh"
      }}
    >
      <SendTestConfirmModal />
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

export default TakeTest;
