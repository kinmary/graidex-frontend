
export interface ICreateTestDto {
    title: string;
    startDateTime: Date;
    endDateTime: Date;
    timeLimit: string | undefined;
    // autoCheckAfterSubmission: boolean;
    showToStudent: number | undefined;
    orderIndex: number;
    shuffleQuestions: boolean;
    isVisible: boolean | undefined;
}