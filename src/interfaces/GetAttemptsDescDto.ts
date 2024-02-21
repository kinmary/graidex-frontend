export interface GetAttemptsDescDto {
    submittedTestResultIds: number[];
    currentTestResultId?: number | null;
    numberOfAvailableAttempts: number;
}