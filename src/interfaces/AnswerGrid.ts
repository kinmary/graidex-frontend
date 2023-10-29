export default interface IAnswerGrid {
    student: {
        email: string;
        name: string;
        customId: string;
    }

    startEnd: {
        start: string;
        end: string;
    }

    grade: {
        grade: number;
        percent: number;
    } | null;
    status: number;
    isShown: boolean;
}