import React, { Component } from "react";
import { connect } from "react-redux";
import { deleteStudent } from "../components/Dashboard/SubjectActions";
import { useAppDispatch } from "../app/hooks";
import { deleteSubjectRequest } from "../components/Dashboard/SubjectRequestActions";
interface Props {
  subjectId: string,
  studentEmail?: string,
  pendingRequest: boolean,
  subjectRequestId?: string,
}
const  BtnCellRenderer = ({subjectRequestId = "", subjectId, studentEmail = "", pendingRequest = false}: Props) => {
  const dispatch = useAppDispatch();
  const btnClickedHandler = () => {
    //TODO: add modal to confirm delete
if(pendingRequest){
  if (window.confirm(`Are you sure you want to delete subject request of ${studentEmail}?`)) {
    dispatch(deleteSubjectRequest(subjectId, subjectRequestId));
  }
}else {
  if (window.confirm(`Are you sure you want to delete ${studentEmail}?`)) {
    dispatch(deleteStudent(subjectId, studentEmail));
  }
}
    
   }

    return <i className="bi bi-trash-fill" onClick={btnClickedHandler}></i>;
  
}

export default BtnCellRenderer;