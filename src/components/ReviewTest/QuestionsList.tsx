import {Card, Col, Row, Badge, OverlayTrigger, Tooltip} from "react-bootstrap";
import {SetSelectedQ} from "./TestOfStudentActions";
import {useAppDispatch} from "../../app/hooks";
import {useSelector} from "react-redux";
import {RootState} from "../../app/store";
import {IQuestion} from "../../interfaces/Questions";

const QuestionsList = () => {
  const dispatch = useAppDispatch();
  const test = useSelector((state: RootState) => state.testOfStudent.testResult);

  const handleCardClick = (event: any) => {
    dispatch(SetSelectedQ(event.currentTarget.id));
  };
  const renderTooltip = (props: any) => (
    <Tooltip id="button-tooltip" {...props}>
      Teacher review required
    </Tooltip>
  );
  return (
    <div>
      <Row xs={1} md={1} className="g-2">
        {test &&
          test.resultAnswers &&
          test.resultAnswers.map((result: IQuestion, index: any) => (
            <Col style={{marginBottom: 5}} key={index}>
              <Card>
                <Card.Body style={{fontWeight: "bold", padding: 10, height: "45px"}} className="d-flex align-items-center">
                  <Badge bg="secondary" className="me-2">
                    {result.id + 1}
                  </Badge>
                  <span id={result.id.toString()} onClick={handleCardClick} className="flex-grow-1 text-truncate">
                    {result.title}
                  </span>
                  {result.requireTeacherReview && (
                    <OverlayTrigger overlay={(props) => renderTooltip(props)}>
                      <i className="bi bi-exclamation-circle-fill ms-auto text-warning"></i>
                    </OverlayTrigger>
                  )}
                </Card.Body>
              </Card>
            </Col>
          ))}
      </Row>
    </div>
  );
};

export default QuestionsList;
