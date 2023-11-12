import { IMultipleChoiceOption } from "./MutipleChoiceOptions";
import { ITestBaseQuestion } from "./TestBaseQuestion";

export interface IMultipleChoiceQuestion extends ITestBaseQuestion {
    pointsPerCorrectAnswer: number;
    options: IMultipleChoiceOption[];
}
