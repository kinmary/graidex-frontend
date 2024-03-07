import { IStudent } from "./Student";

export interface ITestDto {
    id: string | number;
    subjectId: number | string;
    title: string;
    description: string | undefined;
    gradeToPass: number;
    maxPoints: number;
    itemType: string;

    isVisible: boolean;
    startDateTime: Date | undefined;
    endDateTime: Date | undefined;
    timeLimit: number | undefined;
    allowedStudents: IStudent[];
    autoCheckAfterSubmission: boolean;
    shuffleQuestions: boolean;
    reviewResult: number;
    orderIndex: number;
}