import IAnswerOption from "./AnswerOption";

export interface IQuestion {
        id: number;
        title: string;
        feedback?: string;
        points?: number;
        maxPoints: number;
        type: number;
        selected: boolean;
        answerOptions: IAnswerOption[];
        shuffleOptions?: boolean;
        aiCheck?:  boolean;
        plagiarismCheck?: boolean;
        allowFiles?: boolean
        files?: any[];
        previews?: any[];
        questionIndex?: number;
        requireTeacherReview?: boolean;
}