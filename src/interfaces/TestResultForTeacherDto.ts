import { GetResultAnswerForTeacherDto } from "./GetResultAnswerForTeacherDto";

export interface ITestResultForTeacher {
    resultAnswers: GetResultAnswerForTeacherDto[] ;
    isAutoChecked: boolean;
    canReview: boolean;
    startTime: Date;
    endTime: Date;
    testId: number;
    studentEmail: string;
    totalPoints: number;
    grade: number;
}