import React, { Component } from "react";
import { connect } from "react-redux";
import SidebarMenu from "react-bootstrap-sidebar-menu";
import { Card, Col, Nav, Row } from "react-bootstrap";
import { withRouter } from "../../../utils/withRouter";
import { SetSelectedQ } from "./TakeTestActions";

class SideBarMenu extends Component {
  handleCardClick(event) {
    this.props.SetSelectedQ(event.currentTarget.id);
  }
  render() {
    const {questions} = this.props.takeTest;
    return (
      <Nav className="left-sidebar">
        <SidebarMenu>
          <SidebarMenu.Header>
            <SidebarMenu.Brand
              as="h3"
              style={{
                fontWeight: "bold",
                textAlign: "left",
                marginLeft: 20,
                color: "#000a55",
              }}
            >
              Questions
            </SidebarMenu.Brand>
          </SidebarMenu.Header>
          <SidebarMenu.Body
            style={{ marginTop: 10, marginLeft: 30, marginRight: 20 }}
          >
            <Row xs={1} md={3}>
              {questions.map((question, idx) => (
                <Col key={idx} style={{ padding: 2}}>
                  <Card 
                  onClick={this.handleCardClick.bind(this)}
                  key={idx}
                    className="text-center"
                    id={question.id}
                   
                    style={{
                         padding: "5px",
                         border:  (question.selected) && "1px solid #000a55",                         
                    }}
                    text="dark"
                  >
                    <Card.Text>{idx + 1}</Card.Text>
                  </Card>
                </Col>
              ))}
            </Row>
          </SidebarMenu.Body>
        </SidebarMenu>
      </Nav>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
    main: state.main,
    takeTest: state.takeTest,
  };
}

export default withRouter(connect(mapStateToProps, {SetSelectedQ})(SideBarMenu));
