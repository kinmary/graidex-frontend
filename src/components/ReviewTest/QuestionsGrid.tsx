import { Row, Col, Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { useAppDispatch } from "../../app/hooks";
import { SetSelectedQ } from "./TestOfStudentActions";
import { GetResultAnswerForTeacherDto } from "../../interfaces/GetResultAnswerForTeacherDto";

const QuestionsGrid = () => {
  const dispatch = useAppDispatch();
  const test = useSelector((state: RootState) => state.testOfStudent.testResult);

  const { resultAnswers } = test;

  const selectedQuestion = resultAnswers?.find(
    (result: GetResultAnswerForTeacherDto) => result.question.selected === true
  );

  const handleCardClick = (event: any) => {
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
              !selectedQuestion || selectedQuestion.question.id === -1
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
        {resultAnswers?.map((result: any, idx: number) => (
          <Col key={idx} style={{ padding: "2px" }}>
            <Card
              onClick={handleCardClick}
              key={idx}
              className={`text-center py-2 ${
                selectedQuestion && selectedQuestion.question.id === result.question.id
                  ? "bg-primary-subtle border-primary"
                  : ""
              }`}
              id={result.question.id.toString()}
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