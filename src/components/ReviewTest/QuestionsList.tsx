import { Card, Col, Row, Badge } from "react-bootstrap";
import {
  SetSelectedQ,
} from "./TestOfStudentActions";
import { useAppDispatch } from "../../app/hooks";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { GetResultAnswerForTeacherDto } from "../../interfaces/GetResultAnswerForTeacherDto";

const QuestionsList = () => {
  const dispatch = useAppDispatch();
  const test = useSelector((state: RootState) => state.testOfStudent.testResult);

  const handleCardClick = (event: any) => {
    dispatch(SetSelectedQ(event.currentTarget.id));
  };

  let { resultAnswers } = test;
  return (
    <div>
      <Row xs={1} md={1} className="g-2">
        {resultAnswers &&
          resultAnswers.map((result: GetResultAnswerForTeacherDto, index: any) => (
            <Col style={{ marginBottom: 5 }}>
              <Card>
                <Card.Body
                  style={{ fontWeight: "bold", padding: 10 }}
                  className="d-flex align-items-center"
                >
                  <Badge bg="secondary" className="me-2">
                    {result.question.id + 1}
                  </Badge>
                  <span
                    id={result.question.id.toString()}
                    onClick={handleCardClick}
                    className="flex-grow-1"
                  >
                    {result.question.title}
                  </span>
                </Card.Body>
              </Card>
            </Col>
          ))}
      </Row>
    </div>
  );
};

export default QuestionsList;
