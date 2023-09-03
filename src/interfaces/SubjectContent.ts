
export default interface ISubjectContent {
    //from subjectContentDto
    id: string;
    title: string;
    isVisible: boolean;
    subjectId: number;
    itemType: string;

    // status: number; //TODO check what to do with that (needed or not)
    // examName: string;
    // lastTimeEdit: string;
    // date: string;
    // avgScore: number;
    // answered: string;
}
