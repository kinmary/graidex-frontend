import { Row, Col, Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { useAppDispatch } from "../../../app/hooks";
import { IQuestion } from "../../../interfaces/Questions";
import { SetSelectedQ, updateTestAttempt } from "./TakeTestActions";

const QuestionsGrid = () => {
  const dispatch = useAppDispatch();
  const takeTest = useSelector((state: RootState) => state.takeTest);

  const { questions, testResultId } = takeTest;

  const selectedQuestion = questions?.find(
    (question: IQuestion) => question.selected === true
  );

  const updateAnswer = async () => {
    if (questions) {
      const question = questions.find(
        (question: any) => question.selected === true
      );
      if (question ) {
        let questionIndex = questions.indexOf(question);
        dispatch(
          updateTestAttempt(testResultId, question, questionIndex)
        );
      }
    }
  };

  const handleCardClick = (event: any) => {
    updateAnswer();
    dispatch(SetSelectedQ(event.currentTarget.id));
  };

  return (
    <div>
      <Row className="m-0 px-1" style={{ paddingBottom: "2px" }}>
        <Col key={-1} className="px-1">
          <Card
            onClick={handleCardClick}
            key={-1}
            className={`text-center py-2 ${
              !selectedQuestion || selectedQuestion.id === -1
                ? "bg-primary-subtle border-primary"
                : ""
            }`}
            id="-1"
          >
            All
          </Card>
        </Col>
      </Row>
      <Row
        xs={1}
        md={4}
        className="m-0"
        style={{ paddingLeft: "6px", paddingRight: "6px" }}
      >
        {questions?.map((question: any, idx: number) => (
          <Col key={idx} style={{ padding: "2px" }}>
            <Card
              onClick={handleCardClick}
              key={idx}
              className={`text-center py-2 ${
                selectedQuestion && selectedQuestion.id === question.id
                  ? "bg-primary-subtle border-primary"
                  : ""
              }`}
              id={question.id.toString()}
            >
              {idx + 1}
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default QuestionsGrid;
