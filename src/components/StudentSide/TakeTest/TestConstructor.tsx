import {Button, Card, Form, Navbar} from "react-bootstrap";
import {ChangeAnswers, InputChange, SetSelectedQ, getAllQuestionsWithAnswers, updateTestAttempt} from "./TakeTestActions";
import {SetOpen} from "../../MainAction";
import {useAppDispatch} from "../../../app/hooks";
import {RootState} from "../../../app/store";
import {useSelector} from "react-redux";
import QuestionsList from "./QuestionsList";
import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {themes} from "../../../constants/Themes";
import { getVisibleSubjectContent } from "../../Dashboard/SubjectActions";
import ISubjectContent from "../../../interfaces/SubjectContent";
import { getAttemptsDescription, getVisibleTestStudent } from "../../Dashboard/TestActions";

const TestConstructor = () => {
  const dispatch = useAppDispatch();
  const currentTestDraft = useSelector((state: RootState) => state.main.currentTestDraft);
  const takeTest = useSelector((state: RootState) => state.takeTest);
  const theme = useSelector((state: RootState) => state.main.theme);
  const params = useParams();
  const navigate = useNavigate();
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    dispatch(getAllQuestionsWithAnswers(params.testResultId!)).then(() => {
      setDataLoaded(true);
    });
  }, []);

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {questions} = takeTest;
    if (questions) {
      const question = questions.find((question: any) => question.selected === true);
      if (question) {
        const id = question.id;
        dispatch(InputChange(id, event.target.value));
      }
    }
  };
  const handleCheck = (event: any) => {
    const {questions} = takeTest;
    if (questions) {
      const question = questions.find((question: any) => question.selected === true);
      if (question) {
        const id = question.id;
        let type = question.type;
        let updated = question.answerOptions;
        if (type === 0) {
          updated = question.answerOptions.map((answer: any) => (answer.id.toString() === event.target.name.toString() ? {...answer, isCorrect: true, selected: true} : {...answer, isCorrect: false, selected: false}));
        } else {
          updated = question.answerOptions.map((answer: any) =>
            answer.id.toString() === event.target.name.toString()
              ? {
                  ...answer,
                  isCorrect: event.target.checked,
                  selected: event.target.checked,
                }
              : answer
          );
        }
        dispatch(ChangeAnswers(id, updated));
      }
    }
  };

  const handleClick = (event: any) => {
    const {questions} = takeTest;
    if (questions) {
      const question = questions.find((question: any) => question.selected === true);
      if (question) {
        const id = question.id;
        let type = question.type;
        let updated = question.answerOptions;
        if (type === 0) {
          updated = question.answerOptions.map((answer: any) => (answer.id.toString() === event.target.id.toString() ? {...answer, isCorrect: true, selected: true} : {...answer, isCorrect: false, selected: false}));
        } else {
          updated = question.answerOptions.map((answer: any) =>
            answer.id.toString() === event.target.id.toString()
              ? {
                  ...answer,
                  isCorrect: !answer.isCorrect,
                  selected: !answer.selected,
                }
              : answer
          );
        }
        dispatch(ChangeAnswers(id, updated));
      }
    }
  };
  const handleBackClick = async () => {
    const {questions} = takeTest;
    if (questions) {
      const question = questions.find((question: any) => question.selected === true);
      if (question) {
        const index = questions.indexOf(question);
        await updateAnswer();
        let setSelected = questions[index - 1];
        dispatch(SetSelectedQ(setSelected.id));
      }
    }
  };
  const handleNextClick = async () => {
    const {questions} = takeTest;
    if (questions) {
      const question = questions.find((question: any) => question.selected === true);
      if (question) {
        const index = questions.indexOf(question);
        await updateAnswer();
        let setSelected = questions[index + 1];
        dispatch(SetSelectedQ(setSelected.id));
      }
    }
  };
  const handleSaveAndSendClick = () => {
    dispatch(SetOpen("sendTestModal", true));
  };

  const updateAnswer = async () => {
    const {questions, testResultId} = takeTest;
    if (questions) {
      const question = questions.find((question: any) => question.selected === true);
      if (question) {
        let questionIndex = questions.indexOf(question);
        dispatch(updateTestAttempt(testResultId, question, questionIndex));
      }
    }
  };

  let {questions} = takeTest;
  const selectedQuestion = questions?.find((question: any) => question.selected === true);
  let indexOfSelected = 0;
  if (selectedQuestion && questions) {
    indexOfSelected = questions.indexOf(selectedQuestion);
  }
  if (!dataLoaded || !currentTestDraft || !questions) {
    return null;
  } 
  
  return (
    <>
      {selectedQuestion ? (
        <Form>
          {/* {selectedQuestion.type === 2 && ( */}
          <Navbar
            bg={theme === themes.light ? "light" : "dark"}
            variant={theme === themes.light ? "light" : "dark"}
            style={{
              borderRadius: "5px 5px 0px 0px",
              padding: "0px 0px",
            }}
          ></Navbar>
          {/* )}  */}
          <h5 style={{fontWeight: "bold", width: "87%", marginBottom: 20}}>{selectedQuestion.title}</h5>
          {selectedQuestion.answerOptions.map((answer: any, idx: any) =>
            selectedQuestion.type === 2 ? (
              <Form.Control
                key={idx + "open-question"}
                autoComplete="off"
                as="textarea"
                rows={7}
                placeholder="Enter your answer here"
                name="text"
                value={answer.text}
                onChange={onInputChange}
                // style={{ marginTop: 20 }}
              />
            ) : (
              <div
                key={idx + "d"}
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: 2,
                }}
              >
                <Form.Check key={idx + "c"} type={selectedQuestion.type === 0 ? "radio" : "checkbox"} style={{marginRight: 10, color: "red"}} name={answer.id.toString()} checked={answer.isCorrect} onChange={handleCheck} />
                <Card
                  key={idx + "t"}
                  id={answer.id.toString()}
                  onClick={handleClick}
                  style={{
                    marginBottom: 5,
                    borderColor: "transparent",
                    width: "90%",
                  }}
                >
                  <Card.Text style={{padding: 10}} id={answer.id.toString()} onClick={handleClick}>
                    {answer.text}
                  </Card.Text>
                </Card>
              </div>
            )
          )}

          <Navbar>
            {indexOfSelected > 0 && (
              <Navbar.Brand>
                {/* //TODO: add on hover text */}
                <Button variant={theme === themes.light ? "outline-dark" : "outline-light"} className="rounded-circle" style={{fontSize: "24px"}} onClick={handleBackClick}>
                  <i className="bi bi-arrow-left"></i>
                </Button>
              </Navbar.Brand>
            )}
            {indexOfSelected !== questions!.length - 1 && (
              <Navbar.Brand style={{marginLeft: "auto", marginRight: 0}}>
                <Button variant={theme === themes.light ? "outline-dark" : "outline-light"} className="rounded-circle" style={{fontSize: "24px"}} onClick={handleNextClick}>
                  <i className="bi bi-arrow-right"></i>
                </Button>
              </Navbar.Brand>
            )}
            {indexOfSelected === questions!.length - 1 && (
              <Navbar.Brand style={{marginLeft: "auto", marginRight: 0}}>
                <Button variant={theme === themes.light ? "outline-dark" : "outline-light"} className="rounded-circle" style={{fontSize: "24px"}} onClick={handleSaveAndSendClick}>
                  <i className="bi bi-arrow-right"></i>
                </Button>
              </Navbar.Brand>
            )}
          </Navbar>
        </Form>
      ) : (
        <div>
          <h5 className="ms-1" style={{fontWeight: "bold", textAlign: "left", marginBottom: 5}}>
            {currentTestDraft && currentTestDraft.title}
          </h5>
          <QuestionsList />
        </div>
      )}
    </>
  );
};

export default TestConstructor;
