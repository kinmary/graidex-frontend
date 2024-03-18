import { Button, Card, Form, InputGroup, Navbar } from "react-bootstrap";
import { ChangeQuestionAttr, SetSelectedQ } from "./TestOfStudentActions";
import { useAppDispatch } from "../../app/hooks";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { ITestResultForTeacher } from "../../interfaces/TestResultForTeacherDto";
import QuestionsList from "./QuestionsList";
import { IQuestion } from "../../interfaces/Questions";
import { themes } from "../../constants/Themes";

const TestField = () => {
  const dispatch = useAppDispatch();
  const test: ITestResultForTeacher = useSelector(
    (state: RootState) => state.testOfStudent.testResult
  );
  const theme = useSelector((state: RootState) => state.main.theme);
  const userRole = useSelector((state: RootState) => state.auth).userRole;
  const currentTestDraft = useSelector(
    (state: RootState) => state.main.currentTestDraft
  );
  const ChangePoints = (event: any) => {
    const selectedQuestion: IQuestion | undefined =
      test.resultAnswers?.find(
        (resultAnswer: IQuestion) =>
          resultAnswer.selected === true
      );
    if (selectedQuestion) {
      dispatch(
        ChangeQuestionAttr(
          selectedQuestion.id,
          "points",
          parseInt(event.target.value)
        )
      );
    }
  };

  const ChangeFeedback = (event: any) => {
    const selectedQuestion: IQuestion | undefined =
      test.resultAnswers?.find(
        (resultAnswer: IQuestion) =>
          resultAnswer.selected === true
      );
    if (selectedQuestion) {
      dispatch(
        ChangeQuestionAttr(
          selectedQuestion.id,
          "feedback",
          event.target.value
        )
      );
    }
  };
  const handleBackClick = () => {
    const selectedQuestion: IQuestion | undefined =
      test.resultAnswers?.find(
        (resultAnswer: IQuestion) =>
          resultAnswer.selected === true
      );
    if (selectedQuestion && test.resultAnswers) {
      indexOfSelected = test.resultAnswers?.findIndex(
        (resultAnswer: any) => resultAnswer.selected
      );
      let setSelected = test.resultAnswers[indexOfSelected! - 1];
      dispatch(SetSelectedQ(setSelected.id));
    }
  };
  const handleNextClick = () => {
    const selectedQuestion: IQuestion | undefined =
      test.resultAnswers?.find(
        (resultAnswer: IQuestion) =>
          resultAnswer.selected === true
      );
    if (selectedQuestion && test.resultAnswers) {
      indexOfSelected = test.resultAnswers?.findIndex(
        (resultAnswer: any) => resultAnswer.selected
      );
      let setSelected = test.resultAnswers[indexOfSelected! + 1];
      dispatch(SetSelectedQ(setSelected.id));
    }
  };

  const selectedQuestion: IQuestion | undefined =
  test && test.resultAnswers && test.resultAnswers.find(
    (resultAnswer: IQuestion) =>
      resultAnswer.selected === true
  );

  let indexOfSelected = 0;
  if (selectedQuestion && test.resultAnswers) {
    indexOfSelected = test.resultAnswers?.findIndex(
      (resultAnswer: any) => resultAnswer.selected
    );
  }
  return (
    <>
      {selectedQuestion ? (
        <>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: 20,
              justifyContent: "space-between",
            }}
          >
            <h5 style={{ fontWeight: "bold" }}>
              {selectedQuestion?.title}
            </h5>
            <InputGroup style={{ width: "19%" }}>
              <Form.Control
                type="number"
                autoComplete="off"
                value={selectedQuestion?.points || 0}
                style={{fontWeight: "bold"}}
                min={0}
                onChange={ChangePoints}
                readOnly={userRole === 1}
              />
              <InputGroup.Text>
                /{selectedQuestion?.maxPoints || 0} points
              </InputGroup.Text>
            </InputGroup>
          </div>
          {selectedQuestion?.type === 2 ? (
            <Card key={selectedQuestion.id}>
              <Card.Body>
                {(selectedQuestion.answerOptions[0]).text}
              </Card.Body>
            </Card>
          ) : (
            selectedQuestion?.answerOptions.map(
              (answer: any, idx: any) => (
                <div
                  key={idx + "d"}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: 2,
                  }}
                >
                  <Form.Check
                    key={idx + "c"}
                    type={
                      selectedQuestion.type === 0
                        ? "radio"
                        : "checkbox"
                    }
                    readOnly
                    disabled
                    isValid={answer.isCorrect}
                    isInvalid={!answer.isCorrect && answer.selected}
                    style={{ marginRight: 10}}
                    name={answer.id.toString()}
                    checked={answer.selected}
                  />
                  <Card
                    className={answer.isCorrect ? "correct-answer-card" : answer.selected ? "wrong-answer-card" : ""}
                    key={idx + "t"}
                    style={{
                      marginBottom: 5,
                      borderColor: "transparent",
                      width: "90%",
                    }}
                  >
                    <Card.Text
                      style={{
                        padding: 10,
                        // color:
                        //   (answer.isCorrect && "green") ||
                        //   ((answer.isCorrect === false &&
                        //     answer.selected === true &&
                        //     "red") as Color),
                      }}
                    >
                      {answer.text}
                    </Card.Text>
                  </Card>                  
                </div>
              )
            )
          )}

            <h5 style={{ marginTop: 30, fontWeight: "bold" }}>Feedback</h5>
            <Form.Control
              as="textarea"
              autoComplete="off"
              rows={6}
              placeholder={ userRole === 1 ? "": "Enter feedback here"}
              name="text"
              readOnly={userRole === 1}
              value={
                selectedQuestion.feedback !== undefined
                  ? selectedQuestion.feedback
                  : ""
              }
              onChange={ChangeFeedback}
            />

          <Navbar style={{ marginTop: 50 }}>
            {indexOfSelected > 0 && (
              <Navbar.Brand>
                <Button
                variant={theme === themes.light ? "outline-dark" : "outline-light"}
                className="rounded-circle"
                  style={{ fontSize: "24px" }}
                  onClick={handleBackClick}
                >
                  <i className="bi bi-arrow-left"></i>
                </Button>
              </Navbar.Brand>
            )}
            {indexOfSelected !== test.resultAnswers!.length - 1 && (
              <Navbar.Brand style={{ marginLeft: "auto", marginRight: 0 }}>
                <Button
                  variant={theme === themes.light ? "outline-dark" : "outline-light"}
                  className="rounded-circle"
                  style={{ fontSize: "24px" }}
                  onClick={handleNextClick}
                >
                  <i className="bi bi-arrow-right"></i>
                </Button>
              </Navbar.Brand>
            )}
          </Navbar>
        </>
      ) : (
        <div>
          <h5
            className="ms-1"
            style={{ fontWeight: "bold", textAlign: "left", marginBottom: 10 }}
          >
            {currentTestDraft && currentTestDraft.title} 
            {/* of {test && test.studentEmail} */}
          </h5>
          <QuestionsList />
        </div>
      )}
    </>
  );
};

export default TestField;
