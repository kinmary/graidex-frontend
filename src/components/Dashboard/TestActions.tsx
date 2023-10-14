import axios from "axios";
import { AppDispatch } from "../../app/store";
import { API_BASE_URL } from "../../constants/config";
import { CheckAuthorization, SetOpen } from "../MainAction";
import { getSubjectContent } from "./SubjectActions";
import { IUpdateTestDto } from "../../interfaces/UpdateTestDto";
import { IUpdateTestDraftDto } from "../../interfaces/UpdateTestDraftDto";
import { ICreateTestDto } from "../../interfaces/CreateTestDto";
import { SET_CURRENT_TEST_DRAFT } from "../MainReducer";

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

export const createDraftFromTest = (testid: string | number) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/Test/create-draft-from-test/` + testid
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

export const duplicateDraft = (draftid: string | number) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/Test/duplicate-draft/` + draftid
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

export const getDraft = (draftid: string | number) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch({type: SET_CURRENT_TEST_DRAFT, currentTestDraft: undefined });
      const response = await axios.get(
        `${API_BASE_URL}/api/Test/get-draft/` + draftid
      );
      if (response.status === 200) {
        dispatch({type: SET_CURRENT_TEST_DRAFT, currentTestDraft: response.data });
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
        // dispatch(getAllSubjects());
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

export const deleteDraft = (draftid: string | number) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await axios.delete(
        `${API_BASE_URL}/api/Test/delete-draft/` + draftid
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

export const createTest = (
  draftid: string | number,
  createTestDto: ICreateTestDto
) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/Test/create-test/` + draftid,
        createTestDto
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

export const getTest = (testid: string | number) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch({type: SET_CURRENT_TEST_DRAFT, currentTestDraft: undefined });
      const response = await axios.get(
        `${API_BASE_URL}/api/Test/get-test/` + testid
      );
      if (response.status === 200) {
         dispatch({type: SET_CURRENT_TEST_DRAFT, currentTestDraft: response.data });
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

export const deleteTest = (testid: string | number) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await axios.delete(
        `${API_BASE_URL}/api/Test/delete-test/` + testid
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

export const updateTestQuestions = (
  testid: string | number
  // updateTestDto: IUpdateTestDto
) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/api/Test/update-test-questions/` + testid
        // TODO: add List<TestBaseQuestionDto>
        // updateTestDto
      );
      if (response.status === 200) {
        // dispatch(getAllSubjects());
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

export const getTestQuestionsOfTeacher = (testid: string | number) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/Test/test-questions-of-teacher/` + testid
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

export const getTestDraftQuestions = (draftid: string | number) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/Test/test-draft-questions/` + draftid
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

export const updateTestDraftQuestions = (
  draftid: string | number
  // updateTestDto: IUpdateTestDto
) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/api/Test/update-test-draft-questions/` + draftid
        // TODO: add List<TestBaseQuestionDto>
        // updateTestDto
      );
      if (response.status === 200) {
        // dispatch(getAllSubjects());
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
        // dispatch(getAllSubjects());
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
