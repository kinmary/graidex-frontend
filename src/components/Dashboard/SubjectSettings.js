import React, { Component } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  InputGroup,
} from "react-bootstrap";
import { connect } from "react-redux";
import { withRouter } from "../../utils/withRouter";
import { SetOpen, SetMessageOpen } from "../MainAction";
import logoDark from "../../images/GraidexLogoDarkJPG.jpg";
import { updateSubject } from "./SubjectActions";

class SubjectSettings extends Component {
  constructor(props) {
    super(props);
    const selectedSubject = this.props.main.allSubjects.find(
      (obj) =>
        obj.id.toString() === this.props.main.selectedSubjectId.toString()
    );
    this.state = {
      id: selectedSubject.id,
      subjectId: selectedSubject.customId,
      subjectName: selectedSubject.title,
      imageUrl: selectedSubject.imageUrl || logoDark,
    };
  }

  handleSubjectChange(event){
    this.setState({ [event.target.name]: event.target.value });
  };

  handleDeleteSubject() {
    this.props.SetOpen("deleteSubjectModal", true);
  };

  handleShareLink() {
    //TODO: Code to share link
  };

  handleManageParticipants(){
    //TODO: Code to manage participants
  };
  handleChangeImageClick() {
    this.props.SetOpen("changeImgModal", true);
  };
  handleUpdateSubject() {
    let {id, subjectId, subjectName, imageUrl } = this.state;
    this.props.updateSubject(id, subjectId, subjectName, imageUrl);
  }

  render() {
    return (
      <Container
        style={{
          display: "flex",
          alignItems: "flex-start",
          marginTop: 25,
          height: "100%",
          padding: 0,
        }}
      >
        <Col xs={8}>
          <Form>
            <h3>
              Settings of subject{" "}
              <Button
                variant="danger"
                size="sm"
                style={{ marginLeft: 10 }}
                onClick={this.handleDeleteSubject.bind(this)}
              >
                Delete subject
              </Button>
            </h3>
            <Form.Group style={{ marginTop: 20 }}>
              <Form.Label>Subject name </Form.Label>
              <Form.Control
                type="text"
                name="subjectName"
                placeholder="Subject name"
                style={{ width: "40%" }}
                value={this.state.subjectName}
                onChange={this.handleSubjectChange.bind(this)}
              />
            </Form.Group>
            <Form.Group style={{ marginTop: 20 }}>
              <Form.Label>Subject Id </Form.Label>
              <Form.Control
                type="text"
                name="subjectId"
                placeholder="Subject id"
                style={{ width: "40%" }}
                value={this.state.subjectId}
                onChange={this.handleSubjectChange.bind(this)}
              />
            </Form.Group>

            <Form.Group style={{ marginTop: 20 }}>
              <Form.Label>Share link </Form.Label>
              <InputGroup style={{ width: "50%" }}>
                <InputGroup.Text>
                  <i className="bi bi-link"></i>
                </InputGroup.Text>
                <Form.Control readOnly value={"https://example.com/users/"} />
                <InputGroup.Text>
                  <Button size="sm">Copy</Button>
                </InputGroup.Text>
              </InputGroup>
            </Form.Group>
            <Form.Group style={{ marginTop: 20 }}>
              <Form.Label>Manage Participants </Form.Label>
              <InputGroup style={{ width: "40%" }}>
                <Button>Manage Participants</Button>
              </InputGroup>
            </Form.Group>
            <Form.Group style={{ marginTop: 20 }}>
              <InputGroup style={{ width: "40%" }}>
                <Button variant="success" onClick = {this.handleUpdateSubject.bind(this)}>Save changes</Button>
              </InputGroup>
            </Form.Group>
          </Form>
        </Col>
        <Col>
          <Card id="IF3333_EN" style={{ marginLeft: -40 }}>
            <Card.Img variant="top" src={this.state.imageUrl} />
            <Card.Body>
              <Button
                onClick={this.handleChangeImageClick.bind(this)}
                style={{ width: "100%" }}
              >
                Change image
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
    main: state.main,
  };
}

export default withRouter(
  connect(mapStateToProps, { SetOpen, SetMessageOpen, updateSubject })(SubjectSettings)
);
