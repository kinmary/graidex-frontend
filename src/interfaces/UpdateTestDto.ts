
export interface IUpdateTestDto {
    title: string;
    description: string | undefined;
    gradeToPass: number;
    isVisible: boolean;
    // startDateTime: Date | undefined;
    // endDateTime: Date | undefined;
    // timeLimit: string | undefined;
    // autoCheckAfterSubmission: boolean | undefined;
    showToStudent: number | undefined;
    shuffleQuestions: boolean | undefined;
    orderIndex: number;

}

export interface IUpdateTestTimeDto {
    startDateTime: Date;
    endDateTime: Date;
    timeLimit: string;
}