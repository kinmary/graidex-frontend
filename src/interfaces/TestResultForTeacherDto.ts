import { IQuestion } from "./Questions";

export interface ITestResultForTeacher {
    resultAnswers?: IQuestion[];
    isAutoChecked?: boolean;
    canReview?: boolean;
    startTime?: Date;
    endTime?: Date;
    testId?: number;
    studentEmail?: string;
    totalPoints?: number;
    grade?: number;
}