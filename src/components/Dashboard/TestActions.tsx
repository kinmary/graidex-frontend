import axios from "axios";
import { AppDispatch } from "../../app/store";
import { API_BASE_URL } from "../../constants/config";
import { CheckAuthorization, SetOpen } from "../MainAction";
import { getSubjectContent } from "./SubjectActions";
import { IUpdateTestDto } from "../../interfaces/UpdateTestDto";
import { IUpdateTestDraftDto } from "../../interfaces/UpdateTestDraftDto";
import { ICreateTestDto } from "../../interfaces/CreateTestDto";
import { SET_CURRENT_TEST_DRAFT } from "../MainReducer";
import { CHANGE_QUESTIONS } from "../ReviewTest/TestOfStudentReducer";
import { RESET_STATE } from "../TeacherSide/CreateTest/CreateTestReducer";
import { IOpenQuestion } from "../../interfaces/OpenQuestion";
import { IMultipleChoiceQuestion } from "../../interfaces/MutipleChoiceQuestion";
import { ISingleChoiceQuestion } from "../../interfaces/SingleChoiceQuestion";
import { forEach } from "jszip";
import { IQuestion } from "../../interfaces/Questions";
import IAnswerOption from "../../interfaces/AnswerOption";

export const createTestDraft = (
  subjectId: string | number | undefined,
  title: string,
  description: string,
  gradeToPass: number
) => {
  return async (dispatch: AppDispatch) => {
    try {
      let createTestDraftDto = {
        title: title,
        description: description,
        gradeToPass: gradeToPass,
      };
      const response = await axios.post(
        `${API_BASE_URL}/api/Test/create-draft/` + subjectId,
        createTestDraftDto
      );
      if (response.status === 200) {
        dispatch(getSubjectContent(subjectId!));
        dispatch(SetOpen("openSubjectModal", false));
      }
    } catch (error: any) {
      if (error.response.status === 400) {
        //Bad Request
      } else {
        //   dispatch(CheckAuthorization(error.response.status));
        alert(error.message);
      }
    }
  };
};

export const createDraftFromTest = (testid: string | number) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/Test/create-draft-from-test/` + testid
      );
      if (response.status === 200) {
        dispatch(getSubjectContent(response.data.subjectId));
      }
    } catch (error: any) {
      if (error.response.status === 400) {
        alert("400 Bad request");
      } else {
        //   dispatch(CheckAuthorization(error.response.status));
        alert(error.message);
      }
    }
  };
};

export const duplicateDraft = (draftid: string | number) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/Test/duplicate-draft/` + draftid
      );
      if (response.status === 200) {
        dispatch(getSubjectContent(response.data.subjectId));
        // dispatch(SetOpen("openSubjectModal", false));
      }
    } catch (error: any) {
      if (error.response.status === 400) {
        //Bad Request
        alert("400 Bad request");
      } else {
        // dispatch(CheckAuthorization(error.response.status));
        alert(error.message);
      }
    }
  };
};

export const getDraft = (draftid: string | number) => {
  return async (dispatch: AppDispatch) => {
    try {
      // dispatch({type: SET_CURRENT_TEST_DRAFT, currentTestDraft: undefined });
      const response = await axios.get(
        `${API_BASE_URL}/api/Test/get-draft/` + draftid
      );
      if (response.status === 200) {
        dispatch({
          type: SET_CURRENT_TEST_DRAFT,
          currentTestDraft: response.data,
        });
      }
    } catch (error: any) {
      if (error.response.status === 400) {
        //Bad Request
        error.response.data.map((obj: any) =>
          alert(obj.attemptedValue + ": " + obj.errorMessage)
        );
      } else {
        //   dispatch(CheckAuthorization(error.response.status));
        alert(error.message);
      }
    }
  };
};

