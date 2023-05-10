import React, { Component } from "react";
import { connect } from "react-redux";
import { deleteStudent } from "../components/Dashboard/SubjectActions";

export class BtnCellRenderer extends Component {
  btnClickedHandler() {
    //TODO: add modal to confirm delete
    const { data, deleteStudent } = this.props;

    if (window.confirm(`Are you sure you want to delete ${data.email}?`)) {
      deleteStudent(this.props.main.selectedSubjectId, data.email);
    }
   }
  render() {
    return <i className="bi bi-trash-fill" onClick={this.btnClickedHandler.bind(this)}></i>;
  }
}

function mapStateToProps(state) {
  return {
    main: state.main,
  };
}
const mapDispatchToProps = (dispatch) => ({
  deleteStudent: (id, studentEmail) => dispatch(deleteStudent(id, studentEmail)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BtnCellRenderer);