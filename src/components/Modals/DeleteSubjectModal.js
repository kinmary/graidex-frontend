import React, { Component } from "react";
import { Button, Modal } from "react-bootstrap";
import { connect } from "react-redux";
import { withRouter } from "../../utils/withRouter";
import { SetOpen } from "../MainAction";
import { deleteSubject } from "../Dashboard/SubjectActions";

class DeleteSubjectModal extends Component {

  closeModal() {
    this.props.SetOpen("deleteSubjectModal", false);
  }
  async onConfirm(event) {
    event.preventDefault();
    let result = await this.props.deleteSubject(this.props.main.selectedSubjectId)
    if (result) {
      this.props.SetOpen("deleteSubjectModal", false);
      this.props.navigate("/");
    }
  }

  render() {
    const { deleteSubjectModal, selectedSubjectId } = this.props.main;
    const selectedSubject = this.props.main.allSubjects.find(obj => obj.id.toString() === selectedSubjectId.toString());
    return (
      <>
        <Modal
          show={deleteSubjectModal}
          onHide={this.closeModal.bind(this)}
          centered
          size="small"
        >
          <Modal.Header closeButton>Delete Subject: {selectedSubject.title}</Modal.Header>
          <Modal.Body>
            Deleting this subject will permanently remove all information. This can not be undone.
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.closeModal.bind(this)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={this.onConfirm.bind(this)}>
              Delete
            </Button>
          </Modal.Footer>
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
    deleteSubject
  })(DeleteSubjectModal)
);

