import React, { Component } from "react";
import { Button, Dropdown, Form, InputGroup } from "react-bootstrap";
import { connect } from "react-redux";
import { withRouter } from "../../../utils/withRouter";
import { SetOpen, SetMessageOpen } from "../../MainAction";

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.main.selectedTest.examName,
      date: this.props.main.selectedTest.date,
      status: this.props.main.selectedTest.status,
    };
  }

  handleTitleChange = (event) => {
    this.setState({ title: event.target.value });
  };

  handleDateChange = (event) => {
    this.setState({ date: event.target.value });
  };

  handleStatusChange = (event) => {
    this.setState({ status: event });
  };

  handleDeleteTest = () => {
    //TODO: delete test
  };

  handleShareLink = () => {
    //TODO: Code to share link
  };

  handleManageParticipants = () => {
    //TODO: Code to manage participants
  };

  render() {
    const { title, date, status } = this.state;
    return (
      <Form style={{ marginTop: 20 }}>
        <h3>
          Settings of test{" "}
          <Button
            variant="danger"
            size="sm"
            style={{ marginLeft: 10 }}
            onClick={this.handleDeleteTest}
          >
            Delete test
          </Button>
        </h3>
        <Form.Group style={{marginTop: 20}}>
          <Form.Label>Title of test </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter title"
            style={{ width: "30%" }}
            value={title}
            onChange={this.handleTitleChange}
          />
          
        </Form.Group>
        <Form.Group style={{marginTop: 20}}>
            <Form.Label>Status</Form.Label>
            <Dropdown>
              <Dropdown.Toggle variant="outline-primary" id="status-dropdown">
                {status === 0
                  ? "Not started"
                  : status === 1
                  ? "In progress"
                  : "Completed"}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item
                  value={0}
                  onClick={() => this.handleStatusChange("0")}
                >
                  Not started
                </Dropdown.Item>
                <Dropdown.Item
                  value={1}
                  onClick={() => this.handleStatusChange("1")}
                >
                  In progress
                </Dropdown.Item>
                <Dropdown.Item
                  value={2}
                  onClick={() => this.handleStatusChange("2")}
                >
                  Completed
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Form.Group>
        <Form.Group style={{marginTop: 20}} >
          <Form.Label>Date</Form.Label>
          <Form.Control
            type="date"
            placeholder="Enter date"
            style={{ width: "20%" }}
            value={date}
            onChange={this.handleDateChange}
          />
        </Form.Group>
        <Form.Group style={{marginTop: 20}}  >
          <Form.Label>Share link </Form.Label>
          <InputGroup style={{ width: "35%" }}>
            <InputGroup.Text >
            <i className="bi bi-link"></i>
            </InputGroup.Text>
            <Form.Control  
            readOnly
            value = {"https://example.com/users/"} />
             <InputGroup.Text >
            <Button size="sm">Copy</Button>
            </InputGroup.Text>
          </InputGroup>
          
        </Form.Group>
        <Form.Group style={{marginTop: 20}}  >
          <Form.Label>Manage Participants </Form.Label>
          <InputGroup style={{ width: "35%" }}>
            <Button >Manage Participants</Button>
          </InputGroup>
          
        </Form.Group>
       
      </Form>
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
  connect(mapStateToProps, { SetOpen, SetMessageOpen })(Settings)
);
