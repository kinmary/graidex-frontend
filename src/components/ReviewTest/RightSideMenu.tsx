import { stat } from "fs";
import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import Countdown from "react-countdown";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";

type Props = {
  title?: string;
  bottomControls?: React.ReactNode;
  children?: React.ReactNode;
};

const RightSideMenu = ({ title, bottomControls, children }: Props) => {
  return (
    <div className="right-side-menu py-2 d-flex flex-column">
      <h5 className="text-center px-2">{title}</h5>
      <div className="flex-grow-1 overflow-auto">{children}</div>
      {bottomControls && <div className="pt-2 px-2">{bottomControls}</div>}
    </div>
  );
};

export default RightSideMenu;
