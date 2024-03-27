export default interface IAnswerGrid {
    id: string;
  student: {
    name: string;
    surname: string;
    customId?: string;
  };
  startTime: Date;
  endTime: Date;
  grade: number;
  showToStudent: boolean;
  status?: number;
  requireTeacherReview: boolean;
}
