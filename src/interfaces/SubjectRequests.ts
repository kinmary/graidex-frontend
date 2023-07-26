import { ISubject } from "./Subject";

export interface IIncomingSubjectRequest {
    id: number;
    subjectInfo: ISubject[];
    date: Date;
}
