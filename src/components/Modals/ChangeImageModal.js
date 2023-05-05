import React, { Component } from "react";
import { Button, Modal } from "react-bootstrap";
import { connect } from "react-redux";
import { withRouter } from "../../utils/withRouter";
import { SetOpen } from "../MainAction";


class ChangeImageModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedImg: ""
    };
  }
  closeModal() {
    this.props.SetOpen("changeImgModal", false);
  }
onAddImage(event) {
    event.preventDefault();
    //TODO: send to backend request for img change
    //(for now can leave it bc I will add this when connect backend and frontend) 
      this.props.SetOpen("changeImgModal", false);
  }

  handleInputChange(event, data) {
    //check if event.target.value is right in console => source
    this.setState({ selectedImg: event.target.value });
  }
  render() {
    const { changeImgModal } = this.props.main;
    return (
      <>
        <Modal
          show={changeImgModal}
          onHide={this.closeModal.bind(this)}
          centered
        >
          <Modal.Header closeButton>Choose new image</Modal.Header>
          <Modal.Body>
            {/* //TODO: add API here */}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.closeModal.bind(this)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={this.onAddImage.bind(this)}>
              Change image
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
  })(ChangeImageModal)
);
