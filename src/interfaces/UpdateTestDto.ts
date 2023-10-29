
export interface IUpdateTestDto {
    title: string;
    description: string | undefined;
    gradeToPass: number;
    isVisible: boolean;
    startDateTime: Date | undefined;
    endDateTime: Date | undefined;
    timeLimit: string | undefined;
    autoCheckAfterSubmission: boolean | undefined;
    reviewResult: string | undefined;
    orderIndex: number;

}