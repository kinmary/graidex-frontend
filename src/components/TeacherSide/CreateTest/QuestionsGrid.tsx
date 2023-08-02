import React, { useState } from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { useAppDispatch } from "../../../app/hooks";
import { IQuestion } from '../../../interfaces/Questions';
import AddQuestionModal from '../../Modals/AddQuestionModal';
import { SetOpen } from '../../MainAction';
import {
  AddQuestion,
  ChangeQuestions,
  SetSelectedQ,
} from "./CreateTestActions";

const QuestionsGrid = () => {
  const dispatch = useAppDispatch();
  const test = useSelector((state: RootState) => state.testOfStudent);
  const main = useSelector((state: RootState) => state.main);

  const createTest = useSelector((state: RootState) => state.createTest);
  const [state, setState] = useState({
    defaultQuestion: {
      id: 0,
      title: "Question",
      comment: "",
      maxPoints: 1,
      shuffleOptions: true,
      aiCheck: true,
      plagiarismCheck: true,
      allowFiles: false,
      type: 0,
      selected: true,
      files: [],
      previews: [],
      answerOptions: [{ id: 0, text: "", isRight: false }],
    }
  });

  const { questions } = createTest;

  const AddQuestionHandler = (type: number) => {
    let questions = createTest.questions;
    if(questions) {
      const objWithLargestId = questions.reduce((prev: any, current: any) => {
        return prev.id > current.id ? prev : current;
      });

      let nextQuestionId = objWithLargestId.id + 1;
      let question: IQuestion = {
        ...state.defaultQuestion,
        id: nextQuestionId,
        title: "Question " + (nextQuestionId + 1),
        type: type,
      };

      let updatedQuestions = questions.map((obj: any, index: any) => {
        return { ...obj, selected: false };
      });

      dispatch(ChangeQuestions(updatedQuestions));
      dispatch(AddQuestion(question));
    }
  }

  const selectedQuestion = questions?.find(
    (question: IQuestion) => question.selected === true
  );

  const handleCardClick = (event: any) => {
    dispatch(SetSelectedQ(event.currentTarget.id));
  }

  const handleAddQuestionClick = () => {
    dispatch(SetOpen("addQuestionModal", true));
  };

  return (
    <div>
      <AddQuestionModal addQuestionHandler={AddQuestionHandler} />
      <Row className='m-0 px-1' style={{paddingBottom: "2px"}}>
        <Col key={-1} className='px-1'>
            <Card 
              onClick={handleCardClick}
              key={-1}
              className={`text-center py-2 ${(!selectedQuestion || selectedQuestion.id === -1) ? "bg-primary-subtle border-primary" : ""}`}
              id="-1"
            >
              All
            </Card>
          </Col>
      </Row>
      <Row xs={1} md={4} className='m-0' style={{paddingLeft: "6px", paddingRight: "6px"}}>
        {questions?.map((question: any, idx: number) => (
          <Col key={idx} style={{padding: "2px"}}>
            <Card 
              onClick={handleCardClick}
              key={idx}
              className={`text-center py-2 ${
                selectedQuestion && selectedQuestion.id === question.id 
                ? "bg-primary-subtle border-primary" 
                : ""}`}

              id={question.id.toString()}
            >
              {idx + 1}
            </Card>
          </Col>
        ))}
        
        <Col style={{padding: "2px"}}>
          <Button className="w-100 py-2 px-0" onClick={handleAddQuestionClick}>
            <i className="bi bi-plus-lg"></i>
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default QuestionsGrid;