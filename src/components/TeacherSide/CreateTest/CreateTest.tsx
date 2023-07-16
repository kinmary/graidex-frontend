import { Col, Row } from "react-bootstrap";

import RightSideBarMenu from "./RightSideBarMenu";
import SideBarMenu from "./SideBarMenu";
import TestConstructor from "./TestConstructor";
const  CreateTest = () => {

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

export default CreateTest;
