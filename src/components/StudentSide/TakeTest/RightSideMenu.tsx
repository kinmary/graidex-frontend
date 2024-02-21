import React from "react";
import Countdown from "react-countdown";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { useAppDispatch } from "../../../app/hooks";
import { submitTestAttempt } from "./TakeTestActions";
import { useNavigate } from "react-router-dom";

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
  const {testResultId, questions} = useSelector((state: RootState) => state.takeTest);
  const dispatch = useAppDispatch(); 
  const parts = currentTestDraft.timeLimit.split(":");
  const hours = parseInt(parts[0], 10);
  const minutes = parseInt(parts[1], 10);
  const seconds = parseInt(parts[2], 10);
  const milliseconds = (hours * 60 * 60 + minutes * 60 + seconds) * 1000;
  const navigate = useNavigate();

  const submitAttempt = async () => {
    if (questions) {
      const question = questions.find(
        (question: any) => question.selected === true
      ); 
      let questionIndex = questions.indexOf(questions.length - 1); //last question ??
      if (question) {
        questionIndex = questions.indexOf(question);
      } 
      await dispatch(
        submitTestAttempt(testResultId, question, questionIndex)
      ).then(() => {
        //TODO: show success/error messages
        navigate(-1);
      
      });
    }
  }
  // Renderer callback with condition
  const renderer = ({ hours, minutes, seconds, completed }: any) => {
    if (completed) {
      // Render a completed state
      submitAttempt();
      return <h3 className="text-center px-2" style={{color: "red"}}>00:00:00</h3>;
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
