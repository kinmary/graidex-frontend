
export interface IUpdateTestDto {
    title: string;
    desription: string | undefined;
    gradeToPass: number;
    isVisible: boolean;
    startDateTime: Date | undefined;
    endDateTime: Date | undefined;
    timeLimit: number | undefined;
}