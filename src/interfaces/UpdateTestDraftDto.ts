
export interface IUpdateTestDraftDto {
    title: string;
    description: string | undefined;
    gradeToPass: number;
    isVisible: boolean;
    orderIndex: number;
}