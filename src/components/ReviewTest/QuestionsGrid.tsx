import { Row, Col, Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { useAppDispatch } from "../../app/hooks";
import { SetSelectedQ } from "./TestOfStudentActions";
import { IQuestion } from "../../interfaces/Questions";

const QuestionsGrid = () => {
  const dispatch = useAppDispatch();
  const test = useSelector((state: RootState) => state.testOfStudent.testResult);

  const selectedQuestion = test && test.resultAnswers && test.resultAnswers?.find(
    (result: IQuestion) => result.selected === true
  );

  const handleCardClick = (event: any) => {
    dispatch(SetSelectedQ(event.currentTarget.id));
  };

  const renderColor = (result: any) => {
    if(result.requireTeacherReview) {
      return {color: "warning", icon: "bi bi-circle-fill"};
    }
    if(result.points === 0) {
      return {color: "primary", icon: "bi bi-circle"};
    }
    if(result.points === result.maxPoints) {
      return {color: "primary", icon: "bi bi-circle-fill"};
    } 
    if(result.points < result.maxPoints && result.points > 0) {
      return {color: "primary", icon: "bi bi-circle-half"};
    } 
    
    return {color: "secondary", icon: "bi bi-circle"};
  }

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
        {test && test.resultAnswers && test.resultAnswers?.map((result: any, idx: number) => (
          <Col key={idx} style={{ padding: "2px" }}>
            <Card
              onClick={handleCardClick}
              key={idx}
              className={`text-center py-2 ${
                selectedQuestion && selectedQuestion.id === result.id
                  ? "bg-primary-subtle border-primary"
                  : ""
              }`}
              id={result.id.toString()}
            >
              {idx + 1}
              {<span className={renderColor(result).icon} style={{color: `var(--bs-${renderColor(result).color})`, fontSize: "6pt"}} /> }
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default QuestionsGrid;
