import React, { Component } from "react";
import { Button, ButtonGroup, Card, Container, Form, Image } from "react-bootstrap";
import { connect } from "react-redux";
import Header from "../Header";
import blankProf from "../../../images/blank-profile-picture.jpg";
import { ChangeInputValues } from "../../Login/AuthAction";

class EditProfile extends Component {
    HandleChange(event, data) {
        //TODO: make changes only onSave button (create axios request to database)
        this.props.ChangeInputValues(event.target.name, event.target.value);
    }
  render() {
    return (
      <>
        {/* //TODO: Move header to layout */}
        <Header editPage={true} />
            <Form className="form" style={{ width: "35%", marginLeft: "100px", position: "relative"}}>
            <Image className = "profile-image-edit mb-4" src ={blankProf}/>

          <h2 style={{ fontWeight: "bold"}} >
            {/* <Image src={blankProf} className="profile-image-edit" /> */}
            {this.props.auth.name} {this.props.auth.surname}
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
                  //TODO OnChange
                  onChange = {this.HandleChange.bind(this)}
                  style={{ width: "40%" }}
                  required
                />
                <Form.Control
                  placeholder="Surname"
                  name = "surname"
                  value = {this.props.auth.surname}
                  //TODO: OnChange
                  onChange = {this.HandleChange.bind(this)}
                  style={{ width: "59%" }}
                  required
                />
              </div>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>
                    Faculty
                </Form.Label>
                <Form.Control placeholder="Faculty " />
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
  };
}

export default connect(mapStateToProps, {ChangeInputValues})(EditProfile);
