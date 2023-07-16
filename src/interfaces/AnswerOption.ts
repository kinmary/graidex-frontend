export default interface IAnswerOption {
    id: number;
    text: string;
    isRight?: boolean | undefined;
    selected?: boolean | undefined;
  }