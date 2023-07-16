import { IQuestion } from "./Questions";

export interface IStudentAnswer {
    Id: number;
    studentName: string;
    mark: number;
    questions?: IQuestion[] | undefined;
}