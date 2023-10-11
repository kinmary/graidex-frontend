
export interface IUpdateTestDto {
    title: string,
    desription: string | undefined,
    gradeToPass: number,
    isVisible: boolean,
    startDateTime: Date,
    endDateTime: Date,
    timeLimit: number | undefined
}