export const updateDraft = (
  draftId: string | number,
  updateTestDraftDto: IUpdateTestDraftDto
) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/api/Test/update-draft/` + draftId,
        updateTestDraftDto
      );
      if (response.status === 200) {
        dispatch(getDraft(draftId));
      }
    } catch (error: any) {
      if (error.response.status === 400) {
        //Bad Request
        error.response.data.map((obj: any) =>
          alert(obj.attemptedValue + ": " + obj.errorMessage)
        );
      } else {
        dispatch(CheckAuthorization(error.response.status));
        alert(error.message);
      }
    }
  };
};

export const deleteDraft = (
  draftid: string | number,
  subjectId: string | number
) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await axios.delete(
        `${API_BASE_URL}/api/Test/delete-draft/` + draftid
      );
      if (response.status === 200) {
        dispatch(getSubjectContent(subjectId));
      }
    } catch (error: any) {
      if (error.response.status === 400) {
        //Bad Request
        error.response.data.map((obj: any) =>
          alert(obj.attemptedValue + ": " + obj.errorMessage)
        );
      } else {
        //   dispatch(CheckAuthorization(error.response.status));
        alert(error.message);
      }
    }
  };
};

export const createTest = (
  draftid: string | number,
  updateTestDraftDto: IUpdateTestDraftDto,
  createTestDto: ICreateTestDto,
  subjectId: string | number
) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/api/Test/update-draft/` + draftid,
        updateTestDraftDto
      );
      if (response.status === 200) {
        const res = await axios.post(
          `${API_BASE_URL}/api/Test/create-test/` + draftid,
          createTestDto
        );
        if (res.status === 200) {
          dispatch(getSubjectContent(subjectId));
          // dispatch(SetOpen("openSubjectModal", false));
        }
      }
    } catch (error: any) {
      if (error.response.status === 400) {
        //Bad Request
        alert(
          "Error occurred while creating test! One or more fields didn't pass validation"
        );
      } else {
        //   dispatch(CheckAuthorization(error.response.status));
        alert(error.message);
      }
    }
  };
};

export const getTest = (testid: string | number) => {
  return async (dispatch: AppDispatch) => {
    try {
      // dispatch({type: SET_CURRENT_TEST_DRAFT, currentTestDraft: undefined });
      const response = await axios.get(
        `${API_BASE_URL}/api/Test/get-test/` + testid
      );
      if (response.status === 200) {

        // TODO: remove this when backend is fixed
        response.data.startDateTime += "Z";
        response.data.endDateTime += "Z";
        
        dispatch({
          type: SET_CURRENT_TEST_DRAFT,
          currentTestDraft: response.data,
        });
      }
    } catch (error: any) {
      if (error.response.status === 400) {
        //Bad Request
        error.response.data.map((obj: any) =>
          alert(obj.attemptedValue + ": " + obj.errorMessage)
        );
      } else {
        //   dispatch(CheckAuthorization(error.response.status));
        alert(error.message);
      }
    }
    return Promise.resolve();
  };
};

//!FOR STUDENT
export const getVisibleTestStudent = (testid: string | number) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/Test/get-visible-test/` + testid
      );
      if (response.status === 200) {
        //  dispatch(getSubjectContent(subjectId!));
        // dispatch(SetOpen("openSubjectModal", false));
      }
    } catch (error: any) {
      if (error.response.status === 400) {
        //Bad Request
        error.response.data.map((obj: any) =>
          alert(obj.attemptedValue + ": " + obj.errorMessage)
        );
      } else {
        //   dispatch(CheckAuthorization(error.response.status));
        alert(error.message);
      }
    }
  };
};

export const updateTest = (
  testid: string | number,
  updateTestDto: IUpdateTestDto,
  subjectId: string | number
) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/api/Test/update-test/` + testid,
        updateTestDto
      );
      if (response.status === 200) {
        dispatch(getSubjectContent(subjectId));
        dispatch(getTest(testid));
      }
    } catch (error: any) {
      if (error.response.status === 400 && error.response.data) {
        //Bad Request
        // error.response.data.map((obj: any) =>
        alert(error.response.data);
        // );
      } else {
        dispatch(CheckAuthorization(error.response.status));
        alert(error.message);
      }
    }
  };
};

export const deleteTest = (
  testid: string | number,
  subjectId: string | number
) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await axios.delete(
        `${API_BASE_URL}/api/Test/delete-test/` + testid
      );
      if (response.status === 200) {
        dispatch(getSubjectContent(subjectId!));
        // dispatch(SetOpen("openSubjectModal", false));
      }
    } catch (error: any) {
      if (error.response.status === 400) {
        //Bad Request
        // error.response.data.map((obj: any) =>
        alert("Bad request");
        // );
      } else {
        //   dispatch(CheckAuthorization(error.response.status));
        alert(error.message);
      }
    }
  };
};

