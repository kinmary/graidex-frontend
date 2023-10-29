
export interface ICreateTestDto {
    startDateTime: Date;
    endDateTime: Date;
    timeLimit: string | undefined;
    autoCheckAfterSubmission: boolean;
    reviewResult: string | undefined;
    orderIndex: number;
}