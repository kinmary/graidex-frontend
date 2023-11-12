export default interface IAnswerOption {
    id: number;
    text: string;
    isCorrect?: boolean | undefined;
    selected?: boolean | undefined;
  }