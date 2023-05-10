import React, { Component } from "react";
import { Button, Modal } from "react-bootstrap";
import { connect } from "react-redux";
import { withRouter } from "../../utils/withRouter";
import { SetOpen } from "../MainAction";
import { updateSubject } from "../Dashboard/SubjectActions";
import { AgGridReact } from "ag-grid-react";
import { StudentListGridColumns } from "../../constants/StudentListGridColumns";
import AddStudentModal from "./AddStudentModal";

class ManageStudentsModal extends Component {
  closeModal() {
    this.props.SetOpen("manageStudentsModal", false);
  }
  onGridReady = (params) => {
    this.gridApi = params.api;
    this.columnApi = params.columnApi;
  };
  render() {
    const { manageStudentsModal, selectedSubjectId } = this.props.main;
    const selectedSubject = this.props.main.allSubjects.find(
      (obj) => obj.id.toString() === selectedSubjectId.toString()
    );
    return (
      <>
        <Modal
          size="lg"
          show={manageStudentsModal}
          onHide={this.closeModal.bind(this)}
          centered
        >
          <Modal.Header closeButton>
            Students list of {selectedSubject.title}
          </Modal.Header>
          <Modal.Body>
            <div style={{ textAlign: "right" }} >
            <Button size= 'sm' onClick={()=>this.props.SetOpen("addStudentModal", true)} >
                  <i className="bi bi-plus-lg"></i> Add student
                </Button>
            </div>
         
            <div className="ag-theme-alpine" style={{ height: 450 }}>
              <AgGridReact
                onGridReady={this.onGridReady.bind(this)}
                rowSelection={"single"}
                columnDefs={StudentListGridColumns}
                rowData={this.props.main.studentsList || []}
                pagination={true}
              />
            </div>
          </Modal.Body>
        </Modal>
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    main: state.main,
    auth: state.auth,
  };
}

export default withRouter(
  connect(mapStateToProps, {
    SetOpen,
    updateSubject,
  })(ManageStudentsModal)
);
