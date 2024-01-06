export interface IResultAnswer {
    points: number;
    feedback?: string;
    questionIndex: number;
}

export interface GetResultOpenAnswerDto extends IResultAnswer {
    text: string;
}

export interface GetResultSingleChoiceAnswerDto extends IResultAnswer {
    choiceOptionIndex: number;
}

export interface GetResultMultipleChoiceAnswerDto extends IResultAnswer {
    choiceOptionIndexes: number[];
}