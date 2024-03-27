import { IQuestion } from "./Questions";

export interface ITestResultForTeacher {
    resultAnswers?: IQuestion[];
    // isAutoChecked?: boolean;
    showToStudent?: boolean;
    startTime?: Date;
    endTime?: Date;
    testId?: number;
    studentEmail?: string;
    totalPoints?: number;
    grade?: number;
}