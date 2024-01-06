import { Button, Card, Form, InputGroup, Navbar } from "react-bootstrap";
import { ChangeQuestionAttr, SetSelectedQ } from "./TestOfStudentActions";
import { useAppDispatch } from "../../app/hooks";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { GetResultAnswerForTeacherDto } from "../../interfaces/GetResultAnswerForTeacherDto";
import {
  GetResultMultipleChoiceAnswerDto,
  GetResultOpenAnswerDto,
  GetResultSingleChoiceAnswerDto,
} from "../../interfaces/ResultAnswerDto";
import { ITestResultForTeacher } from "../../interfaces/TestResultForTeacherDto";
import { GrammarlyEditorPlugin } from "@grammarly/editor-sdk-react";
import QuestionsList from "./QuestionsList";

const TestField = () => {
  const dispatch = useAppDispatch();
  const test: ITestResultForTeacher = useSelector(
    (state: RootState) => state.testOfStudent.testResult
  );
  const userRole = useSelector((state: RootState) => state.auth).userRole;
  const currentTestDraft = useSelector(
    (state: RootState) => state.main.currentTestDraft
  );
  const ChangePoints = (event: any) => {
    const selectedQuestion: GetResultAnswerForTeacherDto | undefined =
      test.resultAnswers.find(
        (resultAnswer: GetResultAnswerForTeacherDto) =>
          resultAnswer.question.selected === true
      );
    if (selectedQuestion) {
      dispatch(
        ChangeQuestionAttr(
          selectedQuestion.question.id,
          "points",
          parseInt(event.target.value)
        )
      );
    }
  };

  const ChangeFeedback = (event: any) => {
    const selectedQuestion: GetResultAnswerForTeacherDto | undefined =
      test.resultAnswers.find(
        (resultAnswer: GetResultAnswerForTeacherDto) =>
          resultAnswer.question.selected === true
      );
    if (selectedQuestion) {
      dispatch(
        ChangeQuestionAttr(
          selectedQuestion.question.id,
          "feedback",
          parseInt(event.target.value)
        )
      );
    }
  };
  const handleBackClick = () => {
    const selectedQuestion: GetResultAnswerForTeacherDto | undefined =
      test.resultAnswers.find(
        (resultAnswer: GetResultAnswerForTeacherDto) =>
          resultAnswer.question.selected === true
      );
    if (selectedQuestion) {
      indexOfSelected = test?.resultAnswers.findIndex(
        (resultAnswer: any) => resultAnswer.question.selected
      );
      let setSelected = test.resultAnswers[indexOfSelected! - 1];
      dispatch(SetSelectedQ(setSelected.question.id));
    }
  };
  const handleNextClick = () => {
    const selectedQuestion: GetResultAnswerForTeacherDto | undefined =
      test.resultAnswers.find(
        (resultAnswer: GetResultAnswerForTeacherDto) =>
          resultAnswer.question.selected === true
      );
    if (selectedQuestion) {
      indexOfSelected = test?.resultAnswers.findIndex(
        (resultAnswer: any) => resultAnswer.question.selected
      );
      let setSelected = test.resultAnswers[indexOfSelected! + 1];
      dispatch(SetSelectedQ(setSelected.question.id));
    }
  };

  const selectedQuestion: GetResultAnswerForTeacherDto =
    test.resultAnswers.find(
      (resultAnswer: GetResultAnswerForTeacherDto) =>
        resultAnswer.question.selected === true
    )!;
  let indexOfSelected = 0;
  if (selectedQuestion) {
    indexOfSelected = test?.resultAnswers.findIndex(
      (resultAnswer: any) => resultAnswer.question.selected
    );
  }
  return (
    <>
      {selectedQuestion ? (
        <>
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              marginBottom: 30,
            }}
          >
            <h4 style={{ fontWeight: "bold", width: "87%" }}>
              {selectedQuestion?.question.title}
            </h4>
            <InputGroup style={{ width: "13%" }}>
              <Form.Control
                type="number"
                value={selectedQuestion?.answer.points || 0}
                min={0}
                onChange={ChangePoints}
                readOnly={userRole === 1}
              />
              <InputGroup.Text>
                /{selectedQuestion?.question.maxPoints || 0}
              </InputGroup.Text>
            </InputGroup>
          </div>
          {selectedQuestion?.question.type === 2 ? (
            <Card key={selectedQuestion.question.id}>
              <Card.Body>
                {(selectedQuestion.answer as GetResultOpenAnswerDto).text}
              </Card.Body>
            </Card>
          ) : (
            selectedQuestion?.question.answerOptions.map(
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
                      selectedQuestion.question.type === 0
                        ? "radio"
                        : "checkbox"
                    }
                    readOnly
                    disabled
                    // isValid={selectedQuestion.question.type === 0 ? (selectedQuestion?.answer as GetResultSingleChoiceAnswerDto).choiceOptionIndex === idx
                    //   : (selectedQuestion?.answer as GetResultMultipleChoiceAnswerDto).choiceOptionIndexes.includes(idx)}
                    // isInvalid={answer.isCorrect === false && answer.selected === true}
                    style={{ marginRight: 10, color: "red" }}
                    name={answer.id.toString()}
                    checked={
                      selectedQuestion.question.type === 0
                        ? (
                            selectedQuestion?.answer as GetResultSingleChoiceAnswerDto
                          ).choiceOptionIndex === idx
                        : (
                            selectedQuestion?.answer as GetResultMultipleChoiceAnswerDto
                          ).choiceOptionIndexes.includes(idx)
                    }
                  />
                  <Card
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

          <GrammarlyEditorPlugin>
            <h5 style={{ marginTop: 30, fontWeight: "bold" }}>Feedback</h5>
            <Form.Control
              as="textarea"
              rows={6}
              placeholder="Enter feedback here"
              name="text"
              value={
                selectedQuestion.answer !== undefined
                  ? selectedQuestion.answer.feedback
                  : ""
              }
              onChange={ChangeFeedback}
            />
          </GrammarlyEditorPlugin>

          <Navbar style={{ marginTop: 50 }}>
            {indexOfSelected > 0 && (
              <Navbar.Brand>
                {/* //TODO: add on hover text */}
                <Button
                  variant="outline-dark"
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
                  variant="outline-dark"
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
            style={{ fontWeight: "bold", textAlign: "left", marginBottom: 5 }}
          >
            {currentTestDraft && currentTestDraft.title} of {test && test.studentEmail}
          </h5>
          <QuestionsList />
        </div>
      )}
    </>
  );
};

export default TestField;
