
export default interface ISubjectContent {
    //from subjectContentDto
    id: string | number;
    title: string;
    isVisible: boolean;
    subjectId: number | string;
    itemType: string;
    orderIndex: number;

}
