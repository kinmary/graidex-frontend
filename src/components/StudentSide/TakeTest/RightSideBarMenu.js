import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "../../../utils/withRouter";
import SidebarMenu from "react-bootstrap-sidebar-menu";
import { Form, Nav, ProgressBar } from "react-bootstrap";

class RightSideBarMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      //timeRemaining: 120, //2 min
      timeRemaining: 2700, // set initial time remaining to 45 min
    };
  }

  componentDidMount() {
    this.timer = setInterval(this.tick, 1000); // start the timer
  }

  componentWillUnmount() {
    clearInterval(this.timer); // stop the timer when the component is unmounted
  }

  tick = () => {
    if (this.state.timeRemaining > 0) {
      this.setState((prevState) => ({
        timeRemaining: prevState.timeRemaining - 1,
      }));
    } else {
      clearInterval(this.timer);
      // TODO: handle time up event
    }
  };

  formatTime(timeInSeconds) {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds - hours * 3600) / 60);
    const seconds = timeInSeconds - hours * 3600 - minutes * 60;
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  }

  render() {
    const { userRole } = this.props.main;
    const { questions } = this.props.takeTest;
    const selectedQuestion = questions.find((question) => question.selected);
    const timeRemainingFormatted = this.formatTime(this.state.timeRemaining);
    return (
      <Nav className="sidebar">
        <SidebarMenu>
          <SidebarMenu.Header>
            <SidebarMenu.Brand
              as="h3"
              style={{
                fontWeight: "bold",
                textAlign: "left",
                marginLeft: 10,
                color: "#000a55",
              }}
            >
              Time{" "}
              {/* <i style={{ fontSize: "20px", marginLeft: 25 }} className="bi bi-pencil-fill"></i> */}
            </SidebarMenu.Brand>
          </SidebarMenu.Header>
          <SidebarMenu.Body style={{ marginTop: 10, marginRight: 20, marginLeft: 10 }}>
          <div className="text-center">
            <h4>{timeRemainingFormatted}</h4>
            <ProgressBar
              now={this.state.timeRemaining}
              animated
              />
           </div>
          </SidebarMenu.Body>
          <SidebarMenu.Header>
            <SidebarMenu.Brand
              as="h4"
              style={{
                fontWeight: "bold",
                textAlign: "left",
                marginLeft: 10,
                marginTop: 20,
                color: "#000a55",
              }}
            >
              Comment{" "}
            </SidebarMenu.Brand>
          </SidebarMenu.Header>
          <SidebarMenu.Body style={{ marginTop: 10, marginRight: 20, marginLeft: 10 }}>
          <Form.Control
              as="textarea"
              rows={5}
              value={selectedQuestion.comment}
              // TODO: check if readOnly is fine or make like card with text
              readOnly={userRole === 1}
            />
          </SidebarMenu.Body>
        </SidebarMenu>
      </Nav>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
    main: state.main,
    takeTest: state.takeTest,
  };
}

export default withRouter(connect(mapStateToProps, {})(RightSideBarMenu));
