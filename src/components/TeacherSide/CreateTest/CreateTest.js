import React, { Component, useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "../../../utils/withRouter";
import { SetOpen } from "../../MainAction";
import SideBarMenu from "./SideBarMenu";
class CreateTest extends Component {
 
  render() {
    return (
      <div
      style={{
        marginTop: "80px",
        paddingLeft: "50px",
        paddingRight: "50px",
      }}
    >
        <SideBarMenu />
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
