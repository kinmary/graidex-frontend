import React, { Component } from "react";
import { connect } from "react-redux";
import { deleteStudent } from "../components/Dashboard/SubjectActions";

const  BtnCellRenderer = () => {
  const btnClickedHandler = () => {
    //TODO: add modal to confirm delete
    //onst { data, deleteStudent } = this.props;

    // if (window.confirm(`Are you sure you want to delete ${data.email}?`)) {
    //   deleteStudent(this.props.main.selectedSubjectId, data.email);
    // }
   }

    return <i className="bi bi-trash-fill" onClick={btnClickedHandler}></i>;
  
}

export default BtnCellRenderer;