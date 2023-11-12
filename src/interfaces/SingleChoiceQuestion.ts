import { IOption } from "./Option";
import { ITestBaseQuestion } from "./TestBaseQuestion";

export interface ISingleChoiceQuestion extends ITestBaseQuestion {
    correctOptionIndex: number;
    maxPoints: number;
    options: IOption[];
}