import { IQuestion } from "./Questions";
import { GetResultMultipleChoiceAnswerDto, GetResultOpenAnswerDto, GetResultSingleChoiceAnswerDto } from "./ResultAnswerDto";

export interface GetResultAnswerForTeacherDto {
    question: IQuestion;
    answer: GetResultOpenAnswerDto | GetResultSingleChoiceAnswerDto | GetResultMultipleChoiceAnswerDto;
}