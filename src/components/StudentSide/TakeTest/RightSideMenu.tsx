import React from "react";
import Countdown from "react-countdown";
import {useSelector} from "react-redux";
import {RootState} from "../../../app/store";
import {useAppDispatch} from "../../../app/hooks";
import {submitTestAttempt, updateTestAttempt} from "./TakeTestActions";
import {useNavigate} from "react-router-dom";
import {parseTimeLimit} from "../../../utils/TimeLimitRecalculate";

type Props = {
  title?: string;
  bottomControls?: React.ReactNode;
  children?: React.ReactNode;
  endTime: number;
};

const RightSideMenu = ({title, bottomControls, children, endTime}: Props) => {
  const {testResultId, questions} = useSelector((state: RootState) => state.takeTest);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const submitAttempt = async () => {
    if (questions) {
      const question = questions.find((question: any) => question.selected === true);
      let questionIndex = questions.indexOf(questions.length - 1); //last question ??
      if (question) {
        questionIndex = questions.indexOf(question);
      }
      await dispatch(updateTestAttempt(testResultId, question, questionIndex)).then(() => {
        dispatch(submitTestAttempt(testResultId)).then(() => {
          navigate(-1);
        });
      });
    }
  };
  // Renderer callback with condition
  const renderer = ({hours, minutes, seconds, completed}: any) => {
    if (completed) {
      // Render a completed state
      submitAttempt();
      return (
        <h3 className="text-center px-2" style={{color: "red"}}>
          00:00:00
        </h3>
      );
    } else {
      // Render a countdown
      return (
        <h3 className="text-center px-2">
          {hours.toString().padStart(2, "0")}:{minutes.toString().padStart(2, "0")}:{seconds.toString().padStart(2, "0")}
        </h3>
      );
    }
  };
  return (
    <div className="right-side-menu py-2 d-flex flex-column">
      <div>
      <h5 className="text-center px-2">Timer</h5>
        <Countdown
          date={endTime}
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
