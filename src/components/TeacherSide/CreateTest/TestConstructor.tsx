import React, { Component, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { Button, Card, Col, Form, InputGroup, Navbar, Row, Dropdown } from "react-bootstrap";
import { connect } from "react-redux";
import { AddAnswer, InputChange, ChangeAnswers, SetSelectedQ } from "./CreateTestActions";
import DropZone from "./DropZone";
import { Grammarly, GrammarlyButton, GrammarlyEditorPlugin } from '@grammarly/editor-sdk-react'
import { GRAMMARLY_CLIENT_ID } from "../../../constants/config";
import { useAppDispatch } from "../../../app/hooks";
import { RootState } from "../../../app/store";
import { useSelector } from "react-redux";
import { IQuestion } from "../../../interfaces/Questions";
import IAnswerOption from "../../../interfaces/AnswerOption";
import QuestionsDraggableList from "./QuestionsDraggableList";
const TestConstructor = () => {
  const dispatch = useAppDispatch();
  const createTest = useSelector((state: RootState) => state.createTest);
  const [state, setState] = useState({
    defaultAnswer: { id: 0, text: "", isRight: false },
    file: null,
    preview: "",
    addFile: false,
  });
  
  const onInputChange = (event: any) =>{
    const { questions } = createTest;
    if (questions) {
      const question = questions.find((question: any) => question.selected === true);
      if (question) {
        const id = question.id;
    dispatch(InputChange(id, event.target.name, event.target.value))}}
  }

  const onDragEnd = (result: any) =>{
    if (!result.destination) {
      return;
    }
    const { questions } = createTest;
    if (questions) {
    const selectedQuestion = questions.find(
      (question: any) => question.selected === true
    );
    const answers = selectedQuestion?.answerOptions;
    const id = selectedQuestion?.id;
    const reorderedQuestion = answers?.splice(result.source.index, 1)[0];
    answers?.splice(result.destination.index, 0, reorderedQuestion!);
    dispatch(ChangeAnswers(id!, answers!));
  }}

   const addAnswerOptionHandler = () =>{
    const { questions } = createTest;
    const selectedQuestion = questions?.find(
      (question: IQuestion) => question.selected === true
    );
    if(questions && selectedQuestion){
    const objWithLargestId = selectedQuestion.answerOptions.reduce(
      (prev: any, current: any) => {
        return prev.id > current.id ? prev : current;
      }
    );
    let nextOptionId = objWithLargestId.id + 1;
    let answer = {
      ...state.defaultAnswer,
      id: nextOptionId,
    };
    dispatch(AddAnswer(selectedQuestion.id, answer));
  }}

  const handleCheck = (event: any) =>{
    const { questions } = createTest;
    const selectedQuestion = questions?.find(
      (question: IQuestion) => question.selected === true
    );
    if(selectedQuestion){

    let id = selectedQuestion.id;
    let type = selectedQuestion.type;
    let updated = selectedQuestion.answerOptions;
    if (type === 0) {
      updated = selectedQuestion.answerOptions.map((answer: any) =>
        answer.id.toString() === event.target.name.toString()
          ? { ...answer, isRight: true }
          : { ...answer, isRight: false }
      );
    } else {
      updated = selectedQuestion.answerOptions.map((answer: any) =>
        answer.id.toString() === event.target.name.toString()
          ? { ...answer, isRight: event.target.checked }
          : answer
      );
    }

    dispatch(ChangeAnswers(id, updated));
  }}

  const handleOptionDelete = (event: any) => {
    let questions = createTest.questions;
    const selectedQuestion = questions?.find(
      (question: any) => question.selected === true
    );

    if (selectedQuestion) {
    let updatedAnswers = selectedQuestion.answerOptions.filter(
      (answer: any) => answer.id.toString() !== event.target.id.toString()
    );

    if (updatedAnswers.length === 0) {
      updatedAnswers = [state.defaultAnswer];
    }

    dispatch(ChangeAnswers(selectedQuestion.id, updatedAnswers));
  }}

  const handleAnswerOptionChange = (event: any) => {
    const { questions } = createTest;
    const selectedQuestion = questions?.find(
      (question: IQuestion) => question.selected === true
    );
    if (selectedQuestion) {
      let id = selectedQuestion.id;
      let updated = selectedQuestion.answerOptions.map((answer: any) =>
        answer.id.toString() === event.target.name.toString()
          ? { ...answer, text: event.target.value }
          : { ...answer }
      );
      dispatch(ChangeAnswers(id, updated));
    }
  }

  const handleImageDrop = (acceptedFiles: any[]) =>{
    const file = acceptedFiles[0];
    setState({...state, file: file });
    setState({...state, preview: URL.createObjectURL(file) });
  }
  const closeImage = () =>{
    setState({ ...state, addFile: false });
    const { questions } = createTest;
    let question = questions?.find((question: any) => question.selected === true);
    if (question) {
      const id = question.id;
      dispatch(InputChange(id, "files", []));
      dispatch(InputChange(id, "previews", []))
    }
  }
  const handleBackClick = () => {
    const { questions } = createTest;
    const selectedQuestion = questions?.find(
      (question: IQuestion) => question.selected === true
    );

    if (selectedQuestion && questions) {
      const index = questions.indexOf(selectedQuestion);
      let setSelected = questions[index - 1];
      dispatch(SetSelectedQ(setSelected.id));
    }
  }

  const handleNextClick = () => {
    const { questions } = createTest;
    const selectedQuestion = questions?.find(
      (question: IQuestion) => question.selected === true
    );

    if(selectedQuestion && questions) {
      const index = questions.indexOf(selectedQuestion);
      let setSelected = questions[index + 1];
      dispatch(SetSelectedQ(setSelected.id));
    }
  }


    let { questions } = createTest;
    const selectedQuestion = questions?.find(
      (question: any) => question.selected === true
    );
    
    let indexOfSelected = 0;
    let answerOptions: IAnswerOption[] = [];
    if(selectedQuestion && questions){
      indexOfSelected = questions.indexOf(selectedQuestion);
      answerOptions = selectedQuestion.answerOptions;
    }

    const questionTypes = [
      { value: 0, label: "Single choice", iconClass: "bi bi-record-circle" },
      { value: 1, label: "Multiple choice", iconClass: "bi bi-ui-checks-grid" },
      { value: 2, label: "Open question", iconClass: "bi bi-file-text" },
    ];

    return (
      <div>        
        <Grammarly
          clientId={GRAMMARLY_CLIENT_ID}
          config={{
            documentDialect: "british",
            activation: "immediate",
          }}
        >
          {selectedQuestion ? 
            <Form>
              {/* {selectedQuestion.type === 2 && ( */}
              {/* <Navbar
                bg="light"
                variant="light"
                style={{
                  borderRadius: "5px 5px 0px 0px",
                  padding: "0px 0px",
                }}
              > */}
                {/* //TODO: bold italic underline  */}
                {/* <Navbar.Brand style={{ marginLeft: "auto", marginRight: 10 }}>
                  <i
                    className="bi bi-paperclip"
                    onClick={() => {
                      setState({...state, addFile: true });
                    }}
                  ></i>
                </Navbar.Brand>
              </Navbar> */}
              {/* )}  */}
              <div className="d-flex align-items-center mb-2">
                <GrammarlyButton className="d-block ms-1 me-1" />
                <Dropdown drop="down-centered" className="me-3">
                  <Dropdown.Toggle variant="light" id="status-dropdown">
                    <i className={questionTypes[selectedQuestion.type].iconClass + " me-2"}></i>
                    <span className="me-1">
                      {questionTypes[selectedQuestion.type].label}
                    </span>
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    {questionTypes.map((type: any) => (
                      <Dropdown.Item value={type.value} disabled={selectedQuestion.type === type.value}>
                        <i className={type.iconClass + " me-2"}></i>
                        {type.label}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
                {(selectedQuestion.type === 0 || selectedQuestion.type === 1) &&
                  <Form.Switch id="shuffle-switch" label="Shuffle options" className="me-4 mb-0" reverse />
                }
                <span className="me-2">
                  {selectedQuestion.type === 1 ? "Points / correct answer" : "Max points"} 
                </span>
                <Form.Control 
                  size="sm"
                  style={{width: "64px"}}
                  className="me-3"
                  type="number" 
                  min={1} 
                  name="maxPoints" 
                  value={selectedQuestion.maxPoints}
                  onChange={() => onInputChange}
                />

                <Button className="ms-auto" size="sm" variant="outline-danger">
                  Delete question
                </Button>
              </div>

              <GrammarlyEditorPlugin >
                <Form.Control
                  as="textarea"
                  rows={selectedQuestion.type !== 2 ? 3 : 5}
                  
                  name="title"
                  required
                  placeholder="Enter question here"
                  onChange={onInputChange}
                  value={selectedQuestion.title}
                  style={{
                    marginBottom: 20,
                    fontWeight: "bold",
                  }}
                />
              </GrammarlyEditorPlugin>
              {state.addFile && (
                <>
                  <Navbar
                    bg="light"
                    variant="light"
                    style={{
                      borderRadius: "5px 5px 0px 0px",
                      padding: "0px 0px",
                    }}
                  >
                    {/* //TODO: bold italic underline  */}
                    <Navbar.Brand style={{ marginLeft: "auto", marginRight: 10 }}>
                      <i
                        className="bi bi-x"
                        onClick={closeImage}
                      ></i>
                    </Navbar.Brand>
                  </Navbar>
                  <DropZone
                    onDrop={handleImageDrop}
                    id={selectedQuestion.id}
                    files={selectedQuestion.files}
                    previews={selectedQuestion.previews}
                  />
                </>
              )}
              {(selectedQuestion.type === 0 || selectedQuestion.type === 1) && (
                <>
                  <DragDropContext onDragEnd={onDragEnd} >
                    <Row xs={1} md={1} className="g-2 ms-2">
                      <Droppable droppableId="answerOptions">
                        {(provided) => (
                          <div {...provided.droppableProps} ref={provided.innerRef}>
                            {answerOptions.map((answer, _idx) => (
                              <Draggable
                                key={answer.id}
                                draggableId={answer.id.toString()}
                                index={_idx}
                              >
                                {(provided) => (
                                  <Col>
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      className="mb-3"
                                    >
                                      <InputGroup
                                        style={{
                                          alignItems: "center",
                                        }}
                                      >
                                        <i className="bi bi-grip-vertical me-2"
                                         {...provided.dragHandleProps}
                                        ></i>
                                        <Form.Check
                                          type={
                                            selectedQuestion.type === 0
                                              ? "radio"
                                              : "checkbox"
                                          }
                                          style={{ marginRight: 10 }}
                                          name={answer.id.toString()}
                                          checked={answer.isRight}
                                          onChange={handleCheck}
                                        />
                                        <GrammarlyEditorPlugin className="flex-grow-1">
                                        <Form.Control
                                          placeholder={
                                            "Answer option " + (answer.id + 1)
                                          }
                                          as="textarea"
                                          rows={2}
                                          required
                                          name={answer.id.toString()}
                                          value={answer.text}
                                          onChange={handleAnswerOptionChange}
                                        />
                                        </GrammarlyEditorPlugin>
                                        <i
                                          className="bi bi-x-lg ms-2 me-1"
                                          color="black"
                                          style={{ marginLeft: 5 }}
                                          id={answer.id.toString()}
                                          onClick={handleOptionDelete}
                                        ></i>
                                      </InputGroup>
                                    </div>
                                    {/* {provided.placeholder} */}
                                  </Col>
                                )}
                              </Draggable>
                            ))}
                            {provided.placeholder}
                          </div>
                        )}
                      </Droppable>
                    </Row>
                  </DragDropContext>
                  <Button
                    color="primary"
                    style={{ marginLeft: 60, width: "25%" }}
                    onClick={addAnswerOptionHandler}
                  >
                    <i className="bi bi-plus-lg me-2"></i>
                    Add answer option
                  </Button>
                </>
              )}
              <GrammarlyEditorPlugin>
              <Form.Control
                  as="textarea"
                  rows={5}
                  placeholder="Add default comment for the task solution"
                  name="comment"
                  value={selectedQuestion.comment}
                  onChange={() => onInputChange}
                  style={{ marginTop: 40 }}
                />
              </GrammarlyEditorPlugin>
              <Navbar>
                {indexOfSelected > 0 && <Navbar.Brand>
                  {/* //TODO: add on hover text */}
                  <Button
                    variant="outline-dark"
                    className="rounded-circle"
                    style={{ fontSize: "24px" }}
                    onClick = {handleBackClick}
                  >
                    <i className="bi bi-arrow-left"></i>
                  </Button>
                </Navbar.Brand> }
              { questions && indexOfSelected !== questions.length - 1 &&
                <Navbar.Brand style={{ marginLeft: "auto", marginRight: 0 }}>
                  <Button
                    variant="outline-dark"
                    className="rounded-circle"
                    style={{ fontSize: "24px" }}
                    onClick = {handleNextClick}
                  > 
                    <i className="bi bi-arrow-right"></i>
                  </Button>
                </Navbar.Brand>}
              </Navbar>
            </Form> : 
            <div>
              <h5 className="ms-1" style={{ fontWeight: "bold", textAlign: "left", marginBottom: 5 }}>
                Final Exam
              </h5>
              <Form className="d-flex align-items-center ms-1 mb-2">
                <span className="me-2">
                  Grade to pass
                </span>
                <InputGroup className="me-4" style={{width: "118px"}}>
                  <Form.Control 
                    className="border-end-0 pe-0"
                    size="sm"
                    type="number"
                    min={0}
                    max={10}
                    defaultValue={0}
                    name="gradeToPass"
                  />
                  <InputGroup.Text className="border-start-0" style={{paddingLeft: 1}}>out of 10</InputGroup.Text>
                </InputGroup>
                <Form.Switch 
                  id="shuffle-questions-switch" 
                  label="Shuffle questions" 
                  className="me-4 mb-0" 
                  reverse />
                
                <Button className="ms-auto" size="sm" variant="outline-danger">Delete all</Button>
              </Form>
              <QuestionsDraggableList />
            </div>
          }
        </Grammarly>
      </div>
    );
  }
  

export default TestConstructor;
