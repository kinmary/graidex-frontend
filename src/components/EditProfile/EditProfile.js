import React, { Component } from "react";
import { Breadcrumb, Button, Form, Image } from "react-bootstrap";
import { connect } from "react-redux";
import blankProf from "../../images/blank-profile-picture.jpg";
import { ChangeInputValues } from "../Login/AuthAction";
import { withRouter } from "../../utils/withRouter";
import DeleteConfirmModal from "../Dashboard/Modals/DeleteConfirmModal";
import { SetOpen } from "../MainAction";
class EditProfile extends Component {
    HandleChange(event, data) {
        //TODO: make changes only onSave button (create axios request to database)
        this.props.ChangeInputValues(event.target.name, event.target.value);
    }
    onBreadClick() {
      this.props.navigate("/");
      this.props.SetOpen("editPage", false);
    }
  render() {
    return (
      <>
          <DeleteConfirmModal />
            <Form className="form" style={{ width: "35%", marginLeft: "100px", position: "relative"}}>
            <Image className = "profile-image-edit mb-4" src ={blankProf}/>
            <Breadcrumb>
        <Breadcrumb.Item onClick={this.onBreadClick.bind(this)}> Dashboard</Breadcrumb.Item>
        <Breadcrumb.Item active >Edit profile </Breadcrumb.Item> 
      </Breadcrumb>
          <h2 style={{ fontWeight: "bold"}} >
            {/* <Image src={blankProf} className="profile-image-edit" /> */}
            {this.props.auth.name} {this.props.auth.surname}
            <Button onClick={() => {this.props.SetOpen("deleteConfirmModal", true)}} variant="danger" size="sm" style ={{marginLeft: 10}}>Delete profile</Button>
          </h2>
            <Form.Group className="mb-2" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" required />
            </Form.Group>
            <Form.Group className="mb-2" controlId="formBasicFullName">
              <Form.Label>
               Teacher's Full Name
              </Form.Label>
              <div className="d-inline-flex justify-content-between" style={{ width: "100%"}}>
                <Form.Control
                  placeholder="Name"
                  name = "name"
                  value={this.props.auth.name}
                  onChange = {this.HandleChange.bind(this)}
                  style={{ width: "40%" }}
                  required
                />
                <Form.Control
                  placeholder="Surname"
                  name = "surname"
                  value = {this.props.auth.surname}
                  onChange = {this.HandleChange.bind(this)}
                  style={{ width: "59%" }}
                  required
                />
              </div>
            </Form.Group>
            <Form.Group className="mb-2">
            <Button variant="primary" type="submit" style={{ width: "49%", marginRight: "2%"}}>
              Save
            </Button>
            <Button variant="secondary" style={{ width: "49%"}}>
                Cancel
            </Button>
            </Form.Group>
          </Form>
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
    main: state.main
  };
}

export default withRouter(connect(mapStateToProps, {ChangeInputValues, SetOpen})(EditProfile));
