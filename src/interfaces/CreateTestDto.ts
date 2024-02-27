
export interface ICreateTestDto {
    title: string;
    startDateTime: Date;
    endDateTime: Date;
    timeLimit: string | undefined;
    autoCheckAfterSubmission: boolean;
    reviewResult: number | undefined;
    orderIndex: number;
    isVisible: boolean | undefined;
}