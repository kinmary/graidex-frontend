import { IStudent } from "./Student";

export interface ITestDto {
    id: string | number;
    subjectId: number | string;
    title: string;
    description: string | undefined;
    gradeToPass: number;
    itemType: string;

    isVisible: boolean;
    startDateTime: Date | undefined;
    endDateTime: Date | undefined;
    timeLimit: number | undefined;
    allowedStudents: IStudent[];
    autoCheckAfterSubmission: boolean;
    reviewResult: any; //TODO: check type
}