import { stat } from "fs";
import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import Countdown from "react-countdown";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";

type Props = {
  title?: string;
  bottomControls?: React.ReactNode;
  children?: React.ReactNode;
  startTime: number;
};

const RightSideMenu = ({ title, bottomControls, children, startTime }: Props) => {
  const currentTestDraft = useSelector(
    (state: RootState) => state.main.currentTestDraft
  );
  const parts = currentTestDraft.timeLimit.split(":");
  const hours = parseInt(parts[0], 10);
  const minutes = parseInt(parts[1], 10);
  const seconds = parseInt(parts[2], 10);
  const milliseconds = (hours * 60 * 60 + minutes * 60 + seconds) * 1000;

  const Completionist = () => <span>You are good to go!</span>;

  // Renderer callback with condition
  const renderer = ({ hours, minutes, seconds, completed }: any) => {
    if (completed) {
      // Render a completed state
      return <Completionist />;
    } else {
      // Render a countdown
      return (
        <h3 className="text-center px-2">
          {hours.toString().padStart(2, "0")}:
          {minutes.toString().padStart(2, "0")}:
          {seconds.toString().padStart(2, "0")}
        </h3>
      );
    }
  };
  return (
    <div className="right-side-menu py-2 d-flex flex-column">
      <div>
        <h5 className="text-center px-2">Timer</h5>
        <Countdown
          date={startTime + milliseconds} //todo: handle time limit on refresh
          renderer={renderer}
        />
      </div>
      <h5 className="text-center px-2">{title}</h5>
      <div className="flex-grow-1 overflow-auto">{children}</div>
      {bottomControls && <div className="pt-2 px-2">{bottomControls}</div>}
    </div>
  );
};

export default RightSideMenu;
