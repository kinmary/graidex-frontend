import React, { Component } from "react";
import { Col, Row } from "react-bootstrap";
import RightSideBar from "./RightSideBar";
import SideBar from "./SideBar";
import TestField from "./TestField";

const TestOfStudent = () => {
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


export default TestOfStudent;