export const updateTestQuestions = (
  testid: string | number,
  updateQuestionsDto: any[]
) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/api/Test/update-test-questions/` + testid,
        updateQuestionsDto
      );
      if (response.status === 200) {
        // dispatch(getAllSubjects());
      }
    } catch (error: any) {
      if (error.response.status === 400) {
        //Bad Request
        // error.response.data.map((obj: any) =>
        //   alert(obj.attemptedValue + ": " + obj.errorMessage)
        // );
        alert(error.response.data);
      } else {
        dispatch(CheckAuthorization(error.response.status));
        alert(error.message);
      }
    }
  };
};

export const getTestQuestionsOfTeacher = (testid: string | number) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/Test/test-questions-of-teacher/` + testid
      );
      dispatch({ type: RESET_STATE });
      if (response.data.length !== 0) {
        let questions: IQuestion[] = [];
        response.data.forEach((question: any, idx: number) => {
          switch (question.$type) {
            case "TestBaseSingleChoiceQuestionDto":
              let options: IAnswerOption[] = question.options.map(
                (x: any, idx: number) => {
                  return {
                    id: idx,
                    text: x.text,
                    isCorrect:
                    question.correctOptionIndex.toString() === idx.toString(),
                    selected:
                    question.correctOptionIndex.toString() === idx.toString(),
                  };
                }
              );
              let single: IQuestion = {
                id: idx,
                title: question.text,
                comment: question.defaultComment,
                maxPoints: question.maxPoints,
                type: 0,
                selected: false,
                answerOptions: options,
              };
              questions.push(single);
              break;
            case "TestBaseMultipleChoiceQuestionDto":
              let answerOptions: IAnswerOption[] = question.options.map(
                (x: any, idx: number) => {
                  return {
                    id: idx,
                    text: x.option.text,
                    isCorrect: x.isCorrect,
                    selected: x.isCorrect,
                  };
                }
              );
              let multiple: IQuestion = {
                id: idx,
                title: question.text,
                comment: question.defaultComment,
                maxPoints: question.pointsPerCorrectAnswer,
                type: 1,
                selected: false,
                answerOptions: answerOptions,
              };
              questions.push(multiple);
              break;
            case "TestBaseOpenQuestionDto":
              let open: IQuestion = {
                id: idx,
                title: question.text,
                comment: question.defaultComment,
                maxPoints: question.maxPoints,
                type: 2,
                selected: false,
                answerOptions: [],
              };
              questions.push(open);
              break;
          }
        });
        dispatch({ type: CHANGE_QUESTIONS, questions: questions });
        // dispatch({ type: CHANGE_QUESTIONS, questions: response.data });
      }
    } catch (error: any) {
      alert(error.message);
    }
  };
};

export const getTestDraftQuestions = (draftid: string | number) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/Test/test-draft-questions/` + draftid
      );
      dispatch({ type: RESET_STATE });
      if (response.data.length !== 0) {
        let questions: IQuestion[] = [];
        response.data.forEach((question: any, idx: number) => {
          switch (question.$type) {
            case "TestBaseSingleChoiceQuestionDto":
              let options: IAnswerOption[] = question.options.map(
                (x: any, idx: number) => {
                  return {
                    id: idx,
                    text: x.text,
                    isCorrect:
                    question.correctOptionIndex.toString() === idx.toString(),
                    selected:
                    question.correctOptionIndex.toString() === idx.toString(),
                  };
                }
              );
              let single: IQuestion = {
                id: idx,
                title: question.text,
                comment: question.defaultComment,
                maxPoints: question.maxPoints,
                type: 0,
                selected: false,
                answerOptions: options,
              };
              questions.push(single);
              break;
            case "TestBaseMultipleChoiceQuestionDto":
              let answerOptions: IAnswerOption[] = question.options.map(
                (x: any, idx: number) => {
                  return {
                    id: idx,
                    text: x.option.text,
                    isCorrect: x.isCorrect,
                    selected: x.isCorrect,
                  };
                }
              );
              let multiple: IQuestion = {
                id: idx,
                title: question.text,
                comment: question.defaultComment,
                maxPoints: question.pointsPerCorrectAnswer,
                type: 1,
                selected: false,
                answerOptions: answerOptions,
              };
              questions.push(multiple);
              break;
            case "TestBaseOpenQuestionDto":
              let open: IQuestion = {
                id: idx,
                title: question.text,
                comment: question.defaultComment,
                maxPoints: question.maxPoints,
                type: 2,
                selected: false,
                answerOptions: [],
              };
              questions.push(open);
              break;
          }
        });
        dispatch({ type: CHANGE_QUESTIONS, questions: questions });
      }
    } catch (error: any) {
      alert(error.message);
    }
  };
};

export const updateTestDraftQuestions = (
  draftid: string | number,
  updateQuestionsDto: any[]
) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/api/Test/update-test-draft-questions/` + draftid,
        updateQuestionsDto
      );
      if (response.status === 200) {
        // dispatch(getAllSubjects());
      }
    } catch (error: any) {
      if (error.response.status === 400) {
        alert(error.response.data);
      } else {
        dispatch(CheckAuthorization(error.response.status));
        alert(error.message);
      }
    }
  };
};

export const addStudentsToTest = (
  testid: string | number,
  studentEmails: string[]
) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/api/Test/add-students/` + testid,
        studentEmails
      );
      if (response.status === 200) {
        dispatch(getTest(testid));
      }
    } catch (error: any) {
      if (error.response.status === 400) {
        //Bad Request
        error.response.data.map((obj: any) =>
          alert(obj.attemptedValue + ": " + obj.errorMessage)
        );
      } else {
        dispatch(CheckAuthorization(error.response.status));
        alert(error.message);
      }
    }
  };
};
