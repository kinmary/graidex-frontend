import { Card, Col, Row, Badge } from "react-bootstrap";
import { SetSelectedQ } from "./TakeTestActions";
import { useAppDispatch } from "../../../app/hooks";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";

const QuestionsList = () => {
  const dispatch = useAppDispatch();
  const takeTest = useSelector((state: RootState) => state.takeTest);

  const handleCardClick = (event: any) => {
    dispatch(SetSelectedQ(event.currentTarget.id));
  };

  let { questions } = takeTest;
  return (
    <div>
      <Row xs={1} md={1} className="g-2">
        {questions &&
          questions.map((question: any, index: any) => (
            <Col key={index} style={{ marginBottom: 5 }}>
              <Card>
                <Card.Body
                  style={{ fontWeight: "bold", padding: 10 }}
                  className="d-flex align-items-center"
                >
                  <Badge bg="secondary" className="me-2">
                    {question.id + 1}
                  </Badge>
                  <span
                    id={question.id.toString()}
                    onClick={handleCardClick}
                    className="flex-grow-1"
                  >
                    {question.title}
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
