import React, { Component, useState } from "react";
import { connect } from "react-redux";
import SidebarMenu from "react-bootstrap-sidebar-menu";
import { Form, Nav, ProgressBar } from "react-bootstrap";
import { useAppDispatch } from "../../../app/hooks";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";

const RightSideBarMenu = () => {
  const dispatch = useAppDispatch();
  const auth = useSelector((state: RootState) => state.auth);
  const [time, setTime] = useState(2700);

  // const componentDidMount = () => {
  //   timer = setInterval(tick, 1000); // start the timer
  // }

  // const componentWillUnmount = () => {
  //   clearInterval(timer); // stop the timer when the component is unmounted
  // }

  // const tick = () => {
  //   if (time > 0) {
  //     setTime((prevState: any) => ( prevState.timeRemaining - 1));
  //   } else {
  //     clearInterval(timer);
  //     // TODO: handle time up event
  //   }
  // };

  const formatTime = (timeInSeconds: number) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds - hours * 3600) / 60);
    const seconds = timeInSeconds - hours * 3600 - minutes * 60;
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  }


    const { userRole } = auth;
   // const { questions } = this.props.takeTest;
    //const selectedQuestion = questions.find((question) => question.selected);
    const timeRemainingFormatted = formatTime(time);
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
              now={time}
              animated
              />
           </div>
          </SidebarMenu.Body>
          <SidebarMenu.Header>
            {/* <SidebarMenu.Brand
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
            </SidebarMenu.Brand> */}
          </SidebarMenu.Header>
          <SidebarMenu.Body style={{ marginTop: 10, marginRight: 20, marginLeft: 10, visibility: "hidden" }}>
          <Form.Control
              as="textarea"
              rows={5}
              //value={selectedQuestion.comment}
              // TODO: check if readOnly is fine or make like card with text
              readOnly={userRole === 1}
            />
          </SidebarMenu.Body>
        </SidebarMenu>
      </Nav>
    );
  }


export default RightSideBarMenu;
