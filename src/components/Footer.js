import React, { Component } from "react";
import { Navbar } from "react-bootstrap";
import { connect } from "react-redux";
import "../styles/header.css";
import { withRouter } from "../utils/withRouter";

class Footer extends Component {

  render() {
    return (
      <div className="footer">
        <Navbar
          bg="dark"
          style={{
            paddingLeft: 20,
            paddingRight: 20,
            marginTop: 30,
            paddingTop: 20,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <p style={{ color: "grey", textAlign: "center" }}>
            Privacy Policy | Terms of Use | About Graidex
            <br />
            All rights reserved. Graidex © 2023
          </p>
        </Navbar>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
    main: state.main,
    createTest: state.createTest,
    test: state.testOfStudent,
  };
}

export default withRouter(connect(mapStateToProps, {})(Footer));
