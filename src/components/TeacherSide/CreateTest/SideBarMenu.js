import React, { Component, useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "../../../utils/withRouter";
import { SetOpen } from "../../MainAction";
import SidebarMenu from "react-bootstrap-sidebar-menu";
import { Button, Card, Col, Row } from "react-bootstrap";

class SideBarMenu extends Component {
  render() {
    return (
      <div style = {{width: "20%"}}>
        <SidebarMenu>
          <SidebarMenu.Header>
            <SidebarMenu.Brand
              as="h3"
              style={{ fontWeight: "bold", textAlign: "left", margin: "0" }}>
              Questions
            </SidebarMenu.Brand>
             
          </SidebarMenu.Header>
          <SidebarMenu.Body style={{ marginTop: 10}}>
          <Row xs={1} md={1} className="g-2">
            {Array.from({ length: 3 }).map((_, idx) => (
              <Col key={idx}>
                <Card size="sm" >
                  <Card.Body style={{fontWeight: "bold", padding:10}}>
                  <i class="bi bi-grip-vertical"></i>
                    {/* //TODO: Add card question text */}
                    Question {idx + 1}
                    <i class="bi bi-trash-fill" style={{float: "right"}}></i>  
                  </Card.Body>
                </Card>
              </Col>
            ))} 
          </Row>
          <Button color="primary" style={{ marginTop: 10, width: "100%"}}> <i class="bi bi-plus-lg"></i> Add new question</Button>
          </SidebarMenu.Body>
        </SidebarMenu>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
    main: state.main,
  };
}

export default withRouter(connect(mapStateToProps, { SetOpen })(SideBarMenu));